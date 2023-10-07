import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./productsSlice";
import Product from "./Product";
import axios from "axios";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [counterListedProducts, setCounterListedProducts] = useState(7);

  const handleAddProducts = () => {
    counterListedProducts > products.length - 1 // suma un producto a el slice de products a mostrar, el máximo son 18,
      ? setCounterListedProducts(18) // cuando alcanza el máximo se muestra un mensaje para refrescar la página.
      : setCounterListedProducts(counterListedProducts + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`http://localhost:3000/products`); // Este es un backend que creamos para el trabajo final en el bootcamp en Hack Academy
      dispatch(setProducts(res.data)); // es una lista de cervezas para un e-comerce - https://unicornbeer.vercel.app/
    };
    getProducts();
  }, []);

  return (
    <div className="container sm:container sm:mx-auto mx-auto mt-12 grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products &&
        products
          .slice(0, counterListedProducts)
          .map((product) => (
            <Product key={product.id} product={product}></Product>
          ))}

      {products && counterListedProducts === products.length ? (
        <div className="p-6 self-center place-self-center text-center bg-success-300 border-2 border-green-500 ">
          <p className="text-green-600 text-xl dark:text-neutral-200">
            No hay mas productos para agregar, refresca la pagina para volver a
            7 productos en la lista.
          </p>
        </div>
      ) : (
        <button
          type="button"
          className="w-40 h-40 self-center place-self-center rounded-full border-2 border-blue-300 font-thin bg-primary-200 text-blue-400 px-4 py-2 hover:bg-primary-600 hover:border-blue-500 "
          style={{ fontSize: "64px" }}
          onClick={handleAddProducts}
        >
          +
        </button>
      )}
    </div>
  );
}

export default ProductList;
