import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ApiResponse, Pessoa, PessoaFiltro } from 'src/app/core/intrefaces';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  filtro: PessoaFiltro ={
    pagina: 0,
    itensPorPagina: 5
  }

  totalRegistros: number = 0;
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService){}
  ngOnInit(): void {
   
  }

  pesquisar(pagina: number = 0): void{
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
        .subscribe((dados: ApiResponse<Pessoa>) =>{
            this.pessoas = dados.content
            this.totalRegistros = dados.totalElements
        })
    
  }

  aoMudarPagina(event:LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }


}
