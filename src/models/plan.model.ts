import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parque} from './parque.model';
import {Atraccion} from './atraccion.model';
import {PlanAtraccion} from './plan-atraccion.model';
import {Reserva} from './reserva.model';

@model()
export class Plan extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @hasMany(() => Parque)
  parques: Parque[];

  @hasMany(() => Atraccion, {through: {model: () => PlanAtraccion}})
  atraccions: Atraccion[];

  @hasMany(() => Reserva)
  reservas: Reserva[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
