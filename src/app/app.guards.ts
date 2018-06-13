import {Injectable} from '@angular/core';
import {Router, 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot} from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot){
      if(localStorage.getItem('auth.uid')){
        return true; //logged in
      }
      //not logged in
      this.router.navigate(['session/sign_in'], 
        {queryParams: { returnUrl: state.url}});
      return false;
  }
}