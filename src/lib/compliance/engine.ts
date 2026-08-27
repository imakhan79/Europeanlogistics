import { RULES } from "./rules";
import type { RuleCategory, RuleEvaluation } from "./types";

function isActive(rule: (typeof RULES)[number], asOf: Date): boolean {
  const effective = new Date(rule.effectiveDate);
  const expiry = rule.expiryDate ? new Date(rule.expiryDate) : null;
  return effective <= asOf && (!expiry || asOf <= expiry);
}

export function evaluateCategory(
  category: RuleCategory,
  ctx: Record<string, unknown>,
  asOf: Date = new Date(),
): RuleEvaluation[] {
  return RULES.filter((r) => r.category === category && isActive(r, asOf)).map((r) => {
    const result = r.validate(ctx);
    return {
      ruleId: r.id,
      ruleName: r.name,
      category: r.category,
      severity: result.severity ?? r.severity,
      passed: result.passed,
      message: result.message,
    };
  });
}

export function evaluateOne(ruleId: string, ctx: Record<string, unknown>): RuleEvaluation | null {
  const r = RULES.find((rule) => rule.id === ruleId);
  if (!r) return null;
  const result = r.validate(ctx);
  return {
    ruleId: r.id,
    ruleName: r.name,
    category: r.category,
    severity: result.severity ?? r.severity,
    passed: result.passed,
    message: result.message,
  };
}

export function parseHoursMinutes(value: string): number {
  const match = value.match(/(\d+)h\s*(\d+)m/);
  if (!match) return 0;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}
