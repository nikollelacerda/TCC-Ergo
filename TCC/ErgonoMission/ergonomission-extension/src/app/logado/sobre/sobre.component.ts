import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor() { 
  }
 
  [Symbol.hasInstance](value: any): boolean {
    throw new Error('Method not implemented.');
  }
  @Input() data: any;

  ngOnInit(): void {
  }

}
