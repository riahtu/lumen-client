import {NilmService} from './nilm.service';
import {DbFolderService} from './db-folder.service';
import {
  DbAdminService,
  DbAdminSelectors, } from './db-admin';

export const SERVICE_PROVIDERS =
  [NilmService, DbFolderService, DbAdminService, DbAdminSelectors, ];
export {NilmService, DbFolderService, DbAdminService, DbAdminSelectors};
