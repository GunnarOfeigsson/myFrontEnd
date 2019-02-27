import { Injectable } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  constructor(private router: Router) {
 //clear alert message on route change
 router.events.subscribe (event => {
   if (event instanceof NavigationStart) {
     if (this.keepAfterNavigationChange) {
       //only keep for a single location change
       this.keepAfterNavigationChange = false;
     } else {
       //clear alert
       this.subject.next();
     }
   }
 });
}

public success(message: string, keepAfterNavigationChange = false): void {
  this.keepAfterNavigationChange = keepAfterNavigationChange;
this.subject.next({type: 'success', text: message });
}
public error(message: string, keepAfterNavigationChange = false): void {
  this.keepAfterNavigationChange = keepAfterNavigationChange;
this.subject.next ({type: 'error', text: message});
}
getMessage(): Observable<any> {
  return this.subject.asObservable();
}
}
