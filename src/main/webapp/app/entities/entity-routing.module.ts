import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'points',
        data: { pageTitle: 'twentyOnePointsApp.points.home.title' },
        loadChildren: () => import('./points/points.module').then(m => m.PointsModule),
      },
      {
        path: 'preferences',
        data: { pageTitle: 'twentyOnePointsApp.preferences.home.title' },
        loadChildren: () => import('./preferences/preferences.module').then(m => m.PreferencesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
