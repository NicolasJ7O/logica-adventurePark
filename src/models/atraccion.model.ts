import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {PlanAtraccion} from './plan-atraccion.model';

@model()
export class Atraccion extends Entity {
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
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  estructura: string;

  @property({
    type: 'string',
    required: true,
  })
  enlace: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Plan, {through: {model: () => PlanAtraccion}})
  plans: Plan[];

  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
