export class Cell {
    constructor(r, c, type) {
        this.r = r;
        this.c = c;
        this.type = type;
        this.dom = this.createDOM();
    }

    createDOM() {
        const el = document.createElement('div');
        el.className = 'cell';
        el.innerHTML = this.type;

        //adding colors to elements
        if (this.type === '&hearts;' || this.type === '&diams;' ) {
            el.style.color = '#a91605';
        } else {
            el.style.color = '#000000';
        }

        return el;
    }
    //deleting or better to say blowing up element
    boom() {
        this.dom.classList.add('disappear');
        this.type = null;
        setTimeout(() => {
            this.dom.style.visibility = 'hidden';
        }, 300);

    }
}