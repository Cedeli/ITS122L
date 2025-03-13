import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  formatDate(dateField: any): string {
    let formattedDate = '';
    if (dateField instanceof Timestamp) {
      formattedDate = dateField.toDate().toLocaleDateString();
    } else if (dateField && typeof dateField.toDate === 'function') {
      formattedDate = dateField.toDate().toLocaleDateString();
    } else if (dateField instanceof Date) {
      formattedDate = dateField.toLocaleDateString();
    } else if (dateField) {
      formattedDate = String(dateField);
    }
    return formattedDate;
  }
}
