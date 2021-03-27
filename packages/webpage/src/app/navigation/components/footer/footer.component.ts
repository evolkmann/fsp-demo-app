import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fsp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year = new Date().getFullYear();
  /**
   * When changing the following line, please also update
   * the `Jenkinsfile`!
   *
   * @see [Commit](https://github.com/evolkmann/fsp-demo-app/commit/c7ccddb90d40f979b71af72cae47ebcfb5353a1e)
   */
  version?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
