
import {
  DbAdminService,
  DbAdminSelectors,
} from './db-admin';

import {
  NilmService,
  DbService,
  DbFolderService
} from './api';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, DbAdminService, DbAdminSelectors,];
export { NilmService, DbFolderService, DbAdminService, DbAdminSelectors };
