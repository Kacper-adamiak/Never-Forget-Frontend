import { Injectable } from '@angular/core';
import {Person} from "../model/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private persons: Person[] = [
    {name: 'John', surname: 'Doe', day: 3, month: 8, year: 2013},
    {name: 'Jane', surname: 'Doe', day: 15, month: 3, year: 1995},
    {name: 'John', surname: 'Smith', day: 10, month: 7, year: 1980},
    {name: 'John', surname: 'Smith', day: 10, month: 7, year: 1980},
    {name: 'John', surname: 'Smith', day: 10, month: 7, year: 1980},
    {name: 'John', surname: 'Smith', day: 10, month: 7, year: 1980},
  ]

  constructor() { }

  getPersons(): Person[] {
    return this.persons;
  }

  getPerson(id: number): Person | null {
    return this.persons.find(p => p.id === id) ?? null;
  }

  addPerson(person: Person) {
    this.persons.push(person);
  }

  deletePerson(person: Person) {
    this.persons = this.persons.filter(p => p !== person);
  }

  updatePerson(person: Person) {
    this.persons = this.persons.map(p => p === person ? person : p);
  }

  getPersonsByDate(date: Date): Person[] | null {
    return this.persons.filter(p => p.day === date.getDay() && p.month === date.getMonth() && p.year === date.getFullYear());
  }

  getPersonAge(person: Person, year: number): number {
    return year - person.year;
  }

  getMonthlyCount(): number[] {
    const monthlyCount: number[] = new Array(12).fill(0);
    this.persons.forEach(p => monthlyCount[p.month-1]++);
    return monthlyCount;
  }

}
