
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  const { register } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(values) {
    setError("");
    setLoading(true);

    const message = register(
      values.name.trim(),
      values.email.trim().toLowerCase(),
      values.password,
      values.designation
    );

    if (message) {
      setError(message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/login", { replace: true });
  }

  return (
    <div className="register-container">
      <Card className="register-card" bordered={false}>
        <div className="register-header">
          <div className="register-icon">
            <Text>
                Welcome to EmpManage
            </Text>
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
              { min: 6, message: "Password must contain at least 6 characters" },
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
