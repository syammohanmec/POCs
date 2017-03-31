"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { NgForm } from '@angular/forms';
var forms_1 = require("@angular/forms");
var customer_1 = require("./customer");
//--- Custom Validator without parameters 
// function ratingRange(control: AbstractControl): { [key: string]: boolean } | null {
//     if (control.value != undefined && (isNaN(control.value) || control.value < 1 || control.value > 5))
//         return { 'range': true };
//     else
//         return null;
// }
function ratingRange(min, max) {
    return function (control) {
        if (control.value != undefined && (isNaN(control.value) || control.value < min || control.value > max))
            return { 'range': true };
        else
            return null;
    };
}
function emailMatcher(control) {
    var email = control.get('email');
    var confirmEmail = control.get('confirmEmail');
    if (email.pristine || confirmEmail.pristine) {
        return null;
    }
    if (email.value === confirmEmail.value) {
        return null;
    }
    return { match: true };
}
var CustomerComponent = (function () {
    function CustomerComponent(fb) {
        this.fb = fb;
        this.customer = new customer_1.Customer();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerForm = this.fb.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', [forms_1.Validators.required]],
            }, { validator: emailMatcher }),
            phone: '',
            notification: 'email',
            rating: ['', ratingRange(1, 5)],
            sendCatalog: true
        });
        this.customerForm.get('notification').valueChanges
            .subscribe(function (value) { return _this.setNotification(value); });
    };
    CustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent.prototype.setNotification = function (notifyVia) {
        var phoneControl = this.customerForm.get('phone');
        if (notifyVia === "text")
            phoneControl.setValidators(forms_1.Validators.required);
        else
            phoneControl.clearValidators();
        phoneControl.updateValueAndValidity();
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'my-signup',
        templateUrl: './app/customers/customer.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map