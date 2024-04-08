import React, {useState} from 'react';
import RadioGroup from '~/modules/core/components/RadioGroup';
import RadioGroupItem from '~/modules/core/components/RadioGroupItem';
import {Input} from 'edikit';


enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE'
}

export interface IMappingFilter {
    search: string | null,
    method: HTTPMethod | null,
}

export interface IMappingFilterProps {
    onChange: (e: IMappingFilter) => void
}

const SearchInput: React.FC<{
    onChange: (e: React.ChangeEvent<any>) => void;
    value: string;
}> = ({
    onChange = () => void(0) ,
    value= '',
 }) => {
    return <Input value={value} onChange={onChange} name={'search'} />;
};

const HttpMethods : React.FC<{
    onChange: (e: React.ChangeEvent<any>) => void;
    value: HTTPMethod | null;
}> = ({
    onChange = () => void(0),
    value = HTTPMethod.GET
}) => {
    return <select name={'method'} value={value} onChange={onChange}>
        <option value={HTTPMethod.GET}>{HTTPMethod.GET}</option>
        <option value={HTTPMethod.POST}>{HTTPMethod.POST}</option>
        <option value={HTTPMethod.PUT}>{HTTPMethod.PUT}</option>
        <option value={HTTPMethod.DELETE}>{HTTPMethod.DELETE}</option>
        <option value={HTTPMethod.PATCH}>{HTTPMethod.PATCH}</option>
        <option value={HTTPMethod.OPTIONS}>{HTTPMethod.OPTIONS}</option>
        <option value={HTTPMethod.HEAD}>{HTTPMethod.HEAD}</option>
        <option value={HTTPMethod.CONNECT}>{HTTPMethod.CONNECT}</option>
        <option value={HTTPMethod.TRACE}>{HTTPMethod.TRACE}</option>
    </select>;
};

const MappingFilter: React.FC<IMappingFilterProps> = ({
    onChange = () => void(0)
}) => {
    const [filter, setFilter] = useState({ search: '', method: null });

    const [useSearch, setSearchMode] = useState(false);
    const [useMethod, setMethodMode] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<any>) => {
        onChange({
            search: e.target.value,
            method: null
        });

        setFilter({ search: e.target.value, method: filter.method });

        setMethodMode(false);
        setSearchMode(true);
    };
    const handleMethodChange = (e: React.ChangeEvent<any>) => {
        onChange({
            search: null,
            method: e.target.value as HTTPMethod
        });

        setFilter({ search: filter.search, method: e.target.value as HTTPMethod });
        setSearchMode(false);
        setMethodMode(true);
    } ;

    const handleDisableAll = () => {
        onChange({
            search: null,
            method: null
        });
        
        setSearchMode(false);
        setMethodMode(false);
    };

    return <SearchInput onChange={handleSearchChange} value={filter.search} />;

    //
    // return <RadioGroup onChange={onChange} label={'Filter'} name={'mappingFilter'} >
    //     <RadioGroupItem  value={'search'} label={<SearchInput onChange={handleSearchChange} value={filter.search} />} checked={useSearch} />
    //     <RadioGroupItem  value={'method'} label={<HttpMethods onChange={handleMethodChange} value={filter.method} />} checked={useMethod} />
    //     <RadioGroupItem  value={'none'} label={'NONE'} checked={!useMethod && !useSearch} onChange={handleDisableAll} />
    // </RadioGroup>;
};

export default MappingFilter;