export interface Rating {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  [key: string]: number;
}

export interface TimeSlot {
  from: string;
  to: string;
}

export interface OpeningHours {
  "L": TimeSlot[];
  "M": TimeSlot[];
  "X": TimeSlot[];
  "J": TimeSlot[];
  "V": TimeSlot[];
  "S": TimeSlot[];
  "D": TimeSlot[];
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface MenuSection {
  sectionName: string;
  items: MenuItem[];
}

export interface Point {
  x: number;
  y: number;
}

export interface Table {
  id: number;
  p1: Point;
  p2: Point;
  shape: "round" | "square";
  capacity: number;
}

export interface TableMap {
  outline: Point[];
  tables: Table[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  hours: OpeningHours;
  url: string;
  address: string;
  minPrice: number;
  maxPrice: number;
  coordinates: [number, number];
  categories: number[];
  rating: Rating;
  menu: MenuSection[];
  tableMap: TableMap;
  image: string;
  gallery: string[];
}
