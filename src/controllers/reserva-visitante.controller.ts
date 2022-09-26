import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reserva,
  Visitante,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaVisitanteController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/visitante', {
    responses: {
      '200': {
        description: 'Visitante belonging to Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async getVisitante(
    @param.path.number('id') id: typeof Reserva.prototype.id,
  ): Promise<Visitante> {
    return this.reservaRepository.visitante(id);
  }
}
