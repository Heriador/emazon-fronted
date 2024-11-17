import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplyRequest } from 'src/app/shared/interfaces/supply.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly apiUrl = environment.transaction_service_url+"/supply";

  constructor(
    private readonly http: HttpClient
  ) { }

  addSupplyTransaction(suppltRequest: SupplyRequest): Observable<HttpResponse<SupplyRequest>>{
    return this.http.post<SupplyRequest>(`${this.apiUrl}/add-supply`,suppltRequest,
      {
        observe: 'response'
      }
    );
  }
}
