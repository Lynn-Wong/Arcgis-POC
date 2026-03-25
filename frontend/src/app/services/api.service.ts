import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserListResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  getUsers(page: number = 1, pageSize: number = 10, search: string = '', status: string = ''): Observable<UserListResponse> {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    return this.http.get<UserListResponse>(`${this.baseUrl}/users?${params}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  deleteUser(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/users/${id}`);
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/charts`);
  }
}