
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl:'./message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  /**
   * Necessário colocar o NgModel no lugar do FormsControl pois mudou o formato, então tem  que ser NgModel.control.
   * control.control.
   */
   @Input() error: string = '';
   @Input() control?: AbstractControl | FormControl | null;
   @Input() text: string = '';
 
   temErro(): boolean {
     return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
   }
}
