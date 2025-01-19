import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css'
})
export class FolderComponent {

  id: string | null = null;
  file : File | null = null;
  file_obj = {
    name:"",
    file: this.file
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Get the 'id' from the URL 
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      this.file_obj.file = selectedFile;
      this.file_obj.name = selectedFile.name; 
      this.file = selectedFile;
    }
  }

  getAllFiles() {
    
  }

  uploadFile() {
    console.log(this.file);
  }
}
