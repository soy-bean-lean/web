import React from "react";
import "./style/regApprove.css";
import data from './data';
import Card from "@material-ui/core/Card";
import DataTable from 'react-data-table-component';


const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];

function regApprove() {
  return (
    <>
      <div className="main">
        
        <div className="mainCourses">
          <div className="course">
           
            <div className="courseDes">
        
            <DataTable
              title="Arnold Movies"
              columns={columns}
              data={data}
              pagination

          />
      
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default regApprove;
