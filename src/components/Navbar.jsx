import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setTotalQuantity } from "./cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cart = useSelector((state) => state.cart.products);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // En este useEffect, cada vez que se re-renderiza el cart, se calcula la totalQuantity para mostrar en la navbar
  useEffect(() => {
    let total = 0;
    if (Array.isArray(cart)) {
      cart.map((item) => {
        total += item.quantity;
      });
      dispatch(setTotalQuantity({ totalQuantity: total }));
    }
  }, [cart]);

  return (
    <div className="top-0 shadow text-gray-950 bg-white">
      <div className="h-16 mx-auto px-5 flex items-center justify-between">
        <a className="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">
          Dango Test
        </a>

        <ul className="flex items-center gap-5">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-10 -10 56 36"
              fill="currentColor"
              className="w-14 h-14"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              <text id="text" fontSize="12" fill="#121212">
                <tspan x="20" y="2">
                  ({totalQuantity})
                </tspan>
              </text>
            </svg>
          </li>
          <li>
            <button
              type="button"
              className="inline-block border-2 border-gray-950 rounded-none bg-neutral-300 px-4 py-2  text-black hover:bg-neutral-500 hover:border-gray-300 hover:text-gray-100  "
              onClick={handleClearCart}
            >
              Clear Cart{" "}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
