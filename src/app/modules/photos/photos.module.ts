import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CardGridModule } from '@photoAlbum/components';
import { FlexLayoutModule } from '@angular/flex-layout';


export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListComponent }
    ]
  }
];

@NgModule({
  declarations: [LayoutComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxGalleryModule,
    CardGridModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  exports: [RouterModule]
})
export class PhotosModule { }

