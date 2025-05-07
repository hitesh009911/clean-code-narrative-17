
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useMobileOptimization() {
  const isMobile = useIsMobile()
  const [hasReducedMotion, setHasReducedMotion] = React.useState(false)
  
  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setHasReducedMotion(prefersReducedMotion)
  }, [])
  
  return {
    isMobile,
    hasReducedMotion,
    shouldOptimize3D: isMobile || hasReducedMotion,
    lowQualityMode: isMobile,
    reduceAnimations: isMobile || hasReducedMotion
  }
}
