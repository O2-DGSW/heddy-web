import type { PropsWithChildren } from "react";

interface ProcedurePanelProps extends PropsWithChildren {
  className?: string;
}

const ProcedurePanel = ({ children, className = "" }: ProcedurePanelProps) => {
  return (
    <section
      className={`overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </section>
  );
};

export { ProcedurePanel };
