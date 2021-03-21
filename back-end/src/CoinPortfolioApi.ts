import { Logger } from 'winston';
import * as hapi from '@hapi/hapi';
import boom from '@hapi/boom';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import * as hapiSwagger from 'hapi-swagger';

import { getCatchHapiRouteErrorFunction, getHapiResponseFunction } from './httpResponse';
import * as packageJSON from '../package.json';
import { CoinRoutes } from './CoinRoutes';
import { CoinController } from './CoinController';
import { CoinService } from './CoinService';

export class CoinPortfolioApi {
	private logger: Logger;
	private config: CoinPortfolioApiConfig;
	private toHapiResponse: ReturnType<typeof getHapiResponseFunction>;
	private hapiErrorCatcher: ReturnType<typeof getCatchHapiRouteErrorFunction>;

	public constructor(config: CoinPortfolioApiConfig, logger: Logger) {
		this.logger           = logger;
		this.config           = config;
		this.toHapiResponse   = getHapiResponseFunction();
		this.hapiErrorCatcher = getCatchHapiRouteErrorFunction(logger);
	}

	public async start(): Promise<hapi.Server> {
		const server = new hapi.Server({
			address: '0.0.0.0',
			port:    this.config.port,
			routes:  {
				validate: {
					failAction: (request, h, error) => {
						if (error) {
							this.logger.error('Input validation failed: ', error);
						}

						throw boom.badRequest('Invalid request payload');
					},
				},
			},
		});

		await server.register([inert, vision]);
		await server.register([{
			plugin:  hapiSwagger,
			options: {
				info:              {
					'title':   packageJSON.name,
					'version': packageJSON.version,
				},
				grouping:          'tags',
				host:              this.config.fqdn,
				jsonPath:          `${this.config.baseUrl}/swagger.json`,
				documentationPath: `${this.config.baseUrl}/documentation`,
				swaggerUIPath:     `${this.config.baseUrl}/swaggerui`,
			},
		}]);

		try {
			await server.start();
			console.log(`Server is running on ${server.info.uri}`);
			console.log(`Swagger documention: ${server.info.uri}${this.config.baseUrl}/documentation`);
		} catch (error) {
			this.logger.error('Error starting hapi: ', error);

			throw error;
		}

		await new CoinRoutes(new CoinController(new CoinService(this.config.cmcBaseUrl, this.config.apiKey)), this.config.baseUrl, this.hapiErrorCatcher, this.toHapiResponse).register(server);

		return server;
	}
}

export interface CoinPortfolioApiConfig {
	server: string;
	fqdn: string;
	logLevel: string;
	port: string;
	baseUrl: string;
	apiKey: string;
	cmcBaseUrl: string;
}
