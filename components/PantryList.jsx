"use client"
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { db } from "@/firebase/firebase";
import { Backdrop, CircularProgress, Fade } from "@mui/material";
import Add from "./Add";
import Edit from "./Edit";



export default function PantryList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (data) => {
    // console.log(rows[0].id)
    setEditData(data);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

    const deleteItems = async (docId)=>{
        try {
            await deleteDoc(doc(db, "pantry-items", docId))
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchItems()
        } catch (error) {
            console.log(error)
        }
               
    }

    const fetchItems = async ()=>{
      setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "pantry-items"));
            let data = []
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());

              data.push({...doc.data(), id:doc.id})
            }); 
            setRows(data)
            setFilteredRows(data)
        } catch (error) {
            console.error(error)
        }finally {
          setLoading(false); 
        }
    }

    useEffect(()=>{
        fetchItems()
    },[])



  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deletePantry = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteItems(id);
      }
    });
  };

  

  const filterData = (event, value) => {
    if (value) {
      const searchFilter = rows.filter((row)=>row.itemsName.toLowerCase().includes(String(value).toLowerCase()))
      setFilteredRows(searchFilter)
    } else {
      setFilteredRows(rows)
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{marginX:"2px",  minWidth:"100%", marginTop:"12px"}}>


<div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* add items component */}
            <Add closeEvent={handleClose} fetch={fetchItems}/>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editopen}
        onClose={handleEditClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={editopen}>
          <Box sx={style}>
            {/* add items component */}
            <Edit closeEvent={handleEditClose} fetch={fetchItems} edit={editData}/>
          </Box>
        </Fade>
      </Modal>
    </div>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <CircularProgress />
        </Box> ) : ( rows.length >= 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }} className=" bg-white">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Pantry Items
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onInputChange={(event, value) => filterData(event, value)}
              getOptionLabel={(rows) => rows.itemsName || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Items" sx={{minWidth:"50%"}}/>
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer className="justify-center items-center mx-auto">
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="text-gray-400 items-center">
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    <h1 className="text-md font-bold ">Items Name</h1>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                  <h1 className="text-md font-bold ">Price </h1>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                  <h1 className="text-md font-bold ">Quantity</h1>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                  <h1 className="text-md font-bold ">Category</h1>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                  <h1 className="text-md font-bold ">Date</h1>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                  <h1 className="text-md font-bold ">Action</h1>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        
                      >
                        <TableCell align="left" className="text-md text-black">{row?.itemsName}</TableCell>
                        <TableCell align="left" className="text-md text-black">{row?.price}</TableCell>
                        <TableCell align="left" className="text-md text-black">{row?.quantity}</TableCell>
                        <TableCell align="left" className="text-md text-black">{row?.category}</TableCell>
                        <TableCell align="left" className="text-md text-black">{row?.date}</TableCell>
                        <TableCell align="left" className="text-md">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={()=>handleEditOpen(row)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deletePantry(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ))}
    </Box>
  );
}
