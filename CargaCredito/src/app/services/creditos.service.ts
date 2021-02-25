import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'
import {BalanceUsuarios} from '../shared/clases/balanceUsuarios';
import * as firebase from 'firebase';

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

  updateDatabase(id: string, value: any) {
    return this.dbRef.doc(id).update(value);
  }
}
