import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as _ from 'lodash';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { parseAPIErrors } from './helpers';
import { IAppState } from '../../app.store';
import {
  IDbElementRecords,
  DbElementActions,
  IDataView,
  IDataViewRedux,
  DataViewActions
} from '../../store/data';
import * as explorer from '../../explorer/store';

@Injectable()
export class DataViewService {


  private dataViewsLoaded: boolean;

  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) {
    this.dataViewsLoaded = false;
  }

  // ---- HTTP API Functions ----------

  //retrive data views from server
  //
  public loadDataViews() {
    if (this.dataViewsLoaded) {
      return;
    }
    this.tokenService
      .get('data_views.json', {})
      .map(resp => resp.json())
      .map(json => normalize(json, schema.dataViews).entities)
      .subscribe(
      entities => {
        this.dataViewsLoaded = true;
        this.ngRedux.dispatch({
          type: DataViewActions.RECEIVE,
          payload: entities['data_views']
        })
      },
       error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }

  //remove a data view owned by the current user
  //
  public deleteDataView(view: IDataView){
    this.tokenService
      .delete(`data_views/${view.id}`)
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.ngRedux.dispatch({
          type: DataViewActions.REMOVE,
          payload: view.id
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      )
  }

  
  //create a new data view
  //
  public create(name: string, description: string, image: string) {

    let state = this.getDataViewState(true);
    let params = {
      name: name,
      description: description,
      image: image,
      stream_ids: state.stream_ids,
      redux_json: JSON.stringify(state.redux)
    }
    let o = this.tokenService
      .post('data_views.json', JSON.stringify(params))
      .map(resp => resp.json());
    o.subscribe(
      json => this.messageService.setMessages(json.messages),
      error => this.messageService.setErrors(parseAPIErrors(error))
    );
    return o;
  }

  //------------------ Local Functions -----------------------
  // Restore:
  // Set redux state from data view
  //
  public restoreDataView(view: IDataView){
    this.ngRedux.dispatch({
      type: DbElementActions.RESTORE,
      payload: view.redux.data_dbElements
    })
    this.ngRedux.dispatch({
      type: explorer.ExplorerActions.RESTORE_VIEW,
      payload: view.redux.ui_explorer
    });
  }

  // GetDataViewState:
  // Compute redux state for the data view
  //
  public getDataViewState(includeData: boolean): IDataViewState {
    let allElements = this.ngRedux.getState().data.dbElements;
    let explorerState = this.ngRedux.getState().ui.explorer;
    let plottedElements = _.concat(
      explorerState.left_elements,
      explorerState.right_elements)
      .reduce((acc, id) => {
        acc[id] = allElements[id];
        return acc
      }, {})

    //compute array of unique stream ids so we can organize
    //data views by permission on the server
    let stream_ids = _.uniq(Object.keys(plottedElements)
      .map(id => plottedElements[id].db_stream_id))
    //sanitize explorer ui state
    let ui_explorer = <explorer.IState>(<any>this.ngRedux.getState().ui.explorer).toJS();
    ui_explorer.show_date_selector = false; //hide in case it is visible
    if (includeData) {
      //remove nav_data and data that are not part of plottedElements
      ui_explorer.plot_data = Object.keys(plottedElements)
        .reduce((acc, id) => {
          acc[id] = ui_explorer.plot_data[id];
          return acc;
        }, {})
      ui_explorer.nav_data = Object.keys(plottedElements)
        .reduce((acc, id) => {
          acc[id] = ui_explorer.nav_data[id];
          return acc;
        }, {})
    } else {
      ui_explorer.plot_data = {};
      ui_explorer.nav_data = {};
    }
    return {
      redux: {
        ui_explorer: ui_explorer,
        data_dbElements: plottedElements
      },
      stream_ids: stream_ids
    }
  }

}

export interface IDataViewState {
  redux: IDataViewRedux
  stream_ids: Array<number>
}
