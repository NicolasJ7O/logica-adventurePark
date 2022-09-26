import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PlanAtraccion, PlanAtraccionRelations} from '../models';

export class PlanAtraccionRepository extends DefaultCrudRepository<
  PlanAtraccion,
  typeof PlanAtraccion.prototype.id,
  PlanAtraccionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PlanAtraccion, dataSource);
  }
}
