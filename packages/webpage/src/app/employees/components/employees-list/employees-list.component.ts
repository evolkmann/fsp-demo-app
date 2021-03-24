import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'fsp-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  @Input()
  employees?: Employee[];

  @Output()
  selectionChange = new EventEmitter<MatSelectionListChange>();

  constructor() { }

  ngOnInit(): void {
  }

}
