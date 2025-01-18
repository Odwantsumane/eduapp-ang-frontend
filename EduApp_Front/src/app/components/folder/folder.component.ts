import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css'
})
export class FolderComponent {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Get the 'id' from the URL 
  }

  getAllFiles() {
    
  }
}
