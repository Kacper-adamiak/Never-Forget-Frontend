import {Component, ElementRef, ViewChild} from '@angular/core';
import {PersonService} from "../../service/person.service";
import {DatePipe} from "@angular/common";
import {Person} from "../../model/person";
import {PersonCardComponent} from "../../shared/person-card/person-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DatePipe,
    PersonCardComponent
  ],
  template: `
    <h2>Upcoming birthday</h2>
    <div class="container">
      <svg (click)="scrollOneLeft()" class="chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
      <div #person_card_list class="person-card-list" (mousedown) ="mouseIsDown($event)" (mouseup) ="mouseUp($event)" (mouseleave) ="mouseLeave($event)" (mousemove)="mouseMove($event)">
        @for (person of persons; track person){
          <app-person-card [person]="person"></app-person-card>
        }
      </div>
      <svg (click)="scrollOneRight()" class="chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    </div>
  `,
  styles: `

    :host {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background-color: #14141c;
    }

    h2 {
      margin: 16px 40px 8px;
      color: white;
      font-size: 28px;
    }

    .container {
      position: relative;
    }

    .person-card-list {
      position: relative;
      margin: 0 40px;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;

      ::-webkit-scrollbar {
        display: none;
      }

      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .chevron-left {
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      fill: white;
      cursor: pointer
    }

    .chevron-right {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      fill: white;
      cursor: pointer
    }

    app-person-card {
      scroll-snap-align: start;
    }
  `
})
export class HomeComponent {

  isDown = false;
  startX: any;
  scrollLeft: any;

  persons: Person[]

  @ViewChild('person_card_list') slider!: ElementRef;

  constructor(private personService: PersonService) {
    this.persons = this.getPersons();
  }

  getPersons() {
    console.log(this.personService.getPersons());
    return this.personService.getPersons();
  }

  mouseIsDown(e: any){
    this.isDown = true;
    this.startX = e.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
    console.log(this.startX, this.scrollLeft);
  }
  mouseUp(e: any){
    this.isDown = false;
  }
  mouseLeave(e: any){
    this.isDown = false;
  }
  mouseMove(e: any) {
    if (this.isDown) {
      e.preventDefault();

      const x = e.pageX - this.slider.nativeElement.offsetLeft;
      const walkX = x - this.startX;
      this.slider.nativeElement.scrollLeft = this.scrollLeft - walkX;
      console.log(x, walkX);
    }
  }

  scrollOneLeft() {
    this.slider.nativeElement.scrollLeft -= this.personCardWidth();
  }

  scrollOneRight() {
    this.slider.nativeElement.scrollLeft += this.personCardWidth();
  }

  personCardWidth() {
    console.log(this.slider.nativeElement.querySelector('app-person-card').clientWidth);
    return this.slider.nativeElement.querySelector('app-person-card').clientWidth;
  }
}
