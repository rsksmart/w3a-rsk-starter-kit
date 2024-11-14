// Button.tsx
import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  size?: "small" | "large";
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  rounded?: boolean;
  className?: string;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  show?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size = "small",
  icon,
  children,
  variant = "primary",
  rounded = true,
  className,
  height = 36,
  width = 140,
  onClick,
  disabled = false,
  show = true,
}) => {
  if (!show) return;
  const baseStyles =
    "px-4 font-semibold focus:outline-none transition-colors flex justify-center items-center";

  const sizeStyles = size === "large" ? "text-lg" : "text-sm";

  const variantStyles = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    secondary:
      "bg-white text-black hover:bg-black hover:text-white border border-white hover-border-white",
  };

  const roundedStyles = rounded ? "rounded-full" : "rounded";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ width, height }}
      className={`relative disabled:bg-zinc-800 border border-white disabled:border-transparent disabled:text-zinc-300 disabled:cursor-not-allowed disabled:font-medium ${className} ${cn(
        baseStyles,
        sizeStyles,
        variantStyles[variant],
        roundedStyles
      )}
      `}
    >
      {!disabled && (
        <span
          style={{ width, height }}
          className={`${cn(
            "absolute top-[4px] left-[3px] h-full border !border-white z-[-1]",
            rounded ? "rounded-full" : "rounded"
          )}`}
        />
      )}
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
