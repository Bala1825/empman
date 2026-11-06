
import { useState } from "react";
import dayjs from "dayjs";

import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Table,
  Tag,
  message,
  Popconfirm,
  Statistic,
  Form,
  Empty
} from "antd";

import {
  ClockCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  DeleteOutlined,
  PlusOutlined,
  CalendarOutlined
} from "@ant-design/icons";

import "./Attendance.css";

const { Title, Text } = Typography;

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [entryType, setEntryType] = useState("In");
  const [entryTime, setEntryTime] = useState(null);
  const [entries, setEntries] = useState([]);

  const dateKey = selectedDate.format("YYYY-MM-DD");

  const todayEntries = entries
    .filter((entry) => entry.date === dateKey)
    .sort((a, b) => a.time.localeCompare(b.time));

  const inEntries = todayEntries.filter(
    (entry) => entry.type === "In"
  );

  const outEntries = todayEntries.filter(
    (entry) => entry.type === "Out"
  );

  const firstIn = inEntries.length
    ? inEntries[0].time
    : "--:--";

  const lastOut = outEntries.length
    ? outEntries[outEntries.length - 1].time
    : "--:--";
    
  let totalMinutes = 0;

  if (firstIn !== "--:--" && lastOut !== "--:--") {
    const [inHour, inMinute] = firstIn.split(":").map(Number);
    const [outHour, outMinute] = lastOut.split(":").map(Number);

    const inMinutes = inHour * 60 + inMinute;
    const outMinutes = outHour * 60 + outMinute;

    if (outMinutes >= inMinutes) {
      totalMinutes = outMinutes - inMinutes;
    }
  }

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  function formatTime(time) {
    if (time === "--:--") return time;

    return dayjs(time, "HH:mm").format("hh:mm A");
  }

  function addEntry() {
    if (!entryTime) {
      message.warning("Please select an attendance time.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: dateKey,
      type: entryType,
      time: entryTime.format("HH:mm")
    };

    setEntries((previousEntries) => [
      ...previousEntries,
      newEntry
    ]);

    setEntryTime(null);

    message.success("Attendance entry added.");
  }

  function deleteEntry(id) {
    setEntries((previousEntries) =>
      previousEntries.filter((entry) => entry.id !== id)
    );

    message.success("Attendance entry deleted.");
  }

  const columns = [
    {
      title: "S.No",
      key: "serial",
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: "Attendance Time",
      dataIndex: "time",
      key: "time",
      render: (time) => (
        <Space>
          <ClockCircleOutlined />
          <Text strong>{formatTime(time)}</Text>
        </Space>
      )
    },
    {
      title: "Entry Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "In" ? "success" : "processing"}>
          {type === "In" ? "CHECK IN" : "CHECK OUT"}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Delete attendance entry?"
          description="Are you sure you want to delete this entry?"
          onConfirm={() => deleteEntry(record.id)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      )
    }
  ];

  return (
    <div className="attendance-page">

      <div className="attendance-header">
        <div>
          <Title level={2}>Attendance</Title>

          <Text type="secondary">
            Record and manage your daily attendance.
          </Text>
        </div>
      </div>

      <Card
        title={
          <Space>
            <PlusOutlined />
            Add Attendance Entry
          </Space>
        }
        className="attendance-entry-card"
      >

        <Form layout="vertical">

          <Row gutter={[20, 0]}>

            <Col xs={24} md={8}>
              <Form.Item label="Attendance Date">
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => {
                    if (date) setSelectedDate(date);
                  }}
                  format="DD MMM YYYY"
                  allowClear={false}
                  className="attendance-input"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Entry Type">
                <Select
                  value={entryType}
                  onChange={setEntryType}
                  className="attendance-input"
                  options={[
                    {
                      label: "IN - Start / Return to Work",
                      value: "In"
                    },
                    {
                      label: "OUT - Leave / Finish Work",
                      value: "Out"
                    }
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Attendance Time">
                <TimePicker
                  value={entryTime}
                  onChange={setEntryTime}
                  format="hh:mm A"
                  use12Hours
                  minuteStep={1}
                  placeholder="Select time"
                  className="attendance-input"
                />
              </Form.Item>
            </Col>

          </Row>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addEntry}
            className="attendance-add-button"
          >
            Add Entry
          </Button>

        </Form>
      </Card>

      <div className="attendance-section">

        <Title level={4}>Daily Summary</Title>

        <Row gutter={[16, 16]}>

          <Col xs={24} sm={12} lg={8}>
            <Card className="attendance-summary-card">
              <Statistic
                title={
                  <Space>
                    <LoginOutlined />
                    First Check In
                  </Space>
                }
                value={formatTime(firstIn)}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="attendance-summary-card">
              <Statistic
                title={
                  <Space>
                    <LogoutOutlined />
                    Last Check Out
                  </Space>
                }
                value={formatTime(lastOut)}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="attendance-summary-card">
              <Statistic
                title={
                  <Space>
                    <ClockCircleOutlined />
                    Total Working Hours
                  </Space>
                }
                value={`${totalHours}h ${remainingMinutes}m`}
              />
            </Card>
          </Col>

        </Row>
      </div>

      {/* Attendance History */}
      <Card
        className="attendance-history-card"
        title={
          <Space>
            <CalendarOutlined />
            Attendance History
          </Space>
        }
        extra={
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              if (date) setSelectedDate(date);
            }}
            format="DD MMM YYYY"
            allowClear={false}
          />
        }
      >

        <div className="attendance-history-heading">
          <Text type="secondary">
            Entries for {selectedDate.format("DD MMM YYYY")}
          </Text>
        </div>

        <Table
          columns={columns}
          dataSource={todayEntries}
          rowKey="id"
          pagination={false}
          scroll={{ x: 450 }}
          locale={{
            emptyText: (
              <Empty
                description="No attendance entries for this date"
              />
            )
          }}
        />

      </Card>

    </div>
  );
}

export default Attendance;
