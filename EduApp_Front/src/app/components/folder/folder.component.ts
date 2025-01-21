import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { file } from '../../services/Folder/File/api.file.service';
import { FileService } from '../../services/Folder/File/file.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { User } from '../../services/userrequest.service';

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
  user: User | null = null;
  allFiles: Array<file> = [];
  filteredFiles: Array<file> = [];
  file_obj = {
    _id: "",
    name:"",
    type: "",
    folderId: this.id ? this.id : "",
    createdBy: this.user?._id ? this.user?._id : "",
    group: "",
    createdAt:"",
    filepath:""
  }

  constructor(private route: ActivatedRoute, private FileMiddleManService: FileService, private authservice: AuthenticateService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Get the 'id' from the URL 
    this.getuserInfo();
    this.getAllFiles();
    this.getAllFilesFiltered(this.id);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0]; 
      this.file_obj.name = selectedFile.name; 
      this.file_obj.type = selectedFile.type; 
      this.file = selectedFile;
    }
  }

  async getAllFiles() {
    this.allFiles = await this.FileMiddleManService.getAllFiles();
  }

  async getAllFilesFiltered(folderId: string | null) {
    if(folderId) this.filteredFiles = await this.FileMiddleManService.getAllFilesFiltered(folderId);
    else console.log("failed to retrieve, files");
  }

  async uploadFile() {
    this.file_obj.folderId = this.id ? this.id : "";
    if (this.file) {
      const newFile = await this.FileMiddleManService.fileUpload(this.file, this.file_obj);
      if(newFile) this.filteredFiles.push(newFile); 
      else console.log("error: failed to upload the file");
    }
  } 

  async getuserInfo() {
    await this.authservice.isLoggedInGetUser(); 
  }
}
