import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CadenaEvolucion } from '../../services/pokemon.model';

@Component({
  selector: 'app-evoluciones',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './evoluciones.component.html',
  styleUrl: './evoluciones.component.css'
})
export class EvolucionesComponent {
  @Input({ required: true }) cadena!: CadenaEvolucion;
  @Input() actual = '';
  @Input() cargando = false;

  @Output() seleccionar = new EventEmitter<string>();
}