import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logado-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @Input() user : any;

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

  }

}
