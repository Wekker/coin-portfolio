import { createLogger, transports, format, Logger } from 'winston';

export class LoggerFactory {
	public createLogger(loglevel: string): Logger {
		return createLogger({
			level:       loglevel,
			format:      format.combine(
				format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				format.errors({ stack: true }),
				format.splat(),
				format.json(),
			),
			defaultMeta: { service: 'CoinPortfolio' },
			transports:  [
				new transports.File({ filename: 'error.log', level: loglevel }),
			],
		});
	}
}
