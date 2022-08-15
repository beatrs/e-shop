
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
    flex: 1;
    margin: 5px;
    max-height: 55vh;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    color: white;
    text-transform: uppercase;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
    margin-bottom: 25px;
    
    @media screen and (max-width: 768px) {
        font-size: 1.25rem;
    }
`

const Button = styled.button`
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

const CategoryItem = ({item}) => {
    const navigate = useNavigate()

    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button onClick={()=>navigate(item.url)}>See more</Button>
            </Info>
        </Container>
    )
}

export default CategoryItem