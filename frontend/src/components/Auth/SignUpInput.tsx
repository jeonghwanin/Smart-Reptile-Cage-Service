// 훅 import
import React from "react"
// 상태정보 import
// 스타일 import
import style from 'styles/Auth/Login.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';

interface Props {
  name: string;
  placeholder: string;
  warning: string | null
}

const SignUpText = React.forwardRef<HTMLInputElement, Props>(({ name, placeholder, warning }: Props, ref) => {
    return (
      <Form.Group controlId={name} className="w-100 mb-3">
        <Form.Label className={style.textSize}>{name}</Form.Label>
        <Form.Control ref={ref} type="text" placeholder={placeholder} className={`bg-secondary-subtle ${style.inputForm}`}/>
        {warning? <div className={style.warningText}>{warning}</div> : null }
      </Form.Group>
    );
  }
);

const SignUpPassword = React.forwardRef<HTMLInputElement, Props>(({ name, placeholder, warning }: Props, ref) => {
    return (
      <Form.Group controlId={name} className="w-100 mb-3">
        <Form.Label className={style.textSize}>{name}</Form.Label>
        <Form.Control ref={ref} type="password" placeholder={placeholder} className={`bg-secondary-subtle ${style.inputForm}`}/>
        {warning? <div className={style.warningText}>{warning}</div> : null }
      </Form.Group>
    );
  }
);

export {SignUpText, SignUpPassword}



