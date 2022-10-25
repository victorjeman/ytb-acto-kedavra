import { useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import styled from 'styled-components/macro'

import { READ_MORE_LIMIT, BUTTON_TYPE, ICON_POSITION } from 'constants/constants'
import { Button } from 'components/button/button'

export const ReadMore = ({ text = '', limit = READ_MORE_LIMIT }) => {
	const initialVisibleText = text?.slice(0, limit)

	const [visibleText, setVisibleText] = useState(initialVisibleText)

	const hasMoreText = text?.length > visibleText.length
	const icon = hasMoreText ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />

	const toggleVisibleText = () => {
		if (hasMoreText) setVisibleText(text)
		else setVisibleText(initialVisibleText)
	}

	return (
		<div>
			<StyledText>
				{visibleText}
				{hasMoreText && <> ...</>}
			</StyledText>

			<Button
				type={BUTTON_TYPE.TEXT}
				iconPosition={ICON_POSITION.RIGHT}
				onClick={toggleVisibleText}
				icon={icon}>
				Read {hasMoreText ? 'more' : 'less'}
			</Button>
		</div>
	)
}

export const StyledText = styled.p``
