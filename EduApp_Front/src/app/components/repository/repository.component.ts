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
  removed_folder : folder | null = null;
  folder_list:Array<folder> = [];

  science_arr : Array<folder> = [];
  humanities_arr : Array<folder> = [];
  law_arr : Array<folder> = [];
  it_arr : Array<folder> = [];
  other_arr : Array<folder> = [];


  constructor(private folderservice: FolderService, private autheservice: AuthenticateService){}
  
  async ngOnInit() {

    this.current_user = (await this.autheservice.isLoggedInGetUser()).username || "unknown";

    this.getAllFolders();
  }

  async addFolder(newFolder:folder) { 
    try { 
      this.folder_list.push(newFolder);
      this.cleanFolders();
      this.distribute_folders();
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to get folder, " + `${e}`);
    }   
  }

  cleanFolders() {
    this.science_arr = [];
    this.humanities_arr = [];
    this.law_arr = [];
    this.it_arr = [];
    this.other_arr = [];
  }
  
  async getAllFolders() { 
    try {
      this.folder_list = await this.folderservice.getAllFolders();  
      this.distribute_folders();
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to get folders, " + `${e}`);
    }   
  }

  async removeFolder(id:string) {
    try { 
      this.removed_folder = await this.folderservice.removeFolder(id);
      this.folder_list = await this.folderservice.getAllFolders();  
      this.cleanFolders();
      this.distribute_folders();
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to remove folder, " + `${e}`);
    } 
  }

  distribute_folders() {
    this.folder_list.forEach(folder => {
      switch (folder.course.toLowerCase()) {
        case "science":
          this.science_arr.push(folder);
          break;
        case "humanities":
          this.humanities_arr.push(folder);
          break;
        case "law":
          this.law_arr.push(folder);
          break;
        case "it":
          this.it_arr.push(folder);
          break; 
        default:
          this.other_arr.push(folder);
          break;
      }
    })
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
