//1218666-merchant id
//4916217501611292
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo200Image from 'assets/img/logo/loginLogo.jpeg';
import {   
    Col,
    Row,
  } from 'reactstrap';

const Payment = ({ orderId, name }) => {
  let history = useHistory();
  const {id} = useParams();
  const [amount,setAmount] = useState(0);
  const [fName,setFname] = useState("");
  const [lName,setLname] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [paid,setPaid] = useState(0);
  const [role,setRole] = useState("")

  useEffect(() => {
    const data = {
        id: id,
      };

    axios
    .post('http://localhost:3001/auth/payment', data)
    .then(response => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        if(response.data[0].userType=="student"){
            setAmount(500);
            setFname(response.data[0].firstName);
            setLname(response.data[0].lastName);
            setLname(response.data[0].lastName);
            setEmail(response.data[0].email);
            setPhone(response.data[0].contactNumber);
            setAddress(response.data[0].residentialAddress);
            setRole(response.data[0].userType);
        }
        else if(response.data[0].userType=="associate"){
            //pay();
            setAmount(1000);
            setFname(response.data[0].firstName);
            setLname(response.data[0].lastName);
            setLname(response.data[0].lastName);
            setEmail(response.data[0].email);
            setPhone(response.data[0].contactNumber);
            setAddress(response.data[0].residentialAddress);  
            setRole(response.data[0].userType);

        }
        else if(response.data[0].userType=="proffesional"){
            //pay();
            setAmount(1500);
            setFname(response.data[0].firstName);
            setLname(response.data[0].lastName);
            setLname(response.data[0].lastName);
            setEmail(response.data[0].email);
            setPhone(response.data[0].contactNumber);
            setAddress(response.data[0].residentialAddress);
            setRole(response.data[0].userType);

        }
        else if(response.data[0].userType=="chartered"){
            setAmount(2000);
            setFname(response.data[0].firstName);
            setLname(response.data[0].lastName);
            setLname(response.data[0].lastName);
            setEmail(response.data[0].email);
            setPhone(response.data[0].contactNumber);
            setAddress(response.data[0].residentialAddress);
            setRole(response.data[0].userType);

        }        
      }
      if(!amount == 0){
            pay();
        }
    })
    
    .catch(error => {
      alert(error);
    });
    
  }, [amount]);

  useEffect(() => {
    const data = {
        id: id,
        amount: amount,
        role: role,
        email:email,
        fName:fName,
    };
    axios
      .post('http://localhost:3001/auth/paid', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
            console.log("succesful");
        }
      })
      .catch(error => {
        alert(error);
      });
    }, [paid]);
   // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '1218666', // Replace your Merchant ID
    return_url: 'http://localhost:3000/',
    cancel_url: 'http://localhost:3000/',
    notify_url: 'http://localhost:3001/auth/paid',
    order_id: id,
    items: 'Membership Payment',
    amount: amount,
    currency: 'LKR',
    first_name: fName,
    last_name: lName,
    email: email,
    phone: phone,
    address: address,
    city: '',
    country: '',
    delivery_address: '', // optional field
    delivery_city: '', // optional field
    delivery_country: '', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(id) {
    setPaid(1);
    history.push('/');    
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    history.push('/');
    //Note: Prompt user to pay again or show an error page
    console.log('Payment dismissed');
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log('Error:' + error);
  };

  

  function pay() {
    window.payhere.startPayment(payment);
  }

  return (
      <>
        <Row className="loginForm">
        <Col>
          <center>
            {' '}
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 500, height: 450 }}
              alt="logo"
            />
          </center>
        </Col>
        </Row>
      </>
    )
};

export default Payment;
