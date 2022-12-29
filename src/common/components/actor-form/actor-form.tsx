import styled from 'styled-components/macro'
import { SyntheticEvent, useEffect, useState } from 'react'
import { z, ZodError } from 'zod'
import { nanoid } from 'nanoid'

import { BUTTON_TYPE } from '~/common/constants/general.constants'
import { IActor } from '~/features/actors/models/actor.models'

import { Button } from '~/common/components/button/button'

interface Props {
	actorToEdit?: IActor
	onSubmit: (actor: IActor) => void
}

export const ActorForm = ({ onSubmit, actorToEdit }: Props) => {
	const [image, setImage] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [job, setJob] = useState('')
	const [hobbies, setHobbies] = useState('')
	const [description, setDescription] = useState('')
	const [schemaValidated, setSchemaValidated] = useState<
		z.ZodFormattedError<
			{
				firstName: string
				lastName: string
				job: string
				hobbies: string
				description: string
			},
			string
		>
	>()

	const actorSchema = z.object({
		image: z.string().min(1),
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		job: z.string().min(1),
		hobbies: z.string().min(1),
		description: z.string().min(1),
	})

	const addActor = (event: SyntheticEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const actorFields = {
			firstName,
			lastName,
			job,
			hobbies,
			description,
			image,
			score: 0,
		}
		const data = actorSchema.safeParse(actorFields)

		if (!data.success) {
			const formatted = data.error.format()
			return setSchemaValidated(formatted)
		}

		const actor: IActor = {
			...actorFields,
			...(actorToEdit?.id && { id: actorToEdit.id }),
			...(actorToEdit ? { nanoid: actorToEdit.nanoid } : { nanoid: nanoid() }),
			hobbies: actorFields.hobbies.split(','),
		}
		// TODO: Check me
		// setSchemaValidated({ name: '', field: '', hobbies: '', description: '' })
		onSubmit(actor)
	}

	useEffect(() => {
		if (actorToEdit) {
			setImage(actorToEdit.image)
			setFirstName(actorToEdit.firstName)
			setLastName(actorToEdit.lastName)
			setJob(actorToEdit.job)
			setHobbies(actorToEdit.hobbies.toString())
			setDescription(actorToEdit.description)
		}
	}, [actorToEdit])

	return (
		<form onSubmit={addActor}>
			<StyledFormGroup>
				<StyledLabel htmlFor='firstName'>Image</StyledLabel>
				<StyledInput
					type='text'
					id='image'
					defaultValue={image}
					onChange={(event) => setImage(event.target.value)}
				/>

				{schemaValidated?.firstName?._errors && (
					<StyledMessage>{schemaValidated?.firstName?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='firstName'>First Name</StyledLabel>
				<StyledInput
					type='text'
					id='firstName'
					defaultValue={firstName}
					onChange={(event) => setFirstName(event.target.value)}
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
					defaultValue={lastName}
					onChange={(event) => setLastName(event.target.value)}
				/>

				{schemaValidated?.lastName?._errors && (
					<StyledMessage>{schemaValidated?.lastName?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='job'>Principal Field</StyledLabel>
				<StyledInput
					type='text'
					id='job'
					defaultValue={job}
					onChange={(event) => setJob(event.target.value)}
				/>

				{schemaValidated?.job?._errors && (
					<StyledMessage>{schemaValidated?.job?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='hobbies'>Hobbies</StyledLabel>
				<StyledInput
					type='text'
					id='hobbies'
					defaultValue={hobbies}
					onChange={(event) => setHobbies(event.target.value)}
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
					defaultValue={description}
					onChange={(event) => setDescription(event.target.value)}
				/>

				{schemaValidated?.description?._errors && (
					<StyledMessage>{schemaValidated?.description?._errors}</StyledMessage>
				)}
			</StyledFormGroup>

			{/* TODO: Don't leave me like this please */}
			{/*  @ts-ignore: Unreachable code error */}
			{!actorToEdit && <Button isFullWidth={true}>Add new Actor</Button>}

			{actorToEdit && <Button isFullWidth={true}>Edit Actor</Button>}

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
