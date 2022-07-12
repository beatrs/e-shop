import "./Datatable.scss"
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import axios from "axios"

const columns = [
  { field: 'uId', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'email', headerName: 'E-mail', width: 130 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 4 },
  { id: 6, lastName: 'Melisandre', firstName: 'X', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];



const Datatable = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
      const query = `http://localhost:5000/api/users`
      const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzNjYmQ3YWY3YWZmZjY2YzNiNzU3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzU4OTg0OH0.GIlO0Bm5KcLyB1S-VVRSbuRue7MfeYzVexVCLdNngZ0'
    
      const getUsers = async () => {
        try {
            const res = await axios.get(query, {
                headers: { token: `Bearer ${TOKEN}` }
            })
            modUsers(res.data)
            console.log(TOKEN)
            console.log(res.data)
        } catch (err) {
            console.error(err)
        }
      }

      getUsers()
    }, [])

    // useEffect(() => {
    //     try {
    //         console.log(users)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }, [users])
    
    const modUsers = (arr) => {
        try {
            const newArr = arr.map(obj => ({
                ...obj,
                'uId': arr.indexOf(obj) + 1
            }))
            arr.forEach(element => {
                console.log(arr.indexOf(element))
            });
            console.log('new arr', newArr)
            setUsers(newArr)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="datatable">
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => users.indexOf(row)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable