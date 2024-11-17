import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplyRequest } from 'src/app/shared/interfaces/supply.interface';
import { environment } from '../../../environments/environment';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addSupplyTransaction', () => {
    it('should add supply transaction', () => {
      const mockResponse = {
       status: 201,
        statusText: 'Created',
      };

      const mockSupplyRequest: SupplyRequest = {
        itemId: 1,
        quantity: 1,
        nextSupplyDate: new Date()
      }

      service.addSupplyTransaction(mockSupplyRequest).subscribe(response => {
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('Created');
      })

      const req = httpMock.expectOne(`${environment.transaction_service_url}/supply/add-supply`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

  });

});
