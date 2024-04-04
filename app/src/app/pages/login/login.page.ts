import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    const loginCredentials = {
      email: this.credentials.value.email,
      password: this.credentials.value.password,
    };
    this.authService.login(loginCredentials).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login falhou',
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

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
