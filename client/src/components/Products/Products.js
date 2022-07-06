import { useEffect, useState } from "react"
import styled from "styled-components"
import { hotProducts } from "../../data"
import Product from "./Product"
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`

const Products = ({category, filters, sort}) => {
    console.log({category,filters,sort})

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const apiQuery = category 
            ? `http://localhost:5000/api/products?category=${category}` 
            : `http://localhost:5000/api/products`

        const getProducts = async () => {
            try {
                const res = await axios.get(apiQuery)
                setProducts(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getProducts()
    }, [category])

    useEffect(() => {
        
        if (products && filters) {
            try {
                // ! object attribute in db etc artist: '', type: ''
                // setFilteredProducts(
                //     products.filter((item) => Object.entries(filters).every(([key, val]) => item[key] === val))
                // )
                // * searches categories in db
                setFilteredProducts(
                    products.filter((item) => Object.entries(filters).every(([key, val]) => item['categories'].includes(val)))
                )
            } catch (err) {
                console.log(err)
            }
        } 
        
    }, [products, filters])
    
    return (
        <Container>
            {filters ? 
            filteredProducts.map(item => (
                <Product key={item._id} item={item} />
            )) :
            products.map(item => (
                <Product key={item._id} item={item} />
            ))
            }
        </Container>
    )
}

export default Products