import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Visitante,
  Reserva,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteReservaController {
  constructor(
    @repository(VisitanteRepository) protected visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/reservas', {
    responses: {
      '200': {
        description: 'Array of Visitante has many Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reserva)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.visitanteRepository.reservas(id).find(filter);
  }

  @post('/visitantes/{id}/reservas', {
    responses: {
      '200': {
        description: 'Visitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Visitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReservaInVisitante',
            exclude: ['id'],
            optional: ['visitanteId']
          }),
        },
      },
    }) reserva: Omit<Reserva, 'id'>,
  ): Promise<Reserva> {
    return this.visitanteRepository.reservas(id).create(reserva);
  }

  @patch('/visitantes/{id}/reservas', {
    responses: {
      '200': {
        description: 'Visitante.Reserva PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Partial<Reserva>,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.visitanteRepository.reservas(id).patch(reserva, where);
  }

  @del('/visitantes/{id}/reservas', {
    responses: {
      '200': {
        description: 'Visitante.Reserva DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.visitanteRepository.reservas(id).delete(where);
  }
}
