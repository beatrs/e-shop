import "./Datatable.scss"
import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from "react-router-dom"

// import { GrView as ViewIcon, GrEdit as EditIcon, GrTrash as DeleteIcon } from "react-icons/gr"
import { HiOutlineSearchCircle as ViewIcon, HiOutlinePencilAlt as EditIcon, HiOutlineTrash as DeleteIcon } from "react-icons/hi"

import Showdown from "showdown"
import parse from 'html-react-parser';

const userColumns = [
    { field: 'id', headerName: 'ID', width: 70,},
    { 
        field: 'username', headerName: 'Username', width: 200,
        renderCell: (params)=>{
            return (
                <div className="withImg">
                    <img className="rowImg profile" src={params.row.profileImg} alt="user avatar" />
                    <Link to={`${params.row._id}`} className="product--name">
                        <span className="rowTxt">{params.row.username}</span>
                    </Link>
                </div>
            )
        }
    },
    { field: 'email', headerName: 'E-mail', width: 230 },
]

// const converter = new Showdown.Converter()
// const convertedText = (text) => {
//     return (
//         <span>
//             {parse(converter.makeHtml(text))}
//         </span>
//     )
// }
const productColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
        field: 'product', headerName: 'Product Name', width: 350,
        renderCell: (params)=>{
            return (
                <div className="withImg">
                    <img className="rowImg" src={params.row.cover} alt={params.row.coverAlt} />
                    <Link to={`${params.row._id}`} className="product--name">
                        <span className="rowTxt">{params.row.title}</span>
                    </Link>
                </div>
            )
        },

    },
    { 
        field: 'desc', headerName: 'Description', width: 350, 
        renderCell: (params)=>{
            return (
                <div className="rowDesc">
                    <span className="rowDesc--txt">{params.row.desc}</span>
                </div>
            )
        }
    },
    { field: 'artistFormatted', headerName: 'Artist', width: 130 },
]



const Datatable = ({rows, type}) => {
    const actionColumn = [
        { 
            field: 'actions', headerName: 'Actions', width: 200,  
            renderCell: (params) => {
                return (
                    <div className="actionRow">
                        {/* <Link to={`${params.row._id}`}><ViewIcon className="action--btn" /></Link>
                        <Link to={`edit/${params.row._id}`}><EditIcon className="action--btn" /></Link> */}
                        <ViewIcon className="action--btn" onClick={()=>redirectTo(`${params.row._id}`)} />
                        <EditIcon className="action--btn" onClick={()=>redirectTo(`edit/${params.row._id}`)} />
                        <DeleteIcon className="action--btn md" />
                    </div>
                )
            }
        }
    ]

    const IconStyle = {
        color: 'red'
    }

    const navigate = useNavigate()
    const redirectTo = (url) => {
        navigate(url)
    }
    
    const columns = type === 'prod' ? productColumns : userColumns
    return (
        <div className="datatable">
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