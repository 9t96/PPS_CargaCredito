import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'
import {BalanceUsuarios} from '../shared/clases/balanceUsuarios';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  dbRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection("creditos");
  }

  getBalanceByUid(uid: string) {
    return this.dbRef.doc<BalanceUsuarios>(uid).valueChanges({idField: 'doc_id'});
  }

  updateDatabase(id, saldo) {
    console.info("update id: ", id, "saldo: ", saldo);
    return this.dbRef.doc(id).update({
      balance: saldo
    })
  }
}
