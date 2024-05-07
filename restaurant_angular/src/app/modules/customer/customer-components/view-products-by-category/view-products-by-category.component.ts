import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../customer-service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-products-by-category',
  templateUrl: './view-products-by-category.component.html',
  styleUrls: ['./view-products-by-category.component.scss']
})
export class ViewProductsByCategoryComponent {

  categoryId: number = this.activateRoute.snapshot.params['categoryId'];
  Products = [];
  validateForm: FormGroup;
  isSpinning: boolean = false;
  size: NzButtonSize = 'large';

  constructor(private activateRoute: ActivatedRoute,
  private service: CustomerService,
private fb: FormBuilder) { }

  ngOnInit(){
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  submitForm() {
    this.isSpinning = true;
    this.Products = [];
    this.service.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value).subscribe((res) =>{
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
        this,this.isSpinning = false;
      });
    });
  }

  getProductsByCategory(){
    this.service.getProductsByCategory(this.categoryId).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = "data:image/jpeg;base64," + element.returnedImg;
        this.Products.push(element);
      })
    })
  }

}
