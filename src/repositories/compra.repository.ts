import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Compra, CompraRelations} from '../models';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Compra, dataSource);
  }
}
