

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';


import { Quote } from "../quote";
import { QuoteService } from "../quote.service";
import { BaseEditComponent } from '@app/base/base-edit.component';
import { BaseFormComponent } from '@app/base/base-from.component';

@Component({
    selector: 'quote-add',
    templateUrl: './quote-add.component.html',
    styleUrls: ['./quote-add.component.css']
})
export class QuoteAddComponent extends BaseFormComponent<Quote> implements OnInit {

    quote: Quote;
    errorMessage: string;
    public quoteForm: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm(): void {
        this.quoteForm = this.fb.group({
            tags: ['', [Validators.required, ]],
            text: ['', [Validators.required, ]],
            explanation: ['', [Validators.required, ]],
            page: ['', [Validators.max(1430),
            ]],

        });
    }

    getForm() { return this.quoteForm };

    submit() {
        super.submit();
    }

    form2Entity() {
        super.form2Entity()
        this.entity.tags = this.f.tags.value.split(',')
    }

}
