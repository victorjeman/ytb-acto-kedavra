import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AiOutlineCheck } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { BUTTON_TYPE } from '~/common/constants/general.constants'
import { SIZE } from '~/common/constants/size.constants'

import { Button } from '~/common/components/button/button'
import { Modal } from '~/common/components/modal/modal'

interface Props {
	onSelectAll?: () => void
	onDeleteAll?: () => void
	selectedActors: number
}

export const SelectAllActors = ({ onSelectAll, onDeleteAll, selectedActors = 0 }: Props) => {
	const [title, setTitle] = useState(`${selectedActors} Selected`)
	const [openModal, setOpenModal] = useState(false)

	const deleteIsDisabled = selectedActors === 0

	const selectAll = () => {
		if (onSelectAll) onSelectAll()
	}

	useEffect(() => {
		setTitle(`${selectedActors} Selected`)
	}, [selectedActors])

	return (
		<>
			<Button
				type={BUTTON_TYPE.HELP}
				onClick={() => {
					setOpenModal(true)
				}}>
				Select
			</Button>

			<Modal title={title} isOpen={openModal} overlay={false} onClose={() => setOpenModal(false)}>
				<>
					<StyledFormGroup>
						<StyledLabel htmlFor='select-all-actors'>Select all</StyledLabel>

						<StyledInputWrapper>
							<StyledInput type='checkbox' id='select-all-actors' onChange={selectAll} />
							<StyledIcon />
						</StyledInputWrapper>
					</StyledFormGroup>

					<Button
						type={BUTTON_TYPE.SECONDARY}
						isFullWidth={true}
						size={SIZE.LG}
						onClick={onDeleteAll}
						icon={<RiDeleteBin6Line />}
						disabled={deleteIsDisabled}>
						Delete
					</Button>
				</>
			</Modal>
		</>
	)
}

const StyledFormGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	font-size: var(--font-size-xl);
`
const StyledLabel = styled.label`
	color: var(--color-gray-3);
`

const StyledInputWrapper = styled.div`
	position: relative;
	display: flex;
`

const StyledInput = styled.input`
	width: var(--font-size-xl4);
	height: var(--font-size-xl4);
	background-color: var(--color-gray-1);
	border-radius: 50%;

	&:checked {
		background-color: var(--color-primary);
	}

	&:checked + * {
		color: var(--color-white-1);
	}
`

const StyledIcon = styled(AiOutlineCheck)`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	margin: auto;
	color: transparent;
	pointer-events: none;
`
