import { TimestampModel, TimestampAttrs } from '../services/data'

export interface FormAttrs extends TimestampAttrs {
  name: string;
}

export class Form extends TimestampModel {
  name: string;

  constructor(data: FormAttrs) {
    super(data);

    this.name = data.name;
  }
}
