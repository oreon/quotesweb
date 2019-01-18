import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { FlashMessagesService } from 'angular2-flash-messages';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  showRegister = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private fms: FlashMessagesService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .then((x: any) => {
        //this.authenticationService.localUser = x.user
        this.fms.show("success", { cssClass: 'alert alert-success'})
        this.router.navigate(['/'], { replaceUrl: true })
        this.isLoading = false;
      }
      ).catch(e => {
        log.debug(`Login error: ${e}`);
        this.isLoading = false;
      });

    // .pipe(finalize(() => {
    //   this.loginForm.markAsPristine();
    //   this.isLoading = false;
    // }))
    // .subscribe((credentials:any) => {
    //   log.debug(`${credentials.username} successfully logged in`);
    //   this.router.navigate(['/'], { replaceUrl: true });
    // }, (error:any) => {
    //   log.debug(`Login error: ${error}`);
    //   this.error = error;
    // });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['onkar@followclass.com', Validators.required],
      password: ['password', Validators.required],
      remember: true
    });
  }

}
