import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterOperator } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiResponse, Lancamento, LancamentoFiltro } from '../core/intrefaces';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Observable<ApiResponse<Lancamento>> {
  
    const headers = new HttpHeaders()
          .append('Authorization' , 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

      let params = new HttpParams()
          .set('page', filtro.pagina.toString())
          .set('size', filtro.itensPorPagina.toString());

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio,'yyyy-MM-dd')!);
    }

    if(filtro.dataVencimentoFim){
      params = params.set('dataVencimentoAte',this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

      return this.http.get<ApiResponse<Lancamento>>(`${this.lancamentoUrl}?resumo`, { headers, params });
   
  }

  excluir(codigo:number): Observable<void>{
      const headers = new HttpHeaders()
            .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

      return this.http.delete<void>(`${this.lancamentoUrl}/${codigo}`,{headers});
  }
}
