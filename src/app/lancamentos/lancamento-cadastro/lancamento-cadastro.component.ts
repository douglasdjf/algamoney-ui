import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

categorias: any[] = [];

pessoas = [
  { label:'João da Silva', value: 1 },
  { label:'Sebastião Souza', value: 2 },
  { label:'Maria Abadia', value: 3 }

];

  tipos = [
    { label:'Receita', value: 'RECEITA' },
    { label:'Despesa', value: 'DESPESA' },
  ];

  constructor(private categoriaService:CategoriaService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas().subscribe(
        categorias =>{
            this.categorias = categorias.map(dado =>{
              return {
                label: dado.nome,
                value: dado.codigo
              }
            })
        },
        erro =>{this.errorHandler.handle(erro)}
        )
    }

}
