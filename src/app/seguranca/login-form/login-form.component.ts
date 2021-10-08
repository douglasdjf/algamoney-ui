import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService,
               private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  login(usuario: string , senha: string){
    this.auth.login(usuario,senha)
    .catch(error => {
      this.errorHandler.handle(error);
    });
  }

}
