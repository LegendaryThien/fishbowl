export interface Position {
  lat: number;
  lng: number;
}

export interface Marker {
  id: number;
  position: Position;
  title: string;
  type: 'fountain' | 'toilet' | 'outlet';
}

export interface MapData {
  position: Position;
  zoom: number;
  mapId: string;
  markers: Marker[];
} 