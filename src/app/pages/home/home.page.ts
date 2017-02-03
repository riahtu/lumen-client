import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePageComponent implements OnInit {

  public thumbnails: any;

  constructor() { }

  ngOnInit() {
    this.thumbnails = [{
      'title': "NILM Explorer",
      'description': "View data from any NILM",
      'image_url': "assets/images/robot_laptop_250x250.jpg",
      'location': "/explorer"
    },
    /*{
      'title': "NILM Filter",
      'description': "Design filtering scripts",
      'image_url': "assets/images/robot_builder_250x250.jpg"
    },*/
    /*{
      'title': "NILM Analyzer",
      'description': "Design data reports",
      'image_url': "assets/images/robot_pie_250x250.jpg"
    },*/
    /*{
      'title': "NILM Finder",
      'description': "Identify loads by exemplar",
      'image_url': "assets/images/robot_lens_sit_250x250.jpg"
    },*/
    /*{
      'title': "Processes",
      'description': "Automated data analysis",
      'image_url': "assets/images/robot_gear_250x250.jpg"
    },*/
    /*{
      'title': "Report Viewer",
      'description': "Access reports from NILM's",
      'image_url': "assets/images/robot_report_250x250.jpg"
    },*/
    {
      'title': "Administration",
      'description': "Manage Installations",
      'image_url': "assets/images/robot_world_250x250.jpg",
      'location': "/installations"
    },
    /*{
      'title': "Help",
      'description': "Tutorials and Documentation",
      'image_url': "assets/images/robot_question_250x250.jpg"
    }*/
    ]

  }

}
