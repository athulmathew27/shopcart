import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { AuthModule } from '../auth/auth.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  showManageUser : boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService : AuthService,
              private fireAuth : AngularFireAuth,
              private router : Router) {}

  onLogout(){
      this.fireAuth.signOut().then(()=>{
          localStorage.removeItem('user')
          window.location.reload();
          this.router.navigate(['/auth/login'])
        }
      );
  }

  onManageUser(){
    this.showManageUser = !this.showManageUser;
  }
}
