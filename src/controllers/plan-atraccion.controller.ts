import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PlanAtraccion} from '../models';
import {PlanAtraccionRepository} from '../repositories';

export class PlanAtraccionController {
  constructor(
    @repository(PlanAtraccionRepository)
    public planAtraccionRepository : PlanAtraccionRepository,
  ) {}

  @post('/plan-atraccions')
  @response(200, {
    description: 'PlanAtraccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(PlanAtraccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanAtraccion, {
            title: 'NewPlanAtraccion',
            exclude: ['id'],
          }),
        },
      },
    })
    planAtraccion: Omit<PlanAtraccion, 'id'>,
  ): Promise<PlanAtraccion> {
    return this.planAtraccionRepository.create(planAtraccion);
  }

  @get('/plan-atraccions/count')
  @response(200, {
    description: 'PlanAtraccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PlanAtraccion) where?: Where<PlanAtraccion>,
  ): Promise<Count> {
    return this.planAtraccionRepository.count(where);
  }

  @get('/plan-atraccions')
  @response(200, {
    description: 'Array of PlanAtraccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PlanAtraccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PlanAtraccion) filter?: Filter<PlanAtraccion>,
  ): Promise<PlanAtraccion[]> {
    return this.planAtraccionRepository.find(filter);
  }

  @patch('/plan-atraccions')
  @response(200, {
    description: 'PlanAtraccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanAtraccion, {partial: true}),
        },
      },
    })
    planAtraccion: PlanAtraccion,
    @param.where(PlanAtraccion) where?: Where<PlanAtraccion>,
  ): Promise<Count> {
    return this.planAtraccionRepository.updateAll(planAtraccion, where);
  }

  @get('/plan-atraccions/{id}')
  @response(200, {
    description: 'PlanAtraccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PlanAtraccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlanAtraccion, {exclude: 'where'}) filter?: FilterExcludingWhere<PlanAtraccion>
  ): Promise<PlanAtraccion> {
    return this.planAtraccionRepository.findById(id, filter);
  }

  @patch('/plan-atraccions/{id}')
  @response(204, {
    description: 'PlanAtraccion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanAtraccion, {partial: true}),
        },
      },
    })
    planAtraccion: PlanAtraccion,
  ): Promise<void> {
    await this.planAtraccionRepository.updateById(id, planAtraccion);
  }

  @put('/plan-atraccions/{id}')
  @response(204, {
    description: 'PlanAtraccion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() planAtraccion: PlanAtraccion,
  ): Promise<void> {
    await this.planAtraccionRepository.replaceById(id, planAtraccion);
  }

  @del('/plan-atraccions/{id}')
  @response(204, {
    description: 'PlanAtraccion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planAtraccionRepository.deleteById(id);
  }
}
