import Page from 'components/Page';

import React, { useContext, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,

} from 'reactstrap';
function JobView() {
  const [compayData, setCompayData] = useState(null);
  const [image, setJobImage] = useState('');
  const { id } = useParams();
  useEffect(() => {
    const data = {
      memberId: '1001',
      jobId: id,
    };

    axios
      .get('http://localhost:3001/job/getJobView', { params: { id: id } })

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCompayData(response.data);
          console.log(compayData);
          setJobImage(
            'http://localhost:3001/uploads/jobvacancy/' +
              response.data[0].advertisment,
          );
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const jobview =
    compayData &&
    compayData.map(compayData => (
      <>
        <CardBody>
          <Card body>
            <Col md={12} sm={10} xs={10} className="mb-2">
              <Card className="flex-row">
                <CardImg src={image} style={{ width: 'auto', height: 200 }} />

                <CardBody>
                  <h1 className="a">{compayData.companyName}</h1>
                  <CardText>
                    <h2 className="a">{compayData.designation}</h2>
                    <h4 className="a">{compayData.location}</h4>
                  </CardText>
                </CardBody>
              </Card>
              <Card className="flex-row">
                <CardBody>
                  <h4 className="a">{compayData.contact}</h4>
                  <h4 className="a">{compayData.email}</h4>
                </CardBody>
              </Card>
              <Card className="flex-row">
                <CardBody>
                  <CardTitle>{compayData.description}</CardTitle>
                </CardBody>
              </Card>
              <Card className="flex-row">
                <CardBody>
                  <Link to={'/jobadvertisements'}>
                    <Button color="primary" size="LG">
                      Back
                    </Button>
                  </Link>{' '}
                  <Link to={'/questionare/' + id}>
                    <Button color="success" size="LG" to={'/questionare/' + id}>
                      Apply{' '}
                    </Button>
                  </Link>{' '}
                </CardBody>
              </Card>
            </Col>
          </Card>
        </CardBody>
      </>
    ));
  return (
    <>
     <Page>
      <Col sm="14" md={{ size: 10, offset: 1 }}>
      <div className="headder">
        {jobview}
        <div className="mainR">
          {/* {image && <img src={image} alt="Image" className="addvertizement" />} */}
        </div>
      </div>
      </Col>
    </Page>
    </>
  );
}

export default JobView;
