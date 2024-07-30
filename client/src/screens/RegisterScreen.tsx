import { FormEvent, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const RegisterScreen = () => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()
	const { userInfo } = useAppSelector(state => state.auth)

	const { search } = useLocation()
	const searchParams = new URLSearchParams(search)
	const redirect = searchParams.get('redirect') || '/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [userInfo, redirect, navigate])

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		} else {
			try {
				const res = await register({ name, email, password }).unwrap()
				dispatch(setCredentials({ ...res }))
				navigate(redirect)
			} catch (error: any) {
				toast.error(error?.data?.message || error?.error)
			}
		}
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name' className='my-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='email' className='my-3'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password' className='my-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword' className='my-3'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' disabled={isLoading}>
					Sign Up
				</Button>
				{isLoading && <Loader />}
			</Form>
			<Row className='py-3'>
				<Col>
					Already have an account?{' '}
					<Link to={redirect ? `/login?redirect${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
