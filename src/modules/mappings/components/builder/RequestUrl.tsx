import * as React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { Input, Select } from 'edikit';
import { IMappingFormValues, mappingRequestMethods } from '../../types';

interface IRequetsUrlProps {
  values: IMappingFormValues;
  errors: FormikErrors<IMappingFormValues>;
  touched: FormikTouched<IMappingFormValues>;
  onChange(e: React.ChangeEvent<any>): void;
  onBlur(e: any): void;
}

const RequestUrl: React.FC<IRequetsUrlProps> = ({
  values,
  onChange,
  onBlur,
}) => {
  return (
    <React.Fragment>
      <Select
        name="method"
        value={values.method}
        onChange={onChange}
        onBlur={onBlur}
      >
        {mappingRequestMethods.map(method => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </Select>
      <Input
        name="url"
        value={values.url}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 9,
        }}
      />
    </React.Fragment>
  );
};

export default RequestUrl;
