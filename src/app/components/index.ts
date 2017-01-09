
import {EditFolderComponent} from './edit-folder/edit-folder.component';
import {EditStreamComponent} from './edit-stream/edit-stream.component';

// export here for object imports
export {
EditFolderComponent,
EditStreamComponent
};

// export here for injecting the dependencies (e.g. at bootstrap)
export default [
  EditFolderComponent,
  EditStreamComponent
];
