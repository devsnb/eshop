import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import {
	PayPalButtons,
	SCRIPT_LOADING_STATE,
	usePayPalScriptReducer
} from '@paypal/react-paypal-js'
import { useAppSelector } from '../hooks/state-hooks'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useDeliverOrderMutation
} from '../slices/ordersApiSlice'
import { toast } from 'react-toastify'
import {
	OnApproveActions,
	OnApproveData,
	CreateOrderActions,
	CreateOrderData
} from '@paypal/paypal-js/types/components/buttons'

const OrderScreen = () => {
	const { id } = useParams()
	const {
		data: order,
		refetch,
		isLoading,
		error
	} = useGetOrderDetailsQuery(id!)

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

	const [deliverOrder, { isLoading: loadingDeliver }] =
		useDeliverOrderMutation()

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal
	} = useGetPayPalClientIdQuery()

	const { userInfo } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						clientId: paypal.clientId,
						currency: 'USD'
					}
				})
				paypalDispatch({
					type: 'setLoadingStatus',
					value: {
						state: SCRIPT_LOADING_STATE.PENDING,
						message: 'pending'
					}
				})
			}

			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPaypalScript()
				}
			}
		}
	}, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

	const onApprove = async (_: OnApproveData, actions: OnApproveActions) => {
		const details = await actions?.order?.capture()
		try {
			await payOrder({ orderId: order!._id, details }).unwrap()
			refetch()
			toast.success('Payment Successful')
		} catch (error) {
			// @ts-ignore
			toast.error(error?.data.message || error.message)
		}
	}

	// const onApproveTest = async () => {
	// 	await payOrder({
	// 		orderId: order!._id,
	// 		details: {
	// 			payer: {}
	// 		}
	// 	})
	// 	refetch()
	// 	toast.success('Payment Successful')
	// }

	const onError = (err: any) => {
		toast.error(err.message)
	}

	const createOrder = async (
		_: CreateOrderData,
		actions: CreateOrderActions
	) => {
		const orderId = await actions?.order?.create({
			purchase_units: [
				{
					amount: {
						value: String(order?.totalPrice),
						currency_code: 'USD'
					}
				}
			],
			intent: 'CAPTURE'
		})
		return orderId
	}

	const deliverOrderHandler = async () => {
		try {
			await deliverOrder(order?._id!)
			refetch()
			toast.success('Order delivered')
		} catch (error) {
			// @ts-ignore
			toast.error(error?.data?.message || error.message)
		}
	}

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
								<ListGroup.Item key={idx}>
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
							{!order?.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{isPending ? (
										<Loader />
									) : (
										<div>
											{/* <Button
												onClick={onApproveTest}
												style={{ marginBottom: '10px' }}
											>
												Test Pay Order
											</Button> */}
											<div>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}
												></PayPalButtons>
											</div>
										</div>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order?.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block'
											onClick={deliverOrderHandler}
										>
											Mark As Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default OrderScreen
