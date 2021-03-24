import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { MetaService } from '@ngx-meta/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { FirebaseCollection } from 'src/app/firebase';
import { Employee } from 'src/app/shared/models/employee.model';
import { CreateSalesRepEmployeeDialogComponent } from '../../components/create-sales-rep-employee-dialog/create-sales-rep-employee-dialog.component';

@Component({
  selector: 'fsp-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  employees!: Observable<Employee[]>;

  selectedEmployees: string[] = [];

  constructor(
    private readonly meta: MetaService,
    private readonly firestore: AngularFirestore,
    private readonly matDialog: MatDialog,
    public readonly user: UserService
  ) { }

  ngOnInit(): void {
    this.meta.setTitle('Employees');
    this.employees = this.firestore.collection<Employee>(FirebaseCollection.EMPLOYEES).valueChanges({
      ifField: 'id'
    });
  }

  openCreateEmployeeDialog() {
    this.matDialog.open<
      CreateSalesRepEmployeeDialogComponent
    >(CreateSalesRepEmployeeDialogComponent, {
      minWidth: '50%',
      minHeight: '200px'
    });
  }

  onSelectionChange(change: MatSelectionListChange) {
    this.selectedEmployees = change.source.selectedOptions.selected.map(sel => sel.value)
  }

  async deleteEmployees() {
    const confirmed = confirm(`Do you want to delete the selected employees?`);
    if (!confirmed) {
      return;
    }

    for (const id of this.selectedEmployees) {
      await this.firestore.doc(`${FirebaseCollection.EMPLOYEES}/${id}`).delete();
    }

    this.selectedEmployees = [];
  }

}
