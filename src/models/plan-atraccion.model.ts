import {Entity, model, property} from '@loopback/repository';

@model()
export class PlanAtraccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<PlanAtraccion>) {
    super(data);
  }
}

export interface PlanAtraccionRelations {
  // describe navigational properties here
}

export type PlanAtraccionWithRelations = PlanAtraccion & PlanAtraccionRelations;
