import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';  // Your backend API URL

  constructor(private http: HttpClient) { }

  // Fetch all products from the API
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add a new product to the API
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Update a product in the API
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product from the API
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
