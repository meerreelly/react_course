import React from "react";

type TypographyProps = {
  variant: React.ElementType;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Typography = ({ variant, children, ...props }: TypographyProps) => {
  const Tag: React.ElementType = variant || "p";
  return <Tag {...props}>{children}</Tag>;
};

export default Typography;
