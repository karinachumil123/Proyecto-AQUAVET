import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegisterEmployee } from '../models/IRegisterEmployee.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService {


  constructor( private  http: HttpClient ) { }

  getAll(service:string) {
    return this.http.get<any>(`${environment.baseUrlApi}/${service}`)
  }
  

  getFirstOrDefault(service:string){
    return this.http.get<any>(`${environment.baseUrlApi}/${service}`)
  }

  getById(service:string, id:string){
    return this.http.get<any>(`${environment.baseUrlApi}/${service}/${id}`)
  }

  getbyQuery(service:string, query:string){
    return this.http.get<any>(`${environment.baseUrlApi}/${service}?query=${query}`)
  }

  postItem(service:string,employee:any){
    return this.http.post<any>(`${environment.baseUrlApi}/${service}`, employee)
  }

  deleteItem(service:string, id: number){
    return this.http.delete<any>(`${environment.baseUrlApi}/${service}/${id}`)
  }

  editItem(service:string, id: number, employee:any){
    return this.http.put<any>(`${environment.baseUrlApi}/${service}/${id}`,employee )
  }



}
