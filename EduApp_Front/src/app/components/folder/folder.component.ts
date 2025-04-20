import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { file } from '../../services/Folder/File/api.file.service';
import { FileService } from '../../services/Folder/File/file.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { User } from '../../services/userrequest.service';
import { FolderService } from '../../services/Folder/folder.service';
import { folder } from '../../services/Folder/api.service';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css'
})
export class FolderComponent {

  id: string =  "";
  file : File | null = null;
  user: User | null = null;
  allFiles: Array<file> = [];
  filteredFiles: Array<file> = [];
  loading:boolean = false;
  failLoadingMessage:boolean = false;
  today = new Date();
  yesterday = new Date();
  grid:boolean = window.sessionStorage.getItem("grid_studyo") === "true" ? true:false;
  list:boolean = false;
  current_folder:folder | null = null;

  file_obj = {
    id: "",
    name:"",
    type: "",
    folderId: this.id ? this.id : "",
    createdBy: this.user?.id ? this.user?.id : "",
    group: "",
    createdAt:"",
    filepath:""
  }

  constructor(private route: ActivatedRoute, private FileMiddleManService: FileService, private authservice: AuthenticateService,
    private folders: FolderService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ""; // Get the 'id' from the URL 
    this.getuserInfo();
    this.getAllFiles();
    this.getAllFilesFiltered(this.id);
    this.current_folder = await this.folders.getFolder(this.id); 
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
    else console.error("failed to retrieve, files");
  }

  async uploadFile() {
    this.loading = true;
    this.file_obj.folderId = this.id ? this.id : ""; 
    if (this.file) {
      const newFile = await this.FileMiddleManService.fileUpload(this.file, this.file_obj);
      if(newFile) this.filteredFiles.push(newFile); 
      else {console.error("failed to upload the file"); this.failLoadingMessage = true;}
      this.loading = false;
      this.failLoadingMessage = false;
    }

    if(this.loading) {
      this.loading = false;
      this.failLoadingMessage = true;
    }
  } 

  async getuserInfo() {
    await this.authservice.isLoggedInGetUser(); 
  }

  changeLayout(layout:string) {
    if(layout === "grid"){
      this.grid = true;
      this.list = false;
      window.sessionStorage.setItem(layout+"_studyo", "true"); 
    } else {
      this.grid = false;
      this.list = true; 
      window.sessionStorage.setItem("grid_studyo", "false");
    }
      
  }
}
