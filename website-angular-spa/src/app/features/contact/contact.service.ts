import { Injectable } from '@angular/core'
import { IMessage } from './message.model'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  sendMessage(message: IMessage) {
    console.log(message)
  }
}
