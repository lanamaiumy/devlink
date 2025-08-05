import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { takeWhile, tap, timeout } from 'rxjs/operators';
import { Link } from '../../models/link';
import { Category } from '../../models/category';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  formLink = this.createEmptyFormLink();
  isModalOpen = false;
  editingLink: Link | null = null;
  isLoading = false;
  countdownSeconds = 30;
  private countdownSub?: Subscription;
  private categoriesSub?: Subscription;

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
    this.categoriesSub?.unsubscribe();
  }

  private createEmptyFormLink() {
    return { title: '', url: '', description: '' };
  }

  private startCountdown(seconds = 30): void {
    this.countdownSeconds = seconds;
    this.stopCountdown();
    this.countdownSub = interval(1000)
      .pipe(
        takeWhile(() => this.countdownSeconds > 0),
        tap(() => this.countdownSeconds--)
      )
      .subscribe({
        complete: () => {
          window.location.reload();
        }
      });
  }

  private stopCountdown(): void {
    this.countdownSub?.unsubscribe();
    this.countdownSub = undefined;
  }

  private loadCategories(): void {
    this.isLoading = true;
    this.startCountdown(30);
    this.categoriesSub = this.linkService.getCategoriesWithLinks()
      .pipe(timeout(30000))
      .subscribe({
        next: (data: Category[]) => {
          this.categories = data;
          this.isLoading = false;
          this.stopCountdown();
        },
        error: () => {
          this.isLoading = true;
        }
      });
  }

  toggleCategory(category: Category): void {
    category.isExpanded = !category.isExpanded;
  }

  openCreateModal(): void {
    this.editingLink = null;
    this.formLink = this.createEmptyFormLink();
    this.isModalOpen = true;
  }

  openEditModal(link: Link): void {
    this.editingLink = link;
    this.formLink = {
      title: link.title,
      url: link.url,
      description: link.description
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.editingLink) {
      this.updateLink();
    } else {
      this.createLink();
    }
  }

  private createLink(): void {
    this.isLoading = true;
    this.startCountdown(30);
    this.linkService.createLink(this.formLink)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.stopCountdown();
          this.loadCategories();
          this.closeModal();
        },
        error: () => {
          this.isLoading = true;
        }
      });
  }

  private updateLink(): void {
    if (!this.editingLink) return;
    this.isLoading = true;
    this.startCountdown(30);
    this.linkService.updateLink(this.editingLink.id, this.formLink)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.stopCountdown();
          this.loadCategories();
          this.closeModal();
        },
        error: () => {
          this.isLoading = true;
        }
      });
  }

  deleteLink(id: number): void {
    this.isLoading = true;
    this.startCountdown(30);
    this.linkService.deleteLink(id)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.stopCountdown();
          this.loadCategories();
        },
        error: () => {
          this.isLoading = true;
        }
      });
  }
}
