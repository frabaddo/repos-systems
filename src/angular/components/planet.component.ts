import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  input,
} from "@angular/core";
import { animate } from "motion";

@Component({
  selector: "app-planet",
  template: `
    <div class="planet-container">
      <div class="planet" style="animation-range: {{ i * 5 }}%;">
        <img src="/github-mark-white.svg" alt="Costellation" />
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
        left: calc(50% - calc(var(--size) / 2));;
        .planet-container {
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
    `,
  ],
})
export class PlanetComponent {
  injector = inject(Injector);
  element = inject(ElementRef);
  index = input<number>(0);
  ngAfterViewInit() {
    afterNextRender(
      () => {
        let angle = 0; //this.randomIntFromInterval(-60, 60);
        let distance = (this.index() + 5) * 25; //this.randomIntFromInterval(50, 250);
        let duration = (10 * 300) / distance;
        let animation = animate(
          [
            [
              this.element.nativeElement,
              {
                rotateY: [0, 90, 180, 270, 360],
                //rotateX: [-30, -30, -30, -30, -30],
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
                rotateY: [0, -90, -180, -270, -360],
                //rotateX: [30, 30, 30, 30, 30],
              },
              {
                at: "<",
              },
            ],
            [
              this.element.nativeElement.querySelector(".planet"),
              {
                translateY: [
                  0,
                  -0.7 * angle,
                  -angle,
                  -0.7 * angle,
                  0,
                  0.7 * angle,
                  angle,
                  0.7 * angle,
                  0,
                ],
              },
              {
                at: "<",
                ease: [0.4, 0.1, 0.6, 0.9],
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
              },
            ],
            [
              this.element.nativeElement.querySelector(".planet-container"),
              {
                translateZ: [distance, distance, distance, distance, distance],
              },
              {
                at: "<",
              },
            ],
          ],
          {
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
          }
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
