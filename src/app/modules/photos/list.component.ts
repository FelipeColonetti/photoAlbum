import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Album, Photo, User } from "@photoAlbum/models";
import { AccountService, PhotoService } from "@photoAlbum/services";
import { SubSink } from "subsink";


@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public user: User;
  private subs = new SubSink();
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];
  public photoAlbum = [];
  public listThumb = [];

  constructor(
    private accountService: AccountService,
    private photoService: PhotoService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.loadAlbuns();
  }

  public loadAlbuns() {
    let userAlbuns = [];
    let mergedPhotoAlbum = [];
    let byTen = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];

    this.subs.sink = this.photoService.getAlbuns().subscribe((albuns: Album[]) => {
      albuns.forEach(album => {
        // Armazena os albuns de acordo com o usuario logado
        if (album.userId == +this.user.id) {
          userAlbuns.push(album)
        }
      })
    })

    this.subs.sink = this.photoService.getPhotos()
      .subscribe((photos: Photo[]) => {

        photos.forEach((photo: Photo) => {
          userAlbuns.forEach((album: Album) => {
            if (photo.albumId == album.id) {
              let albumTitle = { albumTitle: album.title };
              let merged = Object.assign(photo, albumTitle);
              mergedPhotoAlbum.push(merged)
            }
          })
        })

        byTen.forEach(i => {
          mergedPhotoAlbum.slice(i, i + 10).forEach(c => {
            this.photoAlbum.push(c);
          })
        })

        this.processResults();
      })
  }
  
  private processResults() {
    let byTen = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    let listThumb = [];
    byTen.forEach(i => {
      this.photoAlbum.slice(i, i + 1).forEach(list => {
        listThumb.push(list);
      })
    })
    
    this.listThumb = this.convertObjectToArray(listThumb);
  }

  private convertObjectToArray(obj) {
    var resultArray = Object.keys(obj).map(function(objIndex){
      let newObj = obj[objIndex];
      return newObj;
    });

    return resultArray;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}