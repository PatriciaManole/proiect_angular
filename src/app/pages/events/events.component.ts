import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  todayMonth: number | undefined;
  Events: Event[] | undefined;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.getStarted();
    var today = new Date();
    this.todayMonth = (today.getMonth() + 1);
  }

  async getStarted() {
    var ev: Event[];
    ev = [];
    await this.getEvents().then((value) => {
      ev = value as Event[];
    });
    this.Events = [...ev];
  }

  getEvents() {
    return new Promise((resolve, reject) => {
      this.db
        .list('events/upcoming_events')
        .valueChanges()
        .subscribe((value) => {
          resolve(value);
        });
    });
  }

}
class Event {
  name: string | undefined;
  description: string | undefined;
  date: string | undefined;
}