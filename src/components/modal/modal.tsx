import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components/macro'
import { GrClose } from 'react-icons/gr'
import { motion, AnimatePresence } from 'framer-motion'

import { BUTTON_TYPE, ESCAPE_BTN_CODE } from 'constants/general.constants'
import { SIZE } from 'constants/size.constants'

import { Button } from 'components/button/button'

const KEYDOWN = 'keydown'
const MODAL_OPEN_CLASS = 'modal-is-opened'

const checkIfEscapeIsDown = (event: KeyboardEvent) => event.code === ESCAPE_BTN_CODE

const toggleBodyClass = (open: boolean) => {
	if (open) return document.body.classList.add(MODAL_OPEN_CLASS)

	document.body.classList.remove(MODAL_OPEN_CLASS)
}

const modalRoot = document.querySelector('body') as HTMLElement

interface Props {
	title: string
	children: JSX.Element | JSX.Element[]
	isOpen: boolean
	overlay?: boolean
	onClose: () => void
}

export const Modal = ({ title, children, onClose, isOpen = false, overlay = true }: Props) => {
	const [openModal, setOpenModal] = useState(false)

	const closeModal = () => {
		setOpenModal(false)
		toggleBodyClass(false)

		if (onClose) onClose()
	}

	const closeModalWithEscape = (event: KeyboardEvent) => {
		if (checkIfEscapeIsDown(event)) closeModal()
	}

	useEffect(() => {
		window.addEventListener(KEYDOWN, closeModalWithEscape)

		return () => window.removeEventListener(KEYDOWN, closeModalWithEscape)

		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		setOpenModal(isOpen)
		toggleBodyClass(isOpen)
	}, [isOpen])

	return ReactDom.createPortal(
		<AnimatePresence>
			{openModal && (
				<>
					<GlobalBodyStyle />

					{overlay && <StyledOverlay onClick={closeModal} />}

					<StyledModal
						as={motion.div}
						initial={{ translateY: '100%' }}
						animate={{ translateY: '0px' }}
						exit={{ translateY: '100%' }}
						transition={{ ease: 'easeInOut', duration: 0.35 }}>
						<StyledTitle>{title}</StyledTitle>

						<div>{children}</div>

						<StyledCloseBtn>
							<Button
								type={BUTTON_TYPE.CIRCLE}
								icon={<GrClose />}
								onClick={closeModal}
								size={SIZE.LG}
							/>
						</StyledCloseBtn>
					</StyledModal>
				</>
			)}
		</AnimatePresence>,
		modalRoot,
	)
}

const StyledOverlay = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 10;
	background-color: rgba(255, 255, 255, 0.5);

	/* to avoid scrolling on mobile */
	touch-action: none;
`

const StyledModal = styled.div`
	width: 100%;
	position: fixed;
	z-index: 20;
	padding: 3rem 1.4rem 1.5rem 1.4rem;
	background: var(--color-white-1);
	box-shadow: 0px -0.25rem 0.5rem rgba(0, 0, 0, 0.1);
	border-radius: 1.5rem 1.5rem 0px 0px;
	bottom: 0;
`

const StyledTitle = styled.h2`
	font-size: 24px;
	color: var(--color-black-1);
	line-height: 1.2;
	text-align: center;
	font-weight: 600;
	margin-bottom: 2rem;
`

const StyledCloseBtn = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
`

const GlobalBodyStyle = createGlobalStyle`
  body.modal-is-opened {
    /* You can hide the scroll bar but better leave it as it is */
    /* overflow-y: hidden; */
  }
`
