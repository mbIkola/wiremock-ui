import * as React from 'react';
import { IServer } from '../../servers';
import { IMapping, IMappingMode } from '../types';
import MappingJsonEditor from './MappingJsonEditor';
import MappingBuilder from './MappingBuilder';
import { Wrapper, Overlay } from './Mapping_styled';

interface IMappingProps {
  serverName: string;
  mappingId: string;
  server?: IServer;
  mapping?: IMapping;
  isLoading: boolean;
  fetchMapping(): void;
  initWorkingCopy(): void;
  syncWorkingCopy(update: Partial<IMapping>): void;
  updateMapping(update: IMapping): void;
  deleteMapping(): void;
}

const Mapping: React.FC<IMappingProps> = ({
  mappingId,
  mapping,
  isLoading,
  syncWorkingCopy,
  updateMapping,
  deleteMapping,
  initWorkingCopy,
}) => {
  const [mode, setMode] = React.useState<IMappingMode>('builder');

  React.useEffect(() => {
    initWorkingCopy();
  }, [mappingId]);

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
          isLoading={isLoading}
          save={updateMapping}
          sync={syncWorkingCopy}
          deleteMapping={deleteMapping}
          mode={mode}
          setBuilderMode={setBuilderMode}
          setJsonMode={setJsonMode}
        />
      )}
      {mode === 'json' && (
        <MappingJsonEditor
          mapping={mapping}
          isLoading={isLoading}
          save={updateMapping}
          sync={syncWorkingCopy}
          deleteMapping={deleteMapping}
          mode={mode}
          setBuilderMode={setBuilderMode}
          setJsonMode={setJsonMode}
        />
      )}
      {isLoading && <Overlay />}
    </Wrapper>
  );
};

export default Mapping;
