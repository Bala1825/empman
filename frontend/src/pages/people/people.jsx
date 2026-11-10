
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";

import {
  Card, Row, Col, Typography, Button, Input, Select,
  Table, Tag, Modal, Form, DatePicker, Drawer,
  Descriptions, Space, Popconfirm, message
} from "antd";

import {
  PlusOutlined, SearchOutlined, EditOutlined,
  DeleteOutlined, EyeOutlined
} from "@ant-design/icons";

import "./People.css";

const { Title, Text } = Typography;
const API_URL = "http://localhost:8080/api/people";

const designations = [
  "Manager", "Team Lead", "Senior Developer",
  "Junior Developer", "Designer", "HR Executive"
];

const departments = [
  "IT", "HR", "Finance", "Design", "Administration"
];

// Convert backend response into frontend format
function mapPerson(person) {
  return {
    ...person,
    employeeId: `EMP${String(person.id).padStart(6, "0")}`,
    linkedEmployeeId: person.employeeId,
    reportingTo: person.reportingToId
  };
}

// Read backend errors
async function checkResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null;
    return response.json();
  }

  const error = await response.text();
  throw new Error(error || `Request failed: ${response.status}`);
}

function People() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [form] = Form.useForm();

  const { user } = useAuth();

  // Fetch people from MySQL through Spring Boot
  async function fetchPeople() {
    setLoading(true);
  
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
  
      const data = await checkResponse(response);
  
      setEmployees(data.map(mapPerson));
    } catch (error) {
      message.error(`Unable to load employees: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  // Statistics
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    emp => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    emp => emp.status === "Inactive"
  ).length;

  // Search and filter
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (emp.name || "").toLowerCase().includes(searchText) ||
        (emp.email || "").toLowerCase().includes(searchText) ||
        (emp.employeeId || "").toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, search, statusFilter]);

  // Open Add modal
  function openAddModal() {
    setEditingEmployee(null);
    form.resetFields();
    form.setFieldsValue({ status: "Active" });
    setModalOpen(true);
  }

  // Open Edit modal
  function openEditModal(employee) {
    setEditingEmployee(employee);

    form.setFieldsValue({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      designation: employee.designation,
      department: employee.department,
      joiningDate: employee.joiningDate
        ? dayjs(employee.joiningDate)
        : null,
      reportingTo: employee.reportingTo || undefined,
      status: employee.status
    });

    setModalOpen(true);
  }

  // Add or update through backend
  async function handleSave(values) {
    setSaving(true);

    try {
      const employeeData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        designation: values.designation,
        department: values.department,
        joiningDate: values.joiningDate
          ? values.joiningDate.format("YYYY-MM-DD")
          : null,
        employeeId: editingEmployee
          ? editingEmployee.linkedEmployeeId ?? null
          : null,
        reportingToId: values.reportingTo || null,
        status: values.status || "Active"
      };

      const isEditing = !!editingEmployee;

      const url = isEditing
        ? `${API_URL}/${editingEmployee.id}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(employeeData)
      });

      await checkResponse(response);

      message.success(
        isEditing
          ? "Employee updated successfully"
          : "Employee added successfully"
      );

      setModalOpen(false);
      setEditingEmployee(null);
      form.resetFields();

      await fetchPeople();

    } catch (error) {
      message.error(`Save failed: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  // Delete through backend
  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
  
      await checkResponse(response);
  
      message.success("Employee deleted successfully");
  
      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }
  
      await fetchPeople();
  
    } catch (error) {
      message.error(`Delete failed: ${error.message}`);
    }
  }

  // Table columns
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId"
    },
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary">{record.email}</Text>
        </div>
      )
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation"
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department"
    },
    {
      title: "Reporting To",
      dataIndex: "reportingToName",
      key: "reportingToName",
      render: value => value || "-"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => (
        <Tag color={status === "Active" ? "success" : "default"}>
          {status}
        </Tag>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setSelectedEmployee(record)}
          />

          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          />

          <Popconfirm
            title="Delete employee?"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="people-page">

      {/* Header */}
      <div className="people-header">
        <div>
          <Title level={2}>People</Title>
          <Text type="secondary">
            Manage your organization's employees
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openAddModal}
        >
          Add Employee
        </Button>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="people-stats">
        <Col xs={24} sm={8}>
          <Card>
            <Text type="secondary">Total Employees</Text>
            <Title level={2}>{totalEmployees}</Title>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card>
            <Text type="secondary">Active Employees</Text>
            <Title level={2} className="active-count">
              {activeEmployees}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card>
            <Text type="secondary">Inactive Employees</Text>
            <Title level={2} className="inactive-count">
              {inactiveEmployees}
            </Title>
          </Card>
        </Col>
      </Row>

      {/* Employee Table */}
      <Card className="people-table-card">
        <div className="people-toolbar">
          <Input
            placeholder="Search name, email or employee ID"
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="people-search"
            allowClear
          />

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            className="people-filter"
            options={[
              { label: "All Status", value: "All" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" }
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 900 }}
          locale={{
            emptyText: "No employees found. Add your first employee."
          }}
        />
      </Card>

      {/* Add / Edit Modal */}
      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingEmployee ? "Update" : "Save"}
        confirmLoading={saving}
        size={650}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Enter employee name" }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Enter email" },
                  { type: "email", message: "Enter valid email" }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Enter phone number" }]}
              >
                <Input placeholder="Enter phone number" maxLength={10} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Designation"
                name="designation"
                rules={[{ required: true, message: "Select designation" }]}
              >
                <Select
                  placeholder="Select designation"
                  options={designations.map(value => ({
                    label: value,
                    value
                  }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: "Select department" }]}
              >
                <Select
                  placeholder="Select department"
                  options={departments.map(value => ({
                    label: value,
                    value
                  }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Joining Date"
                name="joiningDate"
                rules={[{ required: true, message: "Select joining date" }]}
              >
                <DatePicker
                  style={{ size: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Reporting To"
                name="reportingTo"
              >
                <Select
                  placeholder="Select reporting manager"
                  allowClear
                  options={employees
                    .filter(emp => emp.id !== editingEmployee?.id)
                    .map(emp => ({
                      label: `${emp.name} (${emp.designation})`,
                      value: emp.id
                    }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Employee Details Drawer */}
      <Drawer
        title="Employee Details"
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        size={450}
      >
        {selectedEmployee && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Employee ID">
              {selectedEmployee.employeeId}
            </Descriptions.Item>

            <Descriptions.Item label="Full Name">
              {selectedEmployee.name}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {selectedEmployee.email}
            </Descriptions.Item>

            <Descriptions.Item label="Phone">
              {selectedEmployee.phone || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Designation">
              {selectedEmployee.designation}
            </Descriptions.Item>

            <Descriptions.Item label="Department">
              {selectedEmployee.department || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Joining Date">
              {selectedEmployee.joiningDate || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Reporting To">
              {selectedEmployee.reportingToName || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              {selectedEmployee.status}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
}

export default People;
