"use client";

import { useReportWebVitals } from "next/web-vitals";

type WebVitalsMetric = {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
};

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const payload: WebVitalsMetric = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    };

    if (process.env.NODE_ENV === "production") {
      navigator.sendBeacon("/api/monitoring/web-vitals", JSON.stringify(payload));
    }
  });

  return null;
}
