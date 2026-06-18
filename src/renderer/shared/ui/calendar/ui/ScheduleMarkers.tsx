import { lightTheme } from "@design-tokens";

const ScheduleMarkers = ({ count }: { count?: number }) => {
  if (!count) {
    return <span className="h-1" aria-hidden="true" />;
  }

  return (
    <span className="mt-[3px] flex h-1 items-center justify-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: Math.min(count, 3) }, (_, index) => (
        <span
          key={index}
          className="size-1 rounded-full"
          style={{ backgroundColor: lightTheme.primary.normal }}
        />
      ))}
    </span>
  );
};

export { ScheduleMarkers };
