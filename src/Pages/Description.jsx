import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Nav, Row, Tab } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import '../Styles/Description.css'
import Footer from '../Components/Footer'

const Description = () => {
  const [data, setdata] = useState([])
  const { id } = useParams()
  const [desdata, setdesdata] = useState([]);

  useEffect(() => {
    axios.get(`https://ajio-be.onrender.com/men/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/men-shirts/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/men-pants/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/men-tshirt/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/women/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/women-kurtas/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/women-tshirt/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/women-sarees/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/kids/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/kids-tops/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/kids-bag/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/kids-jacket/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/face-wash/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/perfumes/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/beauty/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/shampoo/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/home-kitchen/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/wall-decor/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/photo-frames/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))

    axios.get(`https://ajio-be.onrender.com/kitchen/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err))
  }, [id])

    // ✅ Add to Cart Logic
  const handleAddToCart = () => {
    const cartItem = {
      name: data.name,
      image: data.image,
      price: data.price,
      originalPrice: data.originalPrice,
      brand: data.brand,
      rating: data.rating,
      qty: 1,
      size: "M"
    };

    axios.post("https://ajio-be.onrender.com/cart", cartItem)
      .then(() => alert("✅ Added to cart successfully!"))
      .catch(err => console.log("❌ Error adding to cart:", err));
  };

  return (
    <div className="description-page">
      <Container className="product-page-container m-auto">
        <Row className="mt-4">
          <Col xs={12} md={10} lg={8} className="d-flex m-auto">
            {data && (
              <div key={data.id} className="product-container d-flex flex-row w-100">
                <img src={data.image} alt="Product Image" className="product-image" />
                <div className="product-details p-5">
                  <h4 className="product-name">{data.name}</h4>
                  <h6 className="product-brand mt-2">{data.brand} - {data.rating}⭐</h6>
                  <p className="product-price">
                    {data.price} <span className="old-price">{data.originalPrice}(65% OFF)</span>
                  </p>
                  <p>"Experience unmatched quality and innovation with our latest product, designed to simplify your life and enhance your daily routine. Built with durability and user-friendliness in mind, it offers exceptional performance and reliability for a wide range of needs."</p>
                  <Link to={`/addcart/${id}`}><Button variant="success" className="buy-now-btn w-50" onClick={handleAddToCart}>Get it for {data.price}</Button></Link>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='mt-5'>
      
          {desdata.map((el) => (
            <Col key={el.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 card-hover">
                <Link to={`/description/${el.id}`}>
                  <Card.Img variant="top" src={el.image} alt={el.name} />
                </Link>
                <Card.Body>
                  <Card.Text>{el.brand}</Card.Text>
                  <Card.Title className='fs-5'>{el.name}</Card.Title>
                  <Card.Text>{el.rating}</Card.Text>
                  <Card.Text>{el.price}</Card.Text>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div className='mt-5 pt-5'>
        <Footer />
      </div>
    </div>
  )
}

export default Description