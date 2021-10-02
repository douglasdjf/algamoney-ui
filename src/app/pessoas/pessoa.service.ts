import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Pessoa, PessoaFiltro } from '../core/intrefaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http:HttpClient,
              private datePipe:DatePipe) { }

  pesquisar(filtro: PessoaFiltro): Observable<ApiResponse<Pessoa>>{

      const headers = new HttpHeaders()
                .append('Authorization' , 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

      let params = new HttpParams()
                .set('page', filtro.pagina.toString())
                .set('size', filtro.itensPorPagina.toString());
      
      if(filtro.nome){
        params = params.set('nome', filtro.nome);
      }

    
    return this.http.get<ApiResponse<Pessoa>>(`${this.pessoaUrl}`,{headers,params});
    
  }

  excluir(codigo:number): Observable<void>{
    const headers = new HttpHeaders()
         .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

          return this.http.delete<void>(`${this.pessoaUrl}/${codigo}`,{headers});
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers });
  }
}
