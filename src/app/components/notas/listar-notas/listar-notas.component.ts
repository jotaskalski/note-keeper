import { Component, OnInit } from '@angular/core';
import { Nota } from '../../../models/nota';
import { NotaService } from '../../../services/nota.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css'],
})
export class ListarNotasComponent implements OnInit {
  notas: Nota[] = [];
  categorias: Categoria[] = [];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.selecionarTodas();

    this.categoriaService
      .selecionarTodos()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  selecionarTodas(): void {
    this.notaService.selecionarTodos().subscribe((notas: Nota[]) => {
      this.notas = notas;
    });
  }

  selecionarNotasPorCategoria(categoria: Categoria) {
    this.notaService
      .selecionarNotasPorCategoria(categoria)
      .subscribe((notas: Nota[]) => {
        this.notas = notas;
      });
  }

  arquivarNota(nota: Nota) {
    nota.arquivada = true;

    this.notaService.editar(nota).subscribe((nota: Nota) => {
    this.toastService.success(`Nota ${nota.titulo} arquivada com sucesso!`);
    this.notaService
    .selecionarTodos()
    .subscribe((notas: Nota[]) => (this.notas = notas));
    });
  }

  filtrarNotasPorCategoria(categoria: Categoria | null) {
    if (categoria == null) {
      this.selecionarTodas();
      return;
    }

    this.selecionarNotasPorCategoria(categoria);
  }
}