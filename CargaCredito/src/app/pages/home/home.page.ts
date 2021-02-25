import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CreditosService } from "src/app/services/creditos.service";
import { BalanceUsuarios } from "../../shared/clases/balanceUsuarios";

declare let window: any; // Don't forget this part!
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  readResult: String;
  qrCodes: any = {
    diez: "8c95def646b6127282ed50454b73240300dccabc",
    cincuenta: "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172",
    cien: "2786f4877b9091dcad7f35751bfcf5d5ea712b2f",
  };
  currentUid: string;
  userRol: string;
  balanceUsuario: BalanceUsuarios = {balance: null, totalDiez: null, totalCincuenta: null, totalCien: null, doc_id: null};

  ionViewWillEnter() {
    this.currentUid = this.authSrv.getCurrentUserId();
    console.log(this.currentUid);
    this.creditosSrv.getBalanceByUid(this.currentUid).subscribe((userData) => {
      this.balanceUsuario.balance = userData.balance;
      this.balanceUsuario.totalCien = userData.totalCien;
      this.balanceUsuario.totalCincuenta = userData.totalCincuenta;
      this.balanceUsuario.totalDiez = userData.totalDiez;
      this.balanceUsuario.doc_id = userData.doc_id;
      console.log(this.balanceUsuario);
    });
    this.authSrv.getUserRol(this.currentUid).subscribe((userData) => {
      this.userRol = userData.rol;
    });
  }

  constructor(
    public creditosSrv: CreditosService,
    public authSrv: AuthService,
    private router: Router
  ) {}

  ReadQrCode() {
    this.CargarCreditos(this.qrCodes.cincuenta);
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

  CargarCreditos(qrtext: string) {
    const qrvalue = this.GetCodeValue(qrtext);
    if (this.userRol == "admin") {
      switch (qrvalue) {
        case 10:
          this.balanceUsuario.totalDiez < 20
            ? this.creditosSrv.updateDatabase(this.currentUid, {
                balance: this.balanceUsuario.balance + 10,
                totalDiez: this.balanceUsuario.totalDiez + 10,
              })
            : console.log("hola");
          break;
        case 50:
          this.balanceUsuario.totalCincuenta < 100
          ? this.creditosSrv.updateDatabase(this.currentUid, {
              balance: this.balanceUsuario.balance + 50,
              totalCincuenta: this.balanceUsuario.totalCincuenta + 50,
            })
          : console.log("hola");
          break;
        case 100:
          this.balanceUsuario.totalCien < 200
          ? this.creditosSrv.updateDatabase(this.currentUid, {
              balance: this.balanceUsuario.balance + 100,
              totalCien: this.balanceUsuario.totalCien + 100,
            })
          : console.log("hola");
          break;
      }
    } else {
      switch (this.GetCodeValue(qrtext)) {
        case 10:
          this.balanceUsuario.totalDiez !== 10
            ? this.creditosSrv.updateDatabase(this.currentUid, {
                balance: this.balanceUsuario.balance + 10,
                totalDiez: 10,
              })
            : console.log("hola");
          break;
        case 50:
          this.balanceUsuario.totalCincuenta !== 50
          ? this.creditosSrv.updateDatabase(this.currentUid, {
              balance: this.balanceUsuario.balance + 50,
              totalCincuenta: 50,
            })
          : console.log("hola");
          break;
        case 100:
          this.balanceUsuario.totalCien !== 100
          ? this.creditosSrv.updateDatabase(this.currentUid, {
              balance: this.balanceUsuario.balance + 100,
              totalCien: 100,
            })
          : console.log("hola");
          break;
      }
    }
  }
  GetCodeValue(qr: string):number {
    switch (qr) {
      case "8c95def646b6127282ed50454b73240300dccabc":
        return 10;
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
        return 50;
        break;
      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        return 100;
        break;
    }
  }

  Logout() {
    this.authSrv.SignOut();
    this.router.navigate(["login"]);
  }
}
