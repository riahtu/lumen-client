import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { IDbStream } from '../../../store/data';
import { 
  DataService,
  MessageService
} from '../../../services';
import { IRange } from '../../store';
import { ExplorerSelectors } from '../../explorer.selectors';

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.css']
})
export class DownloadDataComponent implements OnInit {

  @Input() range: IRange;
  @ViewChild('link') link: ElementRef

  constructor(
    public explorerSelectors: ExplorerSelectors,
    public messageService: MessageService,
    public dataService: DataService
  ) {
   }

  ngOnInit() {
  }

  download(stream: IDbStream){
    this.dataService.downloadStream(
      this.range.min, this.range.max,stream)
      .subscribe(
      file => {
        this.link.nativeElement.download = 'coolname.txt';
        this.link.nativeElement.href = file;
        this.link.nativeElement.click();
      },
      error => this.messageService.setErrors(["error downloading data"]));
  }
}
