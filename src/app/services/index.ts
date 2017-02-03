
import {
  DbAdminService,
  DbAdminSelectors,
} from './db-admin';

import {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService
} from './api';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, 
   DbStreamService, DbAdminService, DbAdminSelectors];
export { NilmService, DbFolderService, DbStreamService, 
  DbAdminService, DbAdminSelectors};
