module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  database: process.env.DATABASE_NAME || 'barber',
  username: process.env.DATABASE_USERNAME || 'docker',
  password: process.env.DATABASE_PASSWORD || 'docker',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
