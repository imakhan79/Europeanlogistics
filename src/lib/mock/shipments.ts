export type ShipmentStatus =
  | "draft"
  | "booked"
  | "planned"
  | "assigned"
  | "pickup"
  | "in_transit"
  | "delayed"
  | "delivered"
  | "pod"
  | "completed"
  | "cancelled";

export type Shipment = {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  vehicle: string;
  driver: string;
  distance: string;
  cargo: string;
  weight: string;
  pickupWindow: string;
  deliveryWindow: string;
  eta: string;
  revenue: string;
};

export const STATUS_LABEL: Record<ShipmentStatus, string> = {
  draft: "Draft",
  booked: "Booked",
  planned: "Planned",
  assigned: "Assigned",
  pickup: "Pickup",
  in_transit: "In Transit",
  delayed: "Delayed",
  delivered: "Delivered",
  pod: "POD",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const STATUS_TONE: Record<ShipmentStatus, "info" | "default" | "warning" | "danger" | "success"> = {
  draft: "default",
  booked: "default",
  planned: "info",
  assigned: "info",
  pickup: "info",
  in_transit: "info",
  delayed: "warning",
  delivered: "success",
  pod: "success",
  completed: "success",
  cancelled: "danger",
};

export const WORKFLOW_STEPS = [
  "Customer",
  "Pickup",
  "Delivery",
  "Cargo",
  "Vehicle Requirements",
  "Delivery Window",
  "Documents",
  "AI Validation",
  "Save",
];

export const SHIPMENTS: Shipment[] = [
  {
    id: "EU-12872",
    customer: "Nordwerk Industries",
    origin: "Berlin, DE",
    destination: "Milan, IT",
    status: "in_transit",
    vehicle: "DE-4827",
    driver: "Markus Weber",
    distance: "1,188 km",
    cargo: "Machine parts, 18 pallets",
    weight: "12.4t",
    pickupWindow: "Today 06:00–08:00",
    deliveryWindow: "Today 18:00–20:00",
    eta: "17:25",
    revenue: "€2,200",
  },
  {
    id: "EU-12873",
    customer: "Atlas Retail Group",
    origin: "Paris, FR",
    destination: "Barcelona, ES",
    status: "in_transit",
    vehicle: "FR-1298",
    driver: "Claire Dubois",
    distance: "1,035 km",
    cargo: "Consumer goods, 22 pallets",
    weight: "14.1t",
    pickupWindow: "Today 05:30–07:00",
    deliveryWindow: "Today 17:00–19:00",
    eta: "16:55",
    revenue: "€1,940",
  },
  {
    id: "EU-12874",
    customer: "Verdi Foods",
    origin: "Milan, IT",
    destination: "Munich, DE",
    status: "delayed",
    vehicle: "IT-8821",
    driver: "Marco Rossi",
    distance: "487 km",
    cargo: "Refrigerated foodstuffs",
    weight: "9.8t",
    pickupWindow: "Today 04:00–05:00",
    deliveryWindow: "Today 12:00–13:00",
    eta: "15:40",
    revenue: "€980",
  },
  {
    id: "EU-12875",
    customer: "Baltic Components",
    origin: "Warsaw, PL",
    destination: "Berlin, DE",
    status: "assigned",
    vehicle: "PL-3311",
    driver: "Tomasz Nowak",
    distance: "574 km",
    cargo: "Electronics, 10 pallets",
    weight: "6.2t",
    pickupWindow: "Tomorrow 07:00–09:00",
    deliveryWindow: "Tomorrow 16:00–18:00",
    eta: "—",
    revenue: "€1,120",
  },
  {
    id: "EU-12876",
    customer: "Van Dijk Logistics",
    origin: "Rotterdam, NL",
    destination: "Antwerp, BE",
    status: "planned",
    vehicle: "NL-7742",
    driver: "Sanne de Vries",
    distance: "104 km",
    cargo: "Bulk containers",
    weight: "22.0t",
    pickupWindow: "Tomorrow 08:00–09:00",
    deliveryWindow: "Tomorrow 11:00–12:00",
    eta: "—",
    revenue: "€460",
  },
  {
    id: "EU-12877",
    customer: "Iberia Manufacturing",
    origin: "Madrid, ES",
    destination: "Frankfurt, DE",
    status: "booked",
    vehicle: "ES-5510",
    driver: "Javier Moreno",
    distance: "1,870 km",
    cargo: "Automotive parts",
    weight: "16.7t",
    pickupWindow: "In 2 days, 06:00–08:00",
    deliveryWindow: "In 3 days, 14:00–16:00",
    eta: "—",
    revenue: "€2,850",
  },
  {
    id: "EU-12868",
    customer: "Nordwerk Industries",
    origin: "Hamburg, DE",
    destination: "Vienna, AT",
    status: "delivered",
    vehicle: "AT-2201",
    driver: "Lukas Gruber",
    distance: "830 km",
    cargo: "Machine parts",
    weight: "11.0t",
    pickupWindow: "Yesterday 06:00–08:00",
    deliveryWindow: "Yesterday 20:00–22:00",
    eta: "Delivered 21:12",
    revenue: "€1,640",
  },
  {
    id: "EU-12861",
    customer: "Atlas Retail Group",
    origin: "Antwerp, BE",
    destination: "Cologne, DE",
    status: "completed",
    vehicle: "BE-9034",
    driver: "Emma Peeters",
    distance: "168 km",
    cargo: "Consumer goods",
    weight: "8.5t",
    pickupWindow: "2 days ago",
    deliveryWindow: "2 days ago",
    eta: "Completed",
    revenue: "€520",
  },
  {
    id: "EU-12850",
    customer: "Verdi Foods",
    origin: "Bologna, IT",
    destination: "Lyon, FR",
    status: "cancelled",
    vehicle: "—",
    driver: "—",
    distance: "620 km",
    cargo: "Refrigerated foodstuffs",
    weight: "—",
    pickupWindow: "—",
    deliveryWindow: "—",
    eta: "—",
    revenue: "€0",
  },
];
