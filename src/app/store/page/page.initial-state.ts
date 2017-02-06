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

export function createMessage(content: string[], type: string){
  let msgs = StatusMessagesFactory();
  switch(type){
    case "notice":
      return msgs.set('notices',content);
    case "warning":
      return msgs.set('warnings',content);
    case "error":
      return msgs.set('errors',content);
    default:
      console.log("error, unknown message type ",type);
      return msgs;
  }
}

// ---- Page ----
export const PageFactory =
  makeTypedFactory<IPage, IPageRecord>({
    messages: StatusMessagesFactory(),
  });


export const INITIAL_STATE = PageFactory();
