
import {
  IExplorer,
  IExplorerRecord,
} from './types';

import { makeTypedFactory } from 'typed-immutable-record';


// ---- Explorer ----
export const ExplorerFactory =
  makeTypedFactory<IExplorer, IExplorerRecord>({
    left_elements: [],
    right_elements: [],
    left_units: 'none',
    right_units: 'none',
    show_plot: false,
    show_date_selector: false,
    nav_y1: {min: null, max: null},
    nav_y2: {min: null, max: null},
    nav_time: {min: null, max: null},
    nav_data: {},
    adding_nav_data: false,
    nav_zoom_lock: false,
    plot_y1: {min: null, max: null},
    plot_y2: {min: null, max: null},
    plot_time: {min: null, max: null},
    plot_data: {},
    adding_plot_data: false,
    data_cursor: false,
    live_update: false,
    show_public_data_views: true,
    data_view_filter_text: '',
    //
    nilms_loaded: false
  });


export const INITIAL_STATE = ExplorerFactory();
