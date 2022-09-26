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
  Reserva,
  Compra,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaCompraController {
  constructor(
    @repository(ReservaRepository) protected reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/compra', {
    responses: {
      '200': {
        description: 'Reserva has one Compra',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Compra),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Compra>,
  ): Promise<Compra> {
    return this.reservaRepository.compra(id).get(filter);
  }

  @post('/reservas/{id}/compra', {
    responses: {
      '200': {
        description: 'Reserva model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compra)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Reserva.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {
            title: 'NewCompraInReserva',
            exclude: ['id'],
            optional: ['reservaId']
          }),
        },
      },
    }) compra: Omit<Compra, 'id'>,
  ): Promise<Compra> {
    return this.reservaRepository.compra(id).create(compra);
  }

  @patch('/reservas/{id}/compra', {
    responses: {
      '200': {
        description: 'Reserva.Compra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {partial: true}),
        },
      },
    })
    compra: Partial<Compra>,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.reservaRepository.compra(id).patch(compra, where);
  }

  @del('/reservas/{id}/compra', {
    responses: {
      '200': {
        description: 'Reserva.Compra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.reservaRepository.compra(id).delete(where);
  }
}
