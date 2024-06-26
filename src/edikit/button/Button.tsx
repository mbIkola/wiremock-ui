import * as React from 'react';
import { Container } from './Button_styled';

export type ButtonSize = 'normal' | 'large';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export type ButtonIconPlacement = 'prepend' | 'append';

export interface IButtonProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPlacement?: ButtonIconPlacement;
  style?: React.CSSProperties;
  onClick?: any;
}

const Button: React.FC<IButtonProps> = ({
  variant = 'default',
  size = 'normal',
  iconPlacement = 'prepend',
  label,
  children,
  icon,
  ...rest
}) => {
  let content = null;
  if (children) {
    content = children;
  } else if (label) {
    content = label;
  }

  return (
    <Container
      {...rest}
      variant={variant}
      size={size}
      hasContent={content !== null}
      hasIcon={icon !== null}
      tabIndex={0}
    >
      {icon && iconPlacement === 'prepend' && icon}
      {label || children}
      {icon && iconPlacement === 'append' && icon}
    </Container>
  );
};

export default Button;
