import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl:string;

  constructor(private http:HttpClient,
              private datePipe:DatePipe) { 

                this.pessoaUrl = `${environment.apiUrl}/pessoas`;
              }

  pesquisar(filtro: PessoaFiltro): Observable<any>{
      let params = new HttpParams()
                .set('page', filtro.pagina.toString())
                .set('size', filtro.itensPorPagina.toString());
      
      if(filtro.nome){
        params = params.set('nome', filtro.nome);
      }

    
    return this.http.get<any>(`${this.pessoaUrl}`,{params});
    
  }

  excluir(codigo:number): Observable<void>{
          return this.http.delete<void>(`${this.pessoaUrl}/${codigo}`);
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers });
  }

  listarTodas(): Observable<any>{
    return this.http.get<any>(`${this.pessoaUrl}`);
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa>{
      return this.http.post<Pessoa>(this.pessoaUrl,pessoa);

  }

  atualizar(pessoa: Pessoa): Observable<Pessoa>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
      return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa);
  }

  buscarPeloCodigo(codigo: number): Observable<Pessoa>{
    const headers = new HttpHeaders()
          return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`,{headers});
  }
}
