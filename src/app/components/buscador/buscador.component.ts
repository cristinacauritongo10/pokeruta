import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  @Input() cargando = false;

  @Output() buscar = new EventEmitter<string>();
  @Output() aleatorio = new EventEmitter<void>();

  consulta = '';

  enviar(): void {
    if (!this.cargando) {
      this.buscar.emit(this.consulta.trim());
    }
  }
}