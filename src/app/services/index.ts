


import {
  NilmService,
  DbFolderService,
  DbStreamService,
  DataService,
  DataViewService,
  SessionService,
  PermissionService,
  UserGroupService,
  UserService,
  ColorService,
  DbElementService,
} from './api';

import {
  MessageService
} from './message.service';

export const SERVICE_PROVIDERS =
  [NilmService, DbFolderService, MessageService, DataViewService,
    DbStreamService, SessionService,DataService, ColorService,
    PermissionService, UserGroupService, UserService, DbElementService];
export {
  NilmService, DbFolderService, DbStreamService, SessionService,
  DataService, MessageService, PermissionService, UserGroupService, UserService,
  ColorService, DbElementService, DataViewService
};
