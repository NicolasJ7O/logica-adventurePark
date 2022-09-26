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
Atraccion,
PlanAtraccion,
Plan,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionPlanController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many Plan through PlanAtraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.atraccionRepository.plans(id).find(filter);
  }

  @post('/atraccions/{id}/plans', {
    responses: {
      '200': {
        description: 'create a Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Atraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInAtraccion',
            exclude: ['id'],
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.atraccionRepository.plans(id).create(plan);
  }

  @patch('/atraccions/{id}/plans', {
    responses: {
      '200': {
        description: 'Atraccion.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.atraccionRepository.plans(id).patch(plan, where);
  }

  @del('/atraccions/{id}/plans', {
    responses: {
      '200': {
        description: 'Atraccion.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.atraccionRepository.plans(id).delete(where);
  }
}
