import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Parque, Atraccion, PlanAtraccion, Reserva} from '../models';
import {ParqueRepository} from './parque.repository';
import {PlanAtraccionRepository} from './plan-atraccion.repository';
import {AtraccionRepository} from './atraccion.repository';
import {ReservaRepository} from './reserva.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly parques: HasManyRepositoryFactory<Parque, typeof Plan.prototype.id>;

  public readonly atraccions: HasManyThroughRepositoryFactory<Atraccion, typeof Atraccion.prototype.id,
          PlanAtraccion,
          typeof Plan.prototype.id
        >;

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('PlanAtraccionRepository') protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Plan, dataSource);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
    this.atraccions = this.createHasManyThroughRepositoryFactoryFor('atraccions', atraccionRepositoryGetter, planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('atraccions', this.atraccions.inclusionResolver);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parqueRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
