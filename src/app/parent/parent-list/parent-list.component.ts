
import { Component, OnInit } from '@angular/core';
import { Parent } from "../parent";
import {Router} from "@angular/router";
import { ParentService} from "../parent.service";
import { BaseListComponent } from '../../base/base-list.component';
import { BaseEntity } from '../../base/base';

@Component({
selector: 'app-parent-list',
templateUrl: './parent-list.component.html',
styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent extends BaseListComponent<Parent>
    implements OnInit {

    constructor(protected parentService: ParentService, protected router: Router) {
        super(parentService, router)
    }
}