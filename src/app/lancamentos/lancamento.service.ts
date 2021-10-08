import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  IApiResponse, ILancamento, ILancamentoFiltro } from '../core/intrefaces';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  pesquisar(filtro: ILancamentoFiltro): Observable<IApiResponse<ILancamento>> {
      
    let params = new HttpParams()
                      .set('page', filtro.pagina.toString())
                      .set('size', filtro.itensPorPagina.toString());
    

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }   
    
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get<IApiResponse<ILancamento>>(`${this.lancamentosUrl}?resumo`, { params });
  }

  excluir(codigo: number): Observable<void> {
    const headers = new HttpHeaders()

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

  adicionar(lancamento: ILancamento): Observable<ILancamento> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
  
    return this.http.post<ILancamento>(this.lancamentosUrl, lancamento, { headers });
  }

  atualizar(lancamento: ILancamento): Observable<ILancamento> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
  
    return this.http.put<ILancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers });
  }

  buscarPorCodigo(codigo: number): Observable<ILancamento> {
    return this.http.get<ILancamento>(`${this.lancamentosUrl}/${codigo}`);
  }


   converterStringsParaDatas(lancamentos: ILancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
