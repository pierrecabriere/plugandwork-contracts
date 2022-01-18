import React, { useEffect, useState } from 'react';
import Deal from '../models/Deal';
import Contract from '../models/Contract';
import CreateContractModal from '../modals/CreateContract';
import { Link } from 'react-router-dom';

let DealPage = ({ deals, contracts, match }) => {
  const [createContractModalOpen, setCreateContractModalOpen] = useState(false);

  useEffect(() => {
    deals.updateList({ query: match.params.dealId });
    contracts.updateList({ query: { deal_id: match.params.dealId } });
  }, [match.params.dealId]);

  const deal = deals.list[0];

  if (!deal) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Deal "{deal.name}"</h1>

      <ul>
        {contracts.list.map((contract) => (
          <Link to={`/${contract.deal_id}/${contract.id}`}>- {contract.title}</Link>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.preventDefault();
          setCreateContractModalOpen(true);
        }}
        type="button"
      >
        Ajouter un contrat
      </button>

      <CreateContractModal
        deal={deal}
        show={createContractModalOpen}
        onClose={() => setCreateContractModalOpen(false)}
      />
    </div>
  );
};

DealPage = Deal.connect('deals')(DealPage);
DealPage = Contract.connect('contracts')(DealPage);

export default DealPage;
