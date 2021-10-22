import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse, IPessoa, IPessoaFiltro } from '../core/intrefaces';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl:string;

  constructor(private http:HttpClient,
              private datePipe:DatePipe) { 

                this.pessoaUrl = `${environment.apiUrl}/pessoas`;
              }

  pesquisar(filtro: IPessoaFiltro): Observable<IApiResponse<IPessoa>>{
      let params = new HttpParams()
                .set('page', filtro.pagina.toString())
                .set('size', filtro.itensPorPagina.toString());
      
      if(filtro.nome){
        params = params.set('nome', filtro.nome);
      }

    
    return this.http.get<IApiResponse<IPessoa>>(`${this.pessoaUrl}`,{params});
    
  }

  excluir(codigo:number): Observable<void>{
          return this.http.delete<void>(`${this.pessoaUrl}/${codigo}`);
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers });
  }

  listarTodas(): Observable<IApiResponse<IPessoa>>{
    return this.http.get<IApiResponse<IPessoa>>(`${this.pessoaUrl}`);
  }

  adicionar(pessoa: IPessoa): Observable<IPessoa>{
      return this.http.post<IPessoa>(this.pessoaUrl,pessoa);

  }

  atualizar(pessoa: IPessoa): Observable<IPessoa>{
      return this.http.put<IPessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa);
  }

  buscarPeloCodigo(codigo: number): Observable<IPessoa>{
    const headers = new HttpHeaders()
          .append('Content-Type', 'application/json');
          return this.http.get<IPessoa>(`${this.pessoaUrl}/${codigo}`,{headers});
  }
}
