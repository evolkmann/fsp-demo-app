import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AuthPipe, loggedIn } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const NEXT_URL_PARAM = 'next';

export const redirectUnauthorizedToLogin: (redirect: ActivatedRouteSnapshot) => AuthPipe =
  (redirect) => pipe(
    loggedIn,
    map(loggedIn => {
      if (loggedIn) {
        return true;
      }

      const url = (redirect as any)?._routerState?.url || '/';
      const next = encodeURIComponent(url);
      return `/auth/login?${NEXT_URL_PARAM}=${next}`;
    })
  );

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'clinics',
    loadChildren: () => import('./clinics/clinics.module').then(m => m.ClinicsModule),
    canActivate: [
      AngularFireAuthGuard
    ],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'clinics'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
