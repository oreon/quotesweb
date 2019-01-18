import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService, I18nService } from '@app/core';
import { UserService } from '@app/base/user.service';
// import { User } from "@app/core/roles";
import { ParentService } from '@app/parent/parent.service';
import { Parent } from '@app/parent/parent';
import { LoginComponent } from '@app/login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
  loginForm: FormGroup;
  isLoading = false;

  showRegister = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private parentService: ParentService,
    private fms: FlashMessagesService,
    public loginComp: LoginComponent
  ) {
    this.createForm();
  }

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  login() {
    this.isLoading = true;
    const email = this.loginForm.get('username').value;
    this.authenticationService
      .register(email, this.loginForm.get('password').value)
      .then((x: any) => {
        // these lines are needed for linking  users to their profiles
        this.authenticationService.afAuth.user.subscribe(
          (x: any) =>
          this.parentService.upsert(x.uid,  <Parent>({ email: email }))
        );
        // this.authenticationService.localUser = x.user
        this.fms.show('successfully registered', { cssClass: 'alert alert-success' });
        this.router.navigate(['/'], { replaceUrl: true });
        this.isLoading = false;
      })
      .catch((e: any) => {
        console.log(`register error: ${e}`);
        this.isLoading = false;
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['ss@ss.com', Validators.required],
      password: ['password', Validators.required],
      remember: true
    });
  }
}
