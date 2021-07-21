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
          <div className="recPending">
            {record.status}
          </div>
        </div>
      </div>
    </>
  ))

  return (
    <div className='main'>
      <div className="recentCPD">
        <div className="recList">
          {recordList}
        </div>
      </div>
    </div>
  );
}

export default cpd;