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
  Usuario,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaUsuarioController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Reserva.prototype.id,
  ): Promise<Usuario> {
    return this.reservaRepository.usuario(id);
  }
}
