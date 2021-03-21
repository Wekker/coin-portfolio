import { CoinPortfolioApi, CoinPortfolioApiConfig } from './src/CoinPortfolioApi';
import { Config } from './src/Config';
import { LoggerFactory } from './src/LoggerFactory';

(async () => {

	const config: CoinPortfolioApiConfig = {
		server:     Config.SERVER,
		fqdn:       Config.FQDN,
		logLevel:   Config.LOG_LEVEL,
		port:       Config.PORT,
		baseUrl:    Config.BASE_URL,
		apiKey:     Config.API_KEY,
		cmcBaseUrl: Config.CMC_BASE_URL,
	};

	const logger = new LoggerFactory().createLogger(config.logLevel);

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
