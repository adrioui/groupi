"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const resolveTheme = (): ToasterProps["theme"] => {
  if (typeof document === "undefined") {
    return "system"
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<ToasterProps["theme"]>("system")

  useEffect(() => {
    setTheme(resolveTheme())

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleMediaChange = (event: MediaQueryListEvent) => {
      // Only update to system preference when explicit theme class is absent.
      if (!document.documentElement.classList.contains("dark") && !document.documentElement.classList.contains("light")) {
        setTheme(event.matches ? "dark" : "light")
      }
    }

    const observer = new MutationObserver(() => {
      setTheme(resolveTheme())
    })

    media.addEventListener("change", handleMediaChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      media.removeEventListener("change", handleMediaChange)
      observer.disconnect()
    }
  }, [])

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
