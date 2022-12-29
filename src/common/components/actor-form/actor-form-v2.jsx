import styled from 'styled-components/macro'
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'

import { Button } from '~/common/components/button/button'
import { BUTTON_TYPE } from '~/common/constants/general.constants'

export const ActorFormV2 = ({ onSubmit }) => {
	const initialValues = {
		name: 'test',
		field: '',
		hobbies: '',
		description: '',
	}

	const actorSchema = Yup.object().shape({
		name: Yup.string().min(2, 'Too Short!').max(8, 'Too Long!').required('Required'),
		field: Yup.string(),
		hobbies: Yup.string(),
		description: Yup.string(),
	})

	const addActor = (values) => {
		onSubmit(values)
	}

	return (
		<Formik initialValues={initialValues} validationSchema={actorSchema} onSubmit={addActor}>
			{({ errors, touched }) => (
				<Form>
					<StyledFormGroup>
						<StyledLabel htmlFor='name'>Name</StyledLabel>
						<StyledInput type='text' id='name' name='name' />

						{errors.name && touched.name ? <StyledMessage>{errors.name}</StyledMessage> : null}
					</StyledFormGroup>

					<StyledFormGroup>
						<StyledLabel htmlFor='field'>Principal Field</StyledLabel>
						<StyledInput type='text' id='field' name='field' />
					</StyledFormGroup>

					<StyledFormGroup>
						<StyledLabel htmlFor='hobbies'>Hobbies</StyledLabel>
						<StyledInput type='text' id='hobbies' name='hobbies' />
					</StyledFormGroup>

					<StyledFormGroup>
						<StyledLabel htmlFor='description'>Short Description</StyledLabel>
						<StyledInput type='text' id='description' name='description' />
					</StyledFormGroup>

					<Button isFullWidth={true}>Add new Actor</Button>

					<Button type={BUTTON_TYPE.TEXT} isFullWidth={true}>
						I changed my mind
					</Button>
				</Form>
			)}
		</Formik>
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

const StyledInput = styled(Field)`
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
