import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() images;
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  open(image) {
    this.onImageSelect.emit(image);
  }

  transform(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

}
