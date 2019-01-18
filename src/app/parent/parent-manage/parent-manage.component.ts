import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '@app/base/base-edit.component';
import { Parent } from '@app/parent/parent';
import { ParentService } from '@app/parent/parent.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'parent-manage',
  templateUrl: './parent-manage.component.html',
  styleUrls: ['./parent-manage.component.scss']
})
export class ParentManageComponent extends BaseEditComponent<Parent> implements OnInit {

  constructor(protected ParentService: ParentService,
    protected route: ActivatedRoute, protected router: Router) {
    super(ParentService, route, router, 'Parents')
    //this.createForm();
  }

  ngOnInit() {
    super.ngOnInit()
  }

}