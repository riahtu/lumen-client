


import {
  NilmService,
  DbService,
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
  JouleModuleService
} from './api';

import {
  MessageService
} from './message.service';

export const SERVICE_PROVIDERS =
  [NilmService, DbService, DbFolderService, MessageService, DataViewService,
    DbStreamService, SessionService,DataService, ColorService, JouleModuleService,
    PermissionService, UserGroupService, UserService, DbElementService];
export {
  NilmService, DbService, DbFolderService, DbStreamService, SessionService,
  DataService, MessageService, PermissionService, UserGroupService, UserService,
  ColorService, DbElementService, DataViewService, JouleModuleService
};
