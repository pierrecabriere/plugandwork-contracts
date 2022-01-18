import React, { useState, useEffect } from 'react';
import Contract from '../models/Contract';
import { models } from '@plugandwork/core-ui';
import { Link } from 'react-router-dom';
import CreateFolderModal from '../modals/CreateFolder';
import ContractDocument from '../models/ContractDocument';

let ContractFolderPage = ({ match, contracts, folders, subfolders, documents }) => {
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  useEffect(() => {
    contracts.updateList({ query: match.params.contractId });
    folders.updateList({ query: match.params.folderId });
    subfolders.updateList({ query: { parent_id: match.params.folderId } });
    documents.updateList({ query: { folder_id: match.params.folderId } });
  }, [match.params.contractId, match.params.folderId]);

  const contract = contracts.list[0];

  if (!contract) {
    return null;
  }

  const folder = folders.list[0];

  if (!folder) {
    return null;
  }

  const renderListFolder = (folder) => {
    return (
      <li>
        <Link to={`/${contract.deal_id}/${contract.id}/${folder.id}`}>- {folder.title}</Link>
      </li>
    );
  };

  const renderListDocument = (doc) => {
    return <li>{doc.title}</li>;
  };

  const renderListItem = (item, type) => {
    switch (type) {
      case 'folder':
        return renderListFolder(item);
      case 'document':
        return renderListDocument(item);
      default:
        return null;
    }
  };

  const loading = subfolders.loading || documents.loading;
  const list = subfolders.list.concat(documents.list).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <h1 className="text-2xl mb-4">
        Contrat "{contract.title}" - Dossier "{folder.title}"
      </h1>

      <Link
        to={
          folder.parent_id
            ? `/${contract.deal_id}/${contract.id}/${folder.parent_id}`
            : `/${contract.deal_id}/${contract.id}`
        }
      >
        .. Revenir au dossier parent
      </Link>

      {loading ? (
        <div>Chargement ...</div>
      ) : (
        <ul>
          {list.map((item) => {
            const type = subfolders.list.includes(item) ? 'folder' : 'document';
            return renderListItem(item, type);
          })}
        </ul>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          setCreateFolderModalOpen(true);
        }}
        type="button"
      >
        Ajouter un sous-dossier
      </button>

      <CreateFolderModal
        contract={contract}
        folder={folder}
        show={createFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
      />
    </div>
  );
};

ContractFolderPage = Contract.connect('contracts')(ContractFolderPage);
ContractFolderPage = models.Folder.connect('folders')(ContractFolderPage);
ContractFolderPage = models.Folder.connect('subfolders')(ContractFolderPage);
ContractFolderPage = ContractDocument.connect('documents')(ContractFolderPage);

export default ContractFolderPage;
