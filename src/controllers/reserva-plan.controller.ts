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
  Plan,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaPlanController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof Reserva.prototype.id,
  ): Promise<Plan> {
    return this.reservaRepository.plan(id);
  }
}
