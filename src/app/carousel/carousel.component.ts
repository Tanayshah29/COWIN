import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  data = [
    { img: "https://prod-cdn.preprod.co-vin.in/sandbox/assets/images/modi-home-banner.png", title: "Slide 1" },
    { img: "https://prod-cdn.preprod.co-vin.in/sandbox/assets/images/modi-home-banner.png", title: "Slide 2" }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
