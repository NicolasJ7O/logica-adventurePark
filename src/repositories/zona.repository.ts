import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations, Parque, PuestoComida} from '../models';
import {ParqueRepository} from './parque.repository';
import {PuestoComidaRepository} from './puesto-comida.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly parque: BelongsToAccessor<Parque, typeof Zona.prototype.id>;

  public readonly puestoComidas: HasManyRepositoryFactory<PuestoComida, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('PuestoComidaRepository') protected puestoComidaRepositoryGetter: Getter<PuestoComidaRepository>,
  ) {
    super(Zona, dataSource);
    this.puestoComidas = this.createHasManyRepositoryFactoryFor('puestoComidas', puestoComidaRepositoryGetter,);
    this.registerInclusionResolver('puestoComidas', this.puestoComidas.inclusionResolver);
    this.parque = this.createBelongsToAccessorFor('parque', parqueRepositoryGetter,);
    this.registerInclusionResolver('parque', this.parque.inclusionResolver);
  }
}
