export interface Position {
  lat: number;
  lng: number;
}

export interface Marker {
  position: Position;
  title: string;
}

export interface MapData {
  position: Position;
  zoom: number;
  mapId: string;
  markers: Marker[];
} 