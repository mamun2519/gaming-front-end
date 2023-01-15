import React, { useEffect, useState } from "react";

const useAdmin = ({user}) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    console.log(user?.emai)
    if (email) {
      fetch(`http://localhost:5000/api/v1/user/chackAdmin/${user?.email}`,{
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("gamingToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  }, [user]);
  return [admin, adminLoading];
};

export default useAdmin;
