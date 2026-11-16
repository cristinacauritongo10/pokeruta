import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { FichaPokemonComponent } from './components/ficha-pokemon/ficha-pokemon.component';
import { EvolucionesComponent } from './components/evoluciones/evoluciones.component';

import { PokemonService } from './services/pokemon.service';

import {
  Pokemon,
  EspeciePokemon,
  CadenaEvolucion
} from './services/pokemon.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BuscadorComponent,
    FichaPokemonComponent,
    EvolucionesComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private servicio = inject(PokemonService);
  private solicitudActual = 0;

  pokemon = signal<Pokemon | null>(null);
  especie = signal<EspeciePokemon | null>(null);
  cadena = signal<CadenaEvolucion | null>(null);

  cargando = signal(false);
  error = signal('');

  descripcion = computed(() => {
    const textos = this.especie()?.flavor_text_entries || [];

    const texto =
      textos.find(elemento => elemento.language.name === 'es')
      || textos.find(elemento => elemento.language.name === 'en');

    return texto
      ? texto.flavor_text.replace(/[\n\f\r]+/g, ' ')
      : 'No hay una descripción disponible para esta especie.';
  });

  categoria = computed(() => {
    const categorias = this.especie()?.genera || [];

    return categorias.find(
      elemento => elemento.language.name === 'es'
    )?.genus || 'Pokémon';
  });

  ngOnInit(): void {
    void this.buscarPokemon('pikachu');
  }

  async buscarPokemon(valor: string): Promise<void> {
    const consulta = valor.trim().toLowerCase();

    if (!consulta) {
      this.error.set('Escribe el nombre o número de un Pokémon.');
      return;
    }

    const solicitud = ++this.solicitudActual;

    this.cargando.set(true);
    this.error.set('');
    this.pokemon.set(null);
    this.especie.set(null);
    this.cadena.set(null);

    let paso = 'el Pokémon';

    try {
      // Primer recurso: Pokémon.
      const pokemon = await firstValueFrom(
        this.servicio.obtenerPokemon(consulta).pipe(timeout(15000))
      );

      // Segundo recurso: especie.
      paso = 'la especie';

      const especie = await firstValueFrom(
        this.servicio.obtenerEspecie(pokemon.species.url)
          .pipe(timeout(15000))
      );

      // Tercer recurso: cadena evolutiva.
      paso = 'las evoluciones';

      let cadena: CadenaEvolucion | null = null;

      if (especie.evolution_chain) {
        cadena = await firstValueFrom(
          this.servicio.obtenerCadena(especie.evolution_chain.url)
            .pipe(timeout(15000))
        );
      }

      // Evita que una búsqueda anterior reemplace una más reciente.
      if (solicitud !== this.solicitudActual) {
        return;
      }

      this.pokemon.set(pokemon);
      this.especie.set(especie);
      this.cadena.set(cadena);
    } catch (fallo: unknown) {
      if (solicitud !== this.solicitudActual) {
        return;
      }

      if (
        fallo instanceof HttpErrorResponse
        && fallo.status === 404
        && paso === 'el Pokémon'
      ) {
        this.error.set(
          `No encontramos "${consulta}". Revisa el nombre o número.`
        );
      } else {
        this.error.set(
          `No se pudo consultar ${paso}. Intenta nuevamente; `
          + 'si el problema continúa, revisa tu conexión.'
        );
      }
    } finally {
      if (solicitud === this.solicitudActual) {
        this.cargando.set(false);
      }
    }
  }

  buscarAleatorio(): void {
    const id = Math.floor(Math.random() * 151) + 1;
    void this.buscarPokemon(String(id));
  }
}