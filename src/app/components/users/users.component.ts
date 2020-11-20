import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { UserService } from 'src/app/services/user/user.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(ImageModalComponent, {static: false}) imageModalComponent;
  image = {};
  pages: number[] = [];
  users;
  constructor(
    private userService: UserService,
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data ;
      for(let key in this.users) {
          for(var index = 0; index < this.users[key].length; index++ ) {
            this.users[key][index][1] = "data:image/png;base64, " + this.users[key][index][1];
          }
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

}
