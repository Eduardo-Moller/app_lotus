import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private apiService: ApiService) {}

  async getDepartments() {
    return this.apiService.get('/utils/departments');
  }
}
