import { TypedRecord } from 'typed-immutable-record';

// ---- Explorer ----
export interface IExplorer {
  left_elements?: number[];
  right_elements?: number[];
  left_units?: string;
  right_units?: string;
}

export interface IExplorerRecord extends
  TypedRecord<IExplorerRecord>, IExplorer { };
