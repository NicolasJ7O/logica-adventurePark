import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuestoComida, PuestoComidaRelations, Zona} from '../models';
import {ZonaRepository} from './zona.repository';

export class PuestoComidaRepository extends DefaultCrudRepository<
  PuestoComida,
  typeof PuestoComida.prototype.id,
  PuestoComidaRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof PuestoComida.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(PuestoComida, dataSource);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
