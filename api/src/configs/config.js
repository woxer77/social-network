module.exports = {
  appPort: process.env.APP_PORT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  refreshTokenTimeline: process.env.JWT_REFRESH_TOKEN_TIMELINE,
  accessTokenTimeline: process.env.JWT_ACCESS_TOKEN_TIMELINE,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  apiUrl: process.env.API_URL,
  clientUrl: process.env.CLIENT_URL,
  developmentStage: process.env.DEVELOPMENT_STAGE
};
