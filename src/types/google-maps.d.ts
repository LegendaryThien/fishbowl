declare namespace google.maps {
  interface Map {
    constructor(el: HTMLElement, opts: MapOptions): Map;
  }

  interface MapOptions {
    zoom?: number;
    center?: LatLngLiteral;
    mapId?: string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapsLibrary {
    Map: new (el: HTMLElement, opts: MapOptions) => Map;
  }

  interface MarkerLibrary {
    AdvancedMarkerElement: new (opts: AdvancedMarkerElementOptions) => any;
  }

  interface AdvancedMarkerElementOptions {
    map?: Map;
    position?: LatLngLiteral;
    title?: string;
  }

  function importLibrary(library: string): Promise<any>;
} 