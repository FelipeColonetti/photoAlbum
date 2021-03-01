import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';


@Component({
  selector: 'card-grid',
  templateUrl: 'card-grid.component.html',
  styleUrls: ['card-grid.component.scss']
})
export class CardGridComponent implements OnInit {
  @Input() dataSource;
  @Input() albumId;
  @Input() dataAlbum;

  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];

  @ViewChild('callAlbumDialog') callAlbumDialog: TemplateRef<any>;

  constructor(public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.galleryOptions = [
      { "imageDescription": true, "thumbnailsMoveSize": 4, },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];
  }

  public showAlbum() {
    this.galleryImages = [];

    this.dataAlbum.forEach(photo => {
      if (photo.albumId == this.albumId) {
        this.galleryImages.push({
          small: photo.thumbnailUrl,
          medium: photo.url,
          big: photo.url,
          description: photo.title
        })
      }
    });
    this.dialog.open(this.callAlbumDialog);
  }
}