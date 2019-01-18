
// import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {ActivatedRoute, Router} from "@angular/router";
// import { BaseEntity } from './base';
// import { BaseService } from './base.service';
// import { BaseComponent } from './base.component';

// export abstract class BaseAdd<T extends BaseEntity>  implements OnInit {
    
//     errorMessage: string;
    
//     //@Output() onNew = new EventEmitter<T>();
//     constructor(protected service: BaseService<T>, protected router: Router, 
//         protected url:string) {
        
//     }
    
//     ngOnInit() {}
    
//     onSubmit(t: T){
//         console.log(t)
//         this.service.add(t).subscribe(
//             new_user => {
//             this.onBack()
//             },
//             error => this.errorMessage = <any>error
//         );
//     }
    
//     onBack() {
//         this.router.navigate(['/' + this.service.url]);
//     }
// }