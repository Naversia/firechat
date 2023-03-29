import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../classes/movie';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  // Get all movies from firebase
  constructor(private fireStore: Firestore) { }

  GetMovies() :Observable<Movie[]> {
    const notesRef = collection(this.fireStore, 'Movies');
    return collectionData(notesRef, {idField: 'id'}) as Observable<Movie[]>;
  }

  AddMovie(newMovie: any) {
    const notesRef = collection(this.fireStore, 'Movies');
    return addDoc(notesRef, newMovie);
  }

  DeleteMovie(item: any) {
    const noteDocRef = doc(this.fireStore, 'Movies', item.id);
    return deleteDoc(noteDocRef);
  }

  UpdateMovie(movie: Movie) {
    const noteDocRef = doc(this.fireStore, 'Movies/'+ movie.id);
    return updateDoc(noteDocRef, {name: movie.name, description: movie.description, year: movie.year, image: movie.image, watched: movie.watched});
  }

  // showLog() {
  //   console.log('hello')
  // }

}
