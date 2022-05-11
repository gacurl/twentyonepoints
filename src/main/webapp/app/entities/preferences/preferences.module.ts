import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PreferencesComponent } from './list/preferences.component';
import { PreferencesDetailComponent } from './detail/preferences-detail.component';
import { PreferencesRoutingModule } from './route/preferences-routing.module';

@NgModule({
  imports: [SharedModule, PreferencesRoutingModule],
  declarations: [PreferencesComponent, PreferencesDetailComponent],
})
export class PreferencesModule {}
