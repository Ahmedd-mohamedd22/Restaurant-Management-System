import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  postCategory(){
  console.log(this.categoryForm.value);
  const formdata: FormData = new FormData();
  formdata.append("img", this.selectedFile);
  formdata.append("name", this.categoryForm.get("name").value)
  formdata.append("description", this.categoryForm.get("description").value)
  this.service.postCategory(formdata).subscribe(
    (res) => {
      console.log(res);
      if(res.id != null) {
        this.message.success("Category Posted Successfully",{nzDuration: 5000});
      } else if(res.id == null){
        this.message.error("Something went wrong",{nzDuration: 5000});
      }
    }
  )
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
  };
  reader.readAsDataURL(this.selectedFile);
}

}
