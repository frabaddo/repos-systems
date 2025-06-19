import { Component, computed, input } from "@angular/core";
import { PlanetComponent } from "./planet.component";

@Component({
  selector: "app-costellation",
  imports: [PlanetComponent],
  template: `
    <div class="costellation">
      <div id="sun"></div>
      @for(planet of planets(); let index = $index; track planet.id) {
      <app-planet
        [index]="index"
        [label]="planet.name"
        [url]="planet.html_url"
        [image]="planet.image"
        [randomSize]="randomSize()"
        [showOrbit]="index % mergeCount() === 0 ? true : false"
        [mergeCount]="mergeCount()"
        [mergeAxis]="planets().length > 8 ? true : false"
      ></app-planet>
      }
    </div>
  `,
  host: {
    "[style]": "'--fix-position:' + fixPosition() +'px; --angle:' + angle() + 'deg;'",
  },
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        perspective: 600px;
        display: block;
        position: relative;
      }

      .costellation {
        transform-style: preserve-3d;
        height: 100%;
        top: calc(-50px - var(--fix-position, 0px));
        position: relative;
      }

      #sun {
        position: absolute;
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
        width: 3rem;
        aspect-ratio: 1/1;
        background: radial-gradient(circle at center, #FFD700, #FFA500);
        border-radius: 50%;
        transform-style: preserve-3d;
        z-index: 200;
        box-shadow: 
          0 0 30px 10px #FFD700, 
          0 0 60px 20px #FFA500, 
          0 0 100px 40px #FF8C00;
      }
      
      @media only screen and (min-width: 1000px) {
        #sun{
          animation: animateSun 10s linear infinite;
        }
      }

      @keyframes animateSun {
        0%{
          box-shadow: 
          0 0 30px 10px #FFD700,   /* bagliore principale */
          0 0 60px 20px #FFA500,   /* bagliore arancio */
          0 0 100px 40px #FF8C00;  /* alone esterno */
        }
        50%{
          box-shadow: 
          0 0 30px 10px #FFD700,   /* bagliore principale */
          0 0 90px 40px #FFA500,   /* bagliore arancio */
          0 0 100px 40px #FF8C00;  /* alone esterno */
        }
        100%{
          box-shadow: 
          0 0 30px 10px #FFD700,   /* bagliore principale */
          0 0 60px 20px #FFA500,   /* bagliore arancio */
          0 0 100px 40px #FF8C00;  /* alone esterno */
        }
      }
    `,
  ],
})
export class CostellationComponent {
  angle = input<number>(40);

  planets = input<any[]>([]);

  randomSize = input<boolean>(true);

  mergeCount = computed(()=> this.planets().length > 20 ? 5 : this.planets().length > 16 ? 4 : this.planets().length > 12 ? 3 : 2)

  fixPosition = computed(() => Math.max(0, this.planets().length - 10) * this.angle() / 2);
  
}
