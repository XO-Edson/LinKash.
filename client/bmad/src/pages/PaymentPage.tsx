import { useParams } from "react-router-dom";
import NavbarAlt from "../components/NavbarAlt";
import { useEffect } from "react";

function PaymentPage() {
  const { username } = useParams();

  const getPaymentProfile = async () => {
    const response = await fetch(`http://localhost:4700/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Profile missing");
    }

    const data = await response.json();
    console.log(data);
  };

  const handlePayment = async () => {
    const response = await fetch("http://localhost:4700/stkPush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });

    if (!response.ok) {
      throw new Error("Account missing");
    }
  };

  useEffect(() => {
    getPaymentProfile();
  }, [username]);

  return (
    <section>
      <NavbarAlt />

      <article className="flex flex-col justify-center items-center w-[90%] md:w-[50%] mx-auto bg-gray-700 rounded-md p-4 mt-4">
        <div className="p-3 bg-customGray/30 w-full rounded-md flex mb-3">
          <button className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2">
            100
          </button>
          <button className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2">
            300
          </button>
          <button className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2">
            500
          </button>

          <input type="text" className="p-2 rounded-md w-1/5" />
        </div>
        <input
          type="number"
          placeholder="Phone number"
          className="rounded-md p-2 border-none outline-none placeholder:text-[#BBB] w-full mb-4"
        />
        <textarea
          placeholder="Leave a comment..."
          className="rounded-md p-2 border-none outline-none placeholder:text-[#BBB] w-full"
        ></textarea>
        <p>Share your link with others to get started.</p>

        <button className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2">
          Make Payment
        </button>
      </article>
    </section>
  );
}

export default PaymentPage;
