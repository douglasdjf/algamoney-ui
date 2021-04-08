
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl:'./message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  /**
   * Necessário colocar o NgModel no lugar do FormsControl pois mudou o formato, então tem  que ser NgModel.control.
   * controle.control.
   */
  @Input() error: string = '';
  @Input() controle!: NgModel;
  @Input() text: string = '';

  temErro(): boolean {
    return this.controle.control.hasError(this.error) && this.controle.control.dirty;
  }

}
