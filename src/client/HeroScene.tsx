import { useEffect, useRef } from 'react'

// A low-poly contour sheet drifting like a survey map. three.js is loaded on
// demand, so the rest of the app does not pay for it, and the animation stops
// when the panel is off screen, the tab is hidden, or motion is reduced.

type Three = typeof import('three')

function mount(THREE: Three, host: HTMLElement) {
  let renderer: import('three').WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
  } catch {
    return () => {}
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.domElement.className = 'hero-canvas'
  host.append(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  const lookX = 0.3
  camera.position.set(lookX, 2.5, 7.6)
  camera.lookAt(0, 0.1, 0)

  const geometry = new THREE.PlaneGeometry(13, 13, 26, 26)
  geometry.rotateX(-Math.PI / 2)
  const position = geometry.getAttribute('position') as import('three').BufferAttribute
  const base = Float32Array.from(position.array as Float32Array)

  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.42,
  })
  const sheet = new THREE.Mesh(geometry, material)
  sheet.position.y = -1.55
  scene.add(sheet)

  const paint = () => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    material.color = new THREE.Color(raw || '#3c5738')
    material.opacity = document.documentElement.dataset.theme === 'dark' ? 0.5 : 0.42
  }
  paint()

  const themeObserver = new MutationObserver(paint)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const resize = () => {
    const width = host.clientWidth || 1
    const height = host.clientHeight || 1
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const sizeObserver = new ResizeObserver(resize)
  sizeObserver.observe(host)
  resize()

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const started = performance.now()

  const displace = (time: number) => {
    const points = position.array as Float32Array
    for (let i = 0; i < points.length; i += 3) {
      const x = base[i] ?? 0
      const z = base[i + 2] ?? 0
      const radius = Math.hypot(x, z)
      const fall = Math.max(0, 1 - radius / 6.8)
      const lift =
        Math.sin(x * 0.62 + time * 0.5) * 0.62 +
        Math.cos(z * 0.54 - time * 0.36) * 0.5 +
        Math.sin((x + z) * 0.31 + time * 0.26) * 0.34
      points[i + 1] = lift * fall * fall
    }
    position.needsUpdate = true
  }

  const render = () => {
    const time = reduced.matches ? 0 : (performance.now() - started) / 1000
    displace(time)
    sheet.rotation.y = reduced.matches ? -0.12 : Math.sin(time * 0.09) * 0.14
    camera.position.x = reduced.matches ? lookX : lookX + Math.sin(time * 0.16) * 0.5
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }

  let frame = 0
  let onScreen = true
  const loop = () => {
    frame = requestAnimationFrame(loop)
    if (!onScreen || document.hidden) return
    render()
  }

  const restart = () => {
    cancelAnimationFrame(frame)
    render()
    if (!reduced.matches) loop()
  }

  render()
  if (!reduced.matches) loop()

  reduced.addEventListener('change', restart)

  const visibility = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry?.isIntersecting ?? true
      if (onScreen && !document.hidden) render()
    },
    { threshold: 0 },
  )
  visibility.observe(host)

  return () => {
    cancelAnimationFrame(frame)
    reduced.removeEventListener('change', restart)
    visibility.disconnect()
    sizeObserver.disconnect()
    themeObserver.disconnect()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return

    let release: () => void = () => {}
    let cancelled = false

    void import('three')
      .then((THREE) => {
        if (!cancelled && element.isConnected) release = mount(THREE, element)
      })
      .catch(() => {
        // No WebGL or no chunk: the static contour art stays in place.
      })

    return () => {
      cancelled = true
      release()
    }
  }, [])

  return <div className="hero-scene" ref={host} aria-hidden="true" />
}
