import { TypedRecord } from 'typed-immutable-record';
import { IRange } from '../helpers';
export interface IState {
  enabled: boolean;
  selection_range?: IRange;
  selected_annotation?: number;
  annotated_streams: number[];
}

export interface IStateRecord extends
  TypedRecord<IStateRecord>, IState { };
