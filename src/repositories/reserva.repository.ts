import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Reserva, ReservaRelations, Visitante, Usuario, Plan, Compra} from '../models';
import {VisitanteRepository} from './visitante.repository';
import {UsuarioRepository} from './usuario.repository';
import {PlanRepository} from './plan.repository';
import {CompraRepository} from './compra.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.id,
  ReservaRelations
> {

  public readonly visitante: BelongsToAccessor<Visitante, typeof Reserva.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Reserva.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof Reserva.prototype.id>;

  public readonly compra: HasOneRepositoryFactory<Compra, typeof Reserva.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>,
  ) {
    super(Reserva, dataSource);
    this.compra = this.createHasOneRepositoryFactoryFor('compra', compraRepositoryGetter);
    this.registerInclusionResolver('compra', this.compra.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.visitante = this.createBelongsToAccessorFor('visitante', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitante', this.visitante.inclusionResolver);
  }
}
