
import { Component, OnInit } from '@angular/core';

import { Parent} from "../parent";
import { ParentService} from "../parent.service";
import {ActivatedRoute, Router} from "@angular/router";
import { BaseEditComponent } from '../../base/base-edit.component';


@Component({
selector: 'app-parent-edit',
templateUrl: './parent-edit.component.html',
styleUrls: ['./parent-edit.component.css']
})
export class ParentEditComponent extends BaseEditComponent<Parent> implements OnInit {
    parent: Parent;
    errorMessage: string;

    constructor(protected parentService: ParentService,
    protected route: ActivatedRoute,
    protected router: Router) {
    super(parentService, route, router, 'parents')
    }

}