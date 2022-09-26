import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Visitante} from './visitante.model';
import {Usuario} from './usuario.model';
import {Plan} from './plan.model';
import {Compra} from './compra.model';

@model()
export class Reserva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadEntradas: number;

  @belongsTo(() => Visitante)
  visitanteId: number;

  @belongsTo(() => Usuario)
  usuarioId: number;

  @belongsTo(() => Plan)
  planId: number;

  @hasOne(() => Compra)
  compra: Compra;

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
