"use client"
import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { db } from '@/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';


const Edit = ({closeEvent, fetch, edit}) => {
  const [pantryInput, setPantryInput] = useState("")
  const [quantity, setQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(dayjs(new Date()));
  const [item, setItems] = useState(null)

  useEffect(()=>{
    console.log("FID" + edit.id)
    setPantryInput(edit?.itemsName)
    setPrice(edit?.price)
    setQuantity(edit?.quantity)
    setCategory(edit?.category)
  },[edit])

  const EditItems = async (docId)=>{
    try {
        const docRef = doc(db,"pantry-items", docId);
        await updateDoc(docRef,{
            itemsName:pantryInput,
            quantity:quantity,
            price: price,
            category:category

        })
        // setUpdateId(data)
        setItems(fetch)
        // fetchItems()
        closeEvent();
        Swal.fire("Successfully Edited!","success")
        
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
    <Box sx={{m:2}}>
      <Typography variant='h5' align='center'>
        Edit Item
      </Typography>
      <IconButton
       style={{position:"absolute", top:"0", right:"0"}}
       onClick={closeEvent}
      >
        <Close />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id='outlined-basic'
          label='Item Name'
          variant='outlined'
          size='small'
          sx={{minWidth:"100%"}}
          value={pantryInput}
          onChange={(e) => setPantryInput(e.target.value)}
          />
          </Grid>
          <Grid item xs={6}>
          <TextField id='outlined-basic'
          label='Price'
          type='number'
          variant='outlined'
          size='small'
          sx={{minWidth:"100%"}}
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          />
          </Grid>
          <Grid item xs={6}>
          <TextField id='outlined-basic'
          label='Quantity'
          type='number'
          variant='outlined'
          size='small'
          sx={{minWidth:"100%"}}
          value={quantity}
          onChange={(e)=>setQuantity(e.target.valueAsNumber)}
          />
          </Grid>
          <Grid item xs={6}>
          <TextField id='outlined-basic'
          label='Category'
          variant='outlined'
          size='small'
          sx={{minWidth:"100%"}}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          />
          </Grid>
          {/* <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <DatePicker
      sx={{ minWidth: "100%" }}
      onChange={(e) => setDate(e.target.date)}
      value={date}
      renderInput={(params) => <TextField {...params} sx={{ minWidth: "100%" }} />}
    />
        
    </LocalizationProvider>

        </Grid> */}
        <Grid item xs={12}>
          <Typography>
            <Button variant="contained" color="primary" sx={{minWidth:"100%"}} onClick={()=>EditItems(edit.id)}>
              Submit
              </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{m:4}}/>
    </Box>
    </>
  )
}

export default Edit