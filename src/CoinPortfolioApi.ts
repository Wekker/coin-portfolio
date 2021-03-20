import { catchHapiRouteError, httpResponseToHapiResponse } from './httpResponse';
import * as packageJSON from '../package.json';
import { CoinRoutes } from './CoinRoutes';

import { Logger } from 'winston';
import * as hapi from '@hapi/hapi';
import boom from '@hapi/boom';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import * as hapiSwagger from 'hapi-swagger';

export interface CoinPortfolioApiConfig {
	server: string;
	fqdn: string;
	port: string;
	baseUrl: string;
}

export class CoinPortfolioApi {
	private logger: Logger;
	private config: CoinPortfolioApiConfig;
	private hapiResponse: ReturnType<typeof httpResponseToHapiResponse>;
	private hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>;

	public constructor(config: CoinPortfolioApiConfig, logger: Logger) {
		this.logger           = logger;
		this.config           = config;
		this.hapiResponse     = httpResponseToHapiResponse();
		this.hapiErrorCatcher = catchHapiRouteError(logger);
	}

	public async start(): Promise<hapi.Server> {
		const server = new hapi.Server({
			address: '0.0.0.0',
			port: this.config.port,
			routes: {
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
			plugin: hapiSwagger,
			options: {
				info: {
					'title': packageJSON.name,
					'version': packageJSON.version,
				},
				grouping: 'tags',
				host: this.config.fqdn,
				jsonPath: `${this.config.baseUrl}/swagger.json`,
				documentationPath: `${this.config.baseUrl}/documentation`,
				swaggerUIPath: `${this.config.baseUrl}/swaggerui`,
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

		await new CoinRoutes(this.config.baseUrl, this.hapiErrorCatcher, this.hapiResponse).register(server);

		return server;
	}
}
