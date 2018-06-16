import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "keys"
})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keyArr: any[] = Object.keys(value),
      dataArr = [];

    keyArr.forEach((key: any) => {
      dataArr.push(key);
    });

    return dataArr;
  }
}
