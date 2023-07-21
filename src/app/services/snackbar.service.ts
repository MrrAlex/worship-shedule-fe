import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  message(text: string) {
    this.snackBar.open(text)
  }

  error() {
    this.errorMessage('Что-то пошло не так, попробуйте снова')
  }

  private errorMessage(text: string) {
    this.snackBar.open(text, '', {
      panelClass: ['error-snackbar']
    })
  }
}
