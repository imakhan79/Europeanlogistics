export const ANALYTICS_KPIS = [
  { label: "On-Time Delivery", value: "96.4%" },
  { label: "Fleet Utilization", value: "86%" },
  { label: "Revenue per KM", value: "€1.94" },
  { label: "Empty KM", value: "8.7%" },
  { label: "Avg. Delivery Time", value: "13h 12m" },
  { label: "Customer Retention", value: "94.1%" },
];

export type ShipmentVolumeMonth = {
  month: string;
  shipments: number;
  onTimePct: number;
};

export const SHIPMENT_VOLUME_TREND: ShipmentVolumeMonth[] = [
  { month: "Mar", shipments: 512, onTimePct: 94.8 },
  { month: "Apr", shipments: 548, onTimePct: 95.2 },
  { month: "May", shipments: 571, onTimePct: 95.9 },
  { month: "Jun", shipments: 604, onTimePct: 96.1 },
  { month: "Jul", shipments: 589, onTimePct: 95.5 },
  { month: "Aug", shipments: 632, onTimePct: 96.4 },
];

export type FleetUtilization = {
  vehicle: string;
  makeModel: string;
  utilizationPct: number;
  kmDriven: number;
  revenue: number;
  idleHours: number;
};

export const FLEET_UTILIZATION: FleetUtilization[] = [
  { vehicle: "DE-4827", makeModel: "Mercedes Actros", utilizationPct: 92, kmDriven: 4210, revenue: 8420, idleHours: 14 },
  { vehicle: "FR-1298", makeModel: "Volvo FH16", utilizationPct: 88, kmDriven: 3980, revenue: 7910, idleHours: 22 },
  { vehicle: "IT-8821", makeModel: "Iveco S-Way", utilizationPct: 71, kmDriven: 3540, revenue: 6280, idleHours: 48 },
  { vehicle: "PL-3311", makeModel: "MAN TGX", utilizationPct: 76, kmDriven: 2890, revenue: 5640, idleHours: 39 },
  { vehicle: "NL-7742", makeModel: "DAF XF", utilizationPct: 58, kmDriven: 1450, revenue: 3120, idleHours: 71 },
  { vehicle: "ES-5510", makeModel: "Scania R500", utilizationPct: 94, kmDriven: 4680, revenue: 9340, idleHours: 9 },
  { vehicle: "AT-2201", makeModel: "Mercedes Actros", utilizationPct: 62, kmDriven: 2210, revenue: 4180, idleHours: 58 },
  { vehicle: "BE-9034", makeModel: "Volvo FH", utilizationPct: 85, kmDriven: 3320, revenue: 6720, idleHours: 26 },
];

export type DriverPerformance = {
  name: string;
  country: string;
  onTimePct: number;
  tripsCompleted: number;
  complianceScore: number;
  rating: number;
};

export const DRIVER_PERFORMANCE: DriverPerformance[] = [
  { name: "Markus Weber", country: "DE", onTimePct: 96, tripsCompleted: 342, complianceScore: 98, rating: 4.8 },
  { name: "Claire Dubois", country: "FR", onTimePct: 98, tripsCompleted: 288, complianceScore: 100, rating: 4.9 },
  { name: "Marco Rossi", country: "IT", onTimePct: 89, tripsCompleted: 401, complianceScore: 91, rating: 4.3 },
  { name: "Tomasz Nowak", country: "PL", onTimePct: 94, tripsCompleted: 210, complianceScore: 100, rating: 4.7 },
  { name: "Sanne de Vries", country: "NL", onTimePct: 93, tripsCompleted: 176, complianceScore: 97, rating: 4.6 },
  { name: "Javier Moreno", country: "ES", onTimePct: 91, tripsCompleted: 255, complianceScore: 95, rating: 4.5 },
  { name: "Lukas Gruber", country: "AT", onTimePct: 78, tripsCompleted: 198, complianceScore: 82, rating: 3.9 },
  { name: "Emma Peeters", country: "BE", onTimePct: 97, tripsCompleted: 302, complianceScore: 99, rating: 4.8 },
];

export type CorridorAnalytics = {
  corridor: string;
  shipments: number;
  onTimePct: number;
  avgTransitTime: string;
  revenueShare: number;
};

export const CORRIDOR_ANALYTICS: CorridorAnalytics[] = [
  { corridor: "Berlin → Milan", shipments: 88, onTimePct: 95.5, avgTransitTime: "13h 42m", revenueShare: 21.4 },
  { corridor: "Paris → Barcelona", shipments: 104, onTimePct: 96.8, avgTransitTime: "11h 05m", revenueShare: 24.8 },
  { corridor: "Milan → Munich", shipments: 62, onTimePct: 91.2, avgTransitTime: "6h 18m", revenueShare: 9.6 },
  { corridor: "Warsaw → Berlin", shipments: 96, onTimePct: 97.1, avgTransitTime: "7h 40m", revenueShare: 15.2 },
  { corridor: "Rotterdam → Antwerp", shipments: 142, onTimePct: 98.4, avgTransitTime: "1h 50m", revenueShare: 8.1 },
  { corridor: "Madrid → Frankfurt", shipments: 34, onTimePct: 93.0, avgTransitTime: "19h 20m", revenueShare: 14.9 },
];
