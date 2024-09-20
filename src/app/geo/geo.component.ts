import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { geoNaturalEarth1, geoPath } from 'd3-geo';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
  @ViewChild('geoMap', { static: true }) private geoMapElement!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.createMap();
  }

  @HostListener('window:resize')
  onResize() {
    this.createMap();
  }

  private createMap(): void {
    const svg = d3.select(this.geoMapElement.nativeElement);
    svg.selectAll("*").remove();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const projection = geoNaturalEarth1()
      .scale(1)
      .translate([0, 0]);

    const path = geoPath().projection(projection);

    d3.json<GeoJSON.FeatureCollection>("assets/countries.geojson").then(geojsonData => {
      if (geojsonData) {
        const bounds = path.bounds(geojsonData);
        const scale = 0.95 / Math.max(
          (bounds[1][0] - bounds[0][0]) / width,
          (bounds[1][1] - bounds[0][1]) / height
        );

        const translate: [number, number] = [
          (width - scale * (bounds[1][0] + bounds[0][0])) / 2,
          (height - scale * (bounds[1][1] + bounds[0][1])) / 2
        ];

        projection.scale(scale).translate(translate);

        svg.attr("width", width)
           .attr("height", height);

        svg.append("g")
          .selectAll("path")
          .data(geojsonData.features)
          .enter().append("path")
          .attr("d", feature => path(feature))
          .attr("fill", "#69b3a2")
          .attr("stroke", "#333");
      }
    }).catch(error => {
      console.error("Error loading GeoJSON:", error);
    });
  }
}
