import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

}

export interface DialogData {
  answer?: string;
  answer_format?: string;
  other_answer?: string;
  optionsArray?: any;
}
