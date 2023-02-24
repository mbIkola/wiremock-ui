import * as React from 'react';
import { Container } from './Tree_styled';
import TreeNode from './TreeNode';
import { ITreeNode as Node, TreeClickHandler, TreeIconGetter } from '../';

export interface ITreeProps<NodeData> {
  root: Node<NodeData>;
  onClick: TreeClickHandler<NodeData>;
  getIcon?: TreeIconGetter<NodeData>;
  openedIds: string[];
}

const Tree = <NodeData,>({
  root,
  openedIds,
  onClick,
  getIcon,
}: ITreeProps<NodeData>): React.ReactElement => {
  return (
    <Container>
      <TreeNode
        node={root}
        openedIds={openedIds}
        onClick={onClick}
        getIcon={getIcon}
        depth={0}
      />
    </Container>
  );
};

export default Tree;
