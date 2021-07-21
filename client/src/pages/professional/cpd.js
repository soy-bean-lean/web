import React from 'react';
import "./style/cpd.css";
function cpd() {

  const record = [
    {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved"
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending"
    },
    {
      id: 3,
      type: "Guest Lecture",
      description: "UCSC - Flutter Tech Talk",
      status: "Pending"
    },
    {
      id: 4,
      type: "Other Cource",
      description: "PHP for Web Development",
      status: "Rejected"
    },
    {
      id: 5,
      type: "Other Cource",
      description: "Java Web Development with Spring Framework",
      status: "Approved"
    }
  ];

  /*const conditionalStatusStyles = [
    {
      when: (record) => record.status === "Pending",
      style: {
        backgroundColor: "#",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (record) => record.status === "Approved",
      style: {
        backgroundColor: "#94C0E1",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (record) => record.status === "Rejected",
      style: {
        backgroundColor: "#4C90C3",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];*/

  const recordList = record.map(record => (
    <>
      <div className="recentRec">
        <div className="recType">
          {record.type}
        </div>
        <div className="recAllign">
          <div className="recDes">
            {record.description}
          </div>
          <div data-status={record.status} className="recPending">
            {record.status}
          </div>
        </div>
      </div>
    </>
  ))

  return (
    <div className='main'>
      <div className="addCPD">
        
      </div>
      <div className="recentCPD">
        <h3>Recent CPD Submissions</h3>
        <div className="recList">
          {recordList}
        </div>
      </div>
    </div>
  );
}

export default cpd;