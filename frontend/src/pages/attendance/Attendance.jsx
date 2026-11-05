
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
  Popconfirm
} from "antd";

import {
  ClockCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  DeleteOutlined,
  PlusOutlined
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

const lastOut = outEntries.length > 0
  ? outEntries[outEntries.length - 1].time
  : "--:--";

// Calculate total working time
let totalMinutes = 0;

if (firstIn !== "--:--" && lastOut !== "--:--") {
  const inTime = firstIn.split(":");
  const outTime = lastOut.split(":");

  const inMinutes = Number(inTime[0]) * 60 + Number(inTime[1]);
  const outMinutes = Number(outTime[0]) * 60 + Number(outTime[1]);

  if (outMinutes >= inMinutes) {
    totalMinutes = outMinutes - inMinutes;
  }
}

const totalHours = Math.floor(totalMinutes / 60);
const remainingMinutes = totalMinutes % 60;

  function formatTime(time) {
    if (time === "--:--") {
      return time;
    }

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
      width: 75,
      render: (_, __, index) => index + 1
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => formatTime(time)
    },
    {
      title: "Entry Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "In" ? "success" : "processing"}>
          {type === "In" ? "IN" : "OUT"}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete this entry?"
          onConfirm={() => deleteEntry(record.id)}
          okText="Delete"
          cancelText="Cancel"
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
    <Space
      direction="vertical"
      size="large"
      className="attendance-page"
    >
      <Space direction="vertical" size={2}>
        <Title level={2}>Attendance</Title>
        <Text type="secondary">
          Record and manage your daily attendance.
        </Text>
      </Space>

      <Card className="attendance-entry-card">
        <Space direction="vertical" size="middle" className="full-width">
          <Title level={4}>Add Attendance Entry</Title>

          <Text type="secondary">Select attendance date</Text>

          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              if (date) {
                setSelectedDate(date);
              }
            }}
            format="DD MMM YYYY"
            allowClear={false}
            className="attendance-input"
          />

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Text strong>Entry Type</Text>

              <Select
                value={entryType}
                onChange={setEntryType}
                className="attendance-input"
                options={[
                  {
                    label: "In - Start / Return to Work",
                    value: "In"
                  },
                  {
                    label: "Out - Leave / Finish Work",
                    value: "Out"
                  }
                ]}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Text strong>Enter Time</Text>

              <TimePicker
                value={entryTime}
                onChange={setEntryTime}
                format="hh:mm A"
                use12Hours
                minuteStep={1}
                placeholder="Select time"
                className="attendance-input"
              />
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
        </Space>
      </Card>

      <Title level={4}>Daily Summary</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="attendance-summary-card">
            <Space>
              <LoginOutlined className="attendance-icon" />
              <Text type="secondary">First In</Text>
            </Space>

            <Title level={3}>
              {formatTime(firstIn)}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="attendance-summary-card">
            <Space>
              <LogoutOutlined className="attendance-icon" />
              <Text type="secondary">Last Out</Text>
            </Space>

            <Title level={3}>
              {formatTime(lastOut)}
            </Title>
          </Card>
        </Col>
      </Row>

      <Card className="attendance-history-card">
        <Space
          direction="vertical"
          size="middle"
          className="full-width"
        >
          <Title level={4}>
            Entries for {selectedDate.format("DD MMM YYYY")}
          </Title>

          <Table
            columns={columns}
            dataSource={todayEntries}
            rowKey="id"
            pagination={false}
            scroll={{ x: 400 }}
            locale={{
              emptyText: "No attendance entries for this date."
            }}
          />
        </Space>
      </Card>
    </Space>
  );
}

export default Attendance;
