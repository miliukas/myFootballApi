import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  readonly BaseURI = 'https://localhost:44369/api';

  formModel = this.fb.group({
    UserName :['', Validators.required],
    Email :['', [Validators.email, Validators.required]],
    Passwords : this.fb.group({
      Password :['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword :['', Validators.required]
    }, { validator : this.comparePasswords })
  });

  comparePasswords(fb:FormGroup)
  {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPaswdCtrl.errors = {required:true}
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors)
    {
      if(fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({passwordMismatch : true});
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register()
  {
    var body ={
      username: this.formModel.value.UserName,
      password: this.formModel.value.Passwords.Password,
      email: this.formModel.value.Email
    };
    return this.http.post(this.BaseURI + '/Users', body);
  }

  login(formData)
  {
    return this.http.post(this.BaseURI + '/authentication', formData);
  }

  getUserProfile()
  {
    
    return this.http.get(this.BaseURI+'/profile');
  }
}
