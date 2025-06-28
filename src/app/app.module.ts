import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleService } from './components/services/role.service';
import { ShowContentDirective } from './directives/show-content.directive';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowContentDirective,
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    NavbarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    RoleService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (roleService: RoleService) => () => roleService.loadUserAndContent(),
      deps: [RoleService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
      