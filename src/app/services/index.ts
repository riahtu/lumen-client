
import {
  DbAdminService,
  DbAdminSelectors,
} from './db-admin';

import {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService,
  SessionService
} from './api';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, 
   DbStreamService, DbAdminService, DbAdminSelectors, SessionService];
export { NilmService, DbFolderService, DbStreamService, SessionService,
  DbAdminService, DbAdminSelectors};
