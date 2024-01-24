import styled from '@emotion/styled'
import { ComponentPropsWithoutRef } from 'react'

const ButtonStyled = styled.button`
  margin: 0 10px 0 0;
  outline: none;
  padding: 6px 14px;
  color: #404549;
  border-radius: 3px;
  border: solid 1px #404549;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    cursor: pointer;
  }
`

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string
}

const Button = ({ label, ...rest }: ButtonProps) => {
  return <ButtonStyled {...rest}>{label}</ButtonStyled>
}

export default Button
