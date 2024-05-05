import axiosInstance from "../../services/axios";
import Main from "../../layout/Main";
import React, { useEffect, useState } from "react";
import { Select, Divider, Space, Radio, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { getListSubject } from "./store/subject.slice";

interface DataType {
  id: number;
  name: string;
  credit: number;
  type: string;
  majorId: number;
  preSubject: number[];
}

const dataFake: DataType[] = [
  {
    id: 3,
    name: "Co so du lieu",
    credit: 3,
    type: "OBLIGATORY",
    majorId: 2,
    preSubject: [],
  },
  {
    id: 4,
    name: "He thong may tinh",
    credit: 3,
    type: "OBLIGATORY",
    majorId: 2,
    preSubject: [],
  },
  {
    id: 5,
    name: "He quan tri co so du lieu",
    credit: 3,
    type: "OBLIGATORY",
    majorId: 2,
    preSubject: [],
  },
  {
    id: 6,
    name: "Lap trinh phan tan",
    credit: 3,
    type: "OBLIGATORY",
    majorId: 2,
    preSubject: [],
  },
];

interface SemesterType {
  id: number;
  name: string;
  year: string;
}

const dataSemester: SemesterType[] = [
  {
    id: 1,
    name: "HK1",
    year: "2023-2024",
  },
  {
    id: 2,
    name: "HK2",
    year: "2023-2024",
  },

  {
    id: 3,
    name: "HK3",
    year: "2023-2024",
  },
  {
    id: 4,
    name: "HK1",
    year: "2024-2025",
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.subject);
  useEffect(() => {
    dispatch(getListSubject());
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Mã học phần",
      dataIndex: "majorId",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Mã môn học",
      dataIndex: "id",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Tên môn học",
      dataIndex: "name",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "credit",
    },
    {
      title: "Loại môn học",
      dataIndex: "type",
    },
    {
      title: "Môn học tiên quyết",
      dataIndex: "preSubject",
      render: (text: string) => <span>{text}</span>,
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "radio"
  );
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Main>
      <div className="my-4">
        <Space wrap>
          <Select
            defaultValue={
              dataSemester[0].name.toString() + " " + dataSemester[0].year
            }
            style={{ width: 180 }}
            onChange={handleChange}
            options={dataSemester.map((item) => ({
              value: item.id,
              label: item.name + " " + item.year,
            }))}
          />
        </Space>
      </div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataFake}
      />
    </Main>
  );
};

export default HomePage;
