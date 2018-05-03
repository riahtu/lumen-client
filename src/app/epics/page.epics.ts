import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { UIActions } from '../store/ui';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'redux-observable';
import { IPayloadAction } from '../store';
import { IAppState } from '../app.store';
import {
  InterfaceActions,
  PlotActions,
} from '../explorer/store';
import {
  DbElementActions
} from '../store/data';

const BASE_URL = '/api';

@Injectable()
export class PageEpics {

  public epics: Epic<IPayloadAction, IAppState>[];

  constructor() {
    this.epics = [ this.messages, this.interfaceSelection ]
  }

  messages = action$ => {
    return action$.ofType(UIActions.SET_MESSAGES)
      .delay(5000)
      .mapTo({
        type: UIActions.CLEAR_MESSAGES
      });
  }
  //When a UI action changes the plot, select the data explorer
  interfaceSelection = action$ => {
    return action$
      .ofType(DbElementActions.SET_COLOR,
              DbElementActions.SET_DISPLAY_NAME,
              PlotActions.PLOT_ELEMENT,
              PlotActions.AUTO_SCALE_AXIS,
              PlotActions.HIDE_ELEMENT,
              PlotActions.RESTORE_VIEW,
              PlotActions.SET_ELEMENT_AXIS,
              PlotActions.SET_LEFT_AXIS_SETTINGS,
              PlotActions.SET_NAV_RANGE_TO_PLOT_RANGE,
              PlotActions.SET_RIGHT_AXIS_SETTINGS,
              PlotActions.TOGGLE_DATA_CURSOR,
              PlotActions.TOGGLE_LIVE_UPDATE,
              PlotActions.TOGGLE_SHOW_DATA_ENVELOPE)
      .mapTo({
              type: InterfaceActions.SELECT,
              payload: null
             })
  }
}