import "./Datatable.scss"
import { DataGrid } from '@mui/x-data-grid'
import { Link } from "react-router-dom"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 70,},
    { 
        field: 'username', headerName: 'Username', width: 150,
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
    { field: 'artist', headerName: 'Artist', width: 130 },
]



const Datatable = ({rows, type}) => {
    const actionColumn = [
        { 
            field: 'actions', headerName: 'Actions', width: 200,  
            renderCell: (params) => {
                return (
                    <div className="actionRow">
                        <Link to={`${params.row._id}`}><button className="action--view" >View</button></Link>
                        <button className="action--delete">Delete</button>
                    </div>
                )
            }
        }
    ]
    
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