import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {QuestionComponent} from "./question/question.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(QuestionComponent);
  }
}
