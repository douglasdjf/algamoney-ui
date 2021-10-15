import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private router: Router) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {

    this.auth.login(usuario, senha)
      .subscribe(
        (response: any) => {
          this.auth.armazenarToken(response.access_token)
          this.router.navigate(['lancamentos'])
        },
        (response) => {          
          let erro = response
          if (response.status === 400) {
            if (response.error.error === 'invalid_grant') {     
              erro = 'Usuário ou Senha Inválido'         
            }
          }
          this.errorHandler.handle(erro);
        }
      )
  }

}
