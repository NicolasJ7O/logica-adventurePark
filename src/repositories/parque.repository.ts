import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parque, ParqueRelations, Plan, Ciudad, Zona} from '../models';
import {PlanRepository} from './plan.repository';
import {CiudadRepository} from './ciudad.repository';
import {ZonaRepository} from './zona.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof Parque.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Parque.prototype.id>;

  public readonly zonas: HasManyRepositoryFactory<Zona, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Parque, dataSource);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
