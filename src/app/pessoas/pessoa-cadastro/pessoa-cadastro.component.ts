import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { IPessoa } from 'src/app/core/intrefaces';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
              private messageService: MessageService,
              private router:Router,
              private title:Title,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa)
    }
  }

  carregarPessoa(codigo: number){
    this.pessoaService.buscarPeloCodigo(codigo)
        .subscribe(
          pessoa =>{
            this.pessoa = pessoa;
            this.atualizarTituloEdicao();
          },
          erro => this.errorHandlerService.handle(erro)
        );

  }


  cepIsNotZero(){
    if(this.cep === "00000-000" || this.cep === "     -   ") {
      return false;
    }
    return true;
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  salvar(pessoaForm: NgForm){
    if (this.editando) {
      this.atualizarPessoa(pessoaForm);
    } else {
      this.adicionarPessoa(pessoaForm);
    }

  }

  atualizarPessoa(pessoaForm: NgForm){
    this.pessoaService.atualizar(this.pessoa)
    .subscribe(
      (pessoaAtualizado) => {
        this.pessoa = pessoaAtualizado;
        this.atualizarTituloEdicao();
        this.messageService.add({ severity: 'success', detail: 'Pessoa alterado com sucesso!' });
      },
      erro => this.errorHandlerService.handle(erro)
    )

  }

  adicionarPessoa(pessoaForm: NgForm){
    this.pessoaService.adicionar(this.pessoa)
    .subscribe(
        (pessoaAdicionada) =>{
            this.messageService.add({severity:'success',detail: 'Pessoa cadastrada com sucesso!'});
           // pessoaForm.reset();
           // this.pessoa = new Pessoa();
           this.router.navigate(['/pessoas',pessoaAdicionada.codigo])
        },
        erro => this.errorHandlerService.handle(erro)

    );
  }

  novo(pessoaForm: NgForm){
    pessoaForm.reset(new Pessoa())
    this.router.navigate(['/pessoas/novo'])
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.pessoa.nome}`);
  }

}
