import React from 'react';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState, useRef } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';


const firebaseConfig = {
  apiKey: "AIzaSyD3KgE1A5IVybPXkFuxLkhqofjr0eitb4g",
  authDomain: "affiliate-dashboard-938b2.firebaseapp.com",
  projectId: "affiliate-dashboard-938b2",
  storageBucket: "affiliate-dashboard-938b2.appspot.com",
  messagingSenderId: "339459181534",
  appId: "1:339459181534:web:0c594fc52624bc5e726b4f"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = firebase.auth();
auth.useDeviceLanguage();


const Login = () => {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('')
  const submitBtn = useRef(null);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      submitBtn.current, {
      size: "invisible",
      callback: function (response) {
        console.log("Captcha Resolved");
      }
    }
    );
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    setPhoneNumber(data.phoneNumber)

    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(data.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("otp sent");
        setViewOtpForm(true);
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        alert(error.message);
      });

  }

  const onSubmitOTP = (data) => {


    window.confirmationResult
      .confirm(data.verificationCode)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        console.log("success");
        window.open("/", "_self");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert(error.message);
      });
  };

  // signout code

  //   const signOut = () => {
  //     auth
  //     .signOut()
  //     .then(() => {
  //         window.open("/signin", "_self");
  //     })
  //     .catch((error) => {
  //         // An error happened.
  //         console.log(error);
  //     });
  // };


  return (
    <Container className="d-flex">
      {!viewOtpForm &&
        <Form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-5 w-50">
          {/* register your input into the hook by invoking the "register" function */}
          <Card className="p-5 my-5 rounded shadow">
            <Card.Title className=" text-center">Sign In</Card.Title>
          <Form.Group className="mb-3 ">
            <label htmlFor="email"><p>Email address:</p></label>
            <Form.Control {...register("email", { required: true })} placeholder="Enter email" />
            {errors.email && <Alert variant="danger" className="my-3"> This field is required</Alert>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> <p>Enter Phone Number:</p></Form.Label>
            <Form.Control {...register("phoneNumber", { required: true })} placeholder="Enter phone number" />
            {errors.phoneNumber && <Alert variant="danger" className="my-3"> Please enter your phone number to sign up</Alert>}
          </Form.Group>

            <Button type="submit" ref={submitBtn} className="btn btn-block mt-4" variant="dark">Submit</Button>
            </Card>
        </Form>
      }

      {
        viewOtpForm &&
        <Form onSubmit={handleSubmit(onSubmitOTP)} className="mx-auto my-5 w-50">
          
          <Card className="p-5 my-5 rounded shadow">
          <Form.Group className="mb-3">
            <Form.Label> <p>Enter verification code sent to {phoneNumber}: </p> </Form.Label>
            <Form.Control {...register("verificationCode", { required: true })} placeholder="Enter 6 digit code" />
            {errors.verificationCode && <Alert variant="danger" className="my-3"> Please enter the verification number to successfully sign up</Alert>}
          </Form.Group>

            <Button type="submit" variant="dark" className="btn btn-block" ref={submitBtn}>Submit</Button>
          </Card>
        </Form>
      }
    </Container>
  );
};

export default Login;