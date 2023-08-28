import React from 'react'
import { useParams } from 'react-router-dom';

function ProductIdPage() {
  const params = useParams();
  const productId = params.id;
  console.log(productId);
  return (
    <div>ProductIdPage</div>
  )
}

export default ProductIdPage