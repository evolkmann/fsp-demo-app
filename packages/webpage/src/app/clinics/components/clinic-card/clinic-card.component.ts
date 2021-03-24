import { Component, Input, OnInit } from '@angular/core';
import { Clinic } from '../../../shared/models/clinic.model';

@Component({
  selector: 'fsp-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {

  @Input()
  clinic!: Clinic;

  constructor() { }

  ngOnInit(): void {
  }

}
