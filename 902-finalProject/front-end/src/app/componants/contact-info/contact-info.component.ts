import { Component } from '@angular/core';
// @ts-ignore


import {ContactInfo} from '../../../model/contact-info';
import {ContactInfoService} from '../../../service/contact-info.service'; // Import your DTO model

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  contactInfo: ContactInfo = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  message: { text: string, type: string } | null = null;
  constructor(private contactInfoService: ContactInfoService) {}

  onSubmit(): void {
    if (this.contactInfo.name && this.contactInfo.email && this.contactInfo.subject && this.contactInfo.message) {
      this.contactInfoService.saveMessage(this.contactInfo).subscribe(
        (response) => {
          // Set the success message
          this.message = {
            text: 'Message sent successfully!',
            type: 'alert-success'
          };
          // Optionally reload the page and clear the form data after some delay
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          // Set the error message
          this.message = {
            text: 'Failed to send message. Please try again later.',
            type: 'alert-danger'
          };
        }
      );
    } else {
      // Display a message if the form is not complete
      this.message = {
        text: 'Please fill out all required fields.',
        type: 'alert-danger'
      };
    }
  }
}
