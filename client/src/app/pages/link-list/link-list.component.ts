import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
export class LinkListComponent implements OnInit {
  categories: Category[] = [];
  formLink = this.createEmptyFormLink();
  isModalOpen = false;
  editingLink: Link | null = null;

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private createEmptyFormLink() {
    return { title: '', url: '', description: '' };
  }

  private loadCategories(): void {
    this.linkService.getCategoriesWithLinks().subscribe((data) => {
      this.categories = data;
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
    this.linkService.createLink(this.formLink).subscribe(() => {
      this.loadCategories();
      this.closeModal();
    });
  }

  private updateLink(): void {
    if (!this.editingLink) return;
    this.linkService.updateLink(this.editingLink.id, this.formLink).subscribe(() => {
      this.loadCategories();
      this.closeModal();
    });
  }

  deleteLink(id: number): void {
      this.linkService.deleteLink(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }