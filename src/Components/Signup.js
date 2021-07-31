import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    cpassword: "",
    contact: "",
    skill: "",
    job: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    var tester =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const { name, surname, email, password, cpassword, job, skill, contact } =
      user;

    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !cpassword ||
      !job ||
      !contact ||
      !skill
    ) {
      toast.warn("Fill All fields ", {
        position: "top-right",
      });
    } else if (!tester.test(email)) {
      toast.warn("Check Email Format ", {
        position: "top-right",
      });
    } else if (password !== cpassword) {
      toast.error("Fill Password field Correctly", {
        position: "top-right",
      });
    } else {
      const data = await fetch("https://crud-adv.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          job,
          skill,
          contact,
        }),
      });

      if (data.status === 409) {
        toast.dark("Email Already Registered", {
          position: "top-right",
        });
      } else if (data.status === 200) {
        window.alert("Registration Successful");
        history.push("/signin");
      } else window.alert("Server Error");
    }
  };

  return (
    <div className="mt-5">
      <Container>
        <h3>Create an Account !</h3>
        <Form method="POST">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Rahul"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={user.surname}
                  onChange={handleInputs}
                  placeholder="Bala"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="Example@xyz.com"
              />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="job"
                  value={user.job}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  name="contact"
                  value={user.contact}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                name="skill"
                value={user.skill}
                onChange={handleInputs}
              />
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Col>
              <Button type="submit" onClick={PostData}>
                Register Account
              </Button>
            </Col>
            <Col>
              Already Signup? &nbsp;
              <NavLink to="/signin">signin</NavLink>
            </Col>
          </Row>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Signup;
