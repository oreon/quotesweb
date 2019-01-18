import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Parent } from "../parent";

import { BaseFormComponent } from "@app/base/base-from.component";

@Component({
  selector: "parent-add",
  templateUrl: "./parent-add.component.html",
  styleUrls: ["./parent-add.component.css"]
})
export class ParentAddComponent extends BaseFormComponent<Parent> implements OnInit {
  //parent: Parent;

  public parentForm: FormGroup;

  ngOnInit() {

  }

  constructor(private fb: FormBuilder) {
    super();
    this.createForm();
  }

  private createForm(): void {
    this.parentForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      image: ["", []],
      email: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      bankInfo: ["", [Validators.required]]
    });
  }

  getForm() {
    return this.parentForm;
  }

  // submit() {
  //     super.onSubmit(this.entity);
  // }
}
