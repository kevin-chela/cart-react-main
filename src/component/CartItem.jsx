import React from 'react'
import { useGlobalContext } from '../context/context'

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBTypography,

  } from "mdb-react-ui-kit";

const CartItem = ({ id, img, title, price, amount, description }) => {

  const { remove, increase, decrease, toggleAmount } = useGlobalContext()
  return (
    
    <article className='cart-item'>

    <MDBCard className="mb-3">
    <MDBCardBody>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div>
            <MDBCardImage
              src={img} alt={title}
              fluid className="rounded-3" style={{ width: "100px" }}
              />
          </div>
          <div className="ms-3">
            <MDBTypography tag="h5">
              {title}
            </MDBTypography>
            <p className="small mt-2">{description}</p>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div style={{ width: "100px" }}>
            <MDBTypography tag="h5" className="fw-normal mb-0">
            <MDBCol className="d-flex ">
            <MDBBtn color="link" className="px-2"  onClick={() => toggleAmount(id, 'dec')}>
            <MDBIcon fas icon="minus" />
            </MDBBtn>

            <p className='amount mt-3'>{amount}</p>
           

            <MDBBtn color="link" className="px-2"  onClick={() => toggleAmount(id, 'inc')}>
              <MDBIcon fas icon="plus" /> 
            </MDBBtn>
            </MDBCol>
            </MDBTypography>
          </div>
          <div style={{ width: "80px", marginLeft: "50px"  }}>
            <MDBTypography tag="h5" className="mb-0">
             ${price}
            </MDBTypography>
          </div>
          <a href="#!" className='deletes' onClick={() => remove(id)} style={{ color: "#cecece"}}>
            <MDBIcon fas icon="trash-alt"  />
          </a>
        </div>
      </div>
    </MDBCardBody>
  </MDBCard>
  
  </article>
  )
}

export default CartItem
