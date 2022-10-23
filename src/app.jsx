import styled from 'styled-components/macro'
import { MdOutlineModeEdit } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'

import { BUTTON_TYPE, ICON_POSITION, SIZE } from 'constants/constants'

import { PageHeader } from 'components/page-header/page-header'
import { PageFooter } from 'components/page-footer/page-footer'
import { Button } from 'components/button/button'

function App() {
	const sayHello = () => {
		console.log('Hello!')
	}

	return (
		<main className='app'>
			<PageHeader />
			<StyledH1>My components</StyledH1>

			<StyledSection style={{ padding: '1rem' }}>
				<StyledH2>My Buttons</StyledH2>

				<StyledDiv>
					<Button onClick={sayHello}>default</Button>

					<Button onClick={sayHello} disabled>
						disabled
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.PRIMARY} size={SIZE.LG} onClick={sayHello}>
						primary - lg
					</Button>

					<Button type={BUTTON_TYPE.PRIMARY} size={SIZE.XL} onClick={sayHello}>
						primary - xl
					</Button>

					<Button type={BUTTON_TYPE.PRIMARY} size={SIZE.XL2} onClick={sayHello}>
						primary - xl2
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.XS} onClick={sayHello}>
						secondary - xs
					</Button>

					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.SM} onClick={sayHello}>
						secondary - sm
					</Button>

					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.BASE} onClick={sayHello}>
						secondary - base
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.HELP} size={SIZE.XL2} onClick={sayHello}>
						help - xl2
					</Button>

					<Button type={BUTTON_TYPE.HELP} size={SIZE.XL3} onClick={sayHello}>
						help - xl3
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button
						icon={<MdOutlineModeEdit />}
						iconPosition={ICON_POSITION.RIGHT}
						onClick={sayHello}>
						with icon
					</Button>

					<Button
						type={BUTTON_TYPE.SECONDARY}
						icon={<MdOutlineModeEdit />}
						iconPosition={ICON_POSITION.LEFT}
						onClick={sayHello}>
						with icon
					</Button>

					<Button
						type={BUTTON_TYPE.HELP}
						icon={<MdOutlineModeEdit />}
						iconPosition={ICON_POSITION.RIGHT}
						onClick={sayHello}>
						with icon
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.HELP} size={SIZE.XL2} isFullWidth={true} onClick={sayHello}>
						full width xl2 help
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.XL} isFullWidth={true} onClick={sayHello}>
						full width xl secondary
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XS}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.SM}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.BASE}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.LG}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XL}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XL2}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XL3}></Button>
				</StyledDiv>
			</StyledSection>

			<PageFooter />
		</main>
	)
}

const StyledH1 = styled.h1`
	text-align: center;
	margin-top: 1rem;
	margin-bottom: 1rem;
`

const StyledSection = styled.section`
	padding: 1rem;
	max-width: 600px;
	margin-right: auto;
	margin-left: auto;
	border: 2px solid #a0a3bd;
	margin-top: 1rem;

	button {
		margin-right: 1rem;
	}
`

const StyledH2 = styled.h2`
	border-bottom: 2px solid #a0a3bd;
	padding-bottom: 0.4rem;
	margin-bottom: 1.5rem;
`

const StyledDiv = styled.div`
	margin-bottom: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	&:last-of-type {
		margin-bottom: 0;
	}
`

export default App
