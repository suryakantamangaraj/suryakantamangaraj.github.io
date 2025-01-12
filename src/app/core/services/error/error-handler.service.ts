import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IErrorResponse } from '../../models/error.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error: Error | HttpErrorResponse) {
    let errorResponse: IErrorResponse;

    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      errorResponse = {
        message: error.message,
        status: error.status,
        timestamp: new Date(),
        path: error.url || window.location.pathname
      };
    } else {
      // Client Error
      errorResponse = {
        message: error.message,
        timestamp: new Date(),
        path: window.location.pathname
      };
    }

    console.error('Error occurred:', errorResponse);
    // Add error logging service call here
  }
}