import styled from 'styled-components/macro'
import { useState } from 'react'
import { z } from 'zod'

import { Button } from 'components/button/button'
import { BUTTON_TYPE } from 'constants/general.constants'

export const ActorForm = ({ onSubmit }) => {
	const [name, setName] = useState('')
	const [field, setField] = useState('')
	const [hobbies, setHobbies] = useState('')
	const [description, setDescription] = useState('')
	const [schemaValidated, setSchemaValidated] = useState({})

	const actorSchema = z.object({
		name: z.string().min(1),
		field: z.string().min(2),
		hobbies: z.string().min(3),
		description: z.string().min(4),
	})

	const addActor = (event) => {
		event.preventDefault()
		event.stopPropagation()

		const actor = { name, field, hobbies, description }
		const data = actorSchema.safeParse(actor)

		if (!data.success) {
			const formatted = data.error.format()
			return setSchemaValidated(formatted)
		}

		setSchemaValidated({})
		onSubmit(actor)
	}

	return (
		<form onSubmit={addActor}>
			<StyledFormGroup>
				<StyledLabel htmlFor='name'>Name</StyledLabel>
				<StyledInput
					type='text'
					id='name'
					onChange={(event) => {
						setName(event.target.value)
					}}
				/>

				{schemaValidated?.name?._errors && (
					<StyledMessage>{schemaValidated?.name?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='field'>Principal Field</StyledLabel>
				<StyledInput
					type='text'
					id='field'
					onChange={(event) => {
						setField(event.target.value)
					}}
				/>

				{schemaValidated?.field?._errors && (
					<StyledMessage>{schemaValidated?.field?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='hobbies'>Hobbies</StyledLabel>
				<StyledInput
					type='text'
					id='hobbies'
					onChange={(event) => {
						setHobbies(event.target.value)
					}}
				/>

				{schemaValidated?.hobbies?._errors && (
					<StyledMessage>{schemaValidated?.hobbies?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='description'>Short Description</StyledLabel>
				<StyledInput
					type='text'
					id='description'
					onChange={(event) => {
						setDescription(event.target.value)
					}}
				/>

				{schemaValidated?.description?._errors && (
					<StyledMessage>{schemaValidated?.description?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<Button isFullWidth={true}>Add new Actor</Button>

			<Button type={BUTTON_TYPE.TEXT} isFullWidth={true}>
				I changed my mind
			</Button>
		</form>
	)
}

const StyledFormGroup = styled.div`
	margin-bottom: 1rem;
`

const StyledLabel = styled.label`
	font-size: var(--font-size-base);
	color: var(---color-gray-4);
	margin-bottom: 0.5rem;
	display: block;
	color: #4e4b66;
`

const StyledInput = styled.input`
	background-color: var(--color-gray-5);
	border-radius: var(--border-radius-base);
	padding: calc(var(--padding-base) / 1.2) var(--padding-base);
	margin-bottom: 0.5rem;
	display: block;
	width: 100%;
`

const StyledMessage = styled.span`
	color: #98014c;
`
