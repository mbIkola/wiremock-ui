import * as React from 'react';
import { IMapping, IMappingMode } from '../types';
import MappingJsonEditor from './MappingJsonEditor';
import MappingBuilder from './MappingBuilder';
import { Wrapper, Overlay } from './Mapping_styled';

interface ICreateMappingProps {
  serverName: string;
  creationId: string;
  mapping?: IMapping;
  isCreating: boolean;
  init(): void;
  save(mapping: IMapping): void;
  cancel(): void;
}

const CreateMapping: React.FC<ICreateMappingProps> = ({
  mapping,
  isCreating,
  init,
  save,
}) => {
  const [mode, setMode] = React.useState<IMappingMode>('builder');

  React.useEffect(() => {
    init();
  }, []);

  const setBuilderMode = () => {
    setMode('builder');
  };

  const setJsonMode = () => {
    setMode('json');
  };

  if (mapping === undefined) return null;

  return (
    <Wrapper>
      {mode === 'builder' && (
        <MappingBuilder
          mapping={mapping}
          isLoading={isCreating}
          save={save}
          mode={mode}
          setBuilderMode={setBuilderMode}
          setJsonMode={setJsonMode}
        />
      )}
      {mode === 'json' && (
        <MappingJsonEditor
          mapping={mapping}
          isLoading={isCreating}
          save={save}
          mode={mode}
          setBuilderMode={setBuilderMode}
          setJsonMode={setJsonMode}
        />
      )}
      {isCreating && <Overlay />}
    </Wrapper>
  );
};

export default CreateMapping;
