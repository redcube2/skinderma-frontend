"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Krajín sveta" },
  { value: 83, suffix: "", label: "Produktov" },
  { value: 15, suffix: "+", label: "Rokov vývoja" },
  { value: 100, suffix: "%", label: "GMP Certified" },
];

function Counter({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix: string;
  start: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [start, target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStart(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#f5f4f0",
        padding: "96px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48,
          textAlign: "center",
        }}
      >
        {stats.map((stat, i) => (
          <div key={i}>
            <div
              style={{
                color: "#000",
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 300,
                lineHeight: 1,
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
            >
              <Counter target={stat.value} suffix={stat.suffix} start={start} />
            </div>
            <div
              style={{
                color: "#646467",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
