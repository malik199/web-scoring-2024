import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {
  doc,
  Firestore,
  collectionData,
  collection,
  addDoc,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';

import { TournamentsX } from './../../interfaces/tournament';

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
    ReactiveFormsModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class DashboardComponent {

  displayedColumns: string[] = ['pin', 'link'];
  dataSource: any;
  tournamentId: string = '';
  myForm!: FormGroup;
  timestamp = new Date().getTime();
  collectionInstance = collection(this.firestore, 'tournaments');

  pin: string | null = null;
  competitor1: string = '';
  competitor2: string = '';

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    this.fetchData();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      redCorner: new FormControl('', Validators.required),
      blueCorner: new FormControl('', Validators.required),
    });
  }

  startTournament() {
    this.pin = Math.floor(10000 + Math.random() * 90000).toString();
    
    const myTournamentData = {
      pin: this.pin,
      judges: {
        judge1: '',
        judge2: '',
        judge3: '',
      }
    };
    addDoc(this.collectionInstance, myTournamentData).then((res) => {
      this.tournamentId = res.id
    });

    alert('New Tournament Added!');
  }

  fetchData() {
    const data$: Observable<any[]> = collectionData(this.collectionInstance);
    data$.subscribe(data => {
      this.dataSource = data ;
    });
  }

  async onSubmit() {
    if (this.myForm.valid) {
      const redCorner = this.myForm.get('redCorner')?.value;
      const blueCorner = this.myForm.get('blueCorner')?.value;


      // Example: Updating the first match of a specific tournament


      const matchId = this.timestamp; // The ID of the match to update
      //const updateCollection = collection(this.firestore, 'tournaments/owNZxOVkQ5TwKMaR8goO/matches/blueCorner/competitorName');
      const matchDocRef = doc(this.firestore, `tournaments/${this.tournamentId}/myMatches/${new Date().getTime()}`);
      await setDoc(matchDocRef, {
        redCorner: {
          competitorName: redCorner,
          score: 0
        },
        blueCorner: {
          competitorName: blueCorner,
          score: 0
        }
      }).then(res => {
        console.log(res);
      })
    } else {
      alert('Please fill in both fields.');
    }
  }

  openDialog(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h1 mat-dialog-title>New Tournament</h1>
    <div mat-dialog-content>
      Would start a new tournament with different game pin?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
    </div>`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
