import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nota } from '../../../models/nota';

@Component({
  selector: 'app-nota',
  templateUrl: './card-nota.component.html',
  styleUrls: ['./card-nota.component.css']
})
export class CardNotaComponent {
 @Input() nota: Nota;
 @Output() onArquivarClicado: EventEmitter<Nota>;
 constructor() {
  this.nota = new Nota('','','dark',0);
  this.onArquivarClicado = new EventEmitter();
 }
 arquivarNota(nota: Nota) {
  this.onArquivarClicado.emit(nota);
 }
}
