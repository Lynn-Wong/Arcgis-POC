import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  private api = inject(ApiService);
  
  users = signal<User[]>([]);
  search = signal('');
  status = signal('');
  page = signal(1);
  pageSize = 10;
  total = signal(0);
  
  showDrawer = signal(false);
  selectedUser = signal<User | null>(null);
  
  showDeleteConfirm = signal(false);
  userToDelete = signal<User | null>(null);

  get totalPages() { return () => Math.ceil(this.total() / this.pageSize); }

  ngOnInit() { this.loadData(); }

  loadData() {
    this.api.getUsers(this.page(), this.pageSize, this.search(), this.status()).subscribe((res: any) => {
      this.users.set(res.data);
      this.total.set(res.total);
    });
  }

  onSearch(e: Event) { this.search.set((e.target as HTMLInputElement).value); }
  onStatusChange(e: Event) { this.status.set((e.target as HTMLSelectElement).value); }

  goToPage(p: number) { this.page.set(p); this.loadData(); }

  openDetail(user: User) {
    this.selectedUser.set(user);
    this.showDrawer.set(true);
  }
  closeDrawer() { this.showDrawer.set(false); }

  confirmDelete(user: User) {
    this.userToDelete.set(user);
    this.showDeleteConfirm.set(true);
  }
  cancelDelete() { this.showDeleteConfirm.set(false); }

  deleteUser() {
    const user = this.userToDelete();
    if (user) {
      this.api.deleteUser(user.id).subscribe(() => {
        this.showDeleteConfirm.set(false);
        this.loadData();
      });
    }
  }
}