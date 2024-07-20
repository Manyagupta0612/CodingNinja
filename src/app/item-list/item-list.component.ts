import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  text: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  newItem: string = '';
  newDescription: string = '';
  newDueDate: string = '';
  newPriority: string = '';
  newStatus: string = 'to-do'; // Default status
  items: Item[] = [];
  sortBy: string = '';

  addItem() {
    if (this.newItem.trim()) {
      this.items.push({
        text: this.newItem,
        description: this.newDescription,
        dueDate: this.newDueDate,
        priority: this.newPriority,
        status: this.newStatus,
        isEditing: false
      });
      this.newItem = '';
      this.newDescription = '';
      this.newDueDate = '';
      this.newPriority = '';
      this.newStatus = 'to-do'; // Reset to default status
      this.sortItems();
    }
  }

  editItem(index: number) {
    this.items[index].isEditing = !this.items[index].isEditing;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  updateStatus(index: number, status: string) {
    this.items[index].status = status;
  }

  sortItems() {
    if (this.sortBy === 'dueDate') {
      this.items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (this.sortBy === 'priority') {
      this.items.sort((a, b) => a.priority.localeCompare(b.priority));
    }
  }

  setSortBy(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value;
    this.sortItems();
  }
}

// gjrhfufdgvhjkhg