import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'send-request', loadChildren: './send-request/send-request.module#SendRequestPageModule', canActivate: [AuthGuardService] },
  { path: 'invitations', loadChildren: './invitations/invitations.module#InvitationsPageModule', canActivate: [AuthGuardService] },
  { path: 'user-profile', loadChildren: './shared/dialogs/user-profile/user-profile.module#UserProfilePageModule',
    canActivate: [ AuthGuardService ] },
  { path: 'my-connections', loadChildren: './pages/my-connections/my-connections.module#MyConnectionsPageModule',
    canActivate: [ AuthGuardService ] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuardService] },
  { path: 'location-shared', loadChildren: './shared/dialogs/location-shared/location-shared.module#LocationSharedPageModule',
    canActivate: [AuthGuardService] },
  { path: 'footer', loadChildren: './shared/components/footer/footer.module#FooterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    canActivate: [ AuthGuardService ] },
  { path: 'user-board', loadChildren: './pages/user-board/user-board.module#UserBoardPageModule',
    canActivate: [ AuthGuardService ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
