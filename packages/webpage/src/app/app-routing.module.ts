import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AuthPipe, loggedIn } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const NEXT_URL_PARAM = 'next';

/**
 * https://stackoverflow.com/a/53429547
 */
function getResolvedUrl(route: ActivatedRouteSnapshot): string {
  let path = route.pathFromRoot
    .map(v => v.url.map(segment => segment.toString()).join('/'))
    .join('/');

  if (Object.keys(route.queryParamMap).length) {
    path += '?';
  }
  for (const key in route.queryParams) {
    path += `${key}=${route.queryParams[key]}&`;
  }

  return path;
}

export const redirectUnauthorizedToLogin: (redirect: ActivatedRouteSnapshot) => AuthPipe =
  (redirect) => pipe(
    loggedIn,
    map(loggedIn => {
      if (loggedIn) {
        return true;
      }

      const next = encodeURIComponent(getResolvedUrl(redirect));
      return `/auth/login?${NEXT_URL_PARAM}=${next}`;
    })
  );

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'secure',
    loadChildren: () => import('./secure-demo/secure-demo.module').then(m => m.SecureDemoModule),
    canActivate: [
      AngularFireAuthGuard
    ],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
