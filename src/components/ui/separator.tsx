import * as React from "react";
import { cn } from "../../lib/utils";

export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("border-t border-gray-200", className)} {...props} />
);