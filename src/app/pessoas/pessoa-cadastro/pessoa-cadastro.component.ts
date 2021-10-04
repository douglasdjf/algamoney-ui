import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { IPessoa } from 'src/app/core/intrefaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cep:any;
  pessoa: IPessoa = new Pessoa();

  constructor(private errorHandlerService:ErrorHandlerService,
              private pessoaService: PessoaService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }


  cepIsNotZero(){
    if(this.cep === "00000-000" || this.cep === "     -   ") {
      return false;
    }
    return true;
  }

  salvar(pessoaForm: NgForm){
      this.pessoaService.adicionar(this.pessoa)
          .subscribe(
              () =>{
                  this.messageService.add({severity:'success',detail: 'Pessoa cadastrada com sucesso!'});
                  pessoaForm.reset();
                  this.pessoa = new Pessoa();
              },
              erro => this.errorHandlerService.handle(erro)

          );

  }

}
