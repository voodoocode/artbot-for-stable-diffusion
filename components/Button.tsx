import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  btnType?: string
  title?: string
  width?: string
}

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: #1890ff;
  border-radius: 4px;
  border: 1px solid white;
  color: white;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 32px;
  gap: 4px;
  justify-content: center;
  min-width: 40px;
  padding: 2px 8px;
  width: ${(props) => props.width};

  ${(props) =>
    props.btnType === 'secondary' &&
    `
    color: white;
    background-color: #fa5757;

    &:hover {
      background-color: #e14e4e;
    }
  `}

  ${(props) =>
    !props.disabled &&
    props.btnType !== 'secondary' &&
    `
    &:hover {
      background-color: rgb(59 130 246);
    }
  `}

  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: gray;
  `}
`

export function Button(props: ButtonProps) {
  const { children, ...rest } = props
  return <StyledButton {...rest}>{children}</StyledButton>
}