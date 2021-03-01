import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService } from '@photoAlbum/services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() id: string;
  @Input() isAddMode: boolean;
  @Input() isRegisterLoginMode: boolean;
  @Input() loading = false;
  @Input() submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    this.createForm();

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.f.firstName.setValue(x.firstName);
          this.f.lastName.setValue(x.lastName);
          this.f.username.setValue(x.username);
        });
    }
  }

  public createForm() {
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators]
    });
  }

  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;

    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode || this.isRegisterLoginMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Usuário cadastrado com sucesso');
          if (this.isRegisterLoginMode) {
            this.router.navigate(['../login'], { relativeTo: this.route });
          } else {
            this.router.navigate(['.', { relativeTo: this.route }]);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  private updateUser() {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Atualizado com sucesso!');
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}