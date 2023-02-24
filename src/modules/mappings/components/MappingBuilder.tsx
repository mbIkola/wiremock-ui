import * as React from 'react';
import { FormikProps, withFormik } from 'formik';
import { Builder, Block, Input } from 'edikit';
import {
  IMapping,
  IMappingFormValues,
  IMappingRequestParamType,
} from '../types';
import { mappingValidationSchema } from '../validation';
import { mappingToFormValues, mappingFormValuesToMapping } from '../dto';
import { Container, Content } from './Mapping_styled';
import MappingBar from './MappingBar';
import { Grid } from './builder/Builder_styled';
import BuilderRequest from './builder/BuilderRequest';
import BuilderResponse from './builder/BuilderResponse';

interface IMappingBuilderProps {
  mapping: IMapping;
  isLoading: boolean;
  sync?: (values: IMapping) => void;
  save(values: IMapping): void;
  deleteMapping?: () => void;
  mode: 'builder' | 'json';
  setBuilderMode(): void;
  setJsonMode(): void;
}

const enhance = withFormik<IMappingBuilderProps, IMappingFormValues>({
  enableReinitialize: true,
  isInitialValid: true,
  mapPropsToValues: props => {
    return mappingToFormValues(props.mapping);
  },
  validationSchema: mappingValidationSchema,
  handleSubmit: (values, { props: { save } }) => {
    save(mappingFormValuesToMapping(values));
  },
});

const MappingBuilder: React.FC<
  IMappingBuilderProps & FormikProps<IMappingFormValues>
> = ({
  isLoading,
  deleteMapping,
  values,
  errors,
  touched,
  handleChange,
  mode,
  sync: _sync,
  setBuilderMode,
  setJsonMode,
  submitForm,
  handleBlur: _handleBlur,
}) => {
  const [isRequestOpened, setIsRequestOpened] = React.useState(true);
  const [isResponseOpened, setIsResponseOpened] = React.useState(true);
  const [requestParamsType, setRequestParamsType] =
    React.useState<IMappingRequestParamType>('query');

  const sync = () => {
    if (_sync) {
      _sync(mappingFormValuesToMapping(values));
    }
  };

  const handleBlur = (e: React.SyntheticEvent) => {
    _handleBlur(e);
    if (sync !== undefined) sync();
  };

  const toggleRequest = () => {
    setIsRequestOpened(!isRequestOpened);
  };

  const toggleResponse = () => {
    setIsResponseOpened(!isResponseOpened);
  };

  const updateRequestParamsType = (
    requestParamsType: IMappingRequestParamType,
  ) => {
    setRequestParamsType(requestParamsType);
  };

  return (
    <Container>
      <MappingBar
        mode={mode}
        setBuilderMode={setBuilderMode}
        setJsonMode={setJsonMode}
        save={submitForm}
        deleteMapping={deleteMapping}
      />
      <Content isLoading={isLoading}>
        <Builder>
          <Block withLink={true}>
            <Grid>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  gridColumnStart: 2,
                  gridColumnEnd: 9,
                }}
              />
            </Grid>
          </Block>
          <BuilderRequest
            isOpened={isRequestOpened}
            onToggle={toggleRequest}
            values={values}
            touched={touched}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            paramsType={requestParamsType}
            updateParamsType={updateRequestParamsType}
          />
          <BuilderResponse
            isOpened={isResponseOpened}
            onToggle={toggleResponse}
            values={values}
            touched={touched}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            sync={sync}
          />
        </Builder>
      </Content>
    </Container>
  );
};

export default enhance(MappingBuilder);
