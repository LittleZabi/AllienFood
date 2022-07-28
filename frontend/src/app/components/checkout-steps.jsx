import React from 'react'

export const CheckOutSteps = ({ checks }) => {
  return (
    <div className='outs-steps'>
      <div>Sign In {checks.signIn ? <i className="fa fa-check"></i> : ''}</div>
      <div>Shipping {checks.shipping ? <i className="fa fa-check"></i> : ''}</div>
      <div>Payment {checks.payment ? <i className="fa fa-check"></i> : ''}</div>
      <div>Place Order {checks.placeorder ? <i className="fa fa-check"></i> : ''}</div>
    </div>
  )
}
