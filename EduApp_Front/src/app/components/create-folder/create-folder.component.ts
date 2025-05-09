import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../../services/Folder/folder.service';
import { folder } from '../../services/Folder/api.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { User } from '../../services/userrequest.service';

@Component({
  selector: 'app-create-folder',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-folder.component.html',
  styleUrl: './create-folder.component.css'
})
export class CreateFolderComponent implements OnInit{

  @Output() dataEmitter: EventEmitter<folder> = new EventEmitter<folder>();

  folder : Array<folder> = [];
  current_user : string = "";

  newFolder  = {
    id:"",
    title: "",
    description: "",
    course: "none",
    year:"0000",
    university:"none",
    createdBy: this.current_user,
    createdAt: ""
  }

  create_fail_message = "Please fill in all the fields, , also 'title' chars < 5";
  create_fail_ind = false;
  filled_fill_ind = false;

  constructor(private folderservice: FolderService, private autheservice: AuthenticateService){}

  async ngOnInit() {

    this.current_user = (await this.autheservice.isLoggedInGetUser()).username || "unknown";
  }

  sendDataToParent(sendFolder:folder) {
    this.dataEmitter.emit(sendFolder);
  }

  async createFolder() {
    if(this.verify()) {
      try {
        // this.folder.push(await this.folderservice.createNewFolder(this.newFolder));
        this.sendDataToParent(await this.folderservice.createNewFolder(this.newFolder));
      } catch (e) {
        if (this.folder.length === 0) console.log(`${new Date()}: `+ "Failed to create folder, " + `${e}`)
      } 

      // clear fields
      this.newFolder.title = "";this.newFolder.description = "";this.newFolder.course = "";
      this.create_fail_ind = false;
    } else {
      this.create_fail_ind = true;
      console.log(`${new Date()}: `+ "Please fill in all the fields, also 'title' must be atleast > 5 chars");
    }
  }

 verify() {
  if (this.newFolder.title !== "" && this.newFolder.title.length > 5 && this.newFolder.course !== "none" && this.newFolder.year !== "0000" && this.newFolder.university !== "none") this.filled_fill_ind = true;  
  else this.filled_fill_ind = false;

  return this.filled_fill_ind;
 }
}
