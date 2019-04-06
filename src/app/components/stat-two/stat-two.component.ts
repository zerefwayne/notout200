import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-two',
  templateUrl: './stat-two.component.html',
  styleUrls: ['./stat-two.component.scss']
})
export class StatTwoComponent implements OnInit {

  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() direction: string = 'left';

  constructor() { }

  ngOnInit() {
  }

}
