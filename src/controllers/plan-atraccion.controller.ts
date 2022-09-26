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
PlanAtraccion,
Atraccion,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanAtraccionController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Array of Plan has many Atraccion through PlanAtraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Atraccion>,
  ): Promise<Atraccion[]> {
    return this.planRepository.atraccions(id).find(filter);
  }

  @post('/plans/{id}/atraccions', {
    responses: {
      '200': {
        description: 'create a Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atraccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {
            title: 'NewAtraccionInPlan',
            exclude: ['id'],
          }),
        },
      },
    }) atraccion: Omit<Atraccion, 'id'>,
  ): Promise<Atraccion> {
    return this.planRepository.atraccions(id).create(atraccion);
  }

  @patch('/plans/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Plan.Atraccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Partial<Atraccion>,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.planRepository.atraccions(id).patch(atraccion, where);
  }

  @del('/plans/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Plan.Atraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.planRepository.atraccions(id).delete(where);
  }
}
