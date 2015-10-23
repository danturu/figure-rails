import { Record }         from 'immutable'
import { TimestampAttrs } from '../services/data'

export interface FormAttrs extends TimestampAttrs {
  name: string;
}

export const FormRecord = Record<FormAttrs>({
  id:        null,
  createdAt: null,
  updatedAt: null,
  name:      null,
})

export type Form = Record.Generic<FormAttrs>;
