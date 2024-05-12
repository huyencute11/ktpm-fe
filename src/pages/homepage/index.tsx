import Main from "../../layout/Main";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Select,
  Divider,
  Space,
  Radio,
  Table,
  Button,
  notification,
} from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import {
  ClassInSubjectType,
  SubjectDataType,
  getListClassInSubject,
  getListSemester,
  getListSubject,
  getStudentCurrent,
} from "./store/subject.slice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { getListClassInSubjectData, registerClass } from "./store/service";
import { format } from "date-fns";
import { IconType } from "antd/es/notification/interface";

interface DataType {
  id: number;
  name: string;
  credit: number;
  type: string;
  majorId: number;
  preSubject: number[];
}

interface SemesterType {
  id: number;
  name: string;
  year: string;
}

const HomePage = () => {
  const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.subject);
  const isLoading = useAppSelector((state) => state.subject.statusGetDataList);
  const dataSubject = useAppSelector((state) => state.subject.dataListSubject);
  const dataStudent = useAppSelector((state) => state.subject.studentCurrent);
  const loadingClass = useAppSelector((state) => state.subject.loadingClass);
  const dataSemester = useAppSelector(
    (state) => state.subject.dataListSemester
  );
  useEffect(() => {
    dispatch(getListSubject());
    dispatch(getListSemester());
  }, []);
  console.log("aaaaaaaaaaaa--------->", dataStudent);

  const checkPresubjectCompleted = (preSubject: number[]) => {
    const preSubjectCompleted = dataStudent?.completedSubjects;
    return preSubject.every((item) => preSubjectCompleted?.includes(item));
  };

  const [selectedSemester, setSelectedSemester] = useState<string | number>(
    dataSemester[0]?.id || 1
  );
  const [classInSubject, setClassInSubject] = useState<ClassInSubjectType[]>(
    []
  );
  const columns: TableColumnsType<SubjectDataType> = [
    {
      title: "STT",
      dataIndex: "id",
      render: (text: string, record: SubjectDataType, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Mã môn học",
      dataIndex: "id",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Mã học phần",
      dataIndex: "majorId",
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
      render: (text: string, record: SubjectDataType) => {
        // return <span>{text.length === 0 ? "Không có" : dataSubject.map((item: SubjectDataType) => item + ", ")}</span>
        // return
        const preSubjects = dataSubject
          .filter((item: SubjectDataType) => text.includes(item.id))
          .map((item: SubjectDataType) => item.name)
          .join(", ");
        return <span>{preSubjects}</span>;
      },
    },
  ];

  const getClassInSubject = useCallback(
    (subjectId: number) => {
      try {
        getListClassInSubjectData({
          subjectId: subjectId,
          semesterId: selectedSemester as number,
        }).then((res) => {
          setClassInSubject(res);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [selectedSemester, dataSubject]
  );

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: SubjectDataType[]
    ) => {
      if (
        selectedRows[0].preSubject.length > 0 &&
        !checkPresubjectCompleted(selectedRows[0].preSubject)
      ) {
        notification.open({
          type: "warning",
          description: "Bạn không được đang ký môn " + selectedRows[0].name,
          message: "Bạn chưa hoàn thành môn học tiên quyết.",
        });
        setClassInSubject([]);
      } else {
        getClassInSubject(selectedRows[0].id);
      }
      // getClassInSubject(selectedRows[0].id);
    },
    getCheckboxProps: (record: SubjectDataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const openNoti = useCallback(
    (type: IconType | undefined, mes: string, des: string) => {
      notification.open({
        type: type,
        message: mes,
        description: des,
      });
    },
    []
  );
  // useEffect(() => {
  //   notification.open({
  //     message: 'Notification Title',
  //     description: 'This is the content of the notification.',
  //   });
  // }, []);
  const [loadingRegisterClass, setLoadingRegisterClass] = useState(false);
  const handleRegisterClass = async (classId: number) => {
    try {
      setLoadingRegisterClass(true);
      const res = await registerClass(classId);
      console.log(res);
      if (res?.status === 200) {
        // openNotification("success", "Đăng ký thành công.");
        openNoti(
          "success",
          "Đăng ký thành công",
          `Đăng ký lớp học phần ${res.data.classCode} thành công.`
        );
        dispatch(getListSubject());
        setClassInSubject([]);
      } else {
        // 'success' | 'info' | 'error' | 'warning';
        openNoti("error", "Đăng ký thất bại", "Đăng ký lớp học phần thất bại.");
        // openNotification("error", `${res?.data.message}`);
      }
    } catch (error) {
      openNoti("error", "Đăng ký thất bại", "Đăng ký lớp học phần thất bại.");
    } finally {
      setLoadingRegisterClass(false);
    }
  };

  //------------------------ CLASS IN SUBJECT ------------------------
  const columnsClassInSubject: TableColumnsType<ClassInSubjectType> = [
    {
      title: "STT",
      dataIndex: "id",
      render: (text: string, record: ClassInSubjectType, index: number) => (
        <span>{index + 1}</span>
      ),
    },

    {
      title: "Mã lớp học phần",
      dataIndex: "classCode",
    },
    // {
    //   title: "Tên môn học",
    //   dataIndex: "subjectId",
    //   render: (text: string) => <span>{text.name}</span>,
    // },
    // {
    //   title: "Học kỳ",
    //   dataIndex: "semester",
    //   render: (text: string) => <span>{text.name + " " + text.year}</span>,
    // },
    {
      title: "Ngày bắt đầu",
      dataIndex: "createdDate",
      // format(start, 'yyyy-MM-dd'),
      render: (text: string) => <span>{format(text, "dd/MM/yyyy")}</span>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "closedDate",
      render: (text: string) => <span>{format(text, "dd/MM/yyyy")}</span>,
    },
    {
      title: "Số lượng sinh viên",
      dataIndex: "numberOfStudent",
    },
    {
      title: "Số lượng sinh viên tối thiểu",
      dataIndex: "minStudent",
    },
    {
      title: "Số lượng sinh viên tối đa",
      dataIndex: "maxStudent",
    },
    {
      title: "Trạng thái",
      dataIndex: "acceptOpen",
      render: (text: boolean) => (
        <span>{text ? "Đã chấp nhận mở lớp" : "Chưa chấp nhận mở lớp"}</span>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      // render: (text: string) => (
      render: (text: string, record: ClassInSubjectType, index: number) => (
        <Space>
          {/* <a href="#">Xem chi tiết</a>
          <a href="#">Đăng ký</a> */}
          <Button
            // loading={loadingRegisterClass}
            disabled={record.numberOfStudent >= record.maxStudent}
            type="primary"
            onClick={() => handleRegisterClass(record.id)}
          >
            Đăng ký
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelectionClass = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ClassInSubjectType[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: ClassInSubjectType) => ({
      disabled: record.createdDate === "Disabled User", // Column configuration not to be checked
      name: record.createdDate,
    }),
  };

  return (
    <Main>
      <div className="my-4">
        <Space wrap>
          {dataSemester?.length === 0 ? (
            <h3>Không có học kỳ nào</h3>
          ) : (
            <>
              <h3>Chọn học kỳ</h3>
              <Select
                // defaultValue={
                //   dataSemester[0]?.name.toString() + " " + dataSemester[0]?.year
                // }
                style={{ width: 180 }}
                defaultValue={selectedSemester}
                onChange={(value) => {
                  // const selectedSemester = dataSemester.find(
                  //   (semester) => semester.id === value
                  // );
                  // setSelectedSemester(
                  //   selectedSemester?.name.toString() +
                  //   " " +
                  //   selectedSemester?.year.toString()
                  // );
                  // console.log(selectedSemester);
                  setSelectedSemester(value);
                }}
                options={dataSemester?.map((item) => ({
                  value: item.id,
                  label: item.name + " " + item.year,
                }))}
              />
            </>
          )}
        </Space>
      </div>
      <Divider />
      {isLoading === "loading" ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          rowKey={(record) => record.id}
          title={() => <h3>Danh sách môn học phần chờ đăng ký</h3>}
          columns={columns}
          dataSource={dataSubject || []}
        />
      )}

      <Divider />
      {/* {classInSubject?.length === 0 ? (
        <h3>Không có lớp học phần nào</h3>
      ) : ( */}
      {loadingClass === "loading" ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelectionClass,
          }}
          rowKey={(record) => record.id}
          title={() => (
            <h3 className="text-center text-lg">
              Danh sách lớp học phần chờ đăng ký
            </h3>
          )}
          columns={columnsClassInSubject}
          dataSource={classInSubject || []}
        />
      )}

      {/* )} */}
    </Main>
  );
};

export default HomePage;
