import { NilmService } from './nilm.service';
import { DbFolderService } from './db-folder.service';
import { DbStreamService } from './db-stream.service';
import { DbService } from './db.service';
import {
  IStatusMessages,
} from '../../store';

export function parseErrors(error): IStatusMessages {
  if (error.status == 0) {
    return errorMessage('cannot contact server');
  } 
  try{
    let msgs = error.json().messages;
    if(msgs === undefined){
      throw new TypeError("no message property")
    }
    return <IStatusMessages> msgs
  } catch(e) {
    return errorMessage(`server error: ${error.status}`)
  } 
}

export function errorMessage(msg:string):IStatusMessages{
  return {
    'notices': [],
    'warnings': [],
    'errors': [msg]
  }
}

export {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService
}