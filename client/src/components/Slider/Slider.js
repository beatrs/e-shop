import React from 'react'

import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import { sliderItems } from '../../data'

import styled from "styled-components"

const Container = styled.div`
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;

    
    @media only screen and (max-width: 479px) {
        height: 50vh;
    }
`

const Arrow = styled.div`
    width: 40px;
    height: 40px;
    background-color: antiquewhite;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props=> props.direction === 'left' && '10px'};
    right: ${props=> props.direction === 'right' && '10px'};
    cursor: pointer;
    opacity: 60%;
    z-index: 2;

`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props => props.slideVal}vw);
    transition: all 1.5s ease;
    
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg};

    @media only screen and (max-width: 479px) {
        flex-direction: column;
        height: 100%;
    }
`

const ImgContainer = styled.div` 
    height: 100%;
    flex: 1;
    margin-top: 50px;
    margin-left: 50px;

    @media only screen and (max-width: 479px) {
        height: 40%;
        margin: 0;
        margin-top: 20px;
    }
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 30px;
    
`

const Image = styled.img`
    height: 70%;
    border-radius: 0px 25% 0px 25%; 
    padding: 10px 15px;

    @media only screen and (max-width: 479px) {
        height: 100%;
    }
`

const Title = styled.h1`
    font-size: 3em;
    text-transform: uppercase;

    
    @media only screen and (max-width: 479px) {
        font-size: x-large;
    }
`

const Desc = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.5em;
    letter-spacing: 2px;

    @media only screen and (max-width: 479px) {
        font-size: medium;
    }

`

const Button = styled.button`
    cursor: pointer;
    margin-top: 10px;
    padding: 10px;
    background-color: transparent;
    border: 2px solid black;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    @media only screen and (max-width: 479px) {
        float: right;
        margin-right: 15px;
    }
`

export default function Slider() {
    const [slideIndex, setSlideIndex] = React.useState(0);
    const handleClick = (direction) => {
        const len = sliderItems.length - 1
        const changeVal = direction==='right' ? 1 : -1
        
        // loop around array
        if (direction === 'right' && slideIndex === len)
            setSlideIndex(0)
        else if (direction === 'left' && slideIndex === 0) 
            setSlideIndex(len)
        else
            setSlideIndex(slideIndex + changeVal)

    }
    React.useEffect(() => {
        console.log(slideIndex)
    }, [slideIndex])
    return (
        <Container>
            <Arrow direction='left' onClick={()=>handleClick("left")}>
                <ArrowLeftOutlinedIcon />
            </Arrow>
            <Wrapper slideVal={slideIndex*-100}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} alt={item.imgAlt} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>GO TO SHOP</Button>
                        </InfoContainer>
                    </Slide>
                ))}
                
            </Wrapper>
            <Arrow direction='right' onClick={()=>handleClick("right")}>
                <ArrowRightOutlinedIcon /> 
            </Arrow>

        </Container>
    )
}