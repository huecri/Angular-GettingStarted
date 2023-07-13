import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    errorMessage = '';
    sub!: Subscription;

    constructor(private productService: ProductService) {
    }


    onRatingClicked(message: string) : void {
        this.pageTitel = "Product List: " + message;
    }

    pageTitel = "Product List";
    imageWidth = 50;
    imageMargin = 2;
    showImages = false;
    private _listFilter = "";

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value)
    }

    toggleImages() : void{
        this.showImages = !this.showImages;
    }

    performFilter(filterBy: string ) : IProduct[]  {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy))
    }
    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    ngOnInit(): void {
        this.sub = this.productService.getProducts()
        .subscribe({next: products => {
            this.products = products;
            this.filteredProducts = this.products;
        } , error: err => this.errorMessage = err});
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}