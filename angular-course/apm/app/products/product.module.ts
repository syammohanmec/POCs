import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductFilterPipe } from "./product-filter.pipe";
import { RouterModule } from "@angular/router";
import { ProductDetailGuard } from "./product-guard.service";
import { ProductService } from "./product.service";
import { SharedModule } from "../shared/shared.module";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
    imports: [SharedModule,
        ProductRoutingModule
    ],
    declarations: [ProductListComponent, ProductDetailComponent, ProductFilterPipe],
    providers: [ProductService, ProductDetailGuard]
})
export class ProductModule {

}