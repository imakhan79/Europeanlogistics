export const FUEL_KPIS = [
  { label: "Fleet Fuel Cost (MTD)", value: "€142,380" },
  { label: "Avg. Consumption", value: "28.4 L/100km" },
  { label: "Avg. Price Paid", value: "€1.62 / L" },
  { label: "Active Fuel Cards", value: "8" },
  { label: "Litres Purchased (MTD)", value: "87,890 L" },
  { label: "Anomalies Flagged", value: "3" },
];

export type FuelCardStatus = "active" | "blocked" | "expiring";

export type FuelCard = {
  cardNumber: string;
  provider: string;
  vehicle: string;
  driver: string;
  monthlyLimit: number;
  spentThisMonth: number;
  status: FuelCardStatus;
  expiry: string;
};

export const FUEL_CARD_STATUS_LABEL: Record<FuelCardStatus, string> = {
  active: "Active",
  blocked: "Blocked",
  expiring: "Expiring Soon",
};

export const FUEL_CARD_STATUS_TONE: Record<FuelCardStatus, "success" | "danger" | "warning"> = {
  active: "success",
  blocked: "danger",
  expiring: "warning",
};

export const FUEL_CARDS: FuelCard[] = [
  { cardNumber: "DKV-4471-8820", provider: "DKV", vehicle: "DE-4827", driver: "Markus Weber", monthlyLimit: 3500, spentThisMonth: 2180, status: "active", expiry: "2027-03" },
  { cardNumber: "SHELL-1029-5541", provider: "Shell Fleet", vehicle: "FR-1298", driver: "Claire Dubois", monthlyLimit: 3200, spentThisMonth: 2950, status: "active", expiry: "2026-11" },
  { cardNumber: "EUROSHELL-8842", provider: "Euroshell", vehicle: "IT-8821", driver: "Marco Rossi", monthlyLimit: 3000, spentThisMonth: 3010, status: "blocked", expiry: "2026-09" },
  { cardNumber: "DKV-2231-7793", provider: "DKV", vehicle: "PL-3311", driver: "Tomasz Nowak", monthlyLimit: 2800, spentThisMonth: 1420, status: "active", expiry: "2027-01" },
  { cardNumber: "UTA-5590-2214", provider: "UTA", vehicle: "NL-7742", driver: "Sanne de Vries", monthlyLimit: 3100, spentThisMonth: 980, status: "active", expiry: "2026-09" },
  { cardNumber: "DKV-9012-4456", provider: "DKV", vehicle: "ES-5510", driver: "Javier Moreno", monthlyLimit: 3300, spentThisMonth: 2540, status: "active", expiry: "2027-05" },
  { cardNumber: "OMV-3321-6689", provider: "OMV", vehicle: "AT-2201", driver: "Lukas Gruber", monthlyLimit: 2900, spentThisMonth: 2710, status: "expiring", expiry: "2026-09" },
  { cardNumber: "DKV-7765-1123", provider: "DKV", vehicle: "BE-9034", driver: "Emma Peeters", monthlyLimit: 2600, spentThisMonth: 1190, status: "active", expiry: "2027-02" },
];

export type FuelTransaction = {
  id: string;
  date: string;
  vehicle: string;
  driver: string;
  station: string;
  country: string;
  litres: number;
  pricePerLitre: number;
  total: number;
  card: string;
};

export const FUEL_TRANSACTIONS: FuelTransaction[] = [
  { id: "FT-88231", date: "2026-08-29", vehicle: "DE-4827", driver: "Markus Weber", station: "Shell Stuttgart A8", country: "DE", litres: 410, pricePerLitre: 1.61, total: 660.1, card: "DKV-4471-8820" },
  { id: "FT-88230", date: "2026-08-29", vehicle: "FR-1298", driver: "Claire Dubois", station: "TotalEnergies Lyon Sud", country: "FR", litres: 380, pricePerLitre: 1.74, total: 661.2, card: "SHELL-1029-5541" },
  { id: "FT-88229", date: "2026-08-28", vehicle: "ES-5510", driver: "Javier Moreno", station: "Repsol Zaragoza", country: "ES", litres: 395, pricePerLitre: 1.58, total: 624.1, card: "DKV-9012-4456" },
  { id: "FT-88228", date: "2026-08-28", vehicle: "IT-8821", driver: "Marco Rossi", station: "Eni Bologna Est", country: "IT", litres: 60, pricePerLitre: 1.79, total: 107.4, card: "EUROSHELL-8842" },
  { id: "FT-88227", date: "2026-08-27", vehicle: "PL-3311", driver: "Tomasz Nowak", station: "Orlen Poznań", country: "PL", litres: 402, pricePerLitre: 1.39, total: 558.8, card: "DKV-2231-7793" },
  { id: "FT-88226", date: "2026-08-27", vehicle: "NL-7742", driver: "Sanne de Vries", station: "TinQ Rotterdam Haven", country: "NL", litres: 355, pricePerLitre: 1.83, total: 649.7, card: "UTA-5590-2214" },
  { id: "FT-88225", date: "2026-08-26", vehicle: "AT-2201", driver: "Lukas Gruber", station: "OMV Innsbruck", country: "AT", litres: 388, pricePerLitre: 1.69, total: 655.7, card: "OMV-3321-6689" },
  { id: "FT-88224", date: "2026-08-26", vehicle: "BE-9034", driver: "Emma Peeters", station: "Q8 Antwerp Port", country: "BE", litres: 340, pricePerLitre: 1.76, total: 598.4, card: "DKV-7765-1123" },
  { id: "FT-88223", date: "2026-08-25", vehicle: "DE-4827", driver: "Markus Weber", station: "Aral Frankfurt Nord", country: "DE", litres: 398, pricePerLitre: 1.63, total: 648.7, card: "DKV-4471-8820" },
  { id: "FT-88222", date: "2026-08-24", vehicle: "IT-8821", driver: "Marco Rossi", station: "Q8 Verona", country: "IT", litres: 415, pricePerLitre: 1.81, total: 751.2, card: "EUROSHELL-8842" },
];

export type ConsumptionRecord = {
  vehicle: string;
  driver: string;
  avgConsumption: number;
  targetConsumption: number;
  distanceKm: number;
  litresUsed: number;
  variancePct: number;
};

export const CONSUMPTION_RECORDS: ConsumptionRecord[] = [
  { vehicle: "DE-4827", driver: "Markus Weber", avgConsumption: 27.8, targetConsumption: 28.0, distanceKm: 4210, litresUsed: 1170, variancePct: -0.7 },
  { vehicle: "FR-1298", driver: "Claire Dubois", avgConsumption: 29.6, targetConsumption: 27.5, distanceKm: 3980, litresUsed: 1178, variancePct: 7.6 },
  { vehicle: "IT-8821", driver: "Marco Rossi", avgConsumption: 33.1, targetConsumption: 28.0, distanceKm: 3540, litresUsed: 1172, variancePct: 18.2 },
  { vehicle: "PL-3311", driver: "Tomasz Nowak", avgConsumption: 26.9, targetConsumption: 28.0, distanceKm: 2890, litresUsed: 778, variancePct: -3.9 },
  { vehicle: "NL-7742", driver: "Sanne de Vries", avgConsumption: 27.2, targetConsumption: 27.0, distanceKm: 1450, litresUsed: 395, variancePct: 0.7 },
  { vehicle: "ES-5510", driver: "Javier Moreno", avgConsumption: 28.9, targetConsumption: 28.0, distanceKm: 4680, litresUsed: 1353, variancePct: 3.2 },
  { vehicle: "AT-2201", driver: "Lukas Gruber", avgConsumption: 31.4, targetConsumption: 28.0, distanceKm: 2210, litresUsed: 694, variancePct: 12.1 },
  { vehicle: "BE-9034", driver: "Emma Peeters", avgConsumption: 26.1, targetConsumption: 27.0, distanceKm: 3320, litresUsed: 867, variancePct: -3.3 },
];

export type CountryPrice = {
  country: string;
  code: string;
  pricePerLitre: number;
  weeklyChangePct: number;
};

export const COUNTRY_PRICES: CountryPrice[] = [
  { country: "Germany", code: "DE", pricePerLitre: 1.63, weeklyChangePct: 0.6 },
  { country: "France", code: "FR", pricePerLitre: 1.74, weeklyChangePct: 1.2 },
  { country: "Italy", code: "IT", pricePerLitre: 1.80, weeklyChangePct: -0.4 },
  { country: "Spain", code: "ES", pricePerLitre: 1.58, weeklyChangePct: 0.3 },
  { country: "Poland", code: "PL", pricePerLitre: 1.39, weeklyChangePct: -0.9 },
  { country: "Netherlands", code: "NL", pricePerLitre: 1.83, weeklyChangePct: 0.8 },
  { country: "Austria", code: "AT", pricePerLitre: 1.69, weeklyChangePct: 0.2 },
  { country: "Belgium", code: "BE", pricePerLitre: 1.76, weeklyChangePct: -0.2 },
];

export type FuelAlertSeverity = "low" | "medium" | "high";

export type FuelAlert = {
  vehicle: string;
  driver: string;
  type: string;
  detail: string;
  severity: FuelAlertSeverity;
  date: string;
};

export const FUEL_ALERT_TONE: Record<FuelAlertSeverity, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
};

export const FUEL_ALERTS: FuelAlert[] = [
  { vehicle: "IT-8821", driver: "Marco Rossi", type: "Excess Consumption", detail: "18.2% above target — check driving behaviour or route grade", severity: "high", date: "2026-08-28" },
  { vehicle: "AT-2201", driver: "Lukas Gruber", type: "Card Over Limit", detail: "Monthly card spend €2,710 of €2,900 limit — 93% utilised", severity: "medium", date: "2026-08-27" },
  { vehicle: "IT-8821", driver: "Marco Rossi", type: "Card Blocked", detail: "Card spend exceeded monthly limit — auto-blocked pending review", severity: "high", date: "2026-08-28" },
  { vehicle: "FR-1298", driver: "Claire Dubois", type: "Consumption Drift", detail: "7.6% above target for 3 consecutive weeks", severity: "low", date: "2026-08-25" },
];
