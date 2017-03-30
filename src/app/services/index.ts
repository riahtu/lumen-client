


import {
  NilmService,
  DbService,
  DbFolderService,
  DbStreamService,
  DataService,
  SessionService,
  PermissionService,
  UserGroupService,
  UserService,
  ColorService,
  DbElementService
} from './api';

import {
  MessageService
} from './message.service';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, MessageService,
    DbStreamService, SessionService,DataService, ColorService,
    PermissionService, UserGroupService, UserService, DbElementService];
export {
  NilmService, DbService, DbFolderService, DbStreamService, SessionService,
  DataService, MessageService, PermissionService, UserGroupService, UserService,
  ColorService, DbElementService
};
