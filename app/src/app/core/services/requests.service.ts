import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private apiService: ApiService) {}

  async getRequests() {
    return this.apiService.get('/request/requests');
  }

  async createRequest(request: any) {
    try {
      return this.apiService.post('/request/request', request);
    } catch (error) {
      throw error;
    }
  }
}
