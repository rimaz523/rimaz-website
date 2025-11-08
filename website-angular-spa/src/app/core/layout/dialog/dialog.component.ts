import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'rmz-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  data = inject<{
    title: string
    content: string
    hasPrimaryAction: boolean
    primaryAction: string
    primaryCallbackFn: () => void
  }>(MAT_DIALOG_DATA)
}
