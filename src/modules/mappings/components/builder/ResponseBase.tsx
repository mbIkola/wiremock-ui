import * as React from 'react';
import {Trash2, PlusCircle} from 'react-feather';
import {FieldArray, FormikErrors, FormikTouched, getIn} from 'formik';
import {Button, Input, ITheme} from 'edikit';
import {IMappingFormValues} from '../../types';
import AceEditor from "react-ace";
import styled, {withTheme} from "styled-components";


const EditorContainer = styled.div`
    display: inline-grid;
    grid-column-start: 1;
    grid-column-end: 9;
    margin-top: 12px;
    margin-bottom: 12px;
`;
interface IResponseBaseProps {
    values: IMappingFormValues;
    errors: FormikErrors<IMappingFormValues>;
    touched: FormikTouched<IMappingFormValues>;

    onChange(e: React.ChangeEvent<any>): void;

    onBlur(e: any): void;

    sync(): void;

    theme: ITheme;
}

const ResponseBase: React.FC<IResponseBaseProps> = ({
                                                        values,
                                                        errors,
                                                        touched,
                                                        onChange,
                                                        onBlur,
                                                        sync,
                                                        theme
                                                    }) => {


    const responseBody = '';

    return (
        <FieldArray
            name="responseHeaders"
            render={helpers => {
                return (
                    <React.Fragment>
                        <Button
                            variant="default"
                            icon={<PlusCircle size={14}/>}
                            iconPlacement="append"
                            style={{
                                height: '30px',
                                gridColumnStart: 1,
                                gridColumnEnd: 3,
                            }}
                            onClick={() => {
                                helpers.push({key: '', value: ''});
                                sync();
                            }}
                        >
                            Header
                        </Button>
                        <label
                            htmlFor="responseStatus"
                            style={{
                                gridColumnStart: 4,
                            }}
                        >
                            Status
                        </label>
                        <Input
                            id="responseStatus"
                            value={values.responseStatus}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        {errors.responseStatus && touched.responseStatus && (
                            <div
                                style={{color: 'red', gridColumnStart: 6, gridColumnEnd: 9}}
                            >
                                {errors.responseStatus}
                            </div>
                        )}
                        {values.responseHeaders &&
                            values.responseHeaders.length > 0 &&
                            values.responseHeaders.map((header, index) => (
                                <React.Fragment key={index}>
                                    <Input
                                        name={`responseHeaders.${index}.key`}
                                        value={header.key}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="header name"
                                        style={{
                                            gridColumnStart: 1,
                                            gridColumnEnd: 4,
                                        }}
                                    />
                                    <Input
                                        name={`responseHeaders.${index}.value`}
                                        value={header.value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="header value"
                                        style={{
                                            gridColumnStart: 4,
                                            gridColumnEnd: 8,
                                        }}
                                    />
                                    <div>
                                        <Button
                                            onClick={() => {
                                                helpers.remove(index);
                                                sync();
                                            }}
                                            variant="danger"
                                            icon={<Trash2 size={16}/>}
                                            style={{
                                                height: '30px',
                                            }}
                                        />
                                    </div>
                                    {getIn(errors, `responseHeaders.${index}.key`) &&
                                        getIn(touched, `responseHeaders.${index}.key`) && (
                                            <div
                                                style={{
                                                    color: 'red',
                                                    gridColumnStart: 1,
                                                    gridColumnEnd: 4,
                                                }}
                                            >
                                                {getIn(errors, `responseHeaders.${index}.key`)}
                                            </div>
                                        )}
                                    {getIn(errors, `responseHeaders.${index}.value`) &&
                                        getIn(touched, `responseHeaders.${index}.value`) && (
                                            <div
                                                style={{
                                                    color: 'red',
                                                    gridColumnStart: 4,
                                                    gridColumnEnd: 8,
                                                }}
                                            >
                                                {getIn(errors, `responseHeaders.${index}.value`)}
                                            </div>
                                        )}
                                </React.Fragment>
                            ))}

                        <label htmlFor={'response-body-editor'}>Body</label>

                        <EditorContainer>

                            <AceEditor
                                mode="json"
                                theme={theme.editor.theme}
                                value={responseBody}
                                readOnly={false}
                                minLines={10}
                                maxLines={30}
                                name="response-body-editor"
                                showPrintMargin={false}
                                showGutter={true}
                                highlightActiveLine={true}
                                editorProps={{
                                    $blockScrolling: Infinity,
                                }}
                                fontSize={12}
                                wrapEnabled={false}
                                width="100%"
                                height="100%"
                                setOptions={{
                                    showLineNumbers: true,
                                    tabSize: 4,
                                }}
                            />
                        </EditorContainer>

                    </React.Fragment>
                );
            }}
        />
    );
};

export default withTheme(ResponseBase);
