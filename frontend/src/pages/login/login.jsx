
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Alert
} from "antd";

import {
  UserOutlined,
  LockOutlined,
  LoginOutlined
} from "@ant-design/icons";

import "./Login.css";

const { Title, Text } = Typography;

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(values) {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.email.trim().toLowerCase(),
            password: values.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || "Invalid email or password."
        );
      }

      login(data);

      // Redirect after successful login
      navigate(location.state?.from || "/dashboard", {
        replace: true
      });

    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">

        <div className="login-heading">

          <div className="login-logo">
            <LoginOutlined />
          </div>

          <Title level={2}>
            Welcome back
          </Title>

          <Text type="secondary">
            Sign in to continue to your account.
          </Text>

        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError("")}
            className="login-error"
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          className="login-form"
          autoComplete="on"
        >

          <Form.Item
            label="Email address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email."
              },
              {
                type: "email",
                message: "Please enter a valid email."
              }
            ]}
          >

            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              autoComplete="username"
            />

          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password."
              }
            ]}
          >

            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

          </Form.Item>

          <Form.Item className="login-submit-item">

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="login-button"
            >
              Sign In
            </Button>

          </Form.Item>

        </Form>

        <div className="login-register">
          <Text type="secondary">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </Text>
        </div>

      </Card>
    </div>
  );
}

export default Login;
