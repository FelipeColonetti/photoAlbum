import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { UserComponent } from "./user.component";


@NgModule({
  declarations: [ UserComponent ],
  exports: [ UserComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
})
export class UserModule { }