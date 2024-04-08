import * as React from 'react';

export interface IRadioGroupItemProps {
    name?: string;
    value: string | number | readonly string[];
    label: React.ReactNode;
    checked: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    disableIcon?: boolean;
}

const RadioGroupItem: React.FC<IRadioGroupItemProps> = ({
                                                            name,
                                                            value,
                                                            label,
                                                            checked,
                                                            disabled,

                                                            checkedIcon,
                                                            uncheckedIcon,
                                                            disableIcon,

                                                            onChange
                                                        }) => {
    return (
        <label>
            {disabled && disableIcon}
            {checked && checkedIcon}
            {!checked && uncheckedIcon}
            <input type="radio"
                   disabled={disabled}
                   name={name}
                   value={value}
                   checked={checked}
                   onChange={onChange} />
            {label}
        </label>
    );

};

export default RadioGroupItem;
