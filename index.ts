import { CoinPortfolioApi, CoinPortfolioApiConfig } from './src/CoinPortfolioApi';
import { Config } from './src/Config';
import { LoggerFactory } from './src/LoggerFactory';

(async () => {

	const config: CoinPortfolioApiConfig = {
		server:  Config.SERVER,
		fqdn:    Config.FQDN,
		port:    Config.PORT,
		baseUrl: Config.BASE_URL,
		apiKey:  Config.API_KEY,
	};

	const logger = new LoggerFactory().createLogger();

	const coinPortfolioApi = new CoinPortfolioApi(config, logger);

	await coinPortfolioApi.start();

	process.on('unhandledRejection', (err) => {
		console.log('unhandledRejection', err);
		throw err;
	});

	process.on('uncaughtException', (err) => {
		console.log('uncaughtException', err);
		setTimeout(() => {
			process.exit(1);
		}, 1000);
	});
})();
