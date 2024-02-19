import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobListingService {

  constructor(private store: AngularFirestore) { }
  fetchJobs(): Observable<any>{
    return this.store.collection('backend-jobs').valueChanges({idField: 'id'}) as Observable<any[]>;

  }
}
