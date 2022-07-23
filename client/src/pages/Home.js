import React from "react"
import Categories from "../components/Categories/Categories"
import Slider from "../components/Slider/Slider"
import Products from "../components/Products/Products"
import Newsletter from "../components/Newsletter/Newsletter"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"

import "../styles.scss"
import styled from "styled-components"

import { useState } from "react"
import MinHeader from "../components/Header/MinHeader"

const Title = styled.h1`
    text-transform: uppercase;
    margin: 40px 20px;
    font-weight: 300;
    font-size: 1.75em;
`

const Home = () => {
    const [isToggled, setIsToggled] = useState(false)
    return (
        <div>
            <StickyHeader />
            <MinHeader />
            <Slider />
            <Title>Shop</Title>
            <Categories />
            <Title>Hot items</Title>
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home