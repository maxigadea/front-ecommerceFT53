'use client'
import { ButtonProps } from "./types";

const Button:React.FC<ButtonProps> = ({children, disabled, onClick}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button;