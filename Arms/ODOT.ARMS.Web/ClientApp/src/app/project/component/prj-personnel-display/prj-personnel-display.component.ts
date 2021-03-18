import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Personnel } from '../../models/personnel';

@Component({
  selector: 'app-prj-personnel-display',
  templateUrl: './prj-personnel-display.component.html',
  styles: [
  ]
})
export class PrjPersonnelDisplayComponent implements OnInit {

   @Input() personnel: Personnel[] = [];
   @Output() selectedPersonnel = new EventEmitter<Personnel>();

  ngOnInit(): void {
    console.log('entering personnel display component');
  }
}
