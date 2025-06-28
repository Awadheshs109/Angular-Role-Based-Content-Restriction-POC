import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {

  private allowedContent$ = new BehaviorSubject<string[]>([]);
  private allowedRoutes$ = new BehaviorSubject<string[]>([]);
  private roleType = '';

  constructor(private http: HttpClient) {}

  loadUserAndContent(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<any>('assets/user.json').subscribe((user) => {
        this.roleType = user.roleType;
        if (this.roleType.toLowerCase() === 'admin') {
          this.allowedContent$.next(['*']);
          this.allowedRoutes$.next(['*']);
          resolve();
        } else {
          this.http.get<any>('assets/allowed-content.json').subscribe((data) => {
            this.allowedContent$.next(data.content || []);
            this.allowedRoutes$.next(data.url || []);
            resolve();
          });
        }
      });
    });
  }

  isAllowedContent(content: string): boolean {
    const allowed = this.allowedContent$.value;
    return allowed.includes('*') || allowed.includes(content);
  }

  isAllowedRoute(route: string): boolean {
    const allowed = this.allowedRoutes$.value;
    return allowed.includes('*') || allowed.includes(route);
  }

  getAllowedContentObs() {
    return this.allowedContent$.asObservable();
  }
}
        