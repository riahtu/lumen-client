
import {MessagesComponent} from './messages/messages.component';
import {SessionComponent} from './session/session.component';
// export here for object imports
export {
MessagesComponent,
SessionComponent
};

// export here for injecting the dependencies (e.g. at bootstrap)
export default [
  SessionComponent
];
