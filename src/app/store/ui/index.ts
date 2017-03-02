export {reducer} from './reducer';
import {IUIRecord} from './types';
import {StatusMessagesFactory } from './initial-state';
export * from './types';
export * from './actions';


export interface IState extends IUIRecord{};

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