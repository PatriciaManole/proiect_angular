import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {
  @Input() user: String | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
