
import {
  DbAdminService,
  DbAdminSelectors,
} from './db-admin';

import {
  NilmService,
  DbFolderService
} from './api';

export const SERVICE_PROVIDERS =
  [NilmService, DbFolderService, DbAdminService, DbAdminSelectors,];
export { NilmService, DbFolderService, DbAdminService, DbAdminSelectors };
