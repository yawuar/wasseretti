import { Component, Input, OnChanges } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
import { LaundryPage } from "../../pages/laundry/laundry";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";

/**
 * Generated class for the CustomHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "custom-header",
  templateUrl: "custom-header.html"
})
export class CustomHeaderComponent {
  @Input() icon: number = 0;
  private headImage: string = "assets/imgs/wardrobe.svg";
  private subImage: string = "assets/imgs/laundry.svg";

  public title: string = "Wardrobe";

  private token;

  public amountLaundry: number = 0;

  constructor(
    public navCtrl: NavController,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    if (localStorage.getItem("currentUser")) {
      this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    }

    this.laundryServiceProvider
      .getAllLaundryByUser(this.token, "laundry/get")
      .then(result => {
        this.amountLaundry = result["data"];
      });
  }

  openLaundry(id) {
    let page: any = LaundryPage;
    if (id) {
      page = HomePage;
    }
    this.navCtrl.setRoot(page, { data: this.token });
  }

  openHomePage(id) {
    let page: any = HomePage;
    if (id) {
      page = LaundryPage;
    }
    this.navCtrl.setRoot(page, { data: this.token });
  }

  ngOnChanges() {
    switch (this.icon) {
      case 1:
        this.title = "Laundry";
        this.headImage = "assets/imgs/laundry.svg";
        this.subImage = "assets/imgs/wardrobe.svg";
        break;

      case 2:
        this.title = "Calendar";
        this.headImage = "assets/imgs/calendar.svg";
        this.subImage = "assets/imgs/wardrobe.svg";
        break;

      default:
        this.title = "Wardrobe";
        this.headImage = "assets/imgs/wardrobe.svg";
        break;
    }
  }
}
