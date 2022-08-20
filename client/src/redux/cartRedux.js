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
            
            state.quantity = sumQty
            state.total = sumTotal
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(prod => prod._id !== action.payload)
            
            let [sumQty, sumTotal] = [0, 0]
            state.products.forEach((prod) => {
                sumQty += prod.quantity
                sumTotal += (prod.quantity * prod.price)
            })
            
            state.quantity = sumQty
            state.total = sumTotal
        },
        resetCart: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const { addProduct, changeQty, removeItem, resetCart } = cartSlice.actions
export default cartSlice.reducer