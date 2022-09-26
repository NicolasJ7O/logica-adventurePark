import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodbSeguridad',
  connector: 'mongodb',
  url: 'mongodb+srv://Zeppelin:<jZjMpkeU96unesP1>@cluster0.nheotad.mongodb.net/?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: 'Zeppelin',
  password: 'jZjMpkeU96unesP1',
  database: 'seguridadAdventurePark',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbSeguridadDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodbSeguridad';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodbSeguridad', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
