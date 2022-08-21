import React, { useEffect } from "react"
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
    margin: 40px 20px 20px 20px;
    font-weight: 500;
    font-size: 1.75em;
`

const Wrapper = styled.div`
    width: 80vw;
    margin: auto;

    @media screen and (max-width: 479px) {
        width: 90vw;
    }
`

const Home = () => {
    const [isToggled, setIsToggled] = useState(true)
    return (
        <div>
            <StickyHeader handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)} >
                <Slider />
                <Wrapper>
                    <Title>Shop</Title>
                    <Categories />
                    <Title>New items</Title>
                    <Products limit={true} center={true} />
                </Wrapper>
                <Newsletter />
                <Footer />
            </div>
        </div>
    )
}

export default Home