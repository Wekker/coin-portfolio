import * as hapi from '@hapi/hapi';
import { ServerRoute } from '@hapi/hapi';
import joi from '@hapi/joi';

import { getCatchHapiRouteErrorFunction, getHapiResponseFunction } from './httpResponse';
import { CoinController } from './CoinController';

export class CoinRoutes {

	private readonly coinController: CoinController;
	private readonly baseUrl: string;
	private readonly hapiErrorCatcher: ReturnType<typeof getCatchHapiRouteErrorFunction>;
	private readonly toHapiResponse: ReturnType<typeof getHapiResponseFunction>;

	public constructor(coinController: CoinController, baseUrl: string, hapiErrorCatcher: ReturnType<typeof getCatchHapiRouteErrorFunction>, toHapiResponse: ReturnType<typeof getHapiResponseFunction>) {
		this.coinController   = coinController;
		this.hapiErrorCatcher = hapiErrorCatcher;
		this.toHapiResponse   = toHapiResponse;
		this.baseUrl          = baseUrl;
	}

	public register(server: hapi.Server): void {
		server.route([
			this.getLatestCoinListings(this.baseUrl, this.hapiErrorCatcher, this.toHapiResponse),
		]);
	}

	private getLatestCoinListings(baseUrL: string, hapiErrorCatcher: ReturnType<typeof getCatchHapiRouteErrorFunction>, toHapiResponse: ReturnType<typeof getHapiResponseFunction>): ServerRoute {
		return {
			method:  'GET',
			path:    `${baseUrL}/coins/listings/latest`,
			handler: hapiErrorCatcher(async (request, h) => {
				const response = await this.coinController.getLatestCoinListings();

				return toHapiResponse({ statusCode: response.status, body: response.data }, h);
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
