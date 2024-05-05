import React from "react";
import { Flex, Layout } from "antd";
import HeaderLayout from "./Header";
import SubNavbar from "./SubNavbar";

const {  Footer, Sider, Content } = Layout;

// const headerStyle: React.CSSProperties = {
//     textAlign: 'center',
//     color: '#fff',
//     height: 64,
//     paddingInline: 48,
//     lineHeight: '64px',
//     backgroundColor: '#4096ff',
//   };

//   const contentStyle: React.CSSProperties = {
//     textAlign: 'center',
//     minHeight: 120,
//     lineHeight: '120px',
//     color: '#fff',
//     backgroundColor: '#0958d9',
//   };

//   const siderStyle: React.CSSProperties = {
//     textAlign: 'center',
//     lineHeight: '120px',
//     color: '#fff',
//     backgroundColor: '#1677ff',
//   };

//   const footerStyle: React.CSSProperties = {
//     textAlign: 'center',
//     color: '#fff',
//     backgroundColor: '#4096ff',
//   };

//   const layoutStyle = {
//     borderRadius: 8,
//     overflow: 'hidden',
//     width: 'calc(50% - 8px)',
//     maxWidth: 'calc(50% - 8px)',
//   };

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[80%] mx-auto">
        <Layout className="w-[100%]">
            {/* <Sider width="25%" >
            Sider
        </Sider> */}
            <Layout>
                <HeaderLayout/>
                <SubNavbar/>
                {children}
                {/* <Content className="w-[100%] bg-blue-400  h-[800px]">Content</Content> */}
                <Footer className="w-[100%] h-[100px] bg-blue-500">Footer</Footer>
            </Layout>
        </Layout>
    </div>
  );
};

export default Main;
