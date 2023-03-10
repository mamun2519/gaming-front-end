import React, { useEffect, useState } from "react";

const useAdmin = ( user ) => {
  
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    console.log(email)
    if (email) {
      fetch(`https://gaming-backend.vercel.app/api/v1/user/chackAdmin/${email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("gamingToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  }, [user]);
  return [admin, adminLoading];
};

export default useAdmin;
