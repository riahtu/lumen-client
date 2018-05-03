import { TypedRecord } from 'typed-immutable-record';

export interface IState {
  displayed: number[],
  selected: number;
}
export interface IStateRecord extends
  TypedRecord<IStateRecord>, IState { };