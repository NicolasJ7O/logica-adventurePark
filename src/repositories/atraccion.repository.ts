import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Plan, PlanAtraccion} from '../models';
import {PlanAtraccionRepository} from './plan-atraccion.repository';
import {PlanRepository} from './plan.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.id,
  AtraccionRelations
> {

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          PlanAtraccion,
          typeof Atraccion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanAtraccionRepository') protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Atraccion, dataSource);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
