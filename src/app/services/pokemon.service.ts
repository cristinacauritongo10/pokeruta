import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import {
  Pokemon,
  EspeciePokemon,
  CadenaEvolucion
} from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);

  private readonly api = 'https://pokeapi.co/api/v2';

  private cache = new Map<string, Observable<unknown>>();

  obtenerPokemon(nombreOId: string | number): Observable<Pokemon> {
    const busqueda = String(nombreOId).trim().toLowerCase();
    const valorSeguro = encodeURIComponent(busqueda);

    return this.consultar<Pokemon>(
      `${this.api}/pokemon/${valorSeguro}/`
    );
  }

  obtenerEspecie(url: string): Observable<EspeciePokemon> {
    return this.consultar<EspeciePokemon>(url);
  }

  obtenerCadena(url: string): Observable<CadenaEvolucion> {
    return this.consultar<CadenaEvolucion>(url);
  }

  private consultar<T>(url: string): Observable<T> {
    const guardado = this.cache.get(url);

    if (guardado) {
      return guardado as Observable<T>;
    }

    const solicitud = this.http.get<T>(url).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    this.cache.set(url, solicitud);

    return solicitud;
  }
}