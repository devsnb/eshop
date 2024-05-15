import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/state-hooks'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import SearchBox from './SearchBox'
import { resetCart } from '../slices/cartSlice'

const Header = (): JSX.Element => {
	const { cartItems } = useAppSelector(state => state.cart)
	const { userInfo } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [logoutApiCall] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			dispatch(resetCart())
			navigate('/login')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<SearchBox />
							<LinkContainer to='/cart'>
								<Nav.Link>
									<FaShoppingCart /> Cart
									{cartItems.length > 0 && (
										<Badge pill bg='success' style={{ marginLeft: '5px' }}>
											{cartItems.reduce((acc, c) => acc + c.qty, 0)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<FaUser /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<>
									<NavDropdown title='Admin' id='administrator'>
										<LinkContainer to='/admin/productlist'>
											<NavDropdown.Item>Products</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/userlist'>
											<NavDropdown.Item>Users</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/orderlist'>
											<NavDropdown.Item>Orders</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
