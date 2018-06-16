import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";

/**
 * Generated class for the WashHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "wash-header",
  templateUrl: "wash-header.html"
})
export class WashHeaderComponent {
  @Input("name") name;
  constructor(private navController: NavController) {}

  ngAfterViewInit() {}
}