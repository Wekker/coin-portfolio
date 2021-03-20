export class Config {
	public static readonly FQDN: string         = process.env.fqdn || 'localhost:3000';
	public static readonly SERVER: string       = process.env.server || '0.0.0.0';
	public static readonly LOG_LEVEL: string    = process.env.logLevel || 'info';
	public static readonly PORT: string         = process.env.port || '3000';
	public static readonly BASE_URL: string     = process.env.baseUrl || '/v1/coin-portfolio-api';
	public static readonly API_KEY: string      = process.env.apiKey || 'YOUR_API_KEY';
	public static readonly CMC_BASE_URL: string = process.env.cmcBaseUrl || 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
}
