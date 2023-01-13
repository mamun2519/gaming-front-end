import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Facebook from "./Facebook";

const Game = () => {
  const [peroid, setProid] = useState(null);
  const [facebook, setFacebook] = useState([]);
  const [facebookAmoun, setFacebookAmoun] = useState(0);
  const [tiktok, setTikTok] = useState([]);
  const [tiktokAmoun, setTiktkAmoun] = useState(0);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/result/peroid")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setProid(result.peroid);

          fetch(`http://localhost:5000/api/v1/game/game/${result?.peroid}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                console.log(data);
                setFacebook(data.facebook);
                setTikTok(data.tiktok);
                const facebookArray = data?.facebook?.map((face) => face.money);
                const tiktokArray = data?.tiktok?.map((face) => face.money);
                console.log(tiktokArray);

                if (tiktokArray !== 0) {
                  setTiktkAmoun(tiktokArray.reduce((a, b) => a + b));
                }

                if (facebookArray !== 0) {
                  setFacebookAmoun(facebookArray.reduce((a, b) => a + b));
                }
              }
              else{
                setFacebook([])
                setTikTok([])
              }
            });
        }
      });
  }, []);



  const facebookWinHendler = () => {
    const facebookMap = facebook.map(({ userId, money }) => {
      return { id: userId, money: money * 2 };
    });

    fetch("http://localhost:5000/api/v1/game/game/win", {
      method: "PUT",
      body: JSON.stringify(facebookMap),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const peroidResult = {
            peroid: peroid,
            price: facebookAmoun,
            winResult: "facebook",
          };
          fetch("http://localhost:5000/api/v1/result/results", {
            method: "POST",
            body: JSON.stringify(peroidResult),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                console.log(result);
                toast.success(result.message, {
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
            });
        }
      });
  };

  const tiktokWinHendler = () => {
    const tiktokMap = tiktok.map(({ userId, money, balance }) => {
      return { id: userId, money: money * 2 };
    });

    fetch("http://localhost:5000/api/v1/game/game/win/tiktok", {
      method: "PUT",
      body: JSON.stringify(tiktokMap),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const peroidResult = {
            peroid: peroid,
            price: facebookAmoun,
            winResult: "Tiktok",
          };
          fetch("http://localhost:5000/api/v1/result/results", {
            method: "POST",
            body: JSON.stringify(peroidResult),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                console.log(result);
                toast.success(result.message, {
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
            });
        }
      });
  };

  return (
    <div>
      <div></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Peroid No</th>
              <th>Facebook Total Amount</th>
              <th>tikTok Total Amount</th>
              <th>Win Action</th>
              <th>Win Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            <tr className="border">
              <th>{peroid}</th>
              <td className="text-[#2374e1] font-medium h-6  relative">
                <p>
                  {facebookAmoun} USD
                  <small
                    className={`${
                      facebookAmoun > tiktokAmoun ? "block" : "hidden"
                    } text-[8px]  absolute left-16 top-4`}
                  >
                    Big Amount
                  </small>
                </p>
              </td>
              <td className="text-[#ff4019] font-medium h-6 relative">
                <p>
                  {tiktokAmoun} USD
                  <small
                    className={`${
                      facebookAmoun < tiktokAmoun ? "block" : "hidden"
                    } text-[8px]  absolute left-16 top-4`}
                  >
                    Big Amount
                  </small>
                </p>
              </td>
              <td>
                <button
                  // disabled={facebook.length == 0}
                  onClick={() => facebookWinHendler()}
                  className={` bg-[#2374e1]  text-white  px-8 py-1 rounded`}
                >
                  {" "}
                  Win Facebook
                </button>
              </td>
              <td>
                <button
                  // disabled={tiktok.length == 0}
                  onClick={() => tiktokWinHendler()}
                  className={` bg-[#ff4019] text-white  px-8 py-1  rounded`}
                >
                  {" "}
                  Win Tiktok
                </button>
              </td>
            </tr>
            {/* <!-- row 2 --> */}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2  gap-5">
        <div className="   ">
          <Facebook gamingUser={facebook} />

        </div> 
        <div className="">
        <Facebook gamingUser={tiktok}/>
        </div>
       

      </div>
    </div>
  );
};

export default Game;
