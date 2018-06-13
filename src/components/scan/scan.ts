import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ItemServiceProvider } from '../../providers/item-service/item-service';
import { ItemPage } from '../../pages/item/item';

/**
 * Generated class for the ScanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scan',
  templateUrl: 'scan.html'
})
export class ScanComponent {

  text: string;
  public item: any = [];
  public token;

  constructor(private navParams: NavParams, private itemServiceProvider: ItemServiceProvider, private navController: NavController) {
    this.text = 'Hello World';
    this.item = this.navParams.get('data')['data'][0];

    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
  }

  addToWardrobe(id) {
        this.itemServiceProvider.addItemToUser(this.token, "item/", id)
      .then(result => {
        console.log(result["data"]);
        this.navController.push(ItemPage, {data: this.item.categoryID});
      });
  }

}
