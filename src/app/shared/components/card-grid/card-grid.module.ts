import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { MaterialModule } from "src/app/material.module";
import { CardGridComponent } from "./card-grid.component";


@NgModule({
  declarations: [ CardGridComponent ],
  exports: [ CardGridComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    NgxGalleryModule,
    MaterialModule
  ],
})
export class CardGridModule { }