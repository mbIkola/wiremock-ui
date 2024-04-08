import * as React from 'react';
import RadioGroupItem from './RadioGroupItem';
import styled from "styled-components";

export interface IRadioGroupProps {
    label?: React.ReactNode;
    name?: string;
    value?: unknown;
    className?: string;

    onChange?(value: unknown): void;

    uncheckedIcon?: React.ReactNode;
    disableIcon?: boolean;
    checkedIcon?: React.ReactNode;

    children: React.ReactNode;
}

const FieldSet = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

const RadioGroup: React.FC<IRadioGroupProps> = ({
    label,
    name,
    value,
    className,
    onChange = () => {},
    uncheckedIcon,
    disableIcon,
    checkedIcon,
    children,
}) => {
    return (
      <FieldSet className={className}>
          <legend>{label}</legend>

          {React.Children.map(children, (child) => {
              if (!React.isValidElement(child) || child.type !== RadioGroupItem) {
                 console.error('RadioGroup child is not a valid element, expected RadioGroupItem.');
                 return child;
              }

              return React.cloneElement(child, {
                  name,
                  checked: child.props.value === value,
                  onChange: (e) => {
                          onChange(e);
                  },
                  uncheckedIcon,
                  disableIcon,
                  checkedIcon,
              });
          })}
      </FieldSet>
    );
};


export default RadioGroup;

