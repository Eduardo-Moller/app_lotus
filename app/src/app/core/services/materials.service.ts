import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  constructor(private apiService: ApiService) {}

  async getMaterials() {
    return this.apiService.get('/utils/materials');
  }
}
