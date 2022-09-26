import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parque,
  Plan,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParquePlanController {
  constructor(
    @repository(ParqueRepository)
    public parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof Parque.prototype.id,
  ): Promise<Plan> {
    return this.parqueRepository.plan(id);
  }
}
