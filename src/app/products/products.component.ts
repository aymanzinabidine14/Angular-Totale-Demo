import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  public products :Array<Product>=[];
  public keyword : string="";

  public totalPages:number=0;
  public pageSize:number=3;
  public currentPage:number=1;

  constructor(private productService:ProductService,
              private router:Router,
  ) {

  }

  ngOnInit() {
    this.searchProduct();
  }

  searchProduct(){
    this.productService.searchProduct(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next:(resp)=>{
          this.products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          this.totalPages=Math.floor(totalProducts / this.pageSize);

          if(totalProducts % this.pageSize !=0){
            this.totalPages=this.totalPages+1;
          }
          console.log(this.totalPages);
        },
        error:err => {
          console.log(err)
        }})}


  handleCheckProduct(product:Product){
    this.productService.checkProduct(product).subscribe({
    next:updatedProduct=>{
    product.checked=!product.checked;
    }
    })
  }


  handleDeleteProduct(product: Product) {
    if(confirm("Etes vous sure ?"))
    this.productService.deleteProduct(product).subscribe({
        next:value => {
          this.products=this.products.filter(p=>p.id!=product.id);
        }
      }
    )

  }



  handleGotoPage(page: number) {
    this.currentPage=page;
    this.searchProduct();

  }

  handleUpdateProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
