import { Component, OnInit } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms'
import { Customer } from './customer';

//--- Custom Validator without parameters 
// function ratingRange(control: AbstractControl): { [key: string]: boolean } | null {
//     if (control.value != undefined && (isNaN(control.value) || control.value < 1 || control.value > 5))
//         return { 'range': true };
//     else
//         return null;
// }

function ratingRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value != undefined && (isNaN(control.value) || control.value < min || control.value > max))
            return { 'range': true };
        else
            return null;
    }
}

function emailMatcher(control: AbstractControl): { [key: string]: boolean } | null {
    let email = control.get('email');
    let confirmEmail = control.get('confirmEmail');

    if (email.pristine || confirmEmail.pristine) {
        return null;
    }
    if (email.value === confirmEmail.value) {
        return null;
    }
    return { match: true };
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {

    customer: Customer = new Customer();
    customerForm: FormGroup;

    constructor(private fb: FormBuilder) {

    }


    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', [Validators.required]],
            }, { validator: emailMatcher }),
            phone: '',
            notification: 'email',
            rating: ['', ratingRange(1, 5)],
            sendCatalog: true
        });

        this.customerForm.get('notification').valueChanges
                        .subscribe(value => this.setNotification(value));

    }

    save(): void {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
    setNotification(notifyVia: string): void {
        let phoneControl = this.customerForm.get('phone');
        if (notifyVia === "text")
            phoneControl.setValidators(Validators.required);
        else
            phoneControl.clearValidators();
        phoneControl.updateValueAndValidity();
    }

    // --Template Driven Code--

    // save(customerForm: NgForm) {
    //     console.log(customerForm.form);
    //     console.log('Saved: ' + JSON.stringify(customerForm.value));
    // }
}
