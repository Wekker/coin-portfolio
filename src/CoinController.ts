import { CoinService } from './CoinService';
import { AxiosPromise } from 'axios';

export class CoinController {
	private coinService: CoinService;

	constructor(coinService: CoinService) {
		this.coinService = coinService;
	}

	getLatestCoinListings(): AxiosPromise {
		return this.coinService.getLatestCoinListings();
	}
}
