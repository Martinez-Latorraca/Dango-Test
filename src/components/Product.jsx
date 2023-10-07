import { useState } from "react";
import { useDispatch } from "react-redux";
import { TERipple } from "tw-elements-react";
import { addToCart } from "./cartSlice";

import picture from "../assets/Unicorn_bottles_background.jpg";

function Product({ product }) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [rangeFontSize, setRangeFontSize] = useState(20);
  const [counter, setCounter] = useState(1);
  const [name, setName] = useState(product.name);


  //Esta función recibe los inputs en el input para modificar el "name" y se muestra cada cambio de letra con cada input.
  // Si bien es un estado local "name" y el "product.name" viene desde el "backend" se inicializa "name" con "useState(product.name)".
  
  const handleChangeTittle = (e) => {
    setName(e.target.value);
  };

  const handleToggleInput = () => {
    setToggle(!toggle);
  };

  const handleRangeFontSize = (e) => {
    setRangeFontSize(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setCounter(Number(e.target.value));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: product, counter: counter }));
  };

  return (
    <div className="flex flex-col justify-between py-4 bg-white text-left border-4 border-gray-950 dark:bg-neutral-700 text-gray-950 ">
      <div className="flex flex-col p-6 gap-4">
        <img className="rounded-lg" src={picture} alt="" />
        <div className="flex justify-between items-center ">
          <h5
            className="font-bold leading-tight  dark:text-neutral-50"
            style={{ fontSize: `${rangeFontSize}px` }}
          >
            {name}
          </h5>
          {toggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              onClick={handleToggleInput}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 cursor-pointer"
              onClick={handleToggleInput}
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          )}
        </div>
      </div>
      {toggle && (
        <div className="flex flex-col p-6 border-y border-y-gray-200 gap-3">
          <div className="flex justify-between items-baseline gap-1 ">
            <label className=" inline-block text-neutral-700 dark:text-neutral-200">
              Change tittle:
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="tittle"
                id="tittle"
                className="block w-28 2xl:w-36 rounded-md border-0 px-3 py-1 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-950 sm:text-sm sm:leading-6"
                placeholder={name}
                onInput={(e) => handleChangeTittle(e)}
              ></input>
            </div>
          </div>
          <div>
            <label
              htmlFor="customRange1"
              className=" inline-block text-neutral-700 dark:text-neutral-200"
            >
              Change font size
            </label>
            <input
              type="range"
              className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
              id="customRange1"
              onChange={(e) => handleRangeFontSize(e)}
              min="8"
              max="36"
              step="4"
              defaultValue={rangeFontSize}
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <label
              htmlFor="customRange1"
              className=" inline-block text-neutral-700 dark:text-neutral-200"
            >
              Confirmar cambios
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              className="w-6 h-6 self-center cursor-pointer"
              onClick={handleToggleInput}
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="px-6">
        <div className="flex justify-start items-end mb-4 gap-4">
          <h5 className="text-xl self-end font-medium leading-tight dark:text-neutral-50">
            ${product.price}
          </h5>
          <input
            type="text"
            defaultChecked={counter}
            value={counter}
            className="w-12 border  border-gray-300 text-center"
            onChange={(e) => handleQuantityChange(e)}
          ></input>
        </div>
        <p className=" text-base  dark:text-neutral-200 ">
          {product.style.description}
        </p>
        <TERipple></TERipple>
      </div>
      <div className=" flex flex-col justify-center items-center px-6 py-3 mb-8 gap-4 dark:text-neutral-50">
        <button
          type="button"
          className="inline-block border-2 border-gray-950 rounded-none bg-danger-200 px-4 py-2 text-xl text-black hover:bg-danger-500 hover:border-gray-500  "
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <a href="#" className="underline text-xl">
          Learn More
        </a>
      </div>
    </div>
  );
}

export default Product;
