import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PreferencesComponent } from '../list/preferences.component';
import { PreferencesDetailComponent } from '../detail/preferences-detail.component';
import { PreferencesRoutingResolveService } from './preferences-routing-resolve.service';

const preferencesRoute: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PreferencesDetailComponent,
    resolve: {
      preferences: PreferencesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(preferencesRoute)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
