import React from "react";
import "./style/regApprove.css";
import data from "./data";
import Card from "@material-ui/core/Card";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  {
    name: "Member Name",
    selector: (row) => `${row.title} ${row.firstName}  ${row.lastName}`,
    sortable: true,
    width: "200px",
  },
  {
    name: "Address",
    selector: (row) => `${row.residentialAddress}`,
    sortable: true,
  },
  {
    name: "Contact Number",
    selector: (row) => `${row.contactNumber}`,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => `${row.userType}`,
    sortable: true,
  },
  {
    name: "Resgistred Date",
    selector: (row) => `${row.dateTime}`,
    sortable: true,
  },
  {
    name: "View Details",
    button: true,
    cell: () => <Link to={"/darshana/"}>View More</Link>,
  },
];

const conditionalRowStyles = [
  {
    when: (row) => row.userType === "student",
    style: {
      backgroundColor: "#D5E6F3",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.userType === "associate",
    style: {
      backgroundColor: "#94C0E1",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.userType === "professional",
    style: {
      backgroundColor: "#4C90C3",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

function RegApprove() {
  const [data, setData] = useState([]);
  //const [user, setUser] = useState(userDetails);
  const [noApprovedUsers, setnoApprovedUsers] = useState(0);
  const [noRejectedUsers, setnoRejecteddUsers] = useState(0);
  const [noPendingUsers, setnoPendingUsers] = useState(0);

  useEffect(() => {
    axios
      .post("http://localhost:3001/secretary/regApproved", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
          setnoApprovedUsers(response.data.length);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3001/secretary/regRejected", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setnoRejecteddUsers(response.data.length);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3001/secretary/regPending", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setnoPendingUsers(response.data.length);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      <div className="regEmp">
        <div className="leftPanelS">
          <Link to={"/regApprove"} style={{ textDecoration: "none" }}>
            <div className="approved" style={{ backgroundColor: "#0a0363" }}>
              <h3 style={{ color: "white" }}>Verified Users</h3>
              <h1 style={{ color: "white" }}>{noApprovedUsers}</h1>
            </div>
          </Link>
          <Link to={"/regPending/"} style={{ textDecoration: "none" }}>
            <div className="pending" style={{ backgroundColor: "white" }}>
              <h3>Pending Users</h3>
              <h1>{noPendingUsers}</h1>
            </div>
          </Link>
          <Link to={"/regRejected/"} style={{ textDecoration: "none" }}>
            <div className="rejected" style={{ backgroundColor: "white" }}>
              <h3>Rejected Users</h3>
              <h1>{noRejectedUsers}</h1>
            </div>
          </Link>
        </div>
        <div className="rightPanelS">
          <Card>
            <DataTable
              title="Verified Members"
              columns={columns}
              data={data}
              pagination
              conditionalRowStyles={conditionalRowStyles}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default RegApprove;
