import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'fsp-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
    private readonly meta: MetaService
  ) { }

  ngOnInit(): void {
    this.meta.setTitle('Clinics');
  }

}
