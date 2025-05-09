import React from "react";

export function EmptyState({
  title,
  description,
  icons = [],
  action,
  className
}: {
  title: string;
  description: string;
  icons?: Array<React.ElementType>;
  action?: { label: string; onClick: () => void };
  className?: string;
}) {
  return (
    <div className={`
      bg-background border-border hover:border-border/80 text-center
      border-2 border-dashed rounded-xl p-14 w-full max-w-[620px]
      group hover:bg-muted/50 transition duration-500 hover:duration-200
      ${className}
    `}>
      <div className="flex justify-center isolate">
        {icons.length === 2 ? (
          <>
            <div className="bg-background size-12 grid place-items-center rounded-xl relative left-2.5 top-1.5 -rotate-6 shadow-lg ring-1 ring-border group-hover:-translate-x-5 group-hover:-rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {icons[0] && React.createElement(icons[0], { className: "w-6 h-6 text-muted-foreground" })}
            </div>
            <div className="bg-background size-12 grid place-items-center rounded-xl relative right-2.5 top-1.5 rotate-6 shadow-lg ring-1 ring-border group-hover:translate-x-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {icons[1] && React.createElement(icons[1], { className: "w-6 h-6 text-muted-foreground" })}
            </div>
          </>
        ) : (
          <div className="bg-background size-12 grid place-items-center rounded-xl shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
            {icons[0] && React.createElement(icons[0], { className: "w-6 h-6 text-muted-foreground" })}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}