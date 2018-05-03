import { TypedRecord } from 'typed-immutable-record';
import { IDataSet } from '../../../store/data';
import { IRange, IAxisSettings } from '../helpers';

export interface IState {
  left_elements?: number[];
  right_elements?: number[];
  left_units?: string;
  right_units?: string;
  show_plot?: boolean;
  show_date_selector?: boolean;
  nav_y1?: IRange;
  nav_y2?: IRange;
  nav_time?: IRange;
  nav_data?: IDataSet;
  adding_nav_data?: boolean,
  nav_zoom_lock?: boolean;
  plot_y1?: IRange;
  plot_y2?: IRange;
  plot_time?: IRange;
  plot_data?: IDataSet;
  adding_plot_data?: boolean;
  data_cursor?: boolean;
  live_update?: boolean;
  data_view_filter_text?: string;
  show_public_data_views?: boolean;
  show_data_envelope?: boolean;
  left_axis_settings?: IAxisSettings;
  right_axis_settings?: IAxisSettings;
  time_axis_settings?: IAxisSettings;
  visualizer_tabs?: IVisualizerTab[];
  //flags to indicate whether data has been retrieved
  nilms_loaded?: boolean;
  data_views_loaded?: boolean;
  
  
}

export interface IStateRecord extends
  TypedRecord<IStateRecord>, IState { };
export interface IVisualizerTab {
  id: number,
  url: string
}

