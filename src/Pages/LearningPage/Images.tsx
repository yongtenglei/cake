import { Box, Button } from '@mui/material'
import { ComponentProps } from 'react'

import chocolateCake from '../../images/cake/cake chocolate.png'
import strawberryCake from '../../images/cake/cake strawberry.png'
import vanillaCake from '../../images/cake/cake vanilla.png'
import akiChar from '../../images/character/aki.svg'
import brunoChar from '../../images/character/bruno.svg'
import chloeChar from '../../images/character/chloe.svg'

export const highlightCss = {
  // cursor: 'pointer',
  '&:focus, &:hover': {
    transform: 'scale(1.05)',
  },
}
export type CakeFlavor = 'vanilla' | 'chocolate' | 'strawberry'
const cakeImageMap = {
  vanilla: vanillaCake,
  chocolate: chocolateCake,
  strawberry: strawberryCake,
}
interface CakeImageProps {
  flavor: CakeFlavor
  width?: string | number
  onClick?: VoidFunction
  sx?: ComponentProps<typeof Box>['sx']
}
export const CakeImage = ({
  flavor,
  width = 120,
  onClick = null,
  sx = {},
}: CakeImageProps) => {
  if (onClick) {
    return (
      <Button sx={highlightCss} onClick={onClick}>
        <Box component="img" src={cakeImageMap[flavor]} width={width} sx={{ ...sx }} />
      </Button>
    )
  }

  return <Box component="img" width={width} src={cakeImageMap[flavor]} sx={sx} />
}

const characterImageMap = {
  Aki: akiChar,
  Bruno: brunoChar,
  Chloe: chloeChar,
}

interface CharacterImageProps {
  character: 'Aki' | 'Bruno' | 'Chloe'
  width?: string | number
  hideName?: boolean
  sx?: ComponentProps<typeof Box>['sx']
}
export const CharacterImage = ({
  character,
  width = 120,
  hideName =false,
  sx = {},
}: CharacterImageProps) => (
  <Box width={width} textAlign="center" sx={sx}>
    <img src={characterImageMap[character]} alt=""/>
    {hideName ? null : character}
  </Box>
)
