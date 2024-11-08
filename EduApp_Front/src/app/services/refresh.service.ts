import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private router: Router) { } 

  triggerRefresh() {
    // this.refreshSource.next();
    // this.router.navigate(['']);
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
