import { NilmService } from './nilm.service';
import { DbFolderService } from './db-folder.service';
import {
  IStatusMessages,
} from '../../store/db-admin';

export function parseErrors(error): IStatusMessages {
  var msgs: IStatusMessages = {
    errors: [],
    warnings: [],
    notices: []
  };


  if (error.status == 0) {
    msgs.errors = ['cannot contact server']
  } else if (error.status == 422) {
    let json = error.json()
    msgs.errors = json.errors;
    msgs.warnings = json.warnings;
  } else {
    msgs.errors = [`server error: ${error.status}`]
  }
  return msgs
}

export {
  NilmService,
  DbFolderService
}