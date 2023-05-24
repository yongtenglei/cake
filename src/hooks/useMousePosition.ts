import { useState, useMemo } from 'react'
import { margin } from '../spacing'

export const useMousePosition = () => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  // by binding to a specific DOM element, we scope the x and y relative to that element
  const bind: {
    onMouseMove: (event: any) => void
  } = useMemo(
    () => ({
      onMouseMove: (event) => {
        setMouseX(event.clientX - margin.left)
        setMouseY(event.clientY - margin.top)
        // setX(event.nativeEvent.offsetX)
        // setY(event.nativeEvent.offsetY)
      },
    }),
    []
  )

  return { mouseX, mouseY, bind }
}
