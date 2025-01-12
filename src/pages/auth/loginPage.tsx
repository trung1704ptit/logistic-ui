import { Button, Form, Input } from 'antd';
import { Fragment, useEffect, useRef, useState } from 'react';
import { apiRoutes } from '@/routes/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/adminSlice';
import { RootState } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '@/routes/web';
import { handleErrorResponse, setPageTitle } from '@/lib/utils';
import { Admin } from '@/interfaces/admin';
import { defaultHttp } from '@/lib/http';
import type { InputRef } from 'antd';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || webRoutes.dashboard;
  const admin = useSelector((state: RootState) => state.admin);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const emailRef = useRef<InputRef>(null);

  useEffect(() => {
    setPageTitle(`Đăng nhập - ${CONFIG.appName}`);
    emailRef?.current?.focus()
  }, []);

  useEffect(() => {
    if (admin) {
      navigate(from, { replace: true });
    }
  }, [admin]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    defaultHttp
      .post(apiRoutes.login, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const admin: Admin = {
          access_token: response?.data?.access_token,
          refresh_token: response?.data?.refresh_token,
        };
        console.log({ admin })
        dispatch(login(admin));
      })
      .catch((error) => {
        handleErrorResponse(error);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <div className="flex flex-col space-y-1.5">
        <h3 className="font-semibold tracking-tight text-2xl opacity-60 my-0 text-center">
          Đăng nhập
        </h3>
        <p className="text-sm text-gray-400 text-center">
          Vui lòng nhập email và mật khẩu để đăng nhập
        </p>
      </div>
      <Form
        className="space-y-4 md:space-y-6"
        form={form}
        name="login"
        onFinish={onSubmit}
        layout={'vertical'}
        requiredMark={false}
      >
        <div>
          <Form.Item
            name="email"
            label={
              <p className="block text-sm font-medium text-gray-900">Email</p>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
              {
                type: 'email',
                message: 'Địa chỉ email không chính xác',
              },
            ]}
          >
            <Input
              size='large'
              className="bg-gray-50 text-gray-900 sm:text-sm py-2"
              ref={emailRef}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="password"
            label={
              <p className="block text-sm font-medium text-gray-900">
                Mật khẩu
              </p>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Input.Password
              size='large'
              visibilityToggle={false}
              className="bg-gray-50 text-gray-900 sm:text-sm py-2"
            />
          </Form.Item>
        </div>

        <div className="text-center">
          <Button
            className="mt-4"
            block
            loading={loading}
            type="primary"
            size="large"
            htmlType={'submit'}
          >
            Đăng nhập
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default LoginPage;
