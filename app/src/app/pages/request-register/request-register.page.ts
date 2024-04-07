import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { EnterprisesService } from 'src/app/core/services/enterprises.service';
import { MaterialsService } from 'src/app/core/services/materials.service';
import { UrgencyLevelService } from 'src/app/core/services/urgency-level.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RequestsService } from 'src/app/core/services/requests.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-request-register',
  templateUrl: './request-register.page.html',
  styleUrls: ['./request-register.page.scss'],
})
export class RequestRegisterPage implements OnInit {
  credentials!: FormGroup;
  enterprises: any[] = [];
  materials: any[] = [];
  urgencyLevels: any[] = [];
  quantityArray: any[] = [];
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enterprisesService: EnterprisesService,
    private materialsService: MaterialsService,
    private urgencyLevelService: UrgencyLevelService,
    private authService: AuthenticationService,
    private requestsService: RequestsService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      enterprise_id: ['', [Validators.required]],
      urgency_level_id: ['', [Validators.required]],
      requests_materials: [[], [Validators.required]],
    });
    this.load();
  }

  async navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  createInputQuantity() {
    for (let quantity of this.quantityArray) {
      this.credentials.removeControl(`quantity_${quantity.material_id}`);
    }
    this.quantityArray = [];

    for (let material of this.materials) {
      if (
        this.credentials.value.requests_materials.includes(
          material.id.toString()
        )
      ) {
        const controlName = `quantity_${material.id}`;
        this.credentials.addControl(
          controlName,
          this.fb.control('', Validators.required)
        );
        this.quantityArray.push({
          quantity: '',
          material_id: material.id,
          material: material.name,
        });
      }
    }
  }

  async onSubmit() {
    const data = {
      user_id: this.user.id,
      department_id: this.user.departments_id,
      enterprise_id: this.credentials.value.enterprise_id,
      status_id: 1,
      urgency_level_id: this.credentials.value.urgency_level_id,
      requests_materials: [] as { material_id: any; quantity: any }[],
    };

    for (
      let index = 0;
      index < this.credentials.value.requests_materials.length;
      index++
    ) {
      const material_id = this.credentials.value.requests_materials[index];
      const quantity = this.credentials.value[`quantity_${material_id}`];
      data.requests_materials.push({
        material_id: material_id,
        quantity: quantity,
      });
    }
    try {
      const dataObservablePost = await this.requestsService.createRequest(data);
      from(dataObservablePost).subscribe(async (data: any) => {
        if (data) {
          const toast = await this.toastController.create({
            message: 'Solicitação cadastrada com sucesso!',
            duration: 2000,
            position: 'top',
            color: 'success',
          });
          toast.present();
          for (let quantity of this.quantityArray) {
            this.credentials.removeControl(`quantity_${quantity.material_id}`);
          }
          this.quantityArray = [];
          this.credentials.reset();
        }
      });
    } catch (e) {
      const toast = await this.toastController.create({
        message:
          'Ocorreu um erro ao cadastrar a solicitação. Por favor, tente novamente mais tarde.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
    }
  }

  async load() {
    const dataObservableEnterprises =
      await this.enterprisesService.getEnterprises();
    from(dataObservableEnterprises).subscribe((data: any) => {
      if (data) {
        this.enterprises = data;
      }
    });
    const dataObservableMaterials = await this.materialsService.getMaterials();
    from(dataObservableMaterials).subscribe((data: any) => {
      if (data) {
        this.materials = data;
      }
    });
    const dataObservableUrgencyLevels =
      await this.urgencyLevelService.getUrgencyLevels();
    from(dataObservableUrgencyLevels).subscribe((data: any) => {
      if (data) {
        this.urgencyLevels = data;
      }
    });

    const user = await this.authService.getUser();
    if (user) this.user = user;
  }
}
