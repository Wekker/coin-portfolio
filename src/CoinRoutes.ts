import { catchHapiRouteError, httpResponseToHapiResponse } from './httpResponse';

import * as hapi from '@hapi/hapi';
import { ServerRoute } from '@hapi/hapi';
import * as joi from '@hapi/joi';
import axios from 'axios';
import { CoinService } from './CoinService';

export class CoinRoutes {

	private readonly coinService: CoinService;
	private readonly baseUrl: string;
	private readonly hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>;
	private readonly hapiResponse: ReturnType<typeof httpResponseToHapiResponse>;
	private readonly apiKey: string;

	public constructor(coinService: CoinService, baseUrl: string, apiKey: string, hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>, hapiResponse: ReturnType<typeof httpResponseToHapiResponse>) {
		this.coinService      = coinService;
		this.baseUrl          = baseUrl;
		this.hapiErrorCatcher = hapiErrorCatcher;
		this.hapiResponse     = hapiResponse;
		this.apiKey           = apiKey;
	}

	public register(server: hapi.Server): void {
		server.route([
			this.getLatestCoinsListings(this.baseUrl, this.apiKey, this.hapiErrorCatcher, this.hapiResponse),
		]);
	}

	private getLatestCoinsListings(baseUrL: string, apiKey: string, hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>, hapiResponse: ReturnType<typeof httpResponseToHapiResponse>): ServerRoute {
		return {
			method:  'GET',
			path:    `${baseUrL}/coins/listings/latest`,
			handler: hapiErrorCatcher(async (request, h) => {
				const response = await axios({
					method:  'GET',
					url:     'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
					headers: {
						Accept:              'application/json',
						'X-CMC_PRO_API_KEY': apiKey,
					},
					params:  {
						start:   1,
						limit:   200,
						convert: 'EUR',
					},
				});

				return hapiResponse({ statusCode: response.status, body: response.data }, h);
			}),
			options: {
				description: 'Get latest listings',
				notes:       'Returns latest listings',
				tags:        ['api', 'listings'],
				// validate: {
				// 	payload: {
				// 		id: joi.string().required(),
				// 	},
				// },
				plugins:     {
					'hapi-swagger': {
						responses: {
							200: {
								description: 'OK',
							},
							400: {
								description: 'Bad Request',
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
