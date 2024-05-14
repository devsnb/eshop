import { Link, useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams()

	const { data, isLoading, isError } = useGetProductsQuery({
		keyword,
		pageNumber: pageNumber ? Number(pageNumber) : undefined
	})

	return (
		<>
			{keyword && (
				<Link to='/' className='btn btn-light mb-4'>
					Go Back
				</Link>
			)}
			{isLoading ? (
				<Loader />
			) : isError ? (
				<Message variant='danger'>Could not fetch products</Message>
			) : (
				<>
					<h1>Latest Products</h1>
					<Row>
						{data?.products?.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						page={Number(pageNumber || 1)}
						pages={data?.pages!}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
