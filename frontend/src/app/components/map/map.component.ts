import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, signal } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
// import esriConfig from "@arcgis/core/config";

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
  private _is3D = false;
  
  isLoading = signal(false);
  
  basemaps = [
    { value: 'streets', label: 'Streets' },
    { value: 'satellite', label: 'Satellite' },
    { value: 'topo', label: 'Topographic' }
  ];
  selectedBasemap = 'streets';
  
  locations = [
    { name: 'Jurong', lng: 100.62, lat: 1.38 },
    { name: 'TAMPINES', lng: 100.55, lat: 1.42 },
    { name: 'Yishun', lng: 100.48, lat: 1.45 },
    { name: 'Bukit Timah', lng: 100.52, lat: 1.48 },
    { name: 'Serangoon', lng: 100.42, lat: 1.52 }
  ];
  selectedLocation = 'Jurong';

  get is3D() { return this._is3D; }

  async ngOnInit() {}

  async ngAfterViewInit() {
    await this.initMap();
  }

  private readonly CENTER_LNG = 100.6;
  private readonly CENTER_LAT = -0.5;

  private async initMap() {
    this.isLoading.set(true);
    this.graphicsLayer = new GraphicsLayer();
    // esriConfig.assetsPath = "./assets/arcgismap";
    // esriConfig.assetsPath = "assets/arcgismap";
    this.map = new Map({
      basemap: this.selectedBasemap,
      layers: [this.graphicsLayer]
    });

    this.view = new MapView({
      container: this.mapContainer.nativeElement,
      map: this.map,
      center: [this.CENTER_LNG, this.CENTER_LAT],
      zoom: 10
    });

    await this.view.when();
    this.isLoading.set(false);
  }

  async toggleView() {
    const newMode = this._is3D ? '2d' : '3d';
    this.isLoading.set(true);
    
    const container = this.mapContainer.nativeElement;
    this.view.destroy();
    
    this.graphicsLayer = new GraphicsLayer();
    
    if (newMode === '3d') {
      this.map = new Map({
        basemap: this.selectedBasemap,
        ground: 'world-surface',
        layers: [this.graphicsLayer]
      });
      this.view = new SceneView({
        container,
        map: this.map,
        camera: {
          position: { longitude: this.CENTER_LNG, latitude: this.CENTER_LAT, z: 50000 },
          tilt: 45,
          heading: 0
        }
      });
    } else {
      this.map = new Map({
        basemap: this.selectedBasemap,
        layers: [this.graphicsLayer]
      });
      this.view = new MapView({
        container,
        map: this.map,
        center: [this.CENTER_LNG, this.CENTER_LAT],
        zoom: 10
      });
    }
    
    this._is3D = !this._is3D;
    await this.view.when();
    this.isLoading.set(false);
  }

  addMarker() {
    const lng = this.CENTER_LNG + (Math.random() - 0.5) * 0.1;
    const lat = this.CENTER_LAT + (Math.random() - 0.5) * 0.1;
    
    const point = new Point({ longitude: lng, latitude: lat });
    const label = lng.toFixed(4) + ', ' + lat.toFixed(4);
    const labelOffset = this._is3D ? 0.015 : 0.008;
    
    const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">' +
      '<path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 24 16 24s16-12 16-24C24.8 7.2 17.6 0 16 0z" fill="#1979d3"/>' +
      '<circle cx="16" cy="14" r="6" fill="white"/>' +
      '</svg>'
    );
    
    const graphic = new Graphic({
      geometry: point,
      symbol: new PictureMarkerSymbol({
        url: svgUrl,
        width: 24,
        height: 30,
        yoffset: -15
      })
    });
    
    const labelGraphic = new Graphic({
      geometry: new Point({ longitude: lng, latitude: lat + labelOffset }),
      symbol: new TextSymbol({
        text: label,
        color: [25, 121, 211, 1],
        font: { size: 10, family: 'Arial' },
        haloColor: [255, 255, 255, 1],
        haloSize: 2
      })
    });
    
    this.graphicsLayer.addMany([graphic, labelGraphic]);
    
    if (this.view) {
      this.view.goTo({
        target: point,
        zoom: 14
      });
    }
  }

  flyToLocation(location: { name: string, lng: number, lat: number }) {
    if (this.view) {
      this.view.goTo({
        target: [location.lng, location.lat],
        zoom: 12
      });
    }
  }

  onLocationChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const location = this.locations.find(l => l.name === select.value);
    if (location) {
      this.flyToLocation(location);
    }
  }

  async onBasemapChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select.value === this.selectedBasemap) return;
    
    this.isLoading.set(true);
    this.selectedBasemap = select.value;
    this.map.basemap = this.selectedBasemap;
    
    await this.view.when();
    this.isLoading.set(false);
  }

  clearGraphics() {
    if (this.graphicsLayer) {
      this.graphicsLayer.removeAll();
    }
  }

  zoomIn() {
    if (this.view) {
      this.view.zoom = Math.min(this.view.zoom + 1, 20);
    }
  }

  zoomOut() {
    if (this.view) {
      this.view.zoom = Math.max(this.view.zoom - 1, 0);
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}