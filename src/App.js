import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import './App.css'
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { datas } from "./datas/data";
import Quiz from "./pages/Quiz";
import { setQuestions } from "./store/features/quizSlice";

const App = () => {
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title, Link } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {
      name: "",
      age: "",
      date: "",
    }
  );
  const [quizStarted, setQuizStarted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuestions(datas));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return quizStarted ? (
    <Quiz userDetails={userDetails} />
  ) : (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
         

          <Title style={styles.title}>Enter Details</Title>
          
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={startQuiz}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            rules={[
              {
                type: "text",
                required: true,
                message: "Please input your Name",
              },
            ]}
          >
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your age",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input type="date" name="date" onChange={handleInputChange} />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Play Quiz
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default App;
