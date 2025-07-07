"use client";
import { useRouter } from "next/navigation";

import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";

type Props = {
  title: string;
  className?: string;
  variante?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({ title, variante, className, ...props }: Props) {
  const router = useRouter();
  return (
    <Button
      variant={variante}
      className={className}
      onClick={() => router.back()}
      title={title}
    >
      {title}
    </Button>
  );
}
