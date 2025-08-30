import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { PageTitleComponent } from '@core/layout/page-title/page-title.component'
import { ContactService } from './contact.service'

@Component({
  selector: 'rmz-contact',
  imports: [
    PageTitleComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private contactService = inject(ContactService)
  private fb = inject(FormBuilder)

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  })

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.getRawValue())
    }
  }
}
