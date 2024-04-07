import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UrgencyLevelService {
  constructor(private apiService: ApiService) {}

  async getUrgencyLevels() {
    return this.apiService.get('/utils/urgency_level');
  }
}
