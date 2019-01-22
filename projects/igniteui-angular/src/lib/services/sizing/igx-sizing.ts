import { Injectable } from "@angular/core";


@Injectable()
export class IgxSizingService {

    public constructor() {

    }
  /**
     * @hidden
     */
    public get horizontalChunkSize(): number {
        if (!this._horizontalChunkSize) {
            this._horizontalChunkSize = this.getCalcHorizontalSize(this.notGroups(this.unpinnedColumns));
        }
        return this._horizontalChunkSize;
    }

     /**
     * @hidden
     */
    public get headerChunkSize(): number {
        if (!this._headerChunkSize) {
            this._headerChunkSize = this.getCalcHorizontalSize(this.onlyTopLevel(this.unpinnedColumns));
        }
        return this._headerChunkSize;
    }

    public chunkGenerated(event) {
        this.calcHeight = event > 0 ? event : this.rowHeight;
        requestAnimationFrame(() => {
            if (!this._destroyed) {
                this.reflow();
            }
        });
    }

    /**
     * @hidden
     */
    protected getCalcHorizontalSize(columns): number {
        let i = 0;
        let length = 0;
        let maxLength = 0;
        const arr = [];
        let sum = 0;
        const reducer = (accumulator, currentItem) => accumulator +
            (currentItem.width === 'Infinity' ? Infinity : parseInt(currentItem.width, 10));
        const availableSize = this.unpinnedWidth;
        for (i; i < columns.length; i++) {
            const column = columns[i];
            sum = arr.reduce(reducer, column.width === 'Infinity' ? Infinity : parseInt(column.width, 10));
            if (isNaN(sum)) {
                return maxLength;
            }
            if (sum <= availableSize) {
                arr.push(column);
                length = arr.length;
                if (i === columns.length - 1) {
                    // reached end without exceeding
                    // include prev items until size is filled or first item is reached.
                    let prevIndex = columns.indexOf(arr[0]) - 1;
                    while (prevIndex >= 0 && sum <= availableSize) {
                        prevIndex = columns.indexOf(arr[0]) - 1;
                        if (prevIndex < 0) {
                            maxLength++;
                            return maxLength;
                        }
                        const prevItem = columns[prevIndex];
                        sum = arr.reduce(reducer, parseInt(prevItem.width, 10));
                        arr.unshift(prevItem);
                        length = arr.length;
                    }
                }
            } else {
                arr.push(column);
                length = arr.length + 1;
                arr.splice(0, 1);
            }
            if (length > maxLength) {
                maxLength = length;
            }
        }
        return maxLength;
    }

}