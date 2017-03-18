import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  OnInit,
  AfterViewInit
} from '@angular/core';
//import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-main-plot',
  templateUrl: './main-plot.component.html',
  styleUrls: ['./main-plot.component.css']
})
export class MainPlotComponent implements OnInit, AfterViewInit {

  @ViewChild('plotArea') plotArea: ElementRef
  constructor(
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }
  public hellohook = function (plot, options) {
    console.log(plot, options)
  }
  ngAfterViewInit() {
    let options = {
      series: {
        lines: { show: true },
        points: {
          radius: 3,
          show: true
        }
      },
      hooks: {
        draw: [this.hellohook]
      }
    };
    let dataset = [{ label: "line1", color: "blue", data: [[1, 130], [2, 40], [3, 80], [4, 160], [5, 159], [6, 370], [7, 330], [8, 350], [9, 370], [10, 400], [11, 330], [12, 350]] }];
    let plot = $.plot(this.plotArea.nativeElement, dataset, options);
    let dataset2 = [{ label: "line1", color: "red", data: [[1, 200], [2, 40], [3, 80], [4, 160], [5, 159], [6, 370], [7, 330], [8, 350], [9, 370], [10, 400], [11, 330], [12, 350]] }];

    plot.setData(dataset2);    
    plot.draw();
    //this.renderer.invokeElementMethod(this.plotArea.nativeElement,'focus2');
  }

}
