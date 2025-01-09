import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateFolderComponent } from '../create-folder/create-folder.component';
import { FolderService } from '../../services/Folder/folder.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { folder } from '../../services/Folder/api.service';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, CreateFolderComponent],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent implements OnInit {

  science : boolean = true;
  humanities : boolean = true;
  law : boolean = true;
  it : boolean = true;
  other : boolean = true;
  folder : folder | null = null;
  current_user:string = "";
  folder_list:Array<folder> = [];

  constructor(private folderservice: FolderService, private autheservice: AuthenticateService){}
  
  async ngOnInit() {

    this.current_user = (await this.autheservice.isLoggedInGetUser()).username || "unknown";

    this.getAllFolders();
  }

  async getFolder(id:string) { 
    try { 
      this.folder_list.push(await this.folderservice.getFolder(id));
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to get folder, " + `${e}`);
    }   
  }
  
  async getAllFolders() { 
    try {
      this.folder_list = await this.folderservice.getAllFolders(); 
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to get folders, " + `${e}`);
    }   
  }

  OnFilter(filter: string) {
    this.humanities = false; this.law = false; this.it = false; this.other = false; this.science = false;

    switch (filter) {
      case "science":
        this.science = true;
        break;
      case "humanities":
        this.humanities = true;
        break;
      case "law":
        this.law = true;
        break;
      case "it":
        this.it = true;
        break;
      case "other":
        this.other = true;
        break; 
    
      default:
        this.humanities = true; this.law = true; this.it = true; this.other = true; this.science = true;
        break;
    }
  }



}
