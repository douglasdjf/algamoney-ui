import {  FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { IPessoa } from 'src/app/core/intrefaces';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  formulario!: FormGroup;
  categorias: any[] = [];
  pessoas: any[] = []

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,    
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router:Router,
    private title:Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Novo Lançamento')
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento)
    }

    this.carregarCategorias()
    this.carregarPessoas()
  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ Validators.required, Validators.minLength(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')!.value);
  }
  
  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .subscribe(lancamento => {
        this.lancamentoService.converterStringsParaDatas([lancamento]);
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      },
      erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe(
      dados => {
        this.categorias = dados.map(dado => ({label: dado.nome, value: dado.codigo}))                  
      },
      erro => this.errorHandler.handle(erro)
    )
  }

  carregarPessoas() {
    this.pessoaService.listarTodas().subscribe(
      dados => {        
        this.pessoas = dados.content.map((dado: IPessoa) => ({label: dado.nome, value: dado.codigo}))     
      },      
      erro => this.errorHandler.handle(erro)
    )
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionarLancamento()
    }
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .subscribe(
        (lancamentoAtualizado) => {
          this.lancamentoService.converterStringsParaDatas([lancamentoAtualizado]);
          this.formulario.patchValue(lancamentoAtualizado);
          this.atualizarTituloEdicao();
          this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
        },
        erro => this.errorHandler.handle(erro)
      )
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .subscribe(
        (lancamentoAdicionado) => {
          this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
         this.router.navigate(['/lancamentos',lancamentoAdicionado.codigo])
        },
        erro => this.errorHandler.handle(erro)
      );    
  }
  
  novo(){
    this.formulario.reset(new Lancamento());
    this.router.navigate(['/lancamentos/novo']);
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')!.value}`);
  }

}