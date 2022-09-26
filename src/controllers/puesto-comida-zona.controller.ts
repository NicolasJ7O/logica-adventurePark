import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PuestoComida,
  Zona,
} from '../models';
import {PuestoComidaRepository} from '../repositories';

export class PuestoComidaZonaController {
  constructor(
    @repository(PuestoComidaRepository)
    public puestoComidaRepository: PuestoComidaRepository,
  ) { }

  @get('/puesto-comidas/{id}/zona', {
    responses: {
      '200': {
        description: 'Zona belonging to PuestoComida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async getZona(
    @param.path.number('id') id: typeof PuestoComida.prototype.id,
  ): Promise<Zona> {
    return this.puestoComidaRepository.zona(id);
  }
}
