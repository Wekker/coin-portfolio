import * as hapi from '@hapi/hapi';
import boom from '@hapi/boom';
import winston from 'winston';

export const httpResponseToHapiResponse = () => (response: HTTPResponse, h: hapi.ResponseToolkit) => {
	let responseObject = h.response(response.body).code(response.statusCode);

	if (response.headers) {
		for (const header of Object.keys(response.headers)) {
			responseObject = responseObject.header(header, response.headers[header]);
		}
	}

	return responseObject;
};

export const catchHapiRouteError = (logger: winston.Logger) => (lifecycleMethod: hapi.Lifecycle.Method): hapi.Lifecycle.Method => async (request, h) => {
	try {
		return await lifecycleMethod(request, h);
	} catch (error) {
		logger.error('Error in route: ', error);

		if (!boom.isBoom(error)) {
			error = boom.internal();
		}

		throw error;
	}
};

export interface HTTPResponse {
	statusCode: number;
	body?: object;
	headers?: Record<string, string>;
}
