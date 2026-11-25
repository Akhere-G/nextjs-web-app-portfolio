"use client";

import posthog from "posthog-js";

export function logPortfolioAction(
  action: string,
  attributes: Record<string, string>
) {
  posthog.logger.info(action, attributes);
}
