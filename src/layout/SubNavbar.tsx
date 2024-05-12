import { Button, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { getStudentCurrent } from "../pages/homepage/store/subject.slice";

const SubNavbar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudentCurrent());
  }, []);
  const dataStudent = useAppSelector((state) => state.subject.studentCurrent);
  const loadingGetStudentCurrent = useAppSelector(
    (state) => state.subject.loadingGetStudentCurrent
  );
  console.log(dataStudent);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="bg-blue-400">
      {/* image avatar */}

      <div
        className="flex items-cente text-black relative shadow-sm font-sans "
        // role="navigation"
      >
        <div className="h-[100%]">
          <img
            src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/02/avatar-anh-meo-cute-4.jpg"
            alt="logo"
            className="w-[200px] h-[200px] object-cover "
          />
        </div>
        {loadingGetStudentCurrent == "loading" ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : (
          <div className=" text-white p-4  w-[300px]">
            <p>Xin chào!</p>
            <h3>
              <strong>{dataStudent?.name}</strong>
            </h3>
            <p>
              <span>Giới tính: </span>
              <strong>Nữ</strong>
            </p>
            <p>
              <span>MSSV: </span>
              <strong>{dataStudent?.studentId}</strong>
            </p>
            <p>
              <span>Email: </span>
              <strong>{dataStudent?.email}</strong>
            </p>
            <p>
              <span>Số điện thoại: </span>
              <strong>{dataStudent?.phone}</strong>
            </p>
            <div className="text-center mt-4">
              <Button
                onClick={() => handleLogout}
                type="primary"
                className="btn"
                href="/"
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubNavbar;
