import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public constructor(private http: HttpClient) { }

  getTranscriptsById(id: string) {
    return this.http.get(`/transcripts/${id}`);
  }
}
