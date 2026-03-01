// --- FICHIER: src/components/AnimatedCounter.tsx ---
import React, { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

const AnimatedCounter = ({
  from,
  to,
  duration = 2,
  isK = false,
}: {
  from: number;
  to: number;
  duration?: number;
  isK?: boolean;
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            let val = Math.round(value);
            if (isK && val === to) {
              nodeRef.current.textContent = (val / 1000).toString() + "K";
            } else {
              nodeRef.current.textContent = val.toString();
            }
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, isK]);

  return <span ref={nodeRef}>{from}</span>;
};

export default AnimatedCounter;
