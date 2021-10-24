import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cep:any;
  formulario! :FormGroup;

  constructor(private errorHandlerService:ErrorHandlerService,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private router:Router,
              private title:Title,
              private route:ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa)
    }
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
        codigo: [],
        nome: [null, [Validators.required,Validators.minLength(5) ]],
        endereco: this.formBuilder.group({
          logradouro: [null,[Validators.required,Validators.minLength(5)]],
          numero: [null,Validators.required],
          complemento: [],
          bairro: [null,Validators.required],
          cep: [null,Validators.required],
          cidade: [null,Validators.required],
          estado: [null,Validators.required]
        }),
        ativo:[null]
    });
  }

  
  get editando() {
    return Boolean(this.formulario.get('codigo')!.value);
  }

  carregarPessoa(codigo: number){
    this.pessoaService.buscarPeloCodigo(codigo)
        .subscribe(
          pessoa =>{
            this.formulario.patchValue(pessoa);
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


  salvar(){
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }

  }

  atualizarPessoa(){
    this.pessoaService.atualizar(this.formulario.value)
    .subscribe(
      (pessoaAtualizado) => {
        this.formulario.patchValue(pessoaAtualizado)
        this.atualizarTituloEdicao();
        this.messageService.add({ severity: 'success', detail: 'Pessoa alterado com sucesso!' });
      },
      erro => this.errorHandlerService.handle(erro)
    )

  }

  adicionarPessoa(){
    this.pessoaService.adicionar(this.formulario.value)
    .subscribe(
        (pessoaAdicionada) =>{
            this.messageService.add({severity:'success',detail: 'Pessoa cadastrada com sucesso!'});
           this.router.navigate(['/pessoas',pessoaAdicionada.codigo])
        },
        erro => this.errorHandlerService.handle(erro)

    );
  }

  novo(){
    this.formulario.reset(new Pessoa())
    this.router.navigate(['/pessoas/novo'])
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('nome')!.value}`);
  }

}
