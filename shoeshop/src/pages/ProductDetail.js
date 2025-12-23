import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, reset } from '../redux/productSlice';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-orange-500 mb-6">${product.price}</div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
