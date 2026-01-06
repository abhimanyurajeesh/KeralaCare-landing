"use client";

import { Locale } from "@/lib/i18n-shared";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LanguageSwitcherProps {
  currentLanguage: Locale;
  variant?: "link" | "default";
  className?: string;
}

export function LanguageSwitcher({ 
  currentLanguage, 
  variant = "link",
  className = ""
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = async () => {
    const newLanguage = currentLanguage === "en" ? "ml" : "en";
    
    // Set cookie via API route
    await fetch("/api/set-language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: newLanguage }),
    });

    // Refresh to get new server-rendered content
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleLanguageChange}
      disabled={isPending}
    >
      {currentLanguage === "en" ? "മലയാളം" : "English"}
    </Button>
  );
}
