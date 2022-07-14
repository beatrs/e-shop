import { useEffect, useState } from "react"
import "./AddEditItem.scss"
import { useLocation } from "react-router-dom"
import axios from "axios"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const AddEditItem = ({type}) => {
    const [item, setItem] = useState()
    const location = useLocation()
    const itemId = location.pathname.split("/")[3]

    useEffect(() => {
        const query = `http://localhost:5000/api/products/${itemId}`
        const getItem = async () =>  {
            try {
                const res = await axios.get(query)
                setItem(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getItem()
    }, [itemId])
    return (
        <div className="form">
            <Sidebar />
            <div className="form--container">
                <Navbar />
                <div className="item-form">
                    {item && 
                    <form>
                        <div className="form--item">
                            <label>Product name:</label>
                            <input type="text" name="name" value={item.title} />
                        </div>
                        <div className="form--item">
                            <label>Artist:</label>
                            <input type="text" name="artist" value={item.artist} />
                        </div>
                        <div className="form--item">
                            <label>Price:</label>
                            <input type="number" name="price" value={item.price} />
                        </div>
                        <div className="form--item">
                            <label>Description:</label>
                            <textarea name="description" value={item.desc} className="form--textarea"/>
                        </div>
                        
                        <input type="submit" value="Save" />
                    </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddEditItem