import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        },
        changeQty: (state, action) => {
            const objIdx = state.products.findIndex((obj => obj._id === action.payload.pId))
            console.log(objIdx)
            state.products[objIdx].quantity = action.payload.quantity
            let sumQty = 0
            let sumTotal = 0
            state.products.forEach((prod) => {
                console.log(prod.quantity, prod.price)
                sumQty += prod.quantity
                sumTotal += (prod.quantity * prod.price)
            })
            console.log(sumQty, sumTotal)
            // const newQty = state.products.reduce(
            //     (prevVal, curVal) => prevVal.quantity + curVal.quantity
            // )
            // const newTotal = state.products.reduce(
            //     (prevVal, currVal) => prevVal + currVal.qty*currVal.price
            // )
            // console.log(newQty)
            state.quantity = sumQty
            state.total = sumTotal
        }
    }
})

export const { addProduct, changeQty } = cartSlice.actions
export default cartSlice.reducer