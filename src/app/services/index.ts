import {NilmService} from './nilm.service';
import {
  DbAdminService,
  DbAdminSelectors, } from './db-admin';

export const SERVICE_PROVIDERS =
  [NilmService, DbAdminService, DbAdminSelectors];
export {NilmService, DbAdminService, DbAdminSelectors};
