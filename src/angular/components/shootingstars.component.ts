import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-shooting-stars-labels',
    imports: [],
    template: `
        @for(label of labelWithMeta(); track $index){
            <span class="label" style="--depth: {{label.deepth}}; --x: {{label.x}}; --y: {{label.y}};"><div class="animated" style="--animation-duration: {{label.animationDuration}}s; --animation-delay: {{label.delay}}s;">{{label.label}}</div></span>
        }
    `,
    styles: [`
        :host{
            position: fixed;
            inset: 0;
            color: white;
            transform-style: preserve-3d;
            perspective: 800px;
            opacity: 0.3;
            pointer-events: none;
            transform: translateY(400px);
        }
        span.label{
            position: absolute;
            top: calc(var(--y) * 1%);
            left: calc(var(--x) * 1%);
            transform: translateZ(calc(var(--depth) * 1px));
            color: white;
            font-size: 6rem; 
            overflow: visible;
            opacity: calc(0.00003 * var(--depth) * -1 + 0.3);
        }
        .animated{
            transform: translateY(0);
            opacity: 0;
            overflow: visible;
            white-space: nowrap;
            animation: animStar var(--animation-duration) linear infinite;
            animation-delay: var(--animation-delay);

        }
        @keyframes animStar {
            0% {
                transform: translateY(0);
                opacity: 0;
            }
            20%{
                opacity: 1;
            }
            to {
                transform: translateY(-2000px);
            }
        }
    `]
})
export class ShootingStarsComponent {
    labels = input<string[]>([]);
    labelWithMeta = computed(()=>[
        ...(new Array(3).fill([]).map(()=>this.labels().map((label)=>this.createLabelMeta(label))).flat(Infinity))
    ])

    createLabelMeta(label: string){
        let time = Math.random() * 10 + 20
        return {
            label,
            deepth: -1 * Math.random() * 3000 - 200,
            animationDuration: time,
            x: Math.random() * 200 - 80,
            y: Math.random() * 220 - 100,
            delay: Math.random() * time + ((Math.random() > 0 ? 0 : 1) * time) + ((Math.random() > 0 ? 0 : 1) * time) 
        }
    }
}