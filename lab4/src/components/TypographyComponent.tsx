import React from "react";
import type { StyleInterface } from "../Interfaces/StyleInterface";

interface TypographyProps extends StyleInterface {
  variant: React.ElementType;
  children: React.ReactNode;
}

const Typography = ({ variant, children, ...props }: TypographyProps) => {
  const Tag: React.ElementType = variant || "p";
  return <Tag {...props}>{children}</Tag>;
};

export default React.memo(Typography);
