import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/emloyee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  getEmpURL : string;


  constructor(private http: HttpClient) {

    this.getEmpURL = 'api/employees';
   
  }

  addEmployee(emp : Employee): Observable<Employee> {
    return this.http.post<Employee>(this.getEmpURL,emp);
  }

  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.getEmpURL);
  }

  updateEmployee(emp :Employee) : Observable<Employee>{
    return this.http.put<Employee>(`${this.getEmpURL}/${emp.id}`, emp);;
  }

  deleteEmployee(emp : Employee) : Observable<Employee> {
    return this.http.delete<Employee>(this.getEmpURL+'/'+emp.id);
  }
}
