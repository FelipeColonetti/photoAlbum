import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@photoAlbum/guards';
import { NavigationComponent } from './core/components';

const accountModule = () => import('./core/components/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./modules/users/users.module').then(x => x.UsersModule);
const photosModule = () => import('./modules/photos/photos.module').then(x => x.PhotosModule);

const routes: Routes = [
  {
    path: '', component: NavigationComponent, canActivate: [AuthGuard],
    children: [
      { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
      { path: 'photos', loadChildren: photosModule, canActivate: [AuthGuard] }
    ]
  },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
