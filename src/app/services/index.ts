


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
  AnnotationService
} from './api';

import {
  MessageService
} from './message.service';

export const SERVICE_PROVIDERS =
  [NilmService, DbFolderService, MessageService, DataViewService,
    DbStreamService, SessionService,DataService, ColorService,
    PermissionService, UserGroupService, UserService, DbElementService,
    AnnotationService];
export {
  NilmService, DbFolderService, DbStreamService, SessionService,
  DataService, MessageService, PermissionService, UserGroupService, UserService,
  ColorService, DbElementService, DataViewService, AnnotationService
};
