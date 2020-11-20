import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  @Input() image;
  @ViewChild('imageModal', {static: false}) imageModal;
  @ViewChild('currentImage', {static: false}) currentImage;
  @ViewChild('user', {static: false}) user;
  @ViewChild('annotation', {static: false}) annotation;
  @ViewChild('interaction', {static: false}) interaction;
  fullImage = "";
  @Input() annotations;
  
  constructor(
    private sanitizer: DomSanitizer,
    private photoService: PhotoService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.imageModal.nativeElement.style.display = "none";
  }

  transform(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

  share() {
    let image_id = this.image['id'];
    let user = this.user.nativeElement.value;
    this.photoService.share(user, image_id).subscribe(data => {
      alert(data["message"]);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/home"]);
    });
  }

  annotate() {
    let image_id = this.image['id'];
    let annotation = this.annotation.nativeElement.value;
    if(!annotation || annotation == "") {
      alert("Annotation cannot be blank!");
    }
    else {
      this.photoService.annotate(image_id, annotation).subscribe(data => {
        alert(data["message"]);
        this.photoService.getAnnotations(image_id).subscribe(data => {
          this.annotations = data as [];
          this.annotation.nativeElement.value = "";
        });
      });
    }
  }
}
