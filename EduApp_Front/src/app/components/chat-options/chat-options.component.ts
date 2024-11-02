import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-options.component.html',
  styleUrl: './chat-options.component.css'
})
export class ChatOptionsComponent {

}
