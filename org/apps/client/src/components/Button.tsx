import React, { MouseEventHandler } from 'react';

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  variant: 'btn_dark_blue';
  onClick?: MouseEventHandler<HTMLButtonElement>; // Updated handleClick type
};

const Button = ({ type, title, icon: Icon, variant, onClick }: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-3 rounded-full border ${variant}`}
      onClick={onClick}
    >
      <label className="bold-16 whitespace-nowrap hover">{title}</label>
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
