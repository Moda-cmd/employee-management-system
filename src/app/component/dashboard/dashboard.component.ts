import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AngularPaginatorModule } from 'angular-paginator';
import { Employee } from 'src/app/model/emloyee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empDetail!: FormGroup;
  empObj: Employee = new Employee();
  empList: Employee[] = [];
  filteredEmpList: Employee[] = [];
  maxBirthDate: string | undefined;
  search: any;
  // maxSize: string;
  // directionLinks: string

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    public paginator: AngularPaginatorModule,
  ) {}

  ngOnInit(): void {
    let auxDate = this.substractYearsToDate(new Date(), 18);
    this.maxBirthDate = this.getDateFormateForSearch(auxDate);
    this.getAllEmployee();
    this.empDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      date: [''],
      salary: [''],
      email: [''],
    });
  }

  onSearch(event: string) {
    if (event.length > 0) {
      this.filteredEmpList = this.empList.filter((a) => a.name.includes(event));
    } else {
      this.filteredEmpList = this.empList;
    }
  }

  addEmployee() {
    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.date = this.empDetail.value.date;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;

    this.empService.addEmployee(this.empObj).subscribe((res) => {
      console.log(res);
      this.getAllEmployee();
    });
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(
      (res) => {
        this.empList = res;
        this.filteredEmpList = res;
      },
      (err) => {
        console.log('error while fetching data.');
      }
    );
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['date'].setValue(emp.date);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['salary'].setValue(emp.salary);
  }

  updateEmployee() {
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.date = this.empDetail.value.date;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;

    this.empService.updateEmployee(this.empObj).subscribe((res) => {
      console.log(res);
      this.getAllEmployee();
    });
  }

  deleteEmployee(emp: Employee) {
    this.empService.deleteEmployee(emp).subscribe(
      (res) => {
        console.log(res);
        alert('Employee deleted successfully');
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDateFormateForSearch(date: Date): string {
    let year = date.toLocaleDateString('es', { year: 'numeric' });
    let month = date.toLocaleDateString('es', { month: '2-digit' });
    let day = date.toLocaleDateString('es', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  }

  substractYearsToDate(auxDate: Date, years: number): Date {
    auxDate.setFullYear(auxDate.getFullYear() - years);
    return auxDate;
  }

  pageChanged(event: string) {}
}
