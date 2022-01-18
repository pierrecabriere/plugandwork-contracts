import React, { useEffect, useState } from 'react';
import Contract from '../models/Contract';
import { models } from '@plugandwork/core-ui';
import { Link } from 'react-router-dom';
import CreateFolderModal from '../modals/CreateFolder';

let ContractPage = ({ match, contracts, folders }) => {
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  useEffect(() => {
    contracts.updateList({ query: match.params.contractId });
  }, [match.params.contractId]);

  const contract = contracts.list[0];

  useEffect(() => {
    if (contract) {
      folders.updateList({ query: { parent_id: contract.folder_id } });
    }
  }, [contract?.id]);

  if (!contract) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Contrat "{contract.title}"</h1>

      <ul>
        {folders.list.map((folder) => (
          <li>
            <Link to={`/${contract.deal_id}/${contract.id}/${folder.id}`}>- {folder.title}</Link>
          </li>
        ))}
      </ul>

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
        show={createFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
      />
    </div>
  );
};

ContractPage = Contract.connect('contracts')(ContractPage);
ContractPage = models.Folder.connect('folders')(ContractPage);

export default ContractPage;
