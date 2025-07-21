import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "overline" | "subtitle1" | "subtitle2" | "inherit"
}

const variantMap: Record<string, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  subtitle1: "text-base text-muted-foreground",
  subtitle2: "text-sm text-muted-foreground",
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs text-muted-foreground",
  overline: "text-xs uppercase tracking-widest text-muted-foreground",
  inherit: "",
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body1", ...props }, ref) => {
    const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const Comp = headingTags.includes(variant) ? variant : "p";
    return React.createElement(
      Comp,
      {
        ref,
        className: cn(variantMap[variant] || variantMap.body1, className),
        ...props
      }
    );
  }
)
Typography.displayName = "Typography"

export { Typography }
