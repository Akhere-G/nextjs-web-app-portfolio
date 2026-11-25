"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { logPortfolioAction } from "@/lib/posthog-logs";

const PREFIX = "track";

// Server-rendered links describe their analytics event with data attributes:
//   data-track="project_details_opened" data-track-project-slug="triptrack"
// This single listener turns clicks on them into PostHog events, so the pages
// themselves stay server components and the HTML crawlers see is unchanged.
export default function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest<HTMLElement>("[data-track]");
      const eventName = el?.dataset.track;
      if (!el || !eventName) return;

      const properties: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === PREFIX || !key.startsWith(PREFIX) || value === undefined) {
          continue;
        }
        const name = key
          .slice(PREFIX.length)
          .replace(/^[A-Z]/, (c) => c.toLowerCase())
          .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
        properties[name] = value;
      }

      posthog.capture(eventName, properties);
      logPortfolioAction(eventName, properties);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
