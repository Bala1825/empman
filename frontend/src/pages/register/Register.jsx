
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Alert,
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./Register.css";

const { Title, Text } = Typography;

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim().toLowerCase(),
            password: values.password,
            designation: values.designation,
          }),
        }
      );

      const responseText = await response.text();
      
      let data = {};
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { message: responseText };
      }
      
      if (!response.ok) {
        throw new Error(
          data.message ||
          data.detail ||
          data.error ||
          `Registration failed (${response.status})`
        );
      }

      navigate("/login", {
        replace: true,
        state: {
          successMessage: "Registration successful! Please login.",
        },
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
    <div className="register-container">
      <Card className="register-card" variant="borderless">
        <div className="register-header">
          <div className="register-icon">
            <Text>Welcome to EmpManage</Text>
          </div>

          <Title level={2}>Create Account</Title>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError("")}
            className="register-alert"
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
              { min: 3, message: "Name must contain at least 3 characters" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please create a password" },
              {
                min: 8,
                message: "Password must contain at least 8 characters",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: "Please select your designation" },
            ]}
          >
            <Select
              size="large"
              placeholder="Select your designation"
              suffixIcon={<TeamOutlined />}
              options={[
                { value: "Manager", label: "Manager" },
                { value: "Team Leader", label: "Team Leader" },
                { value: "Senior Developer", label: "Senior Developer" },
                { value: "Junior Developer", label: "Junior Developer" },
              ]}
            />
          </Form.Item>

          <Form.Item className="register-submit">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              icon={<UserAddOutlined />}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div className="register-login">
          <Text type="secondary">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default Register;
