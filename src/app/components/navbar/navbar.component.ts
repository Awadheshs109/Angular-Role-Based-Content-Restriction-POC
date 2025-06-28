import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = {};
  showDropdown = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/user.json').subscribe((user) => {
      this.user = user;
    });
  }

  getInitials(): string {
    if (!this.user.username) return '';
    return this.user.username
      .split(' ')
      .map((n: string) => n.charAt(0).toUpperCase())
      .join(' ');
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-right')) {
      this.showDropdown = false;
    }
  }
}
