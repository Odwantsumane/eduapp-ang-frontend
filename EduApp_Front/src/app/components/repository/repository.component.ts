import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent implements OnInit {

  science : boolean = true;
  humanities : boolean = true;
  law : boolean = true;
  it : boolean = true;
  other : boolean = true;

  constructor(){}

  ngOnInit(): void {
    
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
