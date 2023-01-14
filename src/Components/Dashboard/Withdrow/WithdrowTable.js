import React from "react";
import { toast } from "react-toastify";

const WithdrowTable = ({ withdrows }) => {
  const payHendler = (id) => {
    fetch(`http://localhost:5000/api/v1/withdrow/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "PAID",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Status Paid Successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .then((json) => console.log(json));
  };
  return (
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      {withdrows?.map(({ PayId, status, email, withdrowAmoun, _id }) => (
        <tr class="hover:bg-gray-50">
          <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
            {PayId}
          </th>
          <td class="px-6 py-4">
            <span
              class={`bg-red-50 text-[#ff4019] inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold`}
            >
              {email}
            </span>
          </td>
          <td class="px-6 py-4">{withdrowAmoun} Point</td>
          <td class="px-6 py-4">
            <div class="flex ">
              <span
                class={`${
                  status == "PAID"
                    ? "bg-blue-50 text-[#2374e1]"
                    : "bg-red-50 text-[#ff4019] "
                }inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold  cursor-pointer`}
              >
                {status}
              </span>
            </div>
          </td>
          <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <span
              onClick={() => payHendler(_id)}
              className="px-4 py-[3px] rounded-lg bg-[#2374e1] text-white cursor-pointer"
            >
              Pay Now
            </span>
          </th>
          <td class="px-6 py-4">
            <div>
              <a x-data="{ tooltip: 'Delete' }" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </a>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default WithdrowTable;
