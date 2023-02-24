import * as React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { Block } from 'edikit';
import { IMappingFormValues, IMappingRequestParamType } from '../../types';
import BuilderSectionLabel from './BuilderSectionLabel';
import RequestUrl from './RequestUrl';
import RequestUrlDetails from './RequestUrlDetails';
import RequestParamsSwitcher from './RequestParamsSwitcher';
import RequestParams from './RequestParams';
import { Grid } from './Builder_styled';

interface IBuilderRequestProps {
  isOpened: boolean;
  onToggle(): void;
  values: IMappingFormValues;
  errors: FormikErrors<IMappingFormValues>;
  touched: FormikTouched<IMappingFormValues>;
  paramsType: IMappingRequestParamType;
  onChange(e: React.ChangeEvent<any>): void;
  onBlur(e: any): void;
  updateParamsType(paramsType: IMappingRequestParamType): void;
}

const BuilderRequest: React.FC<IBuilderRequestProps> = ({
  isOpened,
  onToggle,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  paramsType,
  updateParamsType,
}) => {
  return (
    <React.Fragment>
      <BuilderSectionLabel
        label="Request"
        isOpened={isOpened}
        onToggle={onToggle}
      />
      {isOpened && (
        <Block withLink={true}>
          <Grid>
            <RequestUrl
              values={values}
              errors={errors}
              touched={touched}
              onChange={onChange}
              onBlur={onBlur}
            />
            <RequestUrlDetails
              values={values}
              errors={errors}
              touched={touched}
              onChange={onChange}
              onBlur={onBlur}
            />
            <RequestParamsSwitcher
              paramsType={paramsType}
              values={values}
              onChange={updateParamsType}
            />
            {paramsType === 'query' && (
              <RequestParams
                type="queryParameters"
                label="query parameter"
                values={values}
                errors={errors}
                touched={touched}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            {paramsType === 'headers' && (
              <RequestParams
                type="requestHeaders"
                label="header"
                values={values}
                errors={errors}
                touched={touched}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            {paramsType === 'cookies' && (
              <RequestParams
                type="requestCookies"
                label="cookie"
                values={values}
                errors={errors}
                touched={touched}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          </Grid>
        </Block>
      )}
    </React.Fragment>
  );
};

export default BuilderRequest;
