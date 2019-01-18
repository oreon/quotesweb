
import { Component, OnInit } from '@angular/core';

import { Parent} from "../parent";

import { BaseViewComponent } from '@app/base/base-view.component';


@Component({
selector: 'parent-view',
templateUrl: './parent-view.component.html',
styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent extends BaseViewComponent<Parent> implements OnInit {


}