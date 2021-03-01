import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from '@photoAlbum/components';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent }
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
    ListComponent,
    AddEditComponent
  ],
  exports: [RouterModule]
})
export class UsersModule { }