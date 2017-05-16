import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {

  COLOR_CYCLE =
  ['#0072BD',
    '#D95319',
    '#EDB120',
    '#7E2F8E',
    '#77AC30',
    '#4DBEEE',
    '#A2132F'];

  private availableColors: string[] = [];

  constructor() {
    this.availableColors = this.COLOR_CYCLE.reverse().slice();
  }

  public requestColor(): string {
    if (this.availableColors.length == 0)
      return this.randomColor();
    return this.availableColors.pop();
  }
  public returnColor(color: string): void {
    //check if color is from the cycle and not already available
    if (this.COLOR_CYCLE.indexOf(color) == -1 ||
      this.availableColors.indexOf(color) != -1) {
      return;
    }
    this.availableColors.push(color);
  }
  public checkoutColor(color: string): void {
    //remove color from available list 
    let i = this.availableColors.indexOf(color);
    if( i == -1)
      return;
    this.availableColors.splice(i,1);
  }
  private randomColor(): string {
    //http://stackoverflow.com/questions/5092808
    return "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  }
}
