import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CreditosService } from 'src/app/services/creditos.service';
import {BalanceUsuarios} from '../../shared/clases/balanceUsuarios';

declare let window: any; // Don't forget this part!
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readResult: String;
  qrCodes: any  = {
    diez: "8c95def646b6127282ed50454b73240300dccabc",
    cincuenta: "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172",
    cien: "2786f4877b9091dcad7f35751bfcf5d5ea712b2f"
  }
  balanceUsuario: BalanceUsuarios;
  currentUid: string;


  ionViewWillEnter(){
    this.currentUid = this.authSrv.getCurrentUserId();
    console.log(this.currentUid);
    this.creditosSrv.getBalanceByUid(this.currentUid).subscribe( balance =>{
      this.balanceUsuario = balance;
      console.log(balance);

    })
  }

  constructor(public creditosSrv: CreditosService, public authSrv: AuthService) {}
 
  ReadQrCode(){

    
     /*  // Optionally request the permission early
      window.cordova.plugins.barcodeScanner.scan(
        result => {
          console.log(result);
          this.CargarCreditos(result.text);
        },
        err => console.error(err),
        {
          showTorchButton: true,
          prompt: "Scan your code",
          formats: "QR_CODE",
          resultDisplayDuration: 0
        }
      ); */
  }

  CargarCreditos(qrtext: string){

  }

}
