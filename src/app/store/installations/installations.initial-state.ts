import {
  IInstallations,
  IInstallationsRecord,
} from './installations.types';

import {
  StatusMessagesFactory
} from '../helpers';

import { makeTypedFactory } from 'typed-immutable-record';


// ---- Installations ----
export const InstallationsFactory =
  makeTypedFactory<IInstallations, IInstallationsRecord>({
    pageMessages: StatusMessagesFactory(),
  });


export const INITIAL_STATE = InstallationsFactory();
