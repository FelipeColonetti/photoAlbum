import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  id: string;
  isAddMode: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }
}