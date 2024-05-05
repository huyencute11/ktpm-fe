import { Button } from "antd";

const SubNavbar = () => {
  return (
    <div className="">
      <div
        className="flex items-center bg-white text-black relative shadow-sm font-sans"
        // role="navigation"
      >
        <div className="bg-blue-400 p-4 text-white">
          <p>Xin chào!</p>
          <h3>
            <b>Trần Thị Minh Huyền</b>
          </h3>
          <p>
            <span>Giới tính:</span>
            <span>Nữ</span>
          </p>
          <p>
            <span>MSSV:</span>
            <span>20105231</span>
          </p>
          <p>
            <span>Trạng thái:</span>
            <span>Đang học</span>
          </p>
          <div className="text-center">
            <Button type="primary" className="btn" href="/Account/LogOut">
              Đăng xuất
            </Button>
          </div>
        </div>
        {/* image avatar */}
        <div className="h-[100%]">
          <img
            src="/image/avatar.png"
            alt="logo"
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
