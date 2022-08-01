import React from 'react'

export const CheckOutSteps = ({ checks }) => {
  return (
    <div className='outs-steps'>
      <div style={!checks.signIn ? { backgroundColor: '#ff347a' } : {}}>Sign In {checks.signIn ? <i className="fa fa-check"></i> : ''}</div>
      <div style={!checks.shipping ? { backgroundColor: '#ff347a' } : {}}>Shipping {checks.shipping ? <i className="fa fa-check"></i> : ''}</div>
      <div style={!checks.payment ? { backgroundColor: '#ff347a' } : {}}>Payment {checks.payment ? <i className="fa fa-check"></i> : ''}</div>
      <div style={!checks.placeorder ? { backgroundColor: '#ff347a' } : {}}>Place Order {checks.placeorder ? <i className="fa fa-check"></i> : ''}</div>
    </div>
  )
}
