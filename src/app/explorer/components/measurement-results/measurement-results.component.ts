import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { 
  MeasurementService,
  PlotService 
} from '../../services';
import {
  MeasurementSelectors,
  PlotSelectors
} from "../../selectors"
import { IMeasurement } from "../../store/measurement";
import { IData } from "../../../store/data";

@Component({
  selector: 'app-measurement-results',
  templateUrl: './measurement-results.component.html',
  styleUrls: ['./measurement-results.component.css']
})
export class MeasurementResultsComponent implements OnInit, OnDestroy {

  public displayedMeasurements$: Observable<IDisplayedMeasurement[]>
  private subs: Subscription[];

  constructor(
    public measurementSelectors: MeasurementSelectors,
    public measurementService: MeasurementService,
    public plotService: PlotService,
    public plotSelectors: PlotSelectors
  ) {
      this.subs = [];

    let activeMeasurements$ = this.measurementSelectors.relative$
      .combineLatest(
        this.measurementSelectors.directMeasurements$,
        this.measurementSelectors.relativeMeasurements$)
      .map(([isRelative, direct, relative])=> isRelative? relative: direct)

    this.displayedMeasurements$ = activeMeasurements$
      .combineLatest(this.plotSelectors.plottedElements$)
      .map(([measurements, elements]) => {
        return elements.map(e => {
          let m: IDisplayedMeasurement = { 'name': e.name, 'color': e.color, 'valid': false }
          m.name = e.display_name.length == 0 ? m.name : e.display_name;

          if (measurements[e.id] === undefined ||
            measurements[e.id].valid == false ||
            e.display_type == 'event')
            return m;

          m.mean = measurements[e.id].mean;
          m.min = measurements[e.id].min;
          m.max = measurements[e.id].max;
          m.valid = true;
          return m;
        })
      })
  }

  
  ngOnInit() {
    //make direct measurements
    //
    this.subs.push(this.measurementSelectors.enabled$
      .filter(x => x)
      .combineLatest(this.measurementSelectors.measurementRange$)
      .filter(([enabled,range])=> range!=null)
      .subscribe(([enabled, range]) => {
        let dataSet = this.plotService.getPlotData();
        let measurements = Object.keys(dataSet).reduce((acc, id) => {
          acc[id] = this.measure(dataSet[id], range);
          return acc;
        }, {})
        this.measurementService
          .setDirectMeasurements(measurements)
        
      }));

    //make relative measurements
    //
    this.subs.push(this.measurementSelectors.enabled$
      .filter(x => x)
      .combineLatest(
      this.measurementSelectors.directMeasurements$,
      this.measurementSelectors.zeroMeasurements$)
      .subscribe(([enabled, measurements, zeros]) => {
        let relative_measurements =
          Object.keys(measurements).reduce((acc, id) => {
            if(zeros[id]===undefined){
              //we don't have zero data for this element
              acc[id] = { valid: false}
            } else {
              acc[id] = {
                mean: measurements[id].mean - zeros[id].mean,
                min: measurements[id].min - zeros[id].min,
                max: measurements[id].max - zeros[id].max,
                valid: measurements[id].valid && zeros[id].valid
              }
            }
            return acc;
          }, {});
        this.measurementService
          .setRelativeMeasurements(relative_measurements)
      }));
  }

  ngOnDestroy() {
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }

  //-------------
  private measure(data: IData, range): IMeasurement {
    let measurement: IMeasurement = {
      mean: 0,
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY,
      valid: false
    }
    if (data.valid == false || data.type == 'interval')
      return measurement;

    let numPoints = 0; //for calculating the mean

    data.data.reduce((measurement, x) => {
      if (x == null || x[0] < range.min || x[0] > range.max)
        return measurement; //this point is out of bounds
      numPoints += 1;
      switch (data.type) {
        case "raw":
          measurement.mean += x[1];
          measurement.min = Math.min(measurement.min, x[1])
          measurement.max = Math.max(measurement.max, x[1])
          break;
        case "decimated":
          measurement.mean += x[1];
          measurement.min = Math.min(measurement.min, x[2])
          measurement.max = Math.max(measurement.max, x[3])
          break;
        default:
          console.log("error, unknown data type: ", data.type);
      }
      return measurement;
    }, measurement)
    if (numPoints > 0) {
      measurement.mean /= numPoints;
      measurement.valid = true;
    }
    return measurement;
  }
}


export interface IDisplayedMeasurement {
  name: string,
  color: string,
  mean?: number,
  min?: number,
  max?: number,
  valid: boolean
}
