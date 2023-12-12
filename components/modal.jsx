import React, { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    if (!email) {
      setMsg("Please fill Email Address");
      return;
    }

    setButtonDisabled(true);
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMsg("Please Enter Valid Email Address");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setMsg(data.error);
      } else {
        const data = await response.json();
        setMsg(data.msg);
      }
      setButtonDisabled(false);
    } catch (error) {
      console.error("Error during code reedemption:", error);
    }
    setEmail("");
  };

  return (
    <>
      <span
        className="ml-1 text-sm font-bold text-gray-800 cursor-pointer hover:text-blue-600"
        onClick={() => setShowModal(true)}
      >
        Click Here
      </span>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div
                  className="flex flex-col items-end mx-4 mt-4 hover:text-red-600 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div class="flex max-w-lg flex-col border-gray-50 py-6 px-12 shadow-md">
                  <p class="font-serif text-4xl font-bold">Try it now</p>
                  <p class="mt-3 font-medium">
                    Start the free trial no obligations
                  </p>
                  <div class="mt-8 flex flex-col">
                    <p class="text-sm text-gray-600">Email Address</p>
                    <input
                      class="mt-2 border bg-gray-50 py-4 px-4 outline-none ring-gray-800 focus:ring"
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <label for="terms" class="mt-6 flex items-center">
                    <input
                      class="mr-4 h-6 w-6 accent-gray-900"
                      type="checkbox"
                      name="terms"
                      id=""
                      checked
                    />
                    <span class="">I agree to the Terms and Conditions</span>
                  </label>
                  <button
                    class="mt-10 bg-gray-900 px-6 py-3 text-white disabled:bg-red-800 disabled:cursor-no-drop"
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                  >
                    Get Code
                  </button>
                  {msg != "" ? (
                    <p class="mt-6 text-center text-sm text-red-600">{msg}</p>
                  ) : null}
                  <p class="mt-6 text-center text-sm">
                    We may use your email in order to: verify your identity,
                    sell products to you, provide our services.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
