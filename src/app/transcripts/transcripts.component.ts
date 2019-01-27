import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Transcript } from '../transcript';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.scss']
})

export class TranscriptsComponent {
  transcripts: Transcript[];

  public constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngAfterContentInit() {
    this.route.queryParams.subscribe((params) => {
      const { id } = params;
      if (!id) {
        return;
      }
      this.apiService.getTranscriptsById(id).subscribe((res: object[]) => {
        this.transcripts = res.map(jsonObj => Object.assign(new Transcript(), jsonObj));
        this.transcripts = this.transcripts.sort((a, b) => a.time - b.time);
      });
    });
  }

  private addClass(speaker, index) {
    const { transcripts } = this;
    const isRep = speaker === 'Rep';
    const isNextCust = (!!transcripts[index + 1] && transcripts[index + 1].speaker !== 'Rep');
    const isCust = speaker === 'Cust';
    const isNextRep = (!!transcripts[index + 1] && transcripts[index + 1].speaker !== 'Cust');

    let className: string;
    if (isRep && isNextCust) {
      className = 'rep';
    }

    if (isCust && isNextRep) {
      className = 'cust';
    }

    if (index === (transcripts.length - 1)) {
      className = speaker.toLowerCase();
    }

    return className;
  }
}
