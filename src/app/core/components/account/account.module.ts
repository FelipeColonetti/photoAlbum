import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from '@photoAlbum/components';
import { MaterialModule } from '../../../material.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports:[RouterModule]
})
export class AccountModule { }