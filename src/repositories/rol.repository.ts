import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Rol, RolRelations} from '../models';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Rol, dataSource);
  }
}
