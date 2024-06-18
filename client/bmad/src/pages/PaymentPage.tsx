import { useParams } from "react-router-dom";
import NavbarAlt from "../components/NavbarAlt";
import { useEffect, useState } from "react";
import { UserInfo } from "../context/AuthContext";

function PaymentPage() {
  const { username } = useParams();

  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);

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

    setUser(data);
  };

  const handlePayment = async () => {
    const response = await fetch("http://localhost:4700/stkPush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, phone, username }),
    });

    if (!response.ok) {
      throw new Error("Amount and Phone number required");
    }
    setAmount("");
    setPhone("");

    const data = await response.json();
    console.log(data);
  };

  const handleButtonClick = (value: string) => {
    setAmount(value);
  };

  useEffect(() => {
    getPaymentProfile();
  }, [username]);

  return (
    <section>
      <NavbarAlt />

      <article className="flex flex-col justify-center items-center w-[90%] md:w-[50%] mx-auto bg-gray-700 rounded-md p-4 mt-4">
        <p>{user?.email}</p>
        <div className="p-3 bg-customGray/30 w-full rounded-md flex mb-3">
          <button
            className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2"
            onClick={() => handleButtonClick("100")}
          >
            100
          </button>
          <button
            className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2"
            onClick={() => handleButtonClick("300")}
          >
            300
          </button>
          <button
            className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2"
            onClick={() => handleButtonClick("500")}
          >
            500
          </button>

          <input
            type="number"
            className="p-2 rounded-md w-1/5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <input
          type="number"
          placeholder="Phone number"
          className="rounded-md p-2 border-none outline-none placeholder:text-[#BBB] w-full mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <textarea
          placeholder="Leave a comment..."
          className="rounded-md p-2 border-none outline-none placeholder:text-[#BBB] w-full"
        ></textarea>

        <button
          className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2"
          onClick={handlePayment}
        >
          Make Payment
        </button>
      </article>
    </section>
  );
}

export default PaymentPage;
