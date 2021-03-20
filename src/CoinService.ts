import axios, { AxiosPromise } from 'axios';

export class CoinService {

	private readonly baseUrl: string;
	private readonly apiKey: string;
	private readonly headers: { [k: string]: unknown };

	constructor(baseUrl: string, apikKey: string) {
		this.baseUrl = baseUrl;
		this.apiKey  = apikKey;
		this.headers = {
			Accept:              'application/json',
			'X-CMC_PRO_API_KEY': this.apiKey,
		};
	}

	getLatestCoinListings(): AxiosPromise {
		return axios({
			method:  'GET',
			url:     this.baseUrl,
			headers: this.headers,
			params:  {
				start:   1,
				limit:   200,
				convert: 'EUR',
			},
		});
	}
}
