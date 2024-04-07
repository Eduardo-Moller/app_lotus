import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesService {
  constructor(private apiService: ApiService) {}

  async getEnterprises() {
    return this.apiService.get('/utils/enterprises');
  }
}
