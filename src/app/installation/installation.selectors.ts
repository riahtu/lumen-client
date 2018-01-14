
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { TreeNode } from 'angular-tree-component';
import {
  IDbRecords,
  IDbRecord,
  IDbFolderRecords,
  IDbFolderRecord,
  IDbStreamRecords,
  IDbStreamRecord,
  IDbElementRecords,
  IDbElementRecord,
  IState
} from '../store/data';

import {IInstallation} from './store';
import {IAppState} from '../app.store';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';


export interface DbTreeNode {
  id: number;
  name: string;
  type: string;
  isExpanded?: boolean;
  children: DbTreeNode[];
  hasChildren: boolean;
};

@Injectable()
export class InstallationSelectors {

  @select(['data']) data$: Observable<IState>;
  @select(['data', 'dbs']) dbs$: Observable<IDbRecords>;
  @select(['data', 'dbFolders']) dbFolders$: Observable<IDbFolderRecords>;
  @select(['data', 'dbStreams']) dbStreams$: Observable<IDbStreamRecords>;
  @select(['data', 'dbElements']) dbElements$: Observable<IDbElementRecords>;

  @select(['ui','installation']) dbAdmin$: Observable<IInstallation>;
  @select(['ui','installation', 'selectedType']) selectedType$: Observable<string>;
  @select(['ui','installation', 'selectedDb']) db_id$: Observable<number>;
  @select(['ui','installation', 'selectedDbFolder']) dbFolder_id$: Observable<number>;
  @select(['ui','installation', 'selectedDbStream']) dbStream_id$: Observable<number>;
  
  public dbNodes$: Observable<DbTreeNode[]>;
  public selectedDb$: Observable<IDbRecord>;
  public selectedDbRootFolder$: Observable<IDbFolderRecord>;
  public selectedDbFolder$: Observable<IDbFolderRecord>;
  public selectedDbStream$: Observable<IDbStreamRecord>;
  public selectedDbStreamElements$: Observable<IDbElementRecord[]>;


  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {

    // ---- selectedDb: IDbRecord ------
    this.selectedDb$ = this.dbs$
      .combineLatest(this.db_id$)
      .map(([dbs, id]) => dbs[id])
      .filter(db => !(db === undefined || db == null))


    // ---- selectedDb: IDbRecord ------
    this.selectedDbRootFolder$ = this.selectedDb$
      .combineLatest(this.dbFolders$)
      .map(([db, folders]) => folders[db.contents])
      .filter(folder => !(folder === undefined));

    // ---- selectedDbFolder: IDbFolderRecord ------
    this.selectedDbFolder$ = this.dbFolders$
      .combineLatest(this.dbFolder_id$)
      .map(([dbFolders, id]) => dbFolders[id])
      .filter(dbFolder => !(dbFolder === undefined))
      .distinctUntilChanged();

    // ---- selectedDbStream: IDbStreamRecord ------
    this.selectedDbStream$ = this.dbStreams$
      .combineLatest(this.dbStream_id$)
      .map(([dbStreams, id]) => dbStreams[id])
      .filter(dbStream => !(dbStream === undefined))
      .distinctUntilChanged();


    // ---- selectedDbElements: IDbElements[] -----
    this.selectedDbStreamElements$ = this.selectedDbStream$
      .combineLatest(this.dbElements$)
      .map(([stream, elements]) => stream.elements.map(id => elements[id]))
      .filter(elements =>
        elements.reduce((i, e) => i && !(e === undefined), true))
      .distinctUntilChanged();

    // ---- dbNodes: DbTreeNode[] -----
    this.dbNodes$ = this.selectedDb$
      .combineLatest(this.data$)
      .map(([db, data]) => this._mapRoot(data, db))
  }

  ///----------- Tree Helper Functions -----------------------
  ///
  private _mapRoot(data: IState, db: IDbRecord): DbTreeNode[] {
    // make sure the root folder exists
    if (!(db.contents in data.dbFolders)) {
      return [];
    }
    let root = this._mapFolder(data, db.contents);
    root.name='database';
    root.type='root';
    root.isExpanded = true;
    return [root];
  }
  private _mapFolder(data: IState, db_folder_id: number): DbTreeNode {
    let dbFolder = data.dbFolders[db_folder_id];
    let children = null;

    if (!dbFolder.shallow) {
      children =
        dbFolder.subfolders
          .map(subfolder_id => this._mapFolder(data, subfolder_id))
          .concat(dbFolder.streams
            .filter(stream_id => stream_id in data.dbStreams)
            .map(stream_id => this._mapStream(data, stream_id)));
    }
    return {
      id: dbFolder.id,
      name: dbFolder.name,
      type: 'dbFolder',
      children: children,
      hasChildren: true,
    };
  }

  private _mapStream(data, db_stream_id): DbTreeNode {
    let dbStream = data.dbStreams[db_stream_id];
    return {
      id: dbStream.id,
      name: dbStream.name,
      type: 'dbStream',
      hasChildren: false,
      children: []
    };
  }
}
