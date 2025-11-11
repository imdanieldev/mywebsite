export function useMenuHeight(selector = 'nav', cssVar = '--menu-height') {
  const updateHeight = () => {
    const el = document.querySelector(selector)
    if (el) {
      const height = el.getBoundingClientRect().height
      document.documentElement.style.setProperty(cssVar, `${height}px`)
    }
  }

  onMounted(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateHeight)
  })
}