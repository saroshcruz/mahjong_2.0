"use client"

import { useEffect, useState } from "react"

export default function DebugOverlay() {
  const [enabled, setEnabled] = useState(false)
  const [y, setY] = useState(0)
  const [bodyOverflow, setBodyOverflow] = useState("")
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    setEnabled(window.location.search.includes("debugTouch=1"))
    const el = document.querySelector("[data-card]") as HTMLElement | null

    let raf = 0
    const loop = () => {
      setY(window.scrollY || (window as any).visualViewport?.pageTop || 0)
      setBodyOverflow(document.body.style.overflow || "auto")
      if (el) setScrollLeft(el.parentElement ? (el.parentElement as HTMLElement).scrollLeft : 0)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!enabled) return null

  return (
    <div style={{position: 'fixed', left: 8, top: 8, zIndex: 2147483647, background: 'rgba(0,0,0,0.7)', color: 'white', padding: 8, borderRadius: 8, fontSize: 12}}>
      <div>scrollY: {y}</div>
      <div>body overflow: {bodyOverflow}</div>
      <div>carouselLeft: {scrollLeft}</div>
    </div>
  )
}
