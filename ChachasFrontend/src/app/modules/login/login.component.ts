import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup ;
  loading = false;
  submitted = false;
  returnUrl: string ="";
  
  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appHttpService: AppHttpService
    ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

 
  ngOnInit() {
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;


      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.f['username'].value+"  "+this.f['password'].value)
      this.appHttpService.login({user:this.f['username'].value, pass:this.f['password'].value})
          .subscribe(
              data => {
                console.log(data);
                this.router.navigate([this.returnUrl]);
              });
  }

}
