import React from "react";
import "./style/regApprove.css";
import data from "./data";
import Card from "@material-ui/core/Card";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";


const columns = [
  {
    name: "Name",
    selector: "mname",
    sortable: true,
    width: "200px",
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
  {
    name: "email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Resgistred Date",
    selector: "regdate",
    sortable: true,
  },
  
];

const conditionalRowStyles = [
  {
    when: (row) => row.status === "Student Member",
    style: {
      backgroundColor: "#D5E6F3",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.status === "Associate Member",
    style: {
      backgroundColor: "#94C0E1",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.status === "Professional Member",
    style: {
      backgroundColor: "#4C90C3",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

function regApproveC() {
  return (
    <>
       <div className="regEmp">
       <div className="leftPanelS">
          <Link to={"/regApproveC"} style={{ textDecoration: "none" }}>
            <div className="approved" style={{ backgroundColor: "#0a0363" }}>
              <h3 style={{ color: "white" }}>Verified Users</h3>
              <h1 style={{ color: "white" }}>161</h1>
            </div>
          </Link>
          <Link to={"/regPendingC/"} style={{ textDecoration: "none" }}>
            <div className="pending" style={{ backgroundColor: "white" }}>
              <h3>Pending Users</h3>
              <h1>10</h1>
            </div>
          </Link>
          <Link to={"/regRejectedC/"} style={{ textDecoration: "none" }}>
            <div className="rejected" style={{ backgroundColor: "white" }}>
              <h3>Rejected Users</h3>
              <h1>02</h1>
            </div>
          </Link>
        </div>
        <div className="rightPanel">
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

export default regApproveC;
