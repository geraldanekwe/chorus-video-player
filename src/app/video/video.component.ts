import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent {
  id: string;
  message: string;
  error: boolean;

  public constructor(private route: ActivatedRoute, private ref: ElementRef) {
    route.queryParams.subscribe((params) => {
      const { id } = params;
      if (!id) {
        this.error = true;
        this.message = 'No ID present. Please fix the URL.';
        return;
      }
      this.error = false;
      this.id = id;
    });
  }

  ngOnInit() {
    this.ref.nativeElement.querySelector('source')
      .addEventListener('error', () => {
        this.message = this.error ? this.message : 'There was an issue loading the video.';
        this.error = true;
      });
  }

  ngOnDestroy() {
    this.ref.nativeElement.querySelector('source')
      .removeEventListener('error');
  }
}
