import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { InvoiceRaw, BudgetCatDDRaw } from '../models/invoice-raw';
import { EncumbranceRaw } from '../models/encumbrance-raw';
import { ProjectBalanceRaw } from '../models/project-balance-raw';



@Injectable({
  providedIn: 'root'
})
export class EditFinInvoicePageService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  getEncumbranceByProjectId(prjId: string): Observable<EncumbranceRaw[]> {
    console.info('getEncumbranceByPid(pid: string)');
    return this.http.get<EncumbranceRaw[]>(`${this.apiUrl}/Invoice/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.encumbranceforinvoice+json' } });
  }

  getProjectBalancesByProjectId(prjId: string): Observable<ProjectBalanceRaw> {
    console.info('getProjectBalancesByProjectId(prjId: string)');
    return this.http.get<ProjectBalanceRaw>(`${this.apiUrl}/Invoice/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.balanceforproject+json' } });
  }

  getInvoicesByProjectId(prjId: string): Observable<InvoiceRaw[]> {
    console.info('getInvoicesByProjectId(prjId: string)');
    return this.http.get<InvoiceRaw[]>(`${this.apiUrl}/Invoice/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.invoicesforproject+json' } });
  }

  getBudgetCategoriesByProjectId(prjId: string): Observable<BudgetCatDDRaw[]> {
    console.info('getBudgetCategoriesByProjectId(prjId: string)');
    return this.http.get<BudgetCatDDRaw[]>(`${this.apiUrl}/Invoice/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.budgetcatsforproject+json' } });
  }

  addInvoice(invoice: InvoiceRaw): Observable<InvoiceRaw> {
    console.info('addInvoice');
    return this.http.post<InvoiceRaw>(`${this.apiUrl}/Invoice`, invoice
      , {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.dot.arms.invoice+json',
          'Content-Type': 'application/vnd.dot.arms.invoiceforcreate+json'
        })
      }
    );
  }

  updateInvoice(invoice: InvoiceRaw): Observable<InvoiceRaw> {
    console.info('updateInvoice Service', invoice);
    return this.http.patch<InvoiceRaw>(`${this.apiUrl}/Invoice/${invoice.invoiceId}`, invoice, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.invoice+json',
        'Content-Type': 'application/vnd.dot.arms.invoiceforupdate+json'
      })
    });
  }
}
