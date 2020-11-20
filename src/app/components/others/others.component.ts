import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  @ViewChild(ImageModalComponent, {static: false}) imageModalComponent;
  images: any[][] = [[]];
  image = {};
  pages: number[] = [];
  startingIndex: number = 0;
  endingIndex: number = 200;
  data: any[][] = [[]];

  constructor(
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.photoService.getSharedImages().subscribe(data => {
      this.data = data as [any[]];
      for(var index = 0; index < this.data.length; index++) {
        this.data[index][1] = "data:image/png;base64, " + this.data[index][1];
      }
      this.images = this.data.slice(this.startingIndex, this.endingIndex);
      let pages: number = this.data.length % 200 == 0 ? this.data.length / 200 : Math.floor(this.data.length / 200) + 1;
      for(var index = 1; index <= pages; index++) {
        this.pages.push(index);
      }
    });
  }

  transform(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

  open(image) {
    this.photoService.getImage(image[0]).subscribe(data => {
      data["image"] = "data:image/png;base64, " + data["image"];
      this.image = data;
      this.imageModalComponent.imageModal.nativeElement.style.display = 'block';
      this.imageModalComponent.interaction.nativeElement.style.display = 'none';
    });
  }

  displayPage(event) {
    let ref = Number(event.target.innerText);
    this.startingIndex = 200 * (ref - 1);
    this.endingIndex = 200 * (ref);
    this.images = this.data.slice(this.startingIndex, this.endingIndex);
    event.stopPropagation();
  }

}
