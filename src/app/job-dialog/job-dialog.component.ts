import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Job } from "../Types/Job";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export interface JobDialogData {
  job: Partial<Job>;
  enableDelete: boolean;
}

export interface JobDialogResult {
  job: Job;
  delete?: boolean;
}

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {
  private backupJob: Partial<Job> = { ...this.data.job };
  jobFormGroup = new FormGroup({
    title: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
    company: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
    jobDescription: new FormControl('', [Validators.required, Validators.pattern(/\s/), Validators.minLength(20)]),
    date: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobDialogData
  ) { }

  ngOnInit(): void {
  }
  cancel(): void {
    this.data.job.title = this.backupJob.title;
    this.data.job.job_description = this.backupJob.job_description;
    this.data.job.company = this.backupJob.company;
    this.dialogRef.close(this.data);
  }
}
