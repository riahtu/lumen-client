
import * as nilm from './nilm.types';
import { makeTypedFactory } from 'typed-immutable-record';

export const NilmFactory = makeTypedFactory<nilm.INilm, nilm.INilmRecord>({
  id: 0,
  name: '',
  description: '',
  db: 0
});
