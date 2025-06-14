import { Component, inject } from '@angular/core';
import { Shop } from '../../../core/services/shop';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatDivider, MatListOption, MatSelectionList } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './filters-dialog.html',
  styleUrl: './filters-dialog.scss'
})
export class FiltersDialog {
  shopService = inject(Shop);
  private dialogRef = inject(MatDialogRef<FiltersDialog>);
  data = inject(MAT_DIALOG_DATA);

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;

  applyFilters() {
    this.dialogRef.close({ selectedBrands: this.selectedBrands, selectedTypes: this.selectedTypes });  
  }
}
