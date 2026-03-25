import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  private map: any;
  private view: any;
  private graphicsLayer: any;
  private is3D = false;
  private basemaps: string[] = ['streets', 'satellite', 'topo'];
  private currentBasemapIndex = 0;

  async ngOnInit() {}

  async ngAfterViewInit() {
    await this.initMap();
  }

  private async initMap() {
    this.graphicsLayer = new GraphicsLayer();
    
    this.map = new Map({
      basemap: this.basemaps[this.currentBasemapIndex],
      layers: [this.graphicsLayer]
    });

    this.view = new MapView({
      container: this.mapContainer.nativeElement,
      map: this.map,
      center: [116, 39],
      zoom: 10
    });

    await this.view.when();
  }

  async switchView(mode: '2d' | '3d') {
    if ((mode === '3d') === this.is3D) return;
    
    const container = this.mapContainer.nativeElement;
    this.view.destroy();
    
    this.graphicsLayer = new GraphicsLayer();
    
    if (mode === '3d') {
      this.map = new Map({
        basemap: this.basemaps[this.currentBasemapIndex],
        ground: 'world-surface',
        layers: [this.graphicsLayer]
      });
      this.view = new SceneView({
        container,
        map: this.map,
        camera: {
          position: { longitude: 116, latitude: 39, z: 50000 },
          tilt: 45,
          heading: 0
        }
      });
    } else {
      this.map = new Map({
        basemap: this.basemaps[this.currentBasemapIndex],
        layers: [this.graphicsLayer]
      });
      this.view = new MapView({
        container,
        map: this.map,
        center: [116, 39],
        zoom: 10
      });
    }
    
    this.is3D = mode === '3d';
    await this.view.when();
  }

  addMarker() {
    const lng = 116 + Math.random() * 0.1;
    const lat = 39 + Math.random() * 0.1;
    
    const graphic = new Graphic({
      geometry: new Point({ longitude: lng, latitude: lat }),
      symbol: new SimpleMarkerSymbol({
        color: [255, 0, 0, 0.8],
        size: 12,
        outline: { color: [255, 255, 0], width: 2 }
      })
    });
    
    this.graphicsLayer.add(graphic);
  }

  flyToBeijing() {
    if (this.view) {
      this.view.goTo({
        target: [116, 39],
        zoom: 12
      });
    }
  }

  changeBasemap() {
    this.currentBasemapIndex = (this.currentBasemapIndex + 1) % this.basemaps.length;
    this.map.basemap = this.basemaps[this.currentBasemapIndex];
  }

  clearGraphics() {
    if (this.graphicsLayer) {
      this.graphicsLayer.removeAll();
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}