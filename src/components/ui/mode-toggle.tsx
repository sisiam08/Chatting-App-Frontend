"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface ModeToggleProps {
  className?: string
}

export function ModeToggle({ className }: ModeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // Avoid hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder with same dimensions to avoid layout shift
    return (
      <button className={className} aria-label="Toggle theme" disabled>
        <Sun className="w-5 h-5 opacity-50" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
    >
      {isDark
        ? <Sun className="w-5 h-5" />
        : <Moon className="w-5 h-5" />
      }
    </button>
  )
}
