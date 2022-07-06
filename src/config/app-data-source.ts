import { DataSource } from 'typeorm';
require('dotenv').config();

const appDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.js'],
});
appDataSource
  .initialize()
  .then(() => {
    //console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.log('---ERRONED DURING DATA SOURCE--');
    //console.error("Error during Data Source initialization", err)
    console.log(err.message);
  });
export default appDataSource;
