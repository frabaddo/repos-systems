import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
} from "@angular/core";
import { animate } from "motion";

@Component({
  selector: "app-planet",
  template: `
    <div class="axi">
      <a [href]="url()" class="planet" style="animation-range: {{ i * 5 }}%;">
        <img src="/github-mark-white.svg" alt="Costellation" />
        <!-- <p>
              {{ label() }}
            </p> -->
      </a>
    </div>
  `,
  styles: [
    `
      :host {
        --size: 20px;
        display: block;
        transform-style: preserve-3d;
        position: absolute;
        top: calc(50%);
        left: calc(50%);
        animation-composition: add;
        .axi {
          transform-style: preserve-3d;
          height: var(--disatance);
          width: 1px;
          position: absolute;
          bottom: 0;
          .planet {
            position: absolute;
            top: calc(var(--size) / 2 * -5);//calc(var(--size) / -2);
            left: calc(50%);
            animation-composition: add;
            width: calc(var(--size) * 5);
            aspect-ratio: 1/1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: anchor-center;
            border-radius: 50%;
            background: transparent;
            &::after {
              content: "";
              background: #ffffff20;
              width: 100%;
              height: 100%;
              top: calc(50% var(--size) /2);
              left: calc(50% var(--size) /2);
              position: absolute;
              border-radius: 50%;
              transform: scale(0);
              transition: transform 0.6s ease-in-out;
            }
            &:hover::after {
                transform: scale(1);
            }
            p {
              color: white;
              text-align: center;
              font-size: 0.8rem;
              width: 5rem;
              white-space: pre-wrap;
              word-break: break-all;
              background: black;
            }
            img {
              display: block;
              width: var(--size);
            }
            .name {
              color: white;
            }
          }
        }
        &::after {
          content: "";
          width: calc(var(--disatance) * 2);
          aspect-ratio: 1/1;
          border: 1px solid #ffffff40;
          border-radius: 50%;
          position: absolute;
          top: calc(50%);
          left: calc(50%);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        a {
          cursor: pointer;
        }
      }
    `,
  ],
  host: {
    "[style]": "'--disatance: '+ distance() +'px; --angle:' + angle() +'deg;'",
  },
})
export class PlanetComponent {
  injector = inject(Injector);
  element = inject(ElementRef);
  index = input<number>(0);
  label = input<string>("");
  url = input<string>("");
  distance = signal<number>(0);
  angle = signal<number>(0);
  ngAfterViewInit() {
    afterNextRender(
      () => {
        let distance = (this.index() + 4) * 30; //this.randomIntFromInterval(50, 250);
        // let distance = (this.index() + 2) * 25; //this.randomIntFromInterval(50, 250);
        let angle = 40; //this.randomIntFromInterval(-60, 60);
        this.angle.set(angle);
        this.distance.set(distance);
        let duration = 300 / Math.sqrt(distance);
        let animation = animate(
          [
            [
              this.element.nativeElement,
              {
                rotateZ: [0, 360],
                rotateX: [angle, angle],
                translateX: ["-50%", "-50%"],
                translateY: ["-50%", "-50%"],
              },
            ],
            [
              this.element.nativeElement.querySelector(".planet"),
              {
                rotateZ: [0, -360],
                translateX: ["-50%", "-50%"],
                //rotateX: [-1 * angle, -1 * angle],
                ["z-index"]: [
                  200 + distance,
                  200 - distance,
                  200 - distance,
                  200 + distance,
                  200 + distance,
                ],
              },
              {
                at: "<",
              },
            ],
          ],
          { repeat: Infinity, duration: duration, ease: "linear" }
        );
        animation.time = duration * Math.random();
      },
      { injector: this.injector }
    );
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
