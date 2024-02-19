import { Component, Input, OnInit } from '@angular/core';
import { JobListingService } from '../Services/job-listing.service';
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { Job } from "../Types/Job";
import { JobDialogComponent, JobDialogResult } from '../job-dialog/job-dialog.component';
@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {
  @Input() jobCategory: any;
  jobData: any[] = [];

  constructor(
    private jobService: JobListingService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getJobs();
  }
  getJobs(){
    if(this.jobCategory === "all") {
      this.jobService.getAllJob().subscribe(results => {
        var returnedData: any[] = []
        results.forEach(res => {
          for (let item in res) {
            returnedData.push(res[item])
          }
        })
        this.jobData = returnedData;
      })
    }
    else{
      this.jobService.fetchJobs(this.jobCategory).subscribe(results => {
        this.jobData = results
      })
    }
  }
  EditJob(event: any, job: any){
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '270px',
      data: {
        job,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: JobDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        console.log("deleting job ", result.job)
        this.jobService.deleteJob(result.job, this.jobCategory);
      }
      else{
        this.jobService.editJob(result.job, this.jobCategory)
      }
      
    });
  }
  
  addNewJob(): void{
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '270px',
      data: {
        job: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: JobDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.jobService.addJob(result.job, this.jobCategory)
      });
  }
}
