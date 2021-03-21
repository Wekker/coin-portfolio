export class Config {
	public static readonly FQDN: string         = process.env.FQDN || 'localhost:3000';
	public static readonly SERVER: string       = process.env.SERVER || '0.0.0.0';
	public static readonly LOG_LEVEL: string    = process.env.LOG_LEVEL || 'info';
	public static readonly PORT: string         = process.env.PORT || '3000';
	public static readonly BASE_URL: string     = process.env.BASE_URL || '/v1/coin-portfolio-api';
	public static readonly API_KEY: string      = process.env.API_KEY || 'YOUR_API_KEY';
	public static readonly CMC_BASE_URL: string = process.env.CMC_BASE_URL || 'https://pro-api.coinmarketcap.com/v1';
}
