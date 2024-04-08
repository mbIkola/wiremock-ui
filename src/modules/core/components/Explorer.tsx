import * as React from 'react';
import {withTheme} from 'styled-components';
import {Server as ServerIcon, PlusCircle} from 'react-feather';
import {Button, IPaneContent, ITheme} from 'edikit';
import {Tree, ITreeNode} from './Tree';
import {IData} from '../../../types';
import {IServer} from '../../servers';
import MapingIcon from '../../mappings/components/MappingIcon';
import MappingFilter from "~/modules/core/components/MappingFilter";
import {useEffect} from "react";

export interface IExplorerProps {
    tree: ITreeNode;
    servers: IServer[];

    loadServerMappings(server: IServer): void;

    addContentToCurrentPane(content: IPaneContent<IData>): void;

    theme: ITheme;
}

const Explorer: React.FC<IExplorerProps> = ({
                                                tree,
                                                servers,
                                                loadServerMappings,
                                                addContentToCurrentPane,
                                                theme,
                                            }) => {
    const [openedIds, setOpenedIds] = React.useState(['root']);

    const getTreeNodeIcon = (node: ITreeNode): React.ReactNode => {
        if (node.type === 'server') {
            return <ServerIcon size={12} color={theme.colors.accent}/>;
        }

        if (node.type === 'server.create' || node.type === 'mapping.create') {
            return <PlusCircle size={14} color={theme.colors.accent}/>;
        }

        if (node.type === 'mapping') {
            return <MapingIcon/>;
        }

        return;
    };

    const handleNodeClick = (node: ITreeNode) => {
        if (node.type === 'server.create') {
            addContentToCurrentPane({
                id: 'server.create',
                type: 'server.create',
                isCurrent: true,
                isUnique: true,
            });
        }

        if (node.type === 'mappings' && node.data !== undefined) {
            const server = servers.find(s => s.name === node.data!.serverName);
            if (server !== undefined) {
                loadServerMappings(server);
            }
        }

        if (node.type === 'mapping' && node.data !== undefined) {
            const server = servers.find(s => s.name === node.data!.serverName);
            if (server !== undefined) {
                addContentToCurrentPane({
                    id: node.id,
                    type: 'mapping',
                    isCurrent: true,
                    isUnique: false,
                    data: {
                        serverName: server.name,
                        mappingId: node.data.mappingId,
                    },
                });
            }
        }

        if (node.type === 'server.create') {
            addContentToCurrentPane({
                id: 'server.create',
                type: 'server.create',
                isCurrent: true,
                isUnique: true,
            });
        }

        if (node.type === 'mapping.create' && node.data !== undefined) {
            addContentToCurrentPane({
                id: node.id,
                type: 'mapping.create',
                isCurrent: true,
                isUnique: false,
                data: {
                    serverName: node.data.serverName,
                    creationId: node.data.creationId,
                },
            });
        }

        if (openedIds.includes(node.id)) {
            setOpenedIds(openedIds => openedIds.filter(id => id !== node.id));
        } else {
            setOpenedIds(openedIds => [...openedIds, node.id]);
        }
    };

    const [searchFilter, setSearchFilter] = React.useState('');

    const [filteredTree, setFilteredTree] = React.useState<ITreeNode>(tree);

    useEffect(() => {

        const filterTree = (node: ITreeNode): ITreeNode => {

            if ( node.children || node.label.toLowerCase().includes(searchFilter.toLowerCase()) ) {
                return {
                    ...node,
                    children: node.children
                        ? node.children.map(filterTree).filter(child => child !== undefined)
                        : undefined
                };
            }

            return;
        };

        setFilteredTree(filterTree(tree));

    }, [searchFilter, tree]);

    return (
        <div>
            <MappingFilter
                onChange={(e) => {
                    setSearchFilter(e.search);
                }}
            />

            <Tree
                root={filteredTree}
                openedIds={openedIds}
                getIcon={getTreeNodeIcon}
                onClick={handleNodeClick}
            />
        </div>
    );

};

export default withTheme(Explorer);
