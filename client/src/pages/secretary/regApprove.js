import React from "react";
import "./style/regApprove.css";
import data from "./data";
import Card from "@material-ui/core/Card";
import DataTable from "react-data-table-component";

const Button = () => <button type="button">Approve</button>;

const columns = [
  {
    name: "Member ID",
    selector: "mid",
    sortable: true,
    width: "200px",
  },
  {
    name: "Member Name",
    selector: "mname",
    sortable: true,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
  {
    name: "Resgistred Date",
    selector: "regdate",
    sortable: true,
  },
  {
    name: "Action",
    button: true,
    cell: () => (
      <Button variant="contained" color="primary">
        Approve
      </Button>
    ),
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
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

function regApprove() {
  return (
    <>
      <div className="main">
        <div className="mainCourses">
          <div className="course">
            <div className=""></div>
            <div className="courseDes">
              <Card>
                <DataTable
                  title="Pending Members"
                  columns={columns}
                  data={data}
                  pagination
                  conditionalRowStyles={conditionalRowStyles}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default regApprove;
