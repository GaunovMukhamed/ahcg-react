export interface MapObject {
  name: string;
  type: string;
  url: string;
  description: string;
  x: number;
  y: number;
  locations: Location[];
}

export interface Location {
  name: string;
  url: string;
  description: string;
}