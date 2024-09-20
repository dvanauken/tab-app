import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TodoItem {
  id: number;
  parent_id: number | null;
  name: string;
  description: string;
  children?: TodoItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['./table-tree.component.css'],
})
export class TableTreeComponent {
  data: TodoItem[] = [];
  treeData: TodoItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchTodoData();
  }

  async fetchTodoData(): Promise<void> {
    const response = await fetch('assets/todo.json');
    const jsonData: TodoItem[] = await response.json();
    this.data = jsonData;
    this.buildTree();
  }

  buildTree(): void {
    const idMapping = this.data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {} as { [key: number]: number });

    this.treeData = [];
    this.data.forEach((el) => {
      // Handle root nodes
      if (el.parent_id === null) {
        this.treeData.push(el);
        return;
      }

      // Handle child nodes
      const parentEl = this.data[idMapping[el.parent_id]];
      parentEl.children = [...(parentEl.children || []), el];
    });
  }

  toggleExpand(node: TodoItem): void {
    node.expanded = !node.expanded;
  }

  isExpandable(node: TodoItem): boolean {
    return !!(node.children && node.children.length > 0); // Ensure boolean is returned
  }
}
