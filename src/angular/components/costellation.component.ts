import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChildren,
} from "@angular/core";
import {
  animate
} from "motion";
import { StarComponent } from "./star.component";
import { PlanetComponent } from "./planet.component";

@Component({
  selector: "app-costellation",
  imports: [StarComponent, PlanetComponent],
  template: `
    <div id="sun"></div>
    @for(planet of planets(); let index = $index; track planet.id) {
        <app-planet [index]="index"></app-planet>
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
  planets = signal([
    {
      name: "Mercury",
      id: "Mercury",
      url: "",
    },
    {
      name: "Venus",
      id: "Venus",
      url: "",
    },
    {
      name: "Earth",
      id: "Earth",
      url: "",
    },
    {
      name: "Mars",
      id: "Mars",
      url: "",
    },
    {
      name: "Jupiter",
      id: "Jupiter",
      url: "",
    },
    {
      name: "Saturn",
      id: "Saturn",
      url: "",
    },
    {
      name: "Uranus",
      id: "Uranus",
      url: "",
    },
    {
      name: "Neptune",
      id: "Neptune",
      url: "",
    },
  ]);

  orbits = viewChildren<ElementRef<Element>>("orbit");
}
