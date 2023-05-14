import { useState, useMemo } from 'react'

export const useMousePosition = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  // by binding to a specific DOM element, we scope the x and y relative to that element
  const bind: {
    onMouseMove: (event: any) => void
  } = useMemo(
    () => ({
      onMouseMove: (event) => {
        setX(event.nativeEvent.offsetX)
        setY(event.nativeEvent.offsetY)
      },
    }),
    []
  )

  return { x, y, bind }
}
