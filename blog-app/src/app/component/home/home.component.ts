import {Component, OnInit} from '@angular/core';
import {BlogInfo} from '../../domain/bloginfo.domain';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public blogInfo: BlogInfo = new BlogInfo();


  constructor(public snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

}
