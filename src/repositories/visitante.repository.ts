import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Visitante, VisitanteRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.id,
  VisitanteRelations
> {

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Visitante.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Visitante, dataSource);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
  }
}
