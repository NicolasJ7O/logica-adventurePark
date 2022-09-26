import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Parque} from './parque.model';
import {PuestoComida} from './puesto-comida.model';

@model()
export class Zona extends Entity {
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
  })
  color?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Parque)
  parqueId: number;

  @hasMany(() => PuestoComida)
  puestoComidas: PuestoComida[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
