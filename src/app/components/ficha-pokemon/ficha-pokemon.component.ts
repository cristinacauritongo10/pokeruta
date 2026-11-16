import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal
} from '@angular/core';

import { Pokemon } from '../../services/pokemon.model';

@Component({
  selector: 'app-ficha-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './ficha-pokemon.component.html',
  styleUrl: './ficha-pokemon.component.css'
})
export class FichaPokemonComponent implements OnChanges {
  @Input({ required: true }) pokemon!: Pokemon;
  @Input() descripcion = '';
  @Input() categoria = '';

  private intentoImagen = signal(0);

  private nombresEstadisticas: Record<string, string> = {
    hp: 'Salud',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque especial',
    'special-defense': 'Defensa especial',
    speed: 'Velocidad'
  };

  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['pokemon']) {
      this.intentoImagen.set(0);
    }
  }

  get imagen(): string | null {
    const base = 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master';
    const id = this.pokemon.id;

    const opciones = [
      `${base}/sprites/pokemon/other/official-artwork/${id}.png`,
      this.pokemon.sprites.other?.['official-artwork']?.front_default,
      `${base}/sprites/pokemon/${id}.png`,
      this.pokemon.sprites.front_default
    ].filter((url): url is string => Boolean(url));

    return opciones[this.intentoImagen()] || null;
  }

  siguienteImagen(): void {
    this.intentoImagen.update(intento => intento + 1);
  }

  nombreEstadistica(nombre: string): string {
    return this.nombresEstadisticas[nombre] || nombre;
  }
}