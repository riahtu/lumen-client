
import {
  DbAdminService,
  DbAdminSelectors,
} from './db-admin';

import {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService,
  SessionService,
  PermissionService
} from './api';

import {
  MessageService
} from './message.service';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, MessageService,
   DbStreamService, DbAdminService, DbAdminSelectors, SessionService,
   PermissionService];
export { NilmService, DbService, DbFolderService, DbStreamService, SessionService,
  DbAdminService, DbAdminSelectors, MessageService, PermissionService};
