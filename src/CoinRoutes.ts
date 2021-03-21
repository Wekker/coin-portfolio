import * as hapi from '@hapi/hapi';
import { ServerRoute } from '@hapi/hapi';
import joi from '@hapi/joi';

import { catchHapiRouteError, httpResponseToHapiResponse } from './httpResponse';
import { CoinController } from './CoinController';

export class CoinRoutes {

	private readonly coinController: CoinController;
	private readonly baseUrl: string;
	private readonly hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>;
	private readonly hapiResponse: ReturnType<typeof httpResponseToHapiResponse>;

	public constructor(coinController: CoinController, baseUrl: string, hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>, hapiResponse: ReturnType<typeof httpResponseToHapiResponse>) {
		this.coinController   = coinController;
		this.hapiErrorCatcher = hapiErrorCatcher;
		this.hapiResponse     = hapiResponse;
		this.baseUrl          = baseUrl;
	}

	public register(server: hapi.Server): void {
		server.route([
			this.getLatestCoinListings(this.baseUrl, this.hapiErrorCatcher, this.hapiResponse),
		]);
	}

	private getLatestCoinListings(baseUrL: string, hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>, hapiResponse: ReturnType<typeof httpResponseToHapiResponse>): ServerRoute {
		return {
			method:  'GET',
			path:    `${baseUrL}/coins/listings/latest`,
			handler: hapiErrorCatcher(async (request, h) => {
				const response = await this.coinController.getLatestCoinListings();

				return hapiResponse({ statusCode: response.status, body: response.data }, h);
			}),
			options: {
				description: 'Get latest listings',
				notes:       'Returns latest listings',
				tags:        ['api', 'listings'],
				plugins:     {
					'hapi-swagger': {
						responses: {
							200: {
								description: 'OK',
							},
							500: {
								description: 'Internal Server Error',
							},
						},
					},
				},
			},
		};
	}
}
