import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fin-pooled-participating',
  templateUrl: './fin-pooled-participating.component.html'
})
export class FinPooledParticipatingComponent implements OnInit {
  @Output() savePooledPart = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {

  }


}
