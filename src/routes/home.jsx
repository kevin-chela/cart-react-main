import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,

  //Modal

  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,

  } from "mdb-react-ui-kit";

import React from "react";
import { Layout } from '@/components/layout'
import { useState, useEffect} from 'react'

//Components

import Alert from '../component/alert';
import CartItem from '../component/CartItem';

//Context

import { useGlobalContext } from '../context/context'

//Profile 

import placeholder from '../assets/images/profiler.jpeg'
import empty from '../assets/images/empty.png'


export default function HomePage() {

  const { cart, total, clearCart } = useGlobalContext()

  const [zeroCart, setzeroCart] = useState(() => {
    if (cart.length  === 0) {
        return true;
    }
    return false;
   

});


//Global Context
  
const { amount } = useGlobalContext()

//alerts

const [alert, setAlert] = useState({
  show: false,
  msg: '',
  type: '',
  icon: '',
})

const showAlert = (show = false, type = '', icon = '', msg = '') => {
  setAlert({ show, type, icon, msg })
}

  const [centredModal, setCentredModal] = useState(false)
  const toggleShow = () => setCentredModal(!centredModal)

   //Inputs

   const [productname, setproductName] = useState('')
   const [description, setDescription] = useState('')
   const [price, setPrice] = useState('')
   const [file, setFile] = useState('');

  //reset modal

  useEffect(() => {

    if(centredModal){
      null
    }else{
      setproductName("")
      setDescription("")
      setPrice("")
      setFile("")
    }
  })

   const {addItem} = useGlobalContext();

   const number = amount + 1;

   //add function

   const Add = () => {
       if (!productname || !description || !price || !file ) {
         showAlert(true, 'danger', 'info-circle', 'All input field are required')
       } else {
        const Item = {

          id: number,
          title: productname,
          price: price,
          description: description,
          amount: 1,
          img: file

        }
        addItem(Item);
        
        !toggleShow()
        
       }
     }

    //File change

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    }
  
    
    //Add tax

    const tax= 20
    const taxed = total + tax

    
    console.log(number)
    
     
   

  return (
    <Layout style={{padding: 50}}>

    <section className=" cart px-5 w-3/4 justify-content-center align-items-center" style={{  zIndex: "1000" }}>

      <MDBContainer className="py-5 h-100" >
        <MDBRow className="justify-content-center align-items-center h-100" >
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">

                  <div className="d-flex justify-content-between align-items-center">

                  {zeroCart ? (
                    <>
                    <MDBTypography tag="h5" lg="7">
                  
                    <a href="#!" className="text-body bottom-5">
                    
                      <MDBIcon fas icon="cart-arrow-down text-success" style={{fontSize:30}} />
                      <div className='amount-container'>
                        <p className='total-amount'>0</p>
                      </div> 
                
                    </a>
                    </MDBTypography>
  
                    <MDBTypography tag="h5" lg="7">
                    
                    <a href="#!" className="text-body text-warning">
                      <MDBIcon fas icon="comments-dollar text-success" style={{fontSize:30}} /> &nbsp;0
                    </a>
                    </MDBTypography>
                    </>
                  ):(
                    <>
                    <MDBTypography tag="h5" lg="7">
                  
                  <a href="#!" className="text-body bottom-5">
                  
                    <MDBIcon fas icon="cart-arrow-down text-success" style={{fontSize:30}} />
                    <div className='amount-container'>
                      <p className='total-amount'>{amount}</p>
                    </div> 
              
                  </a>
                  </MDBTypography>

                  <MDBTypography tag="h5" lg="7">
                  
                  <a href="#!" className="text-body text-warning">
                    <MDBIcon fas icon="comments-dollar text-success" style={{fontSize:30}} /> &nbsp;{total}
                  </a>
                  </MDBTypography>
                  </>
                  )}
                  

                  <MDBBtn color="info" block size="lg" style={{width: '30%'}}  onClick={toggleShow}>
                          <div>
                            <span>
                              Add Item{" "}
                              <MDBIcon fas icon="plus"/>
                             
                            </span>
                          </div>
                        </MDBBtn>

                  </div>

                  <MDBTypography tag="h5" lg="7">
                  
                  <a href="#!" className="text-body bottom-5">
              
                   Continue Shopping
                  
                  </a>
                  </MDBTypography>
                 
                    

                    <hr className="mt-3"/>

                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        {zeroCart ? (
                          <>
                          <p className="mt-3">You have 0 items in your cart</p>
                          
                          </>
                        ):(
                        <p className="mt-3">You have {amount} items in your cart</p>
                        )}
                      </div>
                      <div>
                        <p>
                          <span className="text-muted">Sort by:</span>
                          &nbsp;
                          <a href="#!" className="text-body">
                            price
                            &nbsp;
                            <MDBIcon fas icon="angle-down mt-1" />
                          </a>
                        </p>
                      </div>
                    </div>

                    <hr className="mb-4"/>

                    {cart.length > 0 ? 

                     <div>
                      
                     {cart.map((item) => {
                       return <CartItem key={item.id} {...item} />
                       
                     })}
 
                     
 
                     <MDBBtn className="mt-5" color="danger" block size="lg" onClick={clearCart}>
                         
                         <span>
                         <MDBIcon fas icon="trash-alt" /> &nbsp;
                           CLEAR CART{" "}
                         </span>
                      
                     </MDBBtn>
                     </div>

                    : <div className="mt-5"><img src={empty} style={{marginLeft: '20%'}} width="300px"/></div>}

                    
                    
  
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Card details
                          </MDBTypography>
                          <MDBCardImage src= {placeholder}
                            fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" contain />
                        </div>

                        <p className="small">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                        </a>

                        <form className="mt-4">
                          <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                            placeholder="Cardholder's Name" contrast />

                          <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                            minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                            </MDBCol>
                          </MDBRow>
                        </form>

                        <hr className="mb-3"/>

                        {zeroCart ? (
                        <>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">$ 0.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$ 0.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">$ 0.00</p>
                        </div>

                        <MDBBtn className="mt-3" color="info" block size="lg">
                          <div className="d-flex justify-content-between">
                            <span>$ 0.00</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                        </>
                        ):(
                        <>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${total}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">${taxed}</p>
                        </div>

                        <MDBBtn className="mt-3" color="info" block size="lg">
                          <div className="d-flex justify-content-between">
                            <span>${taxed}</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                        </>
                        )}

                        
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    {/* Modal */}

    <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog xl scrollable centered>
              <MDBModalContent >
                <MDBModalHeader>
                  <MDBModalTitle style={{fontWeight: 'bold'}}>
                    <MDBIcon fas icon="plus text-success" className="me-2" />
                    Add Item
                  </MDBModalTitle>
                 
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                    style={{ fontSize: 10, fontWeight: 'bold' }}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalBody>


                  {alert.show && <Alert {...alert} removeAlert={showAlert} />}

                  <MDBInput
                    wrapperClass="mb-4 mt-3 mx-2"
                    label="Item Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={productname}
                    onChange={(e) => setproductName(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4  mx-2"
                    label="Item Description"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                 <MDBInput
                    wrapperClass="mb-4  mx-2"
                    label="Item Price"
                    id="formControlLg"
                    type="number"
                    size="lg"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4 mt-4  mx-2"
                    label="Paste Image Link"
                    id="formControlLg "
                    type="text"
                    size="lg"
                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                    required
                  />
                  
                </MDBModalBody>

                <MDBModalFooter className="modal-footer">
               
                <MDBBtn
                    // className="mb-4 px-5"
                    color="warning"
                    size="lg"
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -2,
                      borderRadius: 4
                    }}
                    onClick={() => {
                      
                      !toggleShow()

                    }}
                  >
                    
                    Close

                </MDBBtn>
                &nbsp;&nbsp;
                <MDBBtn
                    // className="mb-4 px-5"
                    color="info"
                    size="lg"
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -2,
                      borderRadius: 4
                    }}
                    onClick={() => {
                      Add()
                    }}
                  >
                    
                    Add Product

                  </MDBBtn>
               </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

</Layout>
)
}


{/* <div className="bg-white">
<header className="absolute inset-x-0 top-0 z-50">
  <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
      </a>
    </div>
    <div className="flex lg:hidden">
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">
      {navigation.map((item) => (
        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
          {item.name}
        </a>
      ))}
    </div>
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
        Log in <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  </nav>
  <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
    <div className="fixed inset-0 z-50" />
    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>
        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
</header>

<div className="relative isolate px-6 pt-14 lg:px-8">
  <div
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
  <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        Announcing our next round of funding.{' '}
        <a href="#" className="font-semibold text-indigo-600">
          <span className="absolute inset-0" aria-hidden="true" />
          Read more <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Data to enrich your online business
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
        fugiat veniam occaecat fugiat aliqua.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
  <div
    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
</div>
</div> */}



{/* <div className="bg-white">
  <header className="absolute inset-x-0 top-0 z-50">
    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Product</a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Features</a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Company</a>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
  
    <div className="lg:hidden" role="dialog" aria-modal="true">
      
      <div className="fixed inset-0 z-50"></div>
      <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
          </a>
          <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
              <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
              <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
              <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
            </div>
            <div className="py-6">
              <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Data to enrich your online business</h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
  </div>
</div> */}
