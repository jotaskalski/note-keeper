import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-criar-categoria',
  templateUrl: './criar-categoria.component.html',
  styleUrls: ['./criar-categoria.component.css']
})
export class CriarCategoriaComponent {
  categoria: Categoria;

  constructor(private categoriaService: CategoriaService,
    private toastService: ToastrService,
    private router: Router){
      this.categoria = new Categoria('');
    }
    criarCategoria(): void{
      this.categoriaService.criar(this.categoria)
      .subscribe((categoria: Categoria): any =>{
        this.toastService.success(
          `Categoria "${categoria.titulo} cadastrada com sucesso."`,
          'Sucesso'
        );
        this.router.navigate(['/categorias', 'listar']); 
      });
    }
}