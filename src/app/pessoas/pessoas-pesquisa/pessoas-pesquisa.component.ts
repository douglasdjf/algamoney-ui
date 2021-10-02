import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
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

  @ViewChild('tabela') grid:any;

  constructor(private pessoaService: PessoaService,
              private messageService:MessageService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService){}
  ngOnInit(): void {
   
  }

  pesquisar(pagina: number = 0): void{
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
        .subscribe(

          (dados) =>{
            this.pessoas = dados.content
            this.totalRegistros = dados.totalElements
          },
          (erro) => {this.errorHandler.handle(erro)}
        )
    
  }

  aoMudarPagina(event:LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: Pessoa):void{
      this.confirmationService.confirm({
        message : 'Tem certeza que deseja excluir?',
        accept:()=>{
          this.excluir(pessoa);
        }
      });
  }

  excluir(pessoa: Pessoa){
    console.log("pessoa" + pessoa.codigo);
    this.pessoaService.excluir(pessoa.codigo)
          .subscribe(
            () =>{
              if(this.grid.first === 0){
                this.pesquisar();
              } else {
                this.grid.reset();
              }

              this.messageService.add({severity:'sucess', detail: 'Pessoa excluída com sucesso!'})
            },
            (erro) =>{this.errorHandler.handle(erro)}
          )
  }


}
