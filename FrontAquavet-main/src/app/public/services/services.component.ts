import { Component, OnInit } from '@angular/core';
import { NavbarTopComponent } from '../../shared/components/public/navbar-top/navbar-top.component';
import { ICategoriaServicios } from '../../core/models/ICategoriaServicios.interface';
import { IServicios } from '../../core/models/IServicios.interface';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BaseService } from '../../core/services/base-api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NavbarTopComponent, NgFor, NgClass, ReactiveFormsModule, NgIf],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit{

  constructor (private SBase: BaseService){}
  categoriaServicios: ICategoriaServicios[] = [];
  servicios: IServicios[] = []
  selectedCategoryId: string | null = null;
  searchControl: FormControl = new FormControl();
  serviciosQuery: IServicios[] = []

  ngOnInit(): void {
      this.getAllCategoryServices()

      this.searchControl.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(value => {
        if (value == '') {
          this.serviciosQuery = []
        }
        this.searchService(value);
      })
  }



  getAllCategoryServices(){
    this.SBase.getAll("CategoryServices")
      .subscribe(data =>{
        if (data.isSucess) {
          this.categoriaServicios = data.value;
          this.selectFirsCategoryService()
        }
      })
  }

  GetServicesByCategory(id:string){
    this.selectedCategoryId = id;
    this.SBase.getById("Services/servicios", id)
      .subscribe(data =>{
        if (data.isSucess) {
          this.servicios = data.value;          
        }
      })
  }


  getNameCategorySelected(){
    if (this.selectedCategoryId != null){
      return this.categoriaServicios.find(c => c.ID_Categoria == this.selectedCategoryId)
    }
    return null;
  }

  selectFirsCategoryService(){
    if (this.categoriaServicios.length > 0){
      const categoryID = this.categoriaServicios[0].ID_Categoria
      this.GetServicesByCategory(categoryID) 
    }
  }

  searchService(query: string){
      this.SBase.getbyQuery("Services/search", query)
        .subscribe(data => {
          if (data.isSucess) {
            this.serviciosQuery = data.value;            
          }
        })

  }


}
