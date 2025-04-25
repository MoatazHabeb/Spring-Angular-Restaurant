import { Component, OnInit } from '@angular/core';

import {Chefs} from '../../../model/chefs';
import {ChefsService} from '../../../service/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefs: Chefs[] = [];
  constructor(private chefsService: ChefsService) { }

  ngOnInit(): void {
    this.loadAllChefs();
  }

  // tslint:disable-next-line:typedef
  loadAllChefs(){
    this.chefsService.getAllChefs().subscribe(
      response => {
        this.chefs = response;
      }
    );
  }

}
