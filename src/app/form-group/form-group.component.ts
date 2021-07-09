import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {
  @Input() label: string = '';   
  constructor() { }

  ngOnInit(): void {
  }

}
