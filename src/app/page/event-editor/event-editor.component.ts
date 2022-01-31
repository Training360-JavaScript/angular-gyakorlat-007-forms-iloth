import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { 
    route.params.subscribe((params) => {
      const eventId: number = +params['id'];
      eventService.get(eventId).subscribe((event) => {
        this.event = event;
      });
    });
  }

  public event: Event = new Event();

  ngOnInit(): void {
  }

  onUpdate(form: NgForm) {
    this.eventService.update(form.value as Event).subscribe((ret) => {
      this.event = ret;
    });
  }

}
