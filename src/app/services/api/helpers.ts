
import {
  IStatusMessages,
} from '../../store/ui';



export function parseDeviseErrors(error): string[] {
  if (error.status == 0) {
    return ['cannot contact server'];
  } 
  try{
    let errors = error.json().errors;
    if(errors === undefined){
      throw new TypeError("no errors property")
    }
    //check if there are descriptive messages
    if(!(errors.full_messages === undefined)){
      errors = errors.full_messages;
    }
    return errors
  } catch(e) {
    return [`server error: ${error.status}`]
  } 
}



