import {
  Tree as BaseTree,
  ITreeNode as BaseTreeNode,
  TreeClickHandler as BaseTreeClickHandler,
  TreeIconGetter as BaseTreeIconGetter,
} from 'edikit';
import { IData } from '../../../types';

export type ITreeNode = BaseTreeNode<IData>;

export type ITreeClickHandler = BaseTreeClickHandler<IData>;

export type ITreeIconGetter = BaseTreeIconGetter<IData>;

export const Tree = BaseTree<IData>;
