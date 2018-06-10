import { Component, Renderer } from "@angular/core";
import { ViewController } from "ionic-angular";
import { CalendarServiceProvider } from "../../providers/calendar-service/calendar-service";

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "calendar",
  templateUrl: "calendar.html"
})
export class CalendarComponent {
  text: string;

  private token;
  public days: any = [];
  public currentDay: any = new Date();
  public itemByDay: any = [];
  public currentSelected: Number = 0;
  public data: any;
  public typeOfClothes: any = [
    { id: 1, class: 'tshirt', data: [] },
    { id: 6, class: 'sweater', data: [] },
    { id: 2, class: 'pants', data: [] },
    { id: 9, class: 'tshirt', data: [] }
  ];

  public months: any = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  constructor(private renderer: Renderer, private viewCtrl: ViewController, private calendarServiceProvider: CalendarServiceProvider) {
    this.renderer.setElementClass(
      viewCtrl.pageRef().nativeElement,
      "calendar",
      true
    );
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.getCurrentWeek();
    this.data = {
      user_itemID: this.viewCtrl.data['uiID'],
      categoryID: this.viewCtrl.data['cID']
    };
  }

  getCurrentWeek() {
    let amountDays = 7;
    let current = new Date();
    let index = current.getDate() - current.getDay();

    for (let i = 0; i < amountDays; i++) {
      if (this.currentDay.getTime() === new Date(current.setDate(index)).getTime()) {
        this.currentSelected = i;
        console.log(this.currentSelected);
      }
      this.days.push(new Date(current.setDate(index)));
      index += 1;
    }
  }

  showClothesByDay(id, day) {
    this.currentSelected = id;
    this.itemByDay = [];
    this.calendarServiceProvider
      .getItemsByDay(this.token, "calendar/", this.formatDay(day))
      .then(result => {
        // if(result["data"].length > 0) {
          for(let type of this.typeOfClothes) {
            type.data = [];
            for(let res of result['data']) {
              if(type.id === res.categoryID) {
                type.data.push(res);
              }
            }
          }
        // }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  formatDay(day) {
    let year = day.getFullYear();
    let yy = year < 10 ? "0" + year : year;

    let monthIndex = day.getMonth() + 1;
    let mm = monthIndex < 10 ? "0" + monthIndex : monthIndex;

    let dayIndex = day.getDate();
    let dd = dayIndex < 10 ? "0" + dayIndex : dayIndex;

    return yy + "-" + mm + "-" + dd;
  }

  addItemToCalendar(id) {
    //console.log(this.currentSelected);
    let n = this.currentSelected;
    let date = this.formatDay(this.days[n.toFixed()]);
    this.calendarServiceProvider.addItemInCalendar(this.token, 'calendar', {
      user_itemID: id,
      date: date
    }).then(res => {
      console.log(JSON.stringify(res));
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }
}