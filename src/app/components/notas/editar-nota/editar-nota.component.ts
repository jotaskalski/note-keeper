import { Component, OnInit } from '@angular/core';
import { Nota } from '../../../models/nota';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaService } from '../../../services/nota.service';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit{
  nota: Nota;
  categorias: Categoria[] = [];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService) {
    this.nota = new Nota ('','','dark',0);
    
  }
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.notaService.selecionarPorId(id).subscribe((nota: Nota) => {
      this.nota = nota;
    });
    this.categoriaService.selecionarTodos()
    .subscribe((categorias: Categoria[]) =>{
      this.categorias = categorias;
    });
  }
  editarNota(){
    this.notaService.editar(this.nota).subscribe((nota: Nota) => {
      this.toastService.success(
        `Nota "${nota.titulo}" editada com sucesso.`, 'Sucesso');
      this.router.navigate(['/notas', 'listar']);
    });
  }
}
