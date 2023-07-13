import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: "./star.component.html",
    styleUrls: ["./star.component.css"],

})
export class StarComponent implements OnChanges {
    onClick() : void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked !!`);
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.cropWidth = this.rating * 75/5;
    }
    @Input() rating = 4
    cropWidth = 50;

    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
}