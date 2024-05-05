import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'

const OrderScreen = () => {
	const { id } = useParams()
	const {
		data: order,
		refetch,
		isLoading,
		error
	} = useGetOrderDetailsQuery(id!)

	console.log(order)

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>
			<h1>Something Went Wrong!!!</h1>
		</Message>
	) : (
		<>
			<h1>Order {order?._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order?.user.name}
							</p>
							<p>
								<strong>Email: </strong> {order?.user.email}
							</p>
							<p>
								<strong>Address: </strong> {order?.shippingAddress.address},{' '}
								{order?.shippingAddress.city},{' '}
								{order?.shippingAddress.postalCode},
								{order?.shippingAddress.country}
							</p>
							{order?.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{order?.paymentMethod}
							</p>
							{order?.isPaid ? (
								<Message variant='success'>Paid on {order?.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order?.orderItems.map((item, idx) => (
								<ListGroup.Item>
									<Row>
										<Col md={1}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={4}>
											{item.qty} x ${item.price} = ${item.qty * item.price}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order?.itemPrice}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>${order?.shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>${order?.taxPrice}</Col>
								</Row>
								<Row>
									<Col>Total</Col>
									<Col>${order?.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* Pay order placeholder */}
							{/* Mark as delivered placeholder */}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default OrderScreen