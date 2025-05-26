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
  <div class="axi-point">
      <div class="axi">
        <a [href]="url()" class="planet" style="animation-range: {{ i * 5 }}%;">
          <img src="/github-mark-white.svg" alt="Costellation" />
          <!-- <p>
            {{ label() }}
          </p> -->
        </a>
      </div>
  </div>
  `,
  styles: [
    `
      :host {
        --size: 20px;
        display: block;
        transform-style: preserve-3d;
        position: absolute;
        top: calc(50% - calc(var(--size) / 2));
        left: calc(50% - calc(var(--size) / 2));
        .axi-point{
            transform-style: preserve-3d;
            .axi {
              transform-style: preserve-3d;
              .planet {
                width: var(--size);
                aspect-ratio: 1/1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: anchor-center;
                border-radius: 50%;
                background: black;
                p {
                  color: white;
                  text-align: center;
                  font-size: 0.8rem;
                  width: 5rem;
                  white-space: pre-wrap;
                  word-break: break-all;
                }
                img {
                  display: block;
                  width: 100%;
                }
                .name {
                  color: white;
                }
              }
            }
        }
        &::after {
          content: "";
          width: calc(var(--disatance) * 2);
          aspect-ratio: 1/1;
          border: 1px solid #FFFFFF40;
          border-radius: 50%;
          position: absolute;
          top: calc(-1 * var(--disatance) + 10px);
          left: calc(-1 * var(--disatance) + 10px);
          transform: rotateX(calc(90deg + var(--angle)));
        }
        a {
          cursor: pointer;
        }
      }
    `,
  ],
  host: {
    "[style]": "'--disatance: '+ distance() +'px; --angle:' + angle() +'deg;'"
  }
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
        let angle = -40; //this.randomIntFromInterval(-60, 60);
        this.angle.set(angle);
        let anglesArrayBase = new Array(10)
          .fill(0)
          .map((_, i) => (i * angle) / 10);
        let inclinationAngleArray = [
          ...anglesArrayBase.toReversed(),
          ...anglesArrayBase.map((el) => -el).slice(1),
          ...anglesArrayBase
            .map((el) => -el)
            .slice(1)
            .toReversed(),
          ...anglesArrayBase.slice(1),
        ];
        let rotationAngleArray = [0, 45, 90, 135, 180, 225, 270, 315, 360];
        let distance = (this.index() + 4) * 30; //this.randomIntFromInterval(50, 250);
        // let distance = (this.index() + 2) * 25; //this.randomIntFromInterval(50, 250);
        //let duration = Math.pow(this.index() + 5, 2) / 6;
        let duration = (300) / Math.sqrt(distance);
        let animation = animate(
          [
            [
              this.element.nativeElement.querySelector(".axi-point"),
              {
                rotateY: rotationAngleArray,
                ["z-index"]: [
                  200 + distance,
                  200 - distance,
                  200 - distance,
                  200 + distance,
                  200 + distance,
                ],
              },
            ],
            [
              this.element.nativeElement.querySelector(".planet"),
              {
                rotateY: rotationAngleArray.map((el) => -el),
                rotateX: inclinationAngleArray.map((el) => -el),
                translateZ: [distance, distance],
              },
              {
                at: "<",
              },
            ],
          ],
          { repeat: Infinity, duration: duration, ease: "linear" }
        );
        animation.time = duration * Math.random();

        let animation2 = animate(
          this.element.nativeElement.querySelector(".axi"),
          {
            rotateX: [angle, -angle],
          },
          {
            duration: duration / 2,
            ease: "easeInOut",
            repeatType: "mirror",
            repeat: Infinity,
          }
        );
        animation2.time = animation.time;
        this.distance.set(distance);
      },
      { injector: this.injector }
    );
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
