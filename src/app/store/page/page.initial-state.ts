import {
  IPage,
  IPageRecord,
  IStatusMessages,
  IStatusMessagesRecord
} from './page.types';

import { makeTypedFactory } from 'typed-immutable-record';

// --- Status Messages ---
export const StatusMessagesFactory =
  makeTypedFactory<IStatusMessages, IStatusMessagesRecord>({
    notices: [],
    errors: [],
    warnings: []
  });


// ---- Page ----
export const PageFactory =
  makeTypedFactory<IPage, IPageRecord>({
    messages: StatusMessagesFactory(),
  });


export const INITIAL_STATE = PageFactory();
