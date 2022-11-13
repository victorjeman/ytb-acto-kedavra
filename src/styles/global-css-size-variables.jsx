import { createGlobalStyle } from 'styled-components'

import { SIZE, FONT_SIZES, LINE_HEIGHTS, PADDINGS, BORDER_RADIUSES } from 'constants/size.constants'

const SIZES = Object.keys(SIZE)

const SIZE_UNIT = 'rem'

let cssFontSizeVariables = ``
let cssLineHeightVariables = ``
let cssPaddingVariables = ``
let cssBorderRadiusVariables = ``

SIZES.forEach((size, index) => {
	cssFontSizeVariables += `--font-size-${SIZE[size]}: ${FONT_SIZES[index]}${SIZE_UNIT};`
	cssLineHeightVariables += `--line-height-${SIZE[size]}: ${LINE_HEIGHTS[index]}${SIZE_UNIT};`
	cssPaddingVariables += `--padding-${SIZE[size]}: ${PADDINGS[index]}${SIZE_UNIT};`
	cssBorderRadiusVariables += `--border-radius-${SIZE[size]}: ${BORDER_RADIUSES[index]}${SIZE_UNIT};`
})

export const GlobalCSSSizeVariables = createGlobalStyle`
:root {
	${cssFontSizeVariables}
	${cssLineHeightVariables}
	${cssPaddingVariables}
	${cssBorderRadiusVariables}
}
  `
