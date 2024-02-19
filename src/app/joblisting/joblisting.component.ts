import { Component, OnInit } from '@angular/core';
import { JobListingService } from '../Services/job-listing.service';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {
  jobData: any[] = [];
  list = [{
    title: "Fronted Developers",
    company: "Bank of Canada",
    job_description: "Develop software applications",
    date: "19th/Feb/2024"
  },
  {
    title: "Fronted Developers",
    company: "Bank of Canada",
    job_description: "Develop software applications",
    date: "19th/Feb/2024"
  },
  {
    title: "Fronted Developers",
    company: "Bank of Canada",
    job_description: "Develop software applications",
    date: "19th/Feb/2024"
  },
  {
    title: "Fronted Developers",
    company: "Bank of Canada",
    job_description: "Develop software applications",
    date: "19th/Feb/2024"
  },
  {
    title: "Fronted Developers",
    company: "Bank of Canada",
    job_description: "Develop software applications",
    date: "19th/Feb/2024"
  }
]
  constructor(private jobService: JobListingService) { }

  ngOnInit(): void {
    this.getJobs();
  }
  getJobs(){
    this.jobService.fetchJobs().subscribe(results => {
      this.jobData = results
      
    })
    console.log("jobs: ", this.jobData)
  }
  EditJob(event: any, job: any){
  }

  addNewJob(){
    
  }
}
