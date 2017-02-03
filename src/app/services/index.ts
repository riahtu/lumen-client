
import {
  DbAdminService,
  DbAdminSelectors,
} from './db-admin';

import {
  InstallationsService,
  InstallationsSelectors
} from './installations'

import {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService
} from './api';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, 
   DbStreamService, DbAdminService, DbAdminSelectors,
   InstallationsService, InstallationsSelectors];
export { NilmService, DbFolderService, DbStreamService, 
  DbAdminService, DbAdminSelectors,
  InstallationsService, InstallationsSelectors };
