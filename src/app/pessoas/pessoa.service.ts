import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IPessoa, IPessoaFiltro } from '../core/intrefaces';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http:HttpClient,
              private datePipe:DatePipe) { }

  pesquisar(filtro: IPessoaFiltro): Observable<IApiResponse<IPessoa>>{

      const headers = new HttpHeaders()
                .append('Authorization' , 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

      let params = new HttpParams()
                .set('page', filtro.pagina.toString())
                .set('size', filtro.itensPorPagina.toString());
      
      if(filtro.nome){
        params = params.set('nome', filtro.nome);
      }

    
    return this.http.get<IApiResponse<IPessoa>>(`${this.pessoaUrl}`,{headers,params});
    
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

  listarTodas(): Observable<IApiResponse<IPessoa>>{
    const headers = new HttpHeaders()
          .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.http.get<IApiResponse<IPessoa>>(`${this.pessoaUrl}`,{headers});

  }

  adicionar(pessoa: IPessoa): Observable<IPessoa>{
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return this.http.post<IPessoa>(this.pessoaUrl,pessoa,{headers});

  }

  atualizar(pessoa: IPessoa): Observable<IPessoa>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

  return this.http.put<IPessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa, { headers });
  }

  buscarPeloCodigo(codigo: number): Observable<IPessoa>{
    const headers = new HttpHeaders()
          .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
          .append('Content-Type', 'application/json');

          return this.http.get<IPessoa>(`${this.pessoaUrl}/${codigo}`,{headers});
  }
}
