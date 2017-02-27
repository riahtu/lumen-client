
import {AccountNilmsComponent} from './nilms/nilms.component';
import {AccountGroupsComponent} from './groups/groups.component';

// export here for object imports
export {
AccountNilmsComponent,
AccountGroupsComponent
};

// export here for injecting the dependencies (e.g. at bootstrap)
export default [
  AccountNilmsComponent, AccountGroupsComponent
];