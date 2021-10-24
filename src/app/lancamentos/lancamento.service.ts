import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao?: string
  dataVencimentoInicio?: Date
  dataVencimentoFim?: Date
  pagina: number = 0
  itensPorPagina: number = 5
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl:string;

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { 

                this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
              }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
      
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

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params });
  }

  excluir(codigo: number): Observable<void> {
    const headers = new HttpHeaders()

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento);
  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {  
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento);
  }

  buscarPorCodigo(codigo: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`);
  }


   converterStringsParaDatas(lancamentos: Lancamento[]) {
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
