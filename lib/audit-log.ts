export type AuditEvent =
  | "checkout.session.completed"
  | "token.generated"
  | "token.refunded"
  | "session.start"
  | "session.denied"
  | "rate_limited";

export function auditLog(event: AuditEvent, payload: Record<string, unknown>) {
  console.info(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      event,
      ...payload
    })
  );
}
