import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials!: FormGroup;
  showPassword = false;
  departments = [
    {
      id: 1,
      name: 'Departamento 1',
    },
    {
      id: 2,
      name: 'Departamento 2',
    },
    {
      id: 3,
      name: 'Departamento 3',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private departmentsService: DepartmentsService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        departments_id: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.matchingPasswords('password', 'confirmPassword'),
      }
    );
    this.getDepartments();
  }

  async getDepartments() {
    const dataObservable = await this.departmentsService.getDepartments();
    from(dataObservable).subscribe((data: any) => {
      if (data) {
        this.departments = data;
      }
    });
  }

  async onSubmit() {
    const loading = await this.loadingController.create();
    await loading.present();
    const registerCredentials = {
      name: this.credentials.value.name,
      email: this.credentials.value.email,
      departments_id: this.credentials.value.departments_id,
      password: this.credentials.value.password,
    };
    this.authService.register(registerCredentials).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Cadastro falhou',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      },
    });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ mismatchedPasswords: true });
      }
    };
  }
}
