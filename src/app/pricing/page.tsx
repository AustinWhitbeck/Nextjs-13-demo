import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

const exampleItems = [
    {
        name: 'Item 1',
        description: 'Example item Description',
        quantity: 2,
        pricing: '$10',
    },
    {
        name: 'Item 2',
        description: 'Example item Description',
        quantity: 2,
        pricing: '$10',
    },
]

const Pricing = async () => {
      const session = await getServerSession(authOptions);
      console.log('session value', session);
      let pricingIsAllowed = false;
      if (session?.user.permissions.seePricing) {
        pricingIsAllowed = true;
      }


  return (
    <>
    <h1>Example Pricing Page</h1>
    {exampleItems.map((item) => {
        const { name, description, quantity, pricing } = item;
        const pricingValue = pricingIsAllowed ? pricing : 'Not Authorized to see Pricing'
        return (
            <>
                <h3>{name}</h3>
                <p>Item Description: {description}</p>
                <p>Quantity: {`${quantity}`}</p>
                <p>Pricing: {pricingValue}</p>
            </>
        )
    })}
    </>
  )
}

export default Pricing