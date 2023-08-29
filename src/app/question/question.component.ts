import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BuilderComponent} from "../builder/builder.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as _ from "lodash";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  newTaskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<QuestionComponent>) {
    this.newTaskForm = this.formBuilder.group({
      question: ["", [Validators.required]],
      answer_format: ["", [Validators.required]],
      other_answer: [""],
      is_required: [""],
      optionsArray: this.getOptions()
    });
  }

  getOptions() {
    const arrOpt: any = [];
    arrOpt.push(
      this.initOption()
    );
    return this.formBuilder.array(arrOpt);
  }

  initOption() {
    return this.formBuilder.group({
      option: [""]
    });
  }

  addAnsOption() {
    const control = this.newTaskForm.controls['optionsArray'] as FormArray;
    control.push(this.initOption());
  }

  getCheckboxList() {
    const control = this.newTaskForm.controls['optionsArray'] as FormArray
    if ((_.toNumber(this.newTaskForm?.value?.answer_format) == 2)
      && this.newTaskForm.get('optionsArray')
      && control['controls']
    ) {
      return control['controls'];
    }
    return [];
  }

  onSubmitForm() {
    const invalidOptions = _.filter(this.newTaskForm.value.optionsArray, v => {
      return !v.option;
    });
    const validOptions = (((this.newTaskForm.value.answer_format == 2) && !invalidOptions.length)
      || this.newTaskForm.value.answer_format == 1);
    if (this.newTaskForm.valid && validOptions) {
      const data = this.newTaskForm.value;
      data.optionsArray = (invalidOptions && this.newTaskForm.value.answer_format == 1) ? [] : data.optionsArray;
      this.dialog.open(BuilderComponent, {
        data
      });
      this.dialogRef.close();
    } else {
      this._snackBar.open('Invalid Form', '', {duration: 1500});
    }
  }
}
