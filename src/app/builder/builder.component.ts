import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as _ from "lodash";
import {AnswersComponent} from "../answers/answers.component";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
  queForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<BuilderComponent>) {
  }

  ngOnInit(): void {
    console.log('data', this.data);
    this.setFormVal();
  }

  setFormVal() {
    this.queForm = this.formBuilder.group({
      answer: ["", this.data.is_required ? [Validators.required] : []],
      answer_format: [this.data.answer_format, [Validators.required]],
      other_answer: [""],
      optionsArray: this.getOptions()
    });
  }

  getOptions() {
    if (this.data.optionsArray.length) {
      const arrOpt: any = [];
      _.forEach(this.data.optionsArray, (val: any) => {
        arrOpt.push(this.initOption(val.option))
      });
      return this.formBuilder.array(arrOpt);
    }
    return [""]
  }

  initOption(val: string) {
    return this.formBuilder.group({
      name: [val],
      option: [""]
    });
  }

  onSubmitForm() {
    if (this.queForm.valid) {
      const data = this.queForm.value;
      this.dialog.open(AnswersComponent, {
        data
      });
      this.dialogRef.close();
    } else {
      this._snackBar.open('Invalid Form', '', {duration: 1500});
    }
  }
}

export interface DialogData {
  question?: string;
  answer_format?: string;
  other_answer?: string;
  is_required?: string;
  optionsArray?: any;
}
