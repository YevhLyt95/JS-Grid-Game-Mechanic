import { Cell } from "./Cell.js";

export class Board {
    constructor(rows, cols, containerId) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.container = document.getElementById(containerId);
        this.symbols = ['&spades;', '&clubs;', '&hearts;', '&diams;'];

        if (this.container) this.init();
    }

    init() {
        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = `repeat(${this.cols}, 60px)`;
        this.container.innerHTML = '';
        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.cols; c++) {
                const s = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                const cell = new Cell(r, c, s);

                cell.dom.onclick = () => {
                    console.log(`Click on cell: [${r}, ${c}], type: ${cell.type}`);
                    this.handleSelection(r, c);
                }

                this.grid[r][c] = cell;
                this.container.appendChild(cell.dom);
            }
        }
    }

    handleSelection(r, c) {
        const group = this.findGroup(r, c);
        console.log(`Group at the point [${r}, ${c}] has size: ${group.length}`);

        //min group of elements for deleting is 2 el

        if (group.length > 1) {
            group.forEach(cell => cell.boom());
        } else {
            console.log("Group is too small for deleting");
        }
    }

    //BFS algorithm
    findGroup(startR, startC) {
        const startCell = this.grid[startR][startC];
        if (!startCell || !startCell.type) return [];

        const targetType = startCell.type;

        //here I create queue:
        const q = [[startR, startC]];
        //pointer instead of shift() to reach O(1) during getting the element from queue

        let qi = 0;
        //object of js class Set for cells algorithm "visited"

        const seen = new Set();

        // here is empty array for saving results

        const found = [];

        seen.add(`${startR}:${startC}`);

        while (qi < q.length) {
            const [currR, currC] = q[qi++]
            const currentCell = this.grid[currR][currC];
            found.push(currentCell);

            //neighbors' coordinates:

            const nbrs = [
                [currR - 1, currC], [currR + 1, currC],
                [currR, currC - 1], [currR, currC + 1]
            ];

            for (const [nr, nc] of nbrs) {
                //just checking the board frames(ends)
                if (nr >= 0 && nr < this.rows && nc >=0 && nc < this.cols) {
                    const neighbor = this.grid[nr][nc];
                    const id = `${nr}:${nc}`;

                    if (!seen.has(id) && neighbor.type === targetType) {
                        seen.add(id);
                        q.push([nr, nc]);
                    }
                }
            }
        }
        return found;

    }
}