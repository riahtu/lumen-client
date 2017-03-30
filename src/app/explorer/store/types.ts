import { TypedRecord } from 'typed-immutable-record';
import { IDataSet } from '../../store/data';

// ---- Explorer ----
export interface IExplorer {
  left_elements?: number[];
  right_elements?: number[];
  left_units?: string;
  right_units?: string;
  nav_y1?: IRange;
  nav_y2?: IRange;
  nav_time?: IRange;
  nav_data?: IDataSet;
  plot_y1?: IRange;
  plot_y2?: IRange;
  plot_time?: IRange;
  plot_data?: IDataSet;
}

export interface IExplorerRecord extends
  TypedRecord<IExplorerRecord>, IExplorer { };

export interface IRange {
  min: number;
  max: number;
}
