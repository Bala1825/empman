
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  Layout,
  Menu,
  Button,
  Avatar,
  Space,
  Typography,
  Dropdown
} from "antd";

import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  BarChartOutlined,
  FileTextOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined
} from "@ant-design/icons";

import "./Sidebar.css";

const { Sider } = Layout;
const { Text, Title } = Typography;

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <NavLink to="/dashboard">Dashboard</NavLink>
    },
    {
      key: "/attendance",
      icon: <CalendarOutlined />,
      label: <NavLink to="/attendance">Attendance</NavLink>
    },
    {
      key: "/people",
      icon: <TeamOutlined />,
      label: <NavLink to="/people">People</NavLink>
    },
    {
      key: "/leave",
      icon: <ClockCircleOutlined />,
      label: "Leave"
    },
    { 
      key: "/payroll", 
      icon: <DollarOutlined />, 
      label: "Payroll" 
    },
    { 
      key: "/reports", 
      icon: <BarChartOutlined />, 
      label: "Reports" 
    },
    { 
      key: "/documents", 
      icon: <FileTextOutlined />, 
      label: "Documents" 
    },
    { 
      key: "/notifications", 
      icon: <BellOutlined />, 
      label: "Notifications" 
    },
    { 
      key: "/settings", 
      icon: <SettingOutlined />, 
      label: "Settings" 
    }
  ];

  const allItems = [...menuItems];

  return (
    <Sider width={230} className="sidebar">
      <Space direction="vertical" size="large" className="sidebar-content">

        <Title level={3} className="sidebar-brand">
          EmpManage
        </Title>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
          items={allItems.map((item) => ({
            ...item,
            label:
              item.key === "/dashboard" ||
              item.key === "/attendance" ||
              item.key === "/people" ||
              item.key === "/leave" ||
              item.key === "/payroll" ||
              item.key === "/reports" ||
              item.key === "/documents" ||
              item.key === "/notifications" ||
              item.key === "/settings"
                ? item.label
                : <NavLink to={item.key}>{item.label}</NavLink>
          }))}
          className="sidebar-menu"
        />

        <div className="sidebar-user">
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Text className="sidebar-email">
              {user?.email || "User"}
            </Text>
          </Space>

          <Button
            block
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="sidebar-logout"
          >
            Logout
          </Button>
        </div>

      </Space>
    </Sider>
  );
}

export default Navbar;













