import { Component } from '@angular/core';

@Component({
    selector: 'app-costellation',
    template: `
        <div>
            <h1>Costellation Component</h1>
            <p>This is the costellation component!</p>
        </div>
    `,
    styles: [`
        div {
            text-align: center;
            margin: 20px;
        }
        h1 {
            color: #3f51b5;
        }
    `]
})
export class CostellationComponent {}