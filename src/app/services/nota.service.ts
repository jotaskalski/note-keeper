import { Injectable } from "@angular/core";
import { Nota } from "../models/nota";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Categoria } from "../models/categoria";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root',
}) 
export class NotaService {
    private NOTAS_API_URL = `${environment.API_URL}/api/notas`;
    private CATEGORIAS_API_URL = `${environment.API_URL}/api/categorias`;
    constructor(private http: HttpClient) {

    }

    excluir(nota: Nota): Observable<any> {
        const url = `${this.NOTAS_API_URL}/${nota.id}`;
    
        return this.http.delete<Nota>(url);
      }
      criar(nota: Nota): Observable<Nota> {
        return this.http.post<Nota>(this.NOTAS_API_URL, nota);
      }
      editar(nota: Nota): Observable<Nota> {
        const url = `${this.NOTAS_API_URL}/${nota.id}`;
    
        return this.http.put<Nota>(url, nota);
      }
    
      selecionarPorId(id: number): Observable<Nota> {
        const url = `${this.NOTAS_API_URL}/${id}`;
    
        return this.http.get<Nota>(url);
      }
      selecionarTodos(): Observable<Nota[]> {
        const url = `$(this.NOTAS_API_URL)?arquivada=false`;
        return this.http.get<Nota[]>(this.NOTAS_API_URL);
      }
      selecionarNotasPorCategoria(categoria: Categoria): Observable<Nota[]> {
        const url = `${this.CATEGORIAS_API_URL}/${categoria.id}/notas?arquivadas=false`;
    
        return this.http.get<Nota[]>(url);
      }
      selecionarNotasArquivadasPorCategoria(categoria: Categoria): Observable<Nota[]> {
        const url = `${this.CATEGORIAS_API_URL}/${categoria.id}/notas?arquivadas=true`;
    
        return this.http.get<Nota[]>(url);
      }
      selecionarNotasArquivadas(): Observable<Nota[]>{
        const url = `$(this.NOTAS_API_URL)?arquivada=true`;
        return this.http.get<Nota[]>(this.NOTAS_API_URL);
      }
}