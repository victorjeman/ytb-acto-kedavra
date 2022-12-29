import styled from 'styled-components/macro'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Button } from '~/common/components/button/button'
import { BUTTON_TYPE } from '~/common/constants/general.constants'

export const ActorFormV3 = ({ onSubmit }) => {
	const actorSchema = Yup.object().shape({
		name: Yup.string().min(2, 'Too Short!').max(8, 'Too Long!').required('Required'),
		field: Yup.string(),
		hobbies: Yup.string(),
		description: Yup.string(),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(actorSchema) })

	const addActor = (data) => {
		onSubmit(data)
		reset({ name: '', field: '', hobbies: '', description: '' })
	}

	return (
		<form onSubmit={handleSubmit(addActor)}>
			<StyledFormGroup>
				<StyledLabel htmlFor='name'>Name</StyledLabel>
				<StyledInput type='text' id='name' {...register('name')} />
				{errors.name && <StyledMessage>{errors.name?.message}</StyledMessage>}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='field'>Principal Field</StyledLabel>
				<StyledInput type='text' id='field' {...register('field')} />
				{errors.field && <StyledMessage>{errors.field?.message}</StyledMessage>}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='hobbies'>Hobbies</StyledLabel>
				<StyledInput type='text' id='hobbies' {...register('hobbies')} />
				{errors.hobbies && <StyledMessage>{errors.hobbies?.message}</StyledMessage>}
			</StyledFormGroup>

			<StyledFormGroup>
				<StyledLabel htmlFor='description'>Short Description</StyledLabel>
				<StyledInput type='text' id='description' {...register('description')} />
				{errors.description && <StyledMessage>{errors.description?.message}</StyledMessage>}
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
