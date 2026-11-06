
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button
} from "antd";

import {
  CalendarOutlined,
  BarChartOutlined,
  GiftOutlined,
  TeamOutlined,
  CoffeeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SmileOutlined,
  RightOutlined
} from "@ant-design/icons";

import "./Dashboard.css";

const { Title, Text } = Typography;

function Dashboard() {

  const dashboardCards = [
    {
      title: "Attendance",
      description: "View your attendance records",
      icon: <CalendarOutlined />,
      link: "/attendance",
      color: "#1677ff",
      background: "#e6f4ff"
    },
    {
      title: "Work Progress",
      description: "Track your ongoing work",
      icon: <BarChartOutlined />,
      link: "/dashboard",
      color: "#13a8a8",
      background: "#e6fffb"
    },
    {
      title: "Events",
      description: "View upcoming company events",
      icon: <GiftOutlined />,
      link: "/dashboard",
      color: "#eb2f96",
      background: "#fff0f6"
    },
    {
      title: "People",
      description: "View your team members",
      icon: <TeamOutlined />,
      link: "/people",
      color: "#722ed1",
      background: "#f9f0ff"
    },
    {
      title: "Leave Balance",
      description: "Check your available leave days",
      icon: <CoffeeOutlined />,
      link: "/dashboard",
      color: "#fa8c16",
      background: "#fff7e6"
    },
    {
      title: "Pending Tasks",
      description: "Review tasks that need attention",
      icon: <FileTextOutlined />,
      link: "/dashboard",
      color: "#d48806",
      background: "#fffbe6"
    },
    {
      title: "Completed Tasks",
      description: "Review your completed work",
      icon: <CheckCircleOutlined />,
      link: "/dashboard",
      color: "#389e0d",
      background: "#f6ffed"
    },
    {
      title: "Upcoming Holidays",
      description: "Check upcoming holidays",
      icon: <SmileOutlined />,
      link: "/dashboard",
      color: "#cf1322",
      background: "#fff1f0"
    }
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <Title level={2}>
          Dashboard
        </Title>

        <Text type="secondary">
          Welcome back! Here's your workspace overview.
        </Text>

      </div>

      <Row gutter={[20, 20]}>

        {dashboardCards.map((card) => (

          <Col
            xs={24}
            sm={12}
            lg={8}
            xl={6}
            key={card.title}
          >

            <Card
              hoverable
              className="dashboard-card"
            >

              <Space
                orientation="vertical"
                size={16}
                className="dashboard-card-content"
              >

                <div
                  className="dashboard-card-icon"
                  style={{
                    color: card.color,
                    backgroundColor: card.background
                  }}
                >
                  {card.icon}
                </div>

                <div>

                  <Title level={4}>
                    {card.title}
                  </Title>

                  <Text type="secondary">
                    {card.description}
                  </Text>

                </div>

                <Button
                  type="link"
                  className="dashboard-card-button"
                  icon={<RightOutlined />}
                  iconPlacement="end"
                  block
                  href={undefined}
                >
                  <Link to={card.link}>
                    View Details
                  </Link>
                </Button>

              </Space>

            </Card>

          </Col>

        ))}

      </Row>

    </div>
  );
}

export default Dashboard;
