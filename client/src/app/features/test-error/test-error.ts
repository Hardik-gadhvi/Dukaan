import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-test-error',
  imports: [
    MatButton
  ],
  templateUrl: './test-error.html',
  styleUrl: './test-error.scss'
})
export class TestError {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  validationErrors?:string[];

  get404Error() {
    this.http.get(this.baseUrl + 'error/notfound').subscribe({
      next: response => console.log('Success:', response),
      error: error => console.error('Error:', error)
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'error/badrequest').subscribe({
      next: response => console.log('Success:', response),
      error: error => console.error('Error:', error)
    });
  }
  get401Error() {
    this.http.get(this.baseUrl + 'error/unauthorized').subscribe({
      next: response => console.log('Success:', response),
      error: error => console.error('Error:', error)
    });
  }
  get500Error() {
    this.http.get(this.baseUrl + 'error/internalerror').subscribe({
      next: response => console.log('Success:', response),
      error: error => console.error('Error:', error)
    });
  }
  get400ValidationError() {
    this.http.post(this.baseUrl + 'error/validationerror', {}).subscribe({
      next: response => console.log('Success:', response),
      error: error => this.validationErrors = error
    });
  }
}
