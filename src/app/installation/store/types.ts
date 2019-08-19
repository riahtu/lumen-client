import { TypedRecord } from 'typed-immutable-record';

// ---- Installation ----
export interface IInstallation {
  selectedType?: string;
  selectedDbFolder?: number;
  selectedDbStream?: number;
  selectedDataApp?: number;
  nilm?: number;
  //rootFolderId?: number;
  refreshing?: boolean;
  busy?: boolean;
}

export interface IInstallationRecord extends
  TypedRecord<IInstallationRecord>, IInstallation { };
