import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { apiLogin } from "./serive";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "antd/es/notification/interface";
export type NotificationType = "success" | "info" | "warning" | "error";

type DataLoginRespone ={
  token: string;
  studentId: number;
  message: string;
  status: number;
}

const FormLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const openNoti = useCallback((type: IconType | undefined, mes: string, des: string) => {
    notification.open({
      type: type,
      message:mes,
      description: des,
    });
  }, []);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const handleLogin = async () => {
      try {
        setLoading(true);
        const res = await apiLogin<DataLoginRespone>(values);
        console.log(res);
        if(res.status === 200){
          openNoti( 'success', "Thành công.", "Đăng nhập thành công.")
          // openNotification("success", "Đăng nhập thành công.");
          localStorage.setItem("token", res.data);
          navigate('/home');
        }else{
          openNoti( 'error', "Thất bại.", "Đăng nhập thất bại.")
        }

      } catch (error) {
        openNoti( 'error', "Thất bại.", "Đăng nhập thất bại.")
      }finally{
        setLoading(false);
      
      }
    }
    handleLogin()
  };
  // localhost:8888/students/login
  // useEffect(() => {
  //   if (pathname === '/' && user) {
  //     const accountType = Cookies.get('account_type');
  //     router.replace(
  //       accountType === 'client' ? '/client/dashboard' : '/freelancer/dashboard'
  //     );
  //   }
  // }, [pathname, user, router]);

  return (
    <Form
      name="normal_login"
      className="max-w-[300px] mx-auto mt-10"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="studentId"
        rules={[
          {
            required: true,
            message: "Hãy nhập mã số sinh viên!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="studentId"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="float-right" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" className="w-[100%]">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
