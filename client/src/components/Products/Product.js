import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"


const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(240, 248, 255);
    position: relative;

    @media only screen and (max-width: 479px) {
        min-width: 120px;
        height: 120px;
    }

`

const Image = styled.img`
    height: 70%;
    z-index: 2;
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;

`

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;

    &:hover {
        opacity: 1;
    }
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: white;
    padding: 3px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
        background-color: rgb(240, 248, 255);
        transform: scale(1.1);
    }

    
    @media only screen and (max-width: 479px) {
        width: 30px;
        height: 30px;
    }
`

const Product = ({item}) => {
    const linkStyles = {
        color: "black",
        textDecoration: "none"
    }
    return (
        <Container>
            {/* <Circle /> */}
            <Image src={item.cover} />
            <Info>
                <Icon>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Icon>
                <Link to={`/product/${item._id}`} style={linkStyles}>
                <Icon>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Icon>
                </Link>
                <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product