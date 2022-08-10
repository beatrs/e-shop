
import styled from "styled-components"
import StickyHeader from "../components/Header/StickyHeader"

import { userRequest } from "../reqMethods"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Datatable from "../components/Datatable/Datatable"

const Container = styled.div`
`

const Wrapper = styled.div`
    width: 80vw;
    margin: auto;
`

const Title = styled.h1`
    padding: 60px 30px 20px 30px;
`

const OrderList = () => {
    
    const user = useSelector((state) => state.user.currentUser)
    const userId = user._id
    console.log(user)
    console.log(userId)

    useEffect(() => {
        const getOrders = async() => {
            try {
                const query = `/orders/${userId}?status=pending`
                const res = await userRequest.get(query)
                console.log(res)
                setOrders(modList(res.data))
            } catch (err) {
                console.error(err)
            }
        }

        getOrders()
    }, [])

    const [orders, setOrders] = useState([])
    const modList = (arr) => {
        try {
            const newArr = arr.map(obj => ({
                ...obj,
                'id': arr.indexOf(obj) + 1
            }))
            return newArr
        } catch (err) {
            console.error(err)
        }
    }

    
    const [isToggled, setIsToggled] = useState(true)
    return (
        <Container>
            <StickyHeader handleToggle={isToggled} />
            <Wrapper onClick={()=>setIsToggled(!isToggled)}>
                <Title>My Pending Orders</Title>
                {orders && 
                <Datatable rows={orders} />
                }
            </Wrapper>
        </Container>
    )
}

export default OrderList