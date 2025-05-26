import * as React from "react";
import { cn } from "../../lib/utils";

export function Tabs({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props}>{children}</div>;
}

export function TabsList({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex border rounded-md", className)}>{children}</div>;
}

export function TabsTrigger({
    value,
    children,
    className,
  }: {
    value: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <button className={cn("...", className)}>
        {children}
      </button>
    );
  }
  
  export function TabsContent({
    value,
    children,
    className,
  }: {
    value: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return <div className={className}>{children}</div>;
  }