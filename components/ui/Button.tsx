import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "large";
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  width?: number;
  height?: number;
};

const Button: React.FC<ButtonProps> = ({
  size = "small",
  icon,
  children,
  variant = "primary",
  className,
  height = 36,
  width = 140,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "px-4 font-semibold focus:outline-none rounded-full transition-colors flex justify-center items-center";

  const sizeStyles = size === "large" ? "text-lg" : "text-sm";

  const variantStyles = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    secondary:
      "bg-white text-black hover:bg-black hover:text-white border border-white",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      style={{ width, height }}
      className={`relative disabled:bg-zinc-800 border border-white disabled:text-zinc-300 disabled:cursor-not-allowed whitespace-nowrap disabled:font-medium ${className} ${cn(
        baseStyles,
        sizeStyles,
        variantStyles[variant]
      )}`}
    >
      <span
        style={{ width, height }}
        className={`${cn(
          "absolute top-[4px] left-[3px] h-full border !border-white z-[-1] rounded-full",
          disabled ? "bg-zinc-800" : "bg-transparent"
        )}`}
      />
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
