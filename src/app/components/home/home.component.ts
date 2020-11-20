import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo/photo.service';
import {  ImageComponent } from 'src/app/components/image/image.component';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(ImageModalComponent, {static: false}) imageModalComponent;
  @ViewChild('searchTerm', {static: false}) searchTerm;
  username: string = sessionStorage.getItem("username");
  images: string[];
  pages: number[] = [];
  image = {};
  startingIndex: number = 0;
  endingIndex: number = 15;
  annotations: string[] = [];

  constructor(
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    ) {
   }

  ngOnInit() {
    this.photoService.get().subscribe(data => {
      this.initialize(data);
    });
  }

  transform(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

  displayPage(event) {
    let ref = Number(event.target.innerText);
    this.startingIndex = 15 * (ref - 1);
    this.endingIndex = 15 * (ref);
    this.images = this.photoService.images.slice(this.startingIndex, this.endingIndex);
    event.stopPropagation();
  }

  displayImageModal(image) {
    this.photoService.getImage(image[0]).subscribe(data => {
      data["image"] = "data:image/png;base64, " + data["image"];
      this.image = data;
      this.photoService.getAnnotations(image[0]).subscribe(data => {
        this.annotations = data as [];
        this.imageModalComponent.imageModal.nativeElement.style.display = 'block';
      });
    });
  }

  search() {
    let annotation = this.searchTerm.nativeElement.value;
    if(annotation == "") {
      this.photoService.get().subscribe(data => {
        this.pages = [];
        this.initialize(data);
      });
    }
    else {
      this.photoService.getAnnotatedThumbnails(annotation).subscribe(data => {
        this.pages = [];
        this.startingIndex = 0;
        this.endingIndex = 15;
        this.initialize(data);
      });
    }
  }

  initialize(data) {
    this.photoService.images = data as [[]];
    for(var index = 0; index < this.photoService.images.length; index++) {
      this.photoService.images[index][1] = "data:image/png;base64, " + this.photoService.images[index][1];
    }
    this.images = this.photoService.images.slice(this.startingIndex, this.endingIndex);
    let pages: number = this.photoService.images.length % 15 == 0 ? this.photoService.images.length / 15 : Math.floor(this.photoService.images.length / 15) + 1;
    for(var index = 1; index <= pages; index++) {
      this.pages.push(index);
    }
  }

}
