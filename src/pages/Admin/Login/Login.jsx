import {Input} from 'antd'
import {useTranslation} from 'react-i18next'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {LoginApi} from "../../../api";
import {setCookie} from "../../../assets/scripts";

import {SectionLogin} from "./style";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {Controller, useForm} from "react-hook-form";

export default function Login() {
    const {t} = useTranslation()
    let navigate = useNavigate();

    const ref = useRef(null)

    const {
        handleSubmit,
        control,
        watch,
        formState: {errors}
    } = useForm()


    const onFinish = (values) => {
        LoginApi.authenticate(values)
            .then(result => {
                if (result.data && result.data.token) {
                    setCookie('admin-token', result.data.token, {'max-age': 10800})
                    navigate(`/admin`, {replace: true});
                }

            })
    }


    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (ref && ref.current) {
                    ref.current.click()
                }
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <SectionLogin id="login-section">
            <form
                id={'normal_login'}
                name="normal_login"
                className="login-form ant-form ant-form-horizontal"
            >
                <div className='logo-icon'>
                    <img src="/images/logo.svg" alt=""/>
                </div>

                <div className={'login-item'}>
                    <Controller control={control} rules={{
                        required: {
                            value: true,
                            message: t('admin.is-required')
                        }
                    }} render={({field: {onChange, onBlur, value, ref}}) => (
                        <Input itemRef={ref} onChange={onChange} value={value} onBlur={onBlur}
                               prefix={<UserOutlined className="site-form-item-icon roboto-1"/>}
                               placeholder={t('username')}
                               className={`roboto-1 ${errors.username ? 'error-input' : ''}`}
                        />
                    )} name={'username'}/>
                    {errors.username && <p className={'error-message'}>
                        {errors.username.message}
                    </p>}
                </div>
                <div className={'login-item'}>
                    <Controller control={control} rules={{
                        required: {
                            value: true,
                            message: t('admin.is-required')
                        }
                    }} render={({field: {onChange, onBlur, value, ref}}) => (
                        <Input
                            itemRef={ref}
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type={'password'}
                            onChange={onChange} value={value} onBlur={onBlur}
                            placeholder={t('admin.input-password')}
                            className={`roboto-1 ${errors.password ? 'error-input' : ''}`}
                        />
                    )} name={'password'}/>
                    {errors.password && <p className={'error-message'}>
                        {errors.password.message}
                    </p>}
                </div>

                <div className="btn-group">
                    <div ref={ref} onClick={handleSubmit(onFinish)} type={'submit'} className="login-form-button roboto-1">
                        {t('admin.login-button')}
                    </div>
                </div>
            </form>
        </SectionLogin>
    )
}

