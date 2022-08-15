
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitterSquare, faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot, faPhone, faAt } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    display: flex;

`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const IconsContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-right: 5px;
`
const Logo = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 1.5em;
    margin-bottom: 15px;
`

const Description = styled.p`
    margin-bottom: 15px;
`


const Center = styled.div`
    flex: 1;
    padding: 20px;

    @media only screen and (max-width: 479px) {
        display: none;
    }
`

const Title = styled.h3`
    margin-bottom: 15px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
    @media only screen and (max-width: 768px) {
        width: 80%;
    }
    &:hover {
        text-decoration: underline;
    }
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    flex-wrap: wrap;
`

const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    width: 90%;
    align-items: center;
    word-break: break-word;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {

    const iconStyle = {
        width: '100%',
        height: '100%',
    }
    
    const contactStyle = {
        marginRight: '15px'
    }

    const navigate = useNavigate()

    return (
        <Container>
            <Left>
                <Logo>Logo.</Logo>
                <Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore cupiditate maiores, harum tenetur accusamus porro numquam repellat veritatis ut excepturi iste amet, a similique blanditiis quod voluptatem facere. Praesentium?
                </Description>
                
                <IconsContainer>
                    <SocialIcon>
                        <FontAwesomeIcon style={iconStyle} icon={faFacebookSquare} color="#3C5B9C" />
                    </SocialIcon>
                    <SocialIcon>
                        <FontAwesomeIcon style={iconStyle} color='#4ea6e9' icon={faTwitterSquare} />
                    </SocialIcon>
                    <SocialIcon>
                        <FontAwesomeIcon style={iconStyle} color='#e7404e' icon={faInstagramSquare} />
                    </SocialIcon>
                </IconsContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem onClick={()=>navigate('/')}>Home</ListItem>
                    <ListItem onClick={()=>navigate('/cart')}>Cart</ListItem>
                    <ListItem onClick={()=>navigate('/shop/album')}>Albums</ListItem>
                    <ListItem onClick={()=>navigate('/shop/merch')}>Official MD</ListItem>
                    <ListItem onClick={()=>navigate('/shop/kstyle')}>K-Style</ListItem>
                    <ListItem onClick={()=>navigate('/')}>Tickets</ListItem>
                    <ListItem onClick={()=>navigate('/login')}>My Account</ListItem>
                    <ListItem onClick={()=>navigate('/orders')}>My Orders</ListItem>
                    <ListItem onClick={()=>navigate('/')}>Wishlist</ListItem>
                    <ListItem onClick={()=>navigate('/')}>Terms and Policy</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact Us</Title>
                <ContactItem>
                    <FontAwesomeIcon style={contactStyle} icon={faLocationDot} />
                    574 Oakway Lane, Irvine, CA
                </ContactItem>
                <ContactItem>
                    <FontAwesomeIcon style={contactStyle} icon={faPhone} />
                    + 1 116 18 106
                </ContactItem>
                <ContactItem>
                    <FontAwesomeIcon style={contactStyle} icon={faAt} />
                    xoxostore@info.com
                </ContactItem>
                <Payment src="https://lumosblue.com/wp-content/uploads/2021/04/Full_Online_Tray_RGB.png" />
            </Right>
        </Container>
    )
}

export default Footer