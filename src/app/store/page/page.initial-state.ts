import {
  IPage,
  IPageRecord,
} from './page.types';

import {
  StatusMessagesFactory
} from '../helpers';

import { makeTypedFactory } from 'typed-immutable-record';


// ---- Page ----
export const PageFactory =
  makeTypedFactory<IPage, IPageRecord>({
    messages: StatusMessagesFactory(),
  });


export const INITIAL_STATE = PageFactory();
