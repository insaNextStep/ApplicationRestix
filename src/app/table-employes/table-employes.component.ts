import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableEmployesDataSource } from './table-employes-datasource';

@Component({
  selector: 'app-table-employes',
  templateUrl: './table-employes.component.html',
  styleUrls: ['./table-employes.component.scss']
})
export class TableEmployesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableEmployesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableEmployesDataSource(this.paginator, this.sort);
  }
}
