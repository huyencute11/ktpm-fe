import React from "react";
import { Flex, Layout } from "antd";
const { Header } = Layout;
const HeaderLayout = () => {
  return (
    <Header className="w-[100%] bg-slate-400 h-[100%] p-0">
      <img
        src="https://dkhp.iuh.edu.vn/Content/images/banner.png"
        alt="logo"
        className="w-[100%] h-[100%] object-cover"
      />
    </Header>
    
  );
};

export default HeaderLayout;
