export type RuleCategory =
  | "eu"
  | "country"
  | "driver"
  | "vehicle"
  | "tachograph"
  | "cabotage"
  | "posting"
  | "route_restriction";

export type RuleSeverity = "low" | "medium" | "high" | "critical";

export type RuleCheckResult = {
  passed: boolean;
  message: string;
  severity?: RuleSeverity;
};

export type ComplianceRule<TContext = Record<string, unknown>> = {
  id: string;
  category: RuleCategory;
  name: string;
  country: string;
  effectiveDate: string;
  expiryDate: string | null;
  version: string;
  source: string;
  severity: RuleSeverity;
  validate: (ctx: TContext) => RuleCheckResult;
};

export type RuleEvaluation = {
  ruleId: string;
  ruleName: string;
  category: RuleCategory;
  severity: RuleSeverity;
  passed: boolean;
  message: string;
};
