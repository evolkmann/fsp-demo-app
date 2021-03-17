import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fsp-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input()
  base = 'Back to Overview';

  @Input()
  id!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
