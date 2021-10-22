import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoria } from '../core/intrefaces';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl:string;

  constructor(private http: HttpClient) { 
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Observable<ICategoria[]> {
         return this.http.get<ICategoria[]>(this.categoriasUrl); 
  }

}
