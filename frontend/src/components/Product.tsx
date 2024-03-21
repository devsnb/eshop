import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type ProductProps = {
	product: {
		_id: string
		name: string
		image: string
		description: string
		brand: string
		category: string
		price: number
		countInStock: number
		rating: number
		numReviews: number
	}
}

const Product = ({ product }: ProductProps) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
