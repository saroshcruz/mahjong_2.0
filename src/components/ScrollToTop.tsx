"use client"

"use client"

import { useEffect, useRef, useState } from "react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const lastEventTs = useRef<number>(0)

  const debugMode = typeof window !== "undefined" && window.location.search.includes("debugTouch=1")

  const THRESHOLD = 80 // px before showing the button — lower threshold helps mobile

  const getScrollY = () => {
    if (typeof window === "undefined") return 0
    const vv: any = (window as any).visualViewport
    // Prefer visualViewport metrics when available (mobile address-bar friendly)
    if (vv) {
      if (typeof vv.pageTop === "number") return vv.pageTop
      if (typeof vv.offsetTop === "number") return vv.offsetTop
      if (typeof vv.scrollTop === "number") return vv.scrollTop
    }

    // Standard fallbacks for various browsers
    if (typeof window.pageYOffset === "number") return window.pageYOffset
    if (document.scrollingElement) return (document.scrollingElement as any).scrollTop || 0
    if (document.documentElement) return document.documentElement.scrollTop || 0
    // Last resort
    // @ts-ignore
    return (document.body && document.body.scrollTop) || 0
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const handle = () => {
      lastEventTs.current = Date.now()
      const y = getScrollY()
      setVisible(y > THRESHOLD)
    }

    window.addEventListener("scroll", handle, { passive: true })
    // Some mobile browsers don't reliably fire the main scroll event — add touch/visual listeners
    document.addEventListener("touchmove", handle, { passive: true })
    window.addEventListener("resize", handle)
    window.addEventListener("orientationchange", handle)

    // visualViewport moves on mobile when address bar hides — listen to it if present
    if ((window as any).visualViewport) {
      ;(window as any).visualViewport.addEventListener("scroll", handle)
      ;(window as any).visualViewport.addEventListener("resize", handle)
    }

    // Lightweight RAF fallback only when events are not firing frequently.
    let rafId: number | null = null
    let lastY = getScrollY()
    const loop = () => {
      const now = Date.now()
      // If we've received a scroll event very recently, skip extra work.
      if (now - lastEventTs.current > 150) {
        const y = getScrollY()
        if (y !== lastY) {
          lastY = y
          setVisible(y > THRESHOLD)
        }
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Run an initial check in case the page is already scrolled on mount
    handle()

    return () => {
      window.removeEventListener("scroll", handle)
      document.removeEventListener("touchmove", handle)
      window.removeEventListener("resize", handle)
      window.removeEventListener("orientationchange", handle)
      if ((window as any).visualViewport) {
        ;(window as any).visualViewport.removeEventListener("scroll", handle)
        ;(window as any).visualViewport.removeEventListener("resize", handle)
      }
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToTop = () => {
    // Use smooth scroll; this works across modern browsers including mobile
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible && !debugMode) return null

  return (
    <>
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
        width: 56,
        height: 56,
        background: "#f5efe4",
        border: "1px solid rgba(198,168,122,0.6)",
        color: "#7c1f2d",
        zIndex: 99999,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 18px rgba(124,31,45,0.12)",
        cursor: "pointer",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 19V5" stroke="#7c1f2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12l7-7 7 7" stroke="#7c1f2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
      {debugMode && typeof window !== "undefined" && (
        <div style={{position: 'fixed', left: 10, top: 10, zIndex: 2147483647, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px 8px', borderRadius: 6, fontSize: 12}}>
          <div>y: {getScrollY()}</div>
          <div>visible: {String(visible)}</div>
          <div>body overflow: {document.body.style.overflow || 'auto'}</div>
        </div>
      )}
    </>
  )
}
