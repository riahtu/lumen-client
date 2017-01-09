import { Component, OnInit } from '@angular/core';
import {
  INilm,
  INilmdbFolder,
  INilmdbStream,
  INilmdbElement,
  IDbAdminState
} from '../../store';
import {
  NilmActions,
  DbAdminActions } from '../../actions';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.page.html',
  styleUrls: ['./db-admin.page.css']
})
export class DbAdminPageComponent implements OnInit {
  @select(['nilm', 'nilmsById']) nilms$: Observable<{}>;
  @select(['dbAdmin', 'nilmId']) nilm_id$: Observable<number>;

  public nodes$: Observable<{}>;

  //private _nilm: BehaviorSubject<INilm>

  constructor(
    private nilmActions: NilmActions,
    private dbAdminActions: DbAdminActions
  ) {

    this.nodes$ =
      Observable.combineLatest(
        this.nilms$,
        this.nilm_id$,
      )
        .map(([nilms, nilm_id]) => nilms[nilm_id])
        .filter(nilm => nilm != null)
        .map(nilm => this._mapFolder(nilm.contents).children)

  }

  private _mapFolder(folder: INilmdbFolder) {
    return {
      id: folder.id,
      name: folder.name,
      type: 'dbfolder',
      children: [].concat(
        folder.subfolders
          .map(subfolder => this._mapFolder(subfolder)),
        folder.streams
          .map(stream => this._mapStream(stream))
      )
    };
  }

  private _mapStream(stream: INilmdbStream) {
    return {
      id: stream.id,
      name: stream.name,
      type: 'dbstream',
      children: []
    };
  }

  ngOnInit() {
    this.dbAdminActions.setNilmId(72);
    this.nilmActions.loadNilms();
  }

}
