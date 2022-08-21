import { useEffect, useState } from "react"
import styled from "styled-components"
import { hotProducts } from "../../data"
import { genRequest } from "../../reqMethods"
import Product from "./Product"
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`

const Products = ({category, filters, sort, search}) => {
    console.log({category,filters,sort})

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        let apiQuery = `/products` 
        if (category) {
            apiQuery += `?category=${category}`
        }
        if (search) {
            apiQuery += `?s=${search}`
        }

        const getProducts = async () => {
            try {
                const res = await genRequest.get(apiQuery)
                setProducts(res.data)
                setFilteredProducts(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getProducts()
    }, [category, search])

    const divStyle = {
        display: "flex",
        flexWrap: "wrap",
        // padding: "20px",
        margin: "auto",
        width: "99%",
        // justifyContent: "space-between",
    }

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
    
    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts(prevProducts => 
                [...prevProducts].sort((a,b) => a.createdAt - b.createdAt)
            )
        } else if (sort === 'asc') {
            setFilteredProducts(prevProducts =>
                [...prevProducts].sort((a,b) => a.price - b.price)
            )
        } else if (sort === 'desc') {
            setFilteredProducts(prevProducts =>
                [...prevProducts].sort((a,b) => b.price - a.price)
            )
        }
    }, [sort])


    return (
        <Container>
            {/* {filters ? 
            filteredProducts.map(item => (
                <Product key={item._id} item={item} />
            )) :
            products.map(item => (
                <Product key={item._id} item={item} />
            ))
            } */}
            <Stagger in style={divStyle}>
            {filteredProducts.map(item => (
                <Fade in style={{minWidth: "280px"}}>
                    <Product key={item._id} item={item} />
                </Fade>
            ))}
            </Stagger>
        </Container>
    )
}

export default Products