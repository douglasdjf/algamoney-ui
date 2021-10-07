import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { RouterModule, Routes } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { DatePipe } from '@angular/common';

const routes:Routes =[
  {path: 'lancamentos', component: LancamentosPesquisaComponent},
  {path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  {path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
  { path: 'pessoas', component: PessoasPesquisaComponent },
  {path: 'pessoas/novo', component:PessoaCadastroComponent}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
