import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionContainer({
  children,
  className,
  ...props
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        "h-full w-full flex flex-col overflow-y-auto overflow-x-hidden p-6 pb-24 md:p-8 md:pb-24",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
