
import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "./product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    templateUrl: 'product-detail.component.html',
    moduleId: module.id
})
export class ProductDetailComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;
    private sub : Subscription;
    constructor(private _route: ActivatedRoute, private _router: Router, private _productService : ProductService) {
    }
    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    getProduct(id: number) {
        return this._productService.getProductById(id)
                            .subscribe(p => this.product = p, err => this.errorMessage = <any>err);
    }

    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }

    onBack() : void {
        this._router.navigate(['/products']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = "Product Detail" + message;
    }

}