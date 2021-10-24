import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../core/model';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl:string;

  constructor(private http: HttpClient) { 
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Observable<Categoria[]> {
         return this.http.get<Categoria[]>(this.categoriasUrl); 
  }

}
