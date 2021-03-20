import { CoinService } from './CoinService';

export class CoinController {
	private coinService: CoinService;

	constructor(coinService: CoinService) {
		this.coinService = coinService;
	}
}
