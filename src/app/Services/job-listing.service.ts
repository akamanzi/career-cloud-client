import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Job } from '../Types/Job';
import { merge, concat, forkJoin, zip } from "rxjs";
import { map, mergeAll } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobListingService {

  constructor(private store: AngularFirestore) { }
  fetchJobs(type: any): Observable<any>{
    return this.store.collection(type).valueChanges({idField: 'id'}) as Observable<any[]>;
  }
  addJob(job:Job, jobCategory: any) {
    console.log("adding job ", job)
    return this.store.collection(jobCategory).add(job);
  }

  editJob(job:Job, jobCategory: any){
    return this.store.collection(jobCategory).doc(job.id).update(job);
  }

  deleteJob(job:Job, jobCategory: any) {
    return this.store.collection(jobCategory).doc(job.id).delete();
  }
  getAllJob(){
    return zip(
      this.fetchJobs("backend-jobs"), 
      this.fetchJobs("frontend"),
      this.fetchJobs("fullstack")
    
)
  }
}
