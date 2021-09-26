import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cep:any;

  constructor() { }

  ngOnInit(): void {
  }


  cepIsNotZero(){
    if(this.cep === "00000-000" || this.cep === "     -   ") {
      return false;
    }
    return true;
  }

}
