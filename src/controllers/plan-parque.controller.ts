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
  Plan,
  Parque,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanParqueController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Plan has many Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parque>,
  ): Promise<Parque[]> {
    return this.planRepository.parques(id).find(filter);
  }

  @post('/plans/{id}/parques', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParqueInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) parque: Omit<Parque, 'id'>,
  ): Promise<Parque> {
    return this.planRepository.parques(id).create(parque);
  }

  @patch('/plans/{id}/parques', {
    responses: {
      '200': {
        description: 'Plan.Parque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Partial<Parque>,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.planRepository.parques(id).patch(parque, where);
  }

  @del('/plans/{id}/parques', {
    responses: {
      '200': {
        description: 'Plan.Parque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.planRepository.parques(id).delete(where);
  }
}
