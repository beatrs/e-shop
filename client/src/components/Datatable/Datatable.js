import "./Datatable.scss"
import { HiOutlineSearchCircle as ViewIcon, HiOutlinePencilAlt as EditIcon, HiOutlineTrash as DeleteIcon } from "react-icons/hi"

import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from "react-router-dom"
import { FormatDate } from '../../services/general'
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../../redux/cartRedux"
import Modal from "../../components/Etc/Modal"
import { userRequest } from "../../reqMethods"

const userOrdersColumn = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
        field: 'createdAt', headerName: 'Order Date', width: 170,
        renderCell: (params)=>{
            return (
                <div>
                    <span className="rowTxt">{FormatDate.getYmd(params.row.createdAt)}</span>
                </div>
            )
        } 
    },
    { 
        field: 'orders', headerName: 'Orders', width: 350,
        renderCell: (params)=>{
            const products = params.row.products.map(prod => prod._product.title)
            const prodList = products.join(', ')
            return (
                <div>
                    <span className="rowTxt">{prodList}</span>
                </div>
            )
        } 
    },
]


const Datatable = ({rows}) => {

    const dispatch = useDispatch()

    const deleteOrderFromDb = async(pId) => {
        try {
            const query = `/orders/${pId}`
            const res = await userRequest.delete(query)

            if (res)
                window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }
    const deleteItem = (pId) => {
        console.log(pId)
        try {
            dispatch(
                removeItem(pId)
            )
            deleteOrderFromDb(pId)
        } catch (err) {
            console.error(err)
        }
    }

    const cancelBtnStyle = {
        cursor: "pointer",
        border: "none",
        backgroundColor: "rgb(203, 51, 51)",
        borderRadius: "80px",
        padding: "5px 25px",
        color: "white",
        width: "110px",
        display: "inline-block",
        textAlign: "center",
    }

    const CancelBtn = {
        name: "Cancel",
        style: cancelBtnStyle
    }



    const actionColumn = [
        { 
            field: 'actions', headerName: 'Actions', width: 200,  
            renderCell: (params) => {
                return (
                    <div className="actionRow">
                        <Modal 
                            button={CancelBtn}
                            handleConfirm={()=>deleteItem(params.row._id)}
                            content={{
                                title: "Are you sure?",
                                body: "Would you like to cancel this order? This process cannot be undone."
                            }}
                        />
                    </div>
                )
            }
        }
    ]    
    

    const navigate = useNavigate()
    const redirectTo = (url) => {
        navigate(url)
    }
    
    // const columns = type === 'prod' ? productColumns : userColumns
    let columns = userOrdersColumn
        
    return (
        <div className={`datatable`}>
            <DataGrid
                className="datagrid"
                rows={rows}
                columns={columns.concat(actionColumn)}
                getRowId={(row) => row._id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

export default Datatable