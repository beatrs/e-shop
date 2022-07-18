
import "./List.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useState, useEffect } from "react"

import { adminRequest, userRequest } from "../../reqMethods"
import { Link } from "react-router-dom"

const List = ({type}) => {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
      const userQuery = `http://localhost:5000/api/users`
      const prodQuery = `http://localhost:5000/api/products`
    
      const getUsers = async () => {
        try {
            const res = await userRequest.get(userQuery)
            setUsers(modList(res.data))
        } catch (err) {
            console.error(err)
        }
      }

      const getProducts = async () => {
        try {
            const res = await userRequest.get(prodQuery)
            setProducts(modList(res.data))
        } catch (err) {
            console.error(err)
        }
      }

      getUsers()
      getProducts()
    }, [])

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
    return (
        <div className="list">
            <Sidebar />
            <div className="list--container">
                <Navbar />
                <Link to={type === 'products' ? `/products/new/` : `/users/new`} className="add-btn">
                    <button >Add New</button>
                </Link>
                { type === 'products' ?
                <Datatable rows={products} type="prod" />
                :
                <Datatable rows={users} type="user" />
                }
            </div>
        </div>
    )
}

export default List