import {
  Component,
  resource,
} from "@angular/core";
import { StarComponent } from "./star.component";
import { PlanetComponent } from "./planet.component";

@Component({
  selector: "app-costellation",
  imports: [StarComponent, PlanetComponent],
  template: `
    <div id="sun"></div>
    @for(planet of planets.value(); let index = $index; track planet.id) {
    <app-planet [index]="index" [label]="planet.name" [url]="planet.html_url"></app-planet>
    }
    <app-star [type]="0"></app-star>
    <app-star [type]="1"></app-star>
    <app-star [type]="2"></app-star>
    <app-star [type]="3"></app-star>
  `,
  styles: [
    `
      :host {
        background: linear-gradient(to bottom, #000, #111);
        width: 100%;
        height: 100%;
        perspective: 600px;
        display: block;
      }

      #sun {
        position: absolute;
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
        width: 3rem;
        aspect-ratio: 1/1;
        background: radial-gradient(
          circle,
          #a9870c 0%,
          #f9d71c 50%,
          #f9d71c 100%
        );
        border-radius: 50%;
        transform-style: preserve-3d;
        z-index: 200;
      }
    `,
  ],
})
export class CostellationComponent {
  planets = resource({loader: ()=>fetch("https://api.github.com/users/frabaddo/repos").then(res => res.json())});
}
