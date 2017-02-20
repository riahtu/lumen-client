
import {EditFolderComponent} from './edit-folder/edit-folder.component';
import {EditStreamComponent} from './edit-stream/edit-stream.component';
import {MessagesComponent} from './messages/messages.component';
import {EditDbComponent} from './edit-db/edit-db.component';
import {EditNilmComponent} from './edit-nilm/edit-nilm.component';
import {EditPermissionsComponent} from './edit-permissions/edit-permissions.component';
import {SessionComponent} from './session/session.component';
import {PermissionComponent} from './permission/permission.component';
// export here for object imports
export {
EditFolderComponent,
EditStreamComponent,
EditDbComponent,
EditPermissionsComponent,
EditNilmComponent,
PermissionComponent,
MessagesComponent,
SessionComponent
};

// export here for injecting the dependencies (e.g. at bootstrap)
export default [
  EditDbComponent,
  EditFolderComponent,
  EditStreamComponent,
  SessionComponent
];
