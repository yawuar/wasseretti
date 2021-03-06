import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NFC, Ndef } from '@ionic-native/nfc';

import { ItemServiceProvider } from '../../providers/item-service/item-service';
import { ItemPage } from '../item/item';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  public error: string = '';
  public token;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC, private ndef: Ndef, private itemServiceProvider: ItemServiceProvider) {
    this.token = JSON.parse(localStorage.getItem('currentUser'))['token'];

    this.nfc.addNdefListener(() => {
      this.error = 'available';
    }, (err) => {
      this.error = 'unavailable';
    }).subscribe((event) => {
      if (event && event.tag && event.tag.id) {
        let payload = event.tag.ndefMessage[0].payload;
        let content = this.nfc.bytesToString(payload).substring(3);
        if(content) {
          this.itemServiceProvider.addItemToUser(this.token, 'item', content)
            .then(result => {
              this.navCtrl.push(ItemPage);
            });
        } else {
          this.error = 'unavailable';
        }
      }
    });
  }

  ionViewDidLoad() {
  }
  

}
