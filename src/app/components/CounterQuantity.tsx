import { useState } from "react";

const CounterQuantity = ({ quantityUser }: any) => {
  const customButton: string =
    "text-2xl bg-gray-200 text-gray-400 font-bold w-12 mx-auto py-2 ";
  const [quantity, setQuantity] = useState<number>(quantityUser);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const lessQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex mr-4 flex-col text-center ">
      <button
        className={customButton}
        onClick={addQuantity}
        data-testid="my-button"
      >
        +
      </button>
      <p className="bg-gray-200 w-12  h-22 text-2xl mx-auto text-center flex items-center justify-center text-blue-800 font-bold">
        {" "}
        {quantity}
      </p>
      <button className={customButton} onClick={lessQuantity}>
        -
      </button>
    </div>
  );
};

export default CounterQuantity;
