import type { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom";
};

const placementClasses = {
  bottom: {
    tooltip: "top-6",
    caret: "-top-1",
  },
  top: {
    tooltip: "bottom-6",
    caret: "-bottom-1",
  },
};

export const Tooltip = ({
  children,
  content,
  placement = "bottom",
}: TooltipProps) => {
  const classes = placementClasses[placement];

  return (
    <span className="group relative inline-flex">
      {children}
      <span
        className={`invisible absolute left-1/2 z-10 w-max max-w-xs -translate-x-1/2 rounded-md bg-kx-inverse px-3 py-2 text-xs leading-snug text-kx-inverse-text no-underline opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${classes.tooltip}`}
        role="tooltip"
      >
        <span
          className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-kx-inverse ${classes.caret}`}
          aria-hidden="true"
        />
        {content}
      </span>
    </span>
  );
};
