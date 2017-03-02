


import {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService,
  SessionService,
  PermissionService,
  UserGroupService,
  UserService
} from './api';

import {
  MessageService
} from './message.service';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, MessageService,
    DbStreamService, SessionService,
    PermissionService, UserGroupService, UserService];
export {
  NilmService, DbService, DbFolderService, DbStreamService, SessionService,
  MessageService, PermissionService, UserGroupService, UserService
};
