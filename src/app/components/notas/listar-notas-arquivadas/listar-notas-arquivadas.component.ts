import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-listar-notas-arquivadas',
  templateUrl: './listar-notas-arquivadas.component.html',
  styleUrls: ['./listar-notas-arquivadas.component.css']
})
export class ListarNotasArquivadasComponent {
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
    this.notaService.selecionarNotasArquivadas().subscribe((notas: Nota[]) => {
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

  reativarNota(nota: Nota) {
    nota.arquivada = false;

    this.notaService.editar(nota).subscribe((nota: Nota) => {
    this.toastService.success(`Nota ${nota.titulo} reativada com sucesso!`);
    this.notaService
    .selecionarNotasArquivadas()
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
