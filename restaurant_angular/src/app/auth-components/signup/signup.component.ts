import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/auth-services/auth-serive/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isSpinning: boolean;
  ValidateForm: FormGroup;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if(!control.value){
      return { required: true };
    } else if(control.value !== this.ValidateForm.controls['password'].value) {
      return { confirm: true, error: true }
    }
    return {};
  }

  constructor(private service: AuthService,
    private fb: FormBuilder,
    private notification: NzNotificationService) { }

    ngOnInit() {
      this.ValidateForm = this.fb.group({
        email: ["", Validators.required],
        password: ["", Validators.required],
        checkPassword: ["", [Validators.required, this.confirmationValidator]],
        name: ["", Validators.required],
      })
    }

    register(){
    console.log(this.ValidateForm.value);
    this.service.signup(this.ValidateForm.value).subscribe((res) =>{
      console.log(res);
      if(res.id != null){
      this.notification.success("SuCCESS", "You're registered successfully", {nzDuration: 5000});
      }
      else {
        this.notification.success("ERROR", "Something went wrong", {nzDuration: 5000});
      }
    })
    }

}
