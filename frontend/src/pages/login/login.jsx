
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit() {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const success = login(
      email.trim().toLowerCase(),
      password
    );

    if (!success) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    navigate(location.state?.from || "/dashboard", {
      replace: true
    });

    setLoading(false);
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

        <div className="login-demo">

          <Text strong>
            Demo Credentials
          </Text>

          <Text type="secondary">
            Email: admin@example.com
          </Text>

          <Text type="secondary">
            Password: Admin123!
          </Text>

        </div>

      </Card>
    </div>
  );
}

export default Login;
