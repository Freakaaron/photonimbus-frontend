import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(
    private uploadService: UploadService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSelectFile(event) {
    this.uploadService.uploadFile(event.target.files[0]).subscribe(data => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      alert(data["message"]);
      this.router.navigate(["/home"]);
    });
    event.stopPropagation();
  }

}
