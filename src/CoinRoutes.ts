import { catchHapiRouteError, httpResponseToHapiResponse } from './httpResponse';

import * as hapi from '@hapi/hapi';
import { ServerRoute } from '@hapi/hapi';
import * as joi from '@hapi/joi';

export class CoinRoutes {

	private readonly baseUrl: string;
	private readonly hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>;
	private readonly hapiResponse: ReturnType<typeof httpResponseToHapiResponse>;

	public constructor(baseUrl: string, hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>, hapiResponse: ReturnType<typeof httpResponseToHapiResponse>) {
		this.baseUrl          = baseUrl;
		this.hapiErrorCatcher = hapiErrorCatcher;
		this.hapiResponse     = hapiResponse;
	}

	public register(server: hapi.Server): void {
		server.route([
			this.getCoinByName(this.baseUrl, this.hapiErrorCatcher, this.hapiResponse),
		]);
	}

	private getCoinByName(baseUrL: string, hapiErrorCatcher: ReturnType<typeof catchHapiRouteError>, hapiResponse: ReturnType<typeof httpResponseToHapiResponse>): ServerRoute {
		return {
			method:  'GET',
			path:    `${baseUrL}/coin/{coinName}`,
			handler: hapiErrorCatcher(async (request, h) => {
				console.log('test');

				const response = '' as any;

				return hapiResponse(response, h);
			}),
			options: {
				description: 'Get a coin',
				notes: 'Returns a coin',
				tags: ['api', 'coin'],
				// validate: {
				// 	payload: {
				// 		id: joi.string().required(),
				// 	},
				// },
				plugins: {
					'hapi-swagger': {
						responses: {
							200: {
								description: 'OK',
							},
							400: {
								description: 'Bad Request',
							},
							404: {
								description: 'Not found',
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
