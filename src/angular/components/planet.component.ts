import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from "@angular/core";

@Component({
  selector: "app-planet",
  template: `
    <div class="orbit-plane">
      <div class="orbit" [class.show-orbit]="showOrbit()">
        <div class="axi">
          <div class="planet-container">
            <a [href]="url()" class="planet">
              <img [src]="image()" alt="Costellation" />
              <!-- <p>
                    {{ label() }}
                  </p> -->
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        transform-style: preserve-3d;
        position: absolute;
        top: 50%;
        left: 50%;
        .orbit-plane {
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(var(--angle, 40deg)) translate(-50%, -50%)
            rotateZ(var(--start-angle, 0deg));
          opacity: 1;
          transition: all 1s ease;
          transition-delay: calc((var(--distance) * 10ms) - 1500ms);
          @starting-style {
            opacity: 0;
          }
        }
        .orbit {
          animation-composition: add;
          position: relative;
          transform-style: preserve-3d;
          animation: orbitAnimation var(--duration) linear infinite;
          &.show-orbit::after {
            content: "";
            width: calc(var(--distance) * 2px);
            aspect-ratio: 1/1;
            border: 1px solid #ffffff40;
            border-radius: 50%;
            position: absolute;
            top: calc(50%);
            left: calc(50%);
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
        }
        .axi {
          transform-style: preserve-3d;
          height: calc(var(--distance) * 1px);
          width: 1px;
          position: absolute;
          bottom: 0;
          .planet-container {
            transform: rotateZ(calc(-1 * var(--start-angle, 0deg)));
            transform-style: preserve-3d;
          }
          .planet {
            --z-index-fix: 1;
            position: absolute;
            top: calc(var(--size) * -1 / 2 - 30px);
            left: calc(var(--size) * -1 / 2 - 30px);
            animation-composition: add;
            width: calc(var(--size) + 60px);
            aspect-ratio: 1/1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: anchor-center;
            border-radius: 50%;
            background: transparent;
            animation: animatePlanet var(--duration) linear infinite;
            z-index: calc(
              var(--distance) * 1px + calc(var(--z-index-fix) * 200px)
            );
            &::after {
              content: "";
              background: #ffffff20;
              width: 100%;
              height: 100%;
              position: absolute;
              border-radius: 50%;
              transform: scale(0);
              transition: transform 0.3s ease-out;
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
        a {
          cursor: pointer;
        }
      }
      @keyframes orbitAnimation {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
      @keyframes animatePlanet {
        0% {
          transform: rotateZ(0deg);
          --z-index-fix: 1;
        }
        25% {
          --z-index-fix: -1;
        }
        50% {
          --z-index-fix: -1;
        }
        75% {
          --z-index-fix: 1;
        }
        100% {
          transform: rotateZ(-360deg);
          --z-index-fix: 1;
        }
      }
    `,
  ],
  host: {
    "[style]": "style()",
  },
})
export class PlanetComponent {
  element = inject(ElementRef);
  index = input<number>(0);
  label = input<string>("");
  url = input<string>("");
  showOrbit = input<boolean>(true);
  image = input<string>("/github-mark-white.svg");
  mergeAxis = input<boolean>(false);
  mergeCount = input<number>(4);
  distance = computed(() =>
    this.mergeAxis()
      ? ((this.index() % this.mergeCount() > 0
          ? this.index() - (this.index() % this.mergeCount())
          : this.index()) +
          4) *
        25
      : (this.index() + 4) * 25
  );
  duration = computed(() => 300 / Math.sqrt(this.distance()));
  startAngle = computed<number>(() =>
    this.mergeAxis()
      ? this.index() % this.mergeCount() > 0
      ? (320 / this.mergeCount()) * Math.random() + ((360 / this.mergeCount()) * (this.index() % this.mergeCount()))
      : (320 / this.mergeCount()) * Math.random()
      : 360 * Math.random()
  );
  randomSize = input<boolean>(true);
  size = computed<number>(() =>
    this.randomSize() ? Math.ceil(Math.random() * 60 + 10) : 50
  );
  style = computed(() => {
    const distance = this.distance();
    const duration = this.duration();
    const startAngle = this.startAngle();
    return `--size: ${this.size()}px ; --distance: ${distance}; --duration: ${duration}s; --start-angle: ${startAngle}deg;`;
  });
}
