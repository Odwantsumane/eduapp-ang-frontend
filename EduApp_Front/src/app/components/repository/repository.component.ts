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
  //folderLoading : boolean = false;
  foldersLoading : boolean = false;
  loadFoldersErr : boolean = false;
  scienceFolderLoading : boolean = false;

  folderLoading = {
    lawFolderLoading: false,
    lawFolderFailLoading: false,
    scienceFolderLoading: false,
    scienceFolderFailLoading: false,
    humanitiesFolderLoading: false,
    humanitiesFolderFailLoading: false,
    itFolderLoading: false,
    itFolderFailLoading: false,
    otherFolderLoading: false, 
    otherFolderFailLoading: false,
  }


  constructor(private folderservice: FolderService, private autheservice: AuthenticateService){}
  
  async ngOnInit() {

    this.current_user = (await this.autheservice.isLoggedInGetUser()).username || "unknown";

    this.getAllFolders();
  }

  async addFolder(newFolder:folder) { 
    try { 
      this.setFolderLoading(newFolder.course.toLowerCase(), false);

      this.folder_list.push(newFolder);
      this.cleanFolders();
      this.distribute_folders();

      this.stopFolderLoading();
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to get folder, " + `${e}`);
      this.stopFolderLoadingFail(newFolder.course.toLowerCase());
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
    this.foldersLoading = true;
    try {
      this.folder_list = await this.folderservice.getAllFolders();  
      this.distribute_folders();
      this.foldersLoading = false;
    } catch (e) {
      console.log(`${new Date()}: `+ "Failed to get folders, " + `${e}`);
      this.foldersLoading = false;
      this.loadFoldersErr = true;
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

  setFolderLoading(course:string, action:boolean):void {
    switch (course) {
      case "science":
        this.folderLoading.scienceFolderLoading = true;
        this.folderLoading.scienceFolderFailLoading = action;
        break;
      case "humanities":
        this.folderLoading.humanitiesFolderLoading = true;
        this.folderLoading.humanitiesFolderFailLoading = action;
        break;
      case "law":
        this.folderLoading.lawFolderLoading = true;
        this.folderLoading.lawFolderFailLoading = action;
        break;
      case "it":
        this.folderLoading.itFolderLoading = true;
        this.folderLoading.itFolderFailLoading = action;
        break; 
      default: 
        this.folderLoading.otherFolderLoading = true;
        this.folderLoading.otherFolderFailLoading = action;
        break;
    }
  }
  stopFolderLoading() {
    this.folderLoading.scienceFolderLoading = false;this.folderLoading.humanitiesFolderLoading = false;
    this.folderLoading.lawFolderLoading = false;this.folderLoading.itFolderLoading = false;
    this.folderLoading.otherFolderLoading = false;
  }

  stopFolderLoadingFail(course:string) {
    this.setFolderLoading(course, true);
    this.stopFolderLoading();
  }



}
