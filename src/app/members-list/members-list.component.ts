import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Member {
  name: string;
  email: string;
}

@Component({
  selector: 'app-members-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  members: Member[] = [
    { name: 'John Doe', email: 'email@.com' },
  ];

  constructor() {}

  ngOnInit(): void {
  }

}