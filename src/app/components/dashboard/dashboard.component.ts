import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  pin: string | null = null;
  competitor1: string = '';
  competitor2: string = '';

  item$: Observable<any[]>;
  //firestore: Firestore = inject(Firestore);

  constructor(private firestore: Firestore) {
    const itemCollection = collection(this.firestore, 'matches');
    this.item$ = collectionData(itemCollection);
  }

  generatePin() {
    this.pin = Math.floor(10000 + Math.random() * 90000).toString();
    this.item$.subscribe(val => {
      console.log(val);
    });
  }

  startGame() {
    const collectionInstance = collection(this.firestore, 'matches');
    const myDocumentData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 30
    };
    addDoc(collectionInstance, myDocumentData).then(()=> {
      console.log('Data Saved Successfully')
    })
  ; 

    alert('Game Started');
    /* if(this.pin) {
      this.db.object(`tournaments/${this.pin}`).update({
        competitor1: this.competitor1,
        competitor2: this.competitor2
      });
      // Additional logic to start the game
    }*/
  }
}
