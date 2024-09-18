import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product = { id: '', name: '', description: '', price: '', units: '' }; // Including id field for form
  id: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route
    this.id = this.route.snapshot.paramMap.get('id') || '';

    // Fetch the existing product details using the ID
    this.productService.getProducts().subscribe((products: any[]) => {
      const existingProduct = products.find((p) => p._id === this.id);
      if (existingProduct) {
        // Assign the product details to the form
        this.product = {
          id: existingProduct.id,
          name: existingProduct.name,
          description: existingProduct.description,
          price: existingProduct.price,
          units: existingProduct.units,
        };
      }
    });
  }

  updateProduct(): void {
    if (
      !this.product.id ||
      !this.product.name ||
      !this.product.description ||
      !this.product.price ||
      !this.product.units
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProduct = {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      price: parseFloat(this.product.price),
      units: parseInt(this.product.units),
    };

    this.productService.updateProduct(this.id, updatedProduct).subscribe(
      (response) => {
        console.log(response); // Check the successful response
        this.router.navigate(['/products']); // Navigate back to the products list after updating
      },
      (error) => {
        console.error('Error updating product:', error);
        alert(
          'Failed to update product: ' +
            (error.error.message || 'Unknown error')
        );
      }
    );
  }
}
