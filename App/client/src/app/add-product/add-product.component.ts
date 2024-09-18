import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product = { id: '', name: '', description: '', price: '', units: '' };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(): void {
    // Ensure all fields are filled out
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

    // Prepare the new product data
    const newProduct = {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      price: parseFloat(this.product.price), // Ensure price is a number
      units: parseInt(this.product.units), // Ensure units is an integer
    };

    // Call the service to add the product
    this.productService.addProduct(newProduct).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error adding product:', error);
        if (error.error && error.error.error) {
          // If the backend returned an error message, display it
          alert('Failed to add product: ' + error.error.error);
        } else {
          // If no specific error message, display a generic error
          alert('Failed to add product: Unknown error');
        }
      }
    );
  }
}
