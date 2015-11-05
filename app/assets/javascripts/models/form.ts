import { Record }         from 'immutable'
import { TimestampAttrs } from '../services/data'

export interface FormAttrs extends TimestampAttrs {
  name: string;
}

export class Form extends Record<FormAttrs>({ id: null, name: null }) implements FormAttrs {
  id:        string;
  createdAt: string;
  updatedAt: string;
  name:      string;
}

