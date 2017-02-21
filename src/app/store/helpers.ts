import { Action } from 'redux';
import { 
  TypedRecord,
  makeTypedFactory 
} from 'typed-immutable-record';

export const recordify = (obj_dict: any, factory: any) => {
  return Object.keys(obj_dict)
    .reduce((acc, id: string) => {
      acc[id] = factory(obj_dict[id]);
      return acc;
    }, {});
};

export function removeByKey (myObj, deleteKey) {
  return Object.keys(myObj)
    .filter(key => key != deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
  }, {});
}

export interface IPayloadAction extends Action {
  payload?: any;
}

