import { FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { shippingAddress } = useAppSelector(state => state.cart)

	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping')
		}
	}, [shippingAddress, navigate])

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							className='my-2'
							label='Paypal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}
export default PaymentScreen
