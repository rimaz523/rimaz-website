import { Component, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { PageTitleComponent } from '@core/layout/page-title/page-title.component'
import { ContactService } from './contact.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  ButtonTexts,
  ErrorMessages,
  Messages,
  OperationStatus,
  ValidationMessages,
} from '@shared/constants/app.constants'

@Component({
  selector: 'rmz-contact',
  imports: [
    PageTitleComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private contactService = inject(ContactService)
  private fb = inject(FormBuilder)
  private snackBar = inject(MatSnackBar)
  readonly status = signal<OperationStatus>(OperationStatus.idle)

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    content: ['', Validators.required],
  })
  buttonTexts = ButtonTexts
  validationMessages = ValidationMessages

  onSubmit() {
    if (this.contactForm.valid) {
      this.status.set(OperationStatus.loading)
      this.contactService.sendMessage(this.contactForm.getRawValue()).subscribe({
        next: response => {
          if (response.status === OperationStatus.success) {
            this.status.set(OperationStatus.success)
            this.resetForm()
            this.openSnackBar(Messages.contactSuccess)
          } else {
            this.status.set(OperationStatus.error)
            this.resetForm()
            this.openSnackBar(
              response.error?.message ?? `${ErrorMessages.unknown} ${Messages.tryAgainLater}`,
            )
          }
        },
      })
    }
  }

  resetForm() {
    this.contactForm.reset()
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.setErrors(null)
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, ButtonTexts.dismiss, {
      duration: 5000,
    })
  }
}
