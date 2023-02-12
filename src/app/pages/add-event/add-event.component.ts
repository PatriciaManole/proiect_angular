import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  addEventForm!: FormGroup ;
  ev!: Event[] ;
  user_curr: any|null;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
  ) {
    this.getStarted();
    this.user_curr="ESNer"
  }

  ngOnInit(): void {
    this.addEventForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      eventDescription: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
    });
  }

  async getStarted() {
    var events: Event[];
    events= [];
    await this.getEvent().then((value) => {
      events= value as Event[];
    });
    this.ev = [...events];
    console.log(this.ev);
  }

  getEvent() {
    return new Promise((resolve, reject) => {
      this.db
        .list('events/upcoming_events')
        .valueChanges()
        .subscribe((value) => {
          resolve(value);
        });
    });
  }

  addEvent() {
    if (this.addEventForm.valid) {
      let frm = {
        name: this.addEventForm.value.eventName,
        description: this.addEventForm.value.eventDescription,
        date:
          this.addEventForm.value.eventDate.getDate() +
          '/' +
          (this.addEventForm.value.eventDate.getMonth() + 1) +
          '/' +
          this.addEventForm.value.eventDate.getFullYear(),
      };
      this.ev.push(frm);
      this.db
        .object('events')
        .set({ upcoming_events: this.ev });
      this.addEventForm.reset();
      this.getStarted();
    } else {
      return;
    }
  }
}

class Event {
  name: string | undefined;
  description: string | undefined;
  date: string | undefined;
}