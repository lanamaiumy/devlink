import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../models/link';
import { Category } from '../models/category';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class LinkService {
  private apiUrl = `${environment.apiUrl}/links`;
  private categoriesApiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }

  getCategoriesWithLinks(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApiUrl);
  }

  createLink(linkData: { title: string, url: string, description: string }): Observable<Link> {
    return this.http.post<Link>(this.apiUrl, { link: linkData });
  }

  updateLink(id: number, linkData: { title: string, url: string, description: string }): Observable<Link> {
    return this.http.put<Link>(`${this.apiUrl}/${id}`, { link: linkData });
  }

  deleteLink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}