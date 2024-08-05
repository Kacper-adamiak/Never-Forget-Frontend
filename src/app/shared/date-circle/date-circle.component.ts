import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MONTHS} from "../months";

@Component({
  selector: 'app-date-circle', standalone: true, imports: [], template: `
    <svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
    <div #parent class="circle">
      @for (month of MONTHS; track month; let i = $index) {
        <div class="circle-segment">
          <div class="circle-segment-inner">
          </div>
        </div>
        <div class="circle-separator">
          <p class="month-name">{{ MONTHS[i] }}</p>
          <span class="birthday-count">{{ monthlyCount[i] }}</span>
        </div>
      }
    </div>

  `, styles: `
    $size: 600px;

    :host {
      position: relative;
    }

    .chevron-down {
      position: absolute;
      top: 3%;
      left: 50%;

      width: 32px;
      fill: white;

      transform: translate(-50%, -50%);
    }

    .circle {
      height: 600px;
      width: 600px;
      top: 0;
      //background-color: aqua;
      overflow: hidden;

      .circle-separator {
        position: absolute;
        left: 50%;
        top: 5%;
        height: 45%;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.53);
        transform-origin: 50% 100%;
        color: white;
        z-index: 10;

        @for $i from 0 through 22 {
          &:nth-of-type(#{$i +2}) {
            rotate: (#{(($i)/2) * 30deg - 15deg});
          }
        }

        .month-name {
          width: 100px;
          position: absolute;
          text-align: center;
          bottom: 85%;
          left: calc((0.2588 * $size * 0.85 - 100px) / 2);
          transform: rotate(15deg);
        }

        .birthday-count {
          width: 32px;
          position: absolute;
          text-align: center;
          top: 50%;
          left: calc((0.2588 * $size * 0.5 - 32px) / 2);
          transform: rotate(15deg);
        }

      }

      div.circle-segment {
        position: absolute;
        width: 45%;
        height: 45%;
        top: 5%;
        left: 5%;
        //background-color: red;
        border-radius: 100% 0 0;

        transform: skew(0deg, 60.1deg);
        transform-origin: 100% 100%;
        overflow: hidden;

        @for $i from -1 through 21 {
          &:nth-of-type(#{$i +2}) {
            rotate: (#{(($i - 1)/2) * 30deg - 15deg});
          }
        }

        .circle-segment-inner {
          position: absolute;
          width: 100%;
          height: 100%;
          //background-color: blue;
          border-radius: 100% 0 0;
          transform: skew(0deg, -60.1deg);
          transform-origin: 100% 100%;

          &:hover {
            background-color: rgba(207, 207, 207, 0.2);
          }
        }
      }
    }


  `
})
export class DateCircleComponent implements AfterViewInit {

  @Input() monthlyCount: number[] = new Array(12).fill(0);
  @ViewChild('parent') parent!: ElementRef;
  protected readonly MONTHS = MONTHS;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.parent.nativeElement.style.transform = `rotate(${30 * new Date().getMonth()}deg)`;
  }

}
