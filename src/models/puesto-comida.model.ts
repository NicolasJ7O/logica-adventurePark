import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Zona} from './zona.model';

@model()
export class PuestoComida extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  menu?: string;

  @belongsTo(() => Zona)
  zonaId: number;

  constructor(data?: Partial<PuestoComida>) {
    super(data);
  }
}

export interface PuestoComidaRelations {
  // describe navigational properties here
}

export type PuestoComidaWithRelations = PuestoComida & PuestoComidaRelations;
