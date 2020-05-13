import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AddProfilePageComponent } from './add-profile-page/add-profile-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardCardPageComponent } from './dashboard-card-page/dashboard-card-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/service/auth.service';
import {SharedModule} from '../shared/shared.module';
import {UserService} from './shared/service/user.service';
import {AuthGuard} from './shared/service/auth.guard';
import {SearchPipeAuth} from './shared/search.pipe';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AddProfilePageComponent,
    EditProfilePageComponent,
    DashboardPageComponent,
    DashboardCardPageComponent,
    SearchPipeAuth

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'registration', component: RegistrationPageComponent},
          {path: 'addProfile', component: AddProfilePageComponent, canActivate: [AuthGuard]},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'editProfile/:id/edit', component: EditProfilePageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthService, UserService, AuthGuard]

})

export class AuthModule {

}
