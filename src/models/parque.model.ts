import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {Ciudad} from './ciudad.model';
import {Zona} from './zona.model';

@model()
export class Parque extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'number',
    required: true,
  })
  numVisitantes: number;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'string',
  })
  mapa?: string;

  @property({
    type: 'string',
  })
  eslogan?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Plan)
  planId: number;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Zona)
  zonas: Zona[];

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
