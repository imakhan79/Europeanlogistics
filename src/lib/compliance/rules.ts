import type { ComplianceRule } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RULES: ComplianceRule<any>[] = [
  {
    id: "driver-buffer-01",
    category: "driver",
    name: "Daily driving time safety buffer",
    country: "EU",
    effectiveDate: "2025-01-01",
    expiryDate: null,
    version: "1.0.0",
    source: "Regulation (EC) 561/2006, Art. 6",
    severity: "high",
    validate: (ctx: { remainingMinutes: number }) => ({
      passed: ctx.remainingMinutes >= 60,
      message:
        ctx.remainingMinutes >= 60
          ? "Sufficient remaining driving time"
          : `Only ${ctx.remainingMinutes}m remaining before daily limit`,
    }),
  },
  {
    id: "cabotage-3ops-01",
    category: "cabotage",
    name: "Max 3 cabotage operations within 7 days",
    country: "EU",
    effectiveDate: "2022-02-21",
    expiryDate: null,
    version: "1.1.0",
    source: "Regulation (EC) 1072/2009, Art. 8",
    severity: "critical",
    validate: (ctx: { operations: number; maxOperations: number }) => {
      if (ctx.operations > ctx.maxOperations) {
        return { passed: false, severity: "critical", message: "Operation limit exceeded" };
      }
      if (ctx.operations === ctx.maxOperations) {
        return { passed: true, severity: "medium", message: "At the operation limit" };
      }
      return { passed: true, message: "Within operation limit" };
    },
  },
  {
    id: "posting-declaration-01",
    category: "posting",
    name: "Prior posting declaration required",
    country: "EU",
    effectiveDate: "2020-08-02",
    expiryDate: null,
    version: "1.0.0",
    source: "Directive 96/71/EC as amended by Directive 2018/957/EU",
    severity: "high",
    validate: (ctx: { declaration: "filed" | "pending" | "missing" }) => ({
      passed: ctx.declaration === "filed",
      message: ctx.declaration === "filed" ? "Declaration filed" : "Declaration not yet filed",
    }),
  },
  {
    id: "posting-documents-01",
    category: "posting",
    name: "Complete posting documentation",
    country: "DE",
    effectiveDate: "2020-08-02",
    expiryDate: null,
    version: "1.0.0",
    source: "German Posted Workers Act (AEntG)",
    severity: "medium",
    validate: (ctx: { documents: "complete" | "incomplete" }) => ({
      passed: ctx.documents === "complete",
      message: ctx.documents === "complete" ? "Documents complete" : "Missing required documents",
    }),
  },
  {
    id: "tachograph-card-01",
    category: "tachograph",
    name: "Driver card record required for all driving activity",
    country: "EU",
    effectiveDate: "2019-06-15",
    expiryDate: null,
    version: "1.0.0",
    source: "Regulation (EU) 165/2014",
    severity: "critical",
    validate: () => ({ passed: true, message: "Reference rule for violation records" }),
  },
  {
    id: "tachograph-rest-01",
    category: "tachograph",
    name: "Minimum daily rest of 11 hours",
    country: "EU",
    effectiveDate: "2025-01-01",
    expiryDate: null,
    version: "1.0.0",
    source: "Regulation (EC) 561/2006, Art. 8",
    severity: "high",
    validate: () => ({ passed: true, message: "Reference rule for violation records" }),
  },
  {
    id: "vehicle-euro-class-01",
    category: "vehicle",
    name: "Minimum Euro VI class in low-emission zones",
    country: "EU",
    effectiveDate: "2023-01-01",
    expiryDate: null,
    version: "1.0.0",
    source: "EU Clean Vehicles Directive 2019/1161",
    severity: "medium",
    validate: (ctx: { euroClass: string }) => ({
      passed: ctx.euroClass === "VI",
      message: ctx.euroClass === "VI" ? "Meets low-emission zone requirement" : "Below required euro class",
    }),
  },
  {
    id: "route-restriction-alpine-01",
    category: "route_restriction",
    name: "Alpine night driving ban 22:00–05:00 (HGV)",
    country: "AT",
    effectiveDate: "2024-01-01",
    expiryDate: null,
    version: "1.0.0",
    source: "Austrian StVO §42",
    severity: "medium",
    validate: (ctx: { departureHour: number }) => ({
      passed: ctx.departureHour >= 5 && ctx.departureHour < 22,
      message:
        ctx.departureHour >= 5 && ctx.departureHour < 22 ? "Outside restricted window" : "Falls within night ban",
    }),
  },
  {
    id: "country-de-lez-01",
    category: "country",
    name: "Low Emission Zone sticker required",
    country: "DE",
    effectiveDate: "2008-01-01",
    expiryDate: null,
    version: "1.0.0",
    source: "German Kennzeichnungsverordnung (35. BImSchV)",
    severity: "low",
    validate: (ctx: { hasSticker: boolean }) => ({
      passed: ctx.hasSticker,
      message: ctx.hasSticker ? "Sticker present" : "Missing Umweltzone sticker",
    }),
  },
  {
    id: "eu-mobility-package-01",
    category: "eu",
    name: "Mandatory return of vehicle every 8 weeks",
    country: "EU",
    effectiveDate: "2022-02-21",
    expiryDate: null,
    version: "1.0.0",
    source: "Mobility Package I, Regulation (EU) 2020/1055",
    severity: "medium",
    validate: () => ({ passed: true, message: "Reference rule, not yet wired to live vehicle data" }),
  },
];

export function getRule(id: string) {
  return RULES.find((r) => r.id === id);
}
