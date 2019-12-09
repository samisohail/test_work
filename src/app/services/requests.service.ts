import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IAddRequest } from '../models/requests/add-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  sendAddRequest(request: IAddRequest): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/api/request/send`, request);
  }
  // people want to add me
  getMyInvitations() {
    return this.http.get(`${this.API_BASE_URL}/api/request/invitations`);
  }

  getRequestById(id: string) {
    return this.http.get(`${this.API_BASE_URL}/api/request/${id}`);
  }

  getUsersSharedLocDetails(requestId: string) {
    return this.http.get(`${this.API_BASE_URL}/api/location/shared-loc-details/${requestId}`);
  }

  respond(id: number, response: boolean) {
    const data = { requestId: id, response: response };
    return this.http.post(`${this.API_BASE_URL}/api/request/respond`, data);
  }

  block(request: number) {
    return this.http.post(`${this.API_BASE_URL}/api/request/block`, {requestId: request});
  }

  remove(id: number) {
    return this.http.post(`${this.API_BASE_URL}/api/request/remove`, { connectionId: id});
  }

}
