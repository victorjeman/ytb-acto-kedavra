import styled from 'styled-components/macro'
import { SyntheticEvent, useState } from 'react'
import { z, ZodError } from 'zod'

import { BUTTON_TYPE } from 'constants/general.constants'
import { IActor } from 'models/common.models'

import { Button } from 'components/button/button'

interface Props {
	onSubmit: (actor: IActor) => void
}

export const ActorForm = ({ onSubmit }: Props) => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [field, setField] = useState('')
	const [hobbies, setHobbies] = useState('')
	const [description, setDescription] = useState('')
	const [schemaValidated, setSchemaValidated] = useState<
		z.ZodFormattedError<
			{
				firstName: string
				lastName: string
				field: string
				hobbies: string
				description: string
			},
			string
		>
	>()

	const actorSchema = z.object({
		name: z.string().min(1),
		field: z.string().min(2),
		hobbies: z.string().min(3),
		description: z.string().min(4),
	})

	const addActor = (event: SyntheticEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const actor: IActor = {
			firstName,
			lastName,
			field,
			hobbies: [],
			description,
			job: '',
			score: 0,
			image: '',
		}
		const data = actorSchema.safeParse(actor)

		if (!data.success) {
			const formatted = data.error.format()
			return setSchemaValidated(formatted)
		}

		// TODO: Check me
		// setSchemaValidated({ name: '', field: '', hobbies: '', description: '' })
		onSubmit(actor)
	}

	return (
		<form onSubmit={addActor}>
			<StyledFormGroup>
				<StyledLabel htmlFor='firstName'>First Name</StyledLabel>
				<StyledInput
					type='text'
					id='firstName'
					onChange={(event) => {
						setFirstName(event.target.value)
					}}
				/>

				{schemaValidated?.firstName?._errors && (
					<StyledMessage>{schemaValidated?.firstName?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='firstName'>Last Name</StyledLabel>
				<StyledInput
					type='lastName'
					id='lastName'
					onChange={(event) => {
						setLastName(event.target.value)
					}}
				/>

				{schemaValidated?.lastName?._errors && (
					<StyledMessage>{schemaValidated?.lastName?._errors}</StyledMessage>
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

			{/* TODO: Don't leave me like this please */}
			{/*  @ts-ignore: Unreachable code error */}
			<Button isFullWidth={true}>Add new Actor</Button>

			{/* TODO: Don't leave me like this please */}
			{/*  @ts-ignore: Unreachable code error */}
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
