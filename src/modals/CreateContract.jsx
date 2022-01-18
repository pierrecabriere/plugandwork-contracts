import React, { useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import AsyncSelect from 'react-select/async';
import ContractProvider from '../models/ContractProvider';
import Contract from '../models/Contract';

const ProviderPicker = ({ value, onChange }) => {
  const _promiseProvidersOptions = async (inputValue) => {
    const res = await ContractProvider.fetch({});
    return res
      .filter((cp) => cp.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map((p) => ({ label: p.name, value: p.id }));
  };

  let _value = value;
  if (typeof _value === 'string') {
    const cp = ContractProvider.get(_value, false);
    if (cp) {
      _value = { label: cp.name, value: cp.id };
    } else {
      _value = null;
    }
  }

  return (
    <AsyncSelect
      value={_value}
      onChange={({ value }) => onChange(value)}
      placeholder="Nom du fournisseur"
      cacheOptions
      defaultOptions
      loadOptions={_promiseProvidersOptions}
    />
  );
};

const CreateContractModal = ({ deal, show, onClose }) => {
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const contract = await Contract.create({
        title,
        provider_id: provider || undefined,
        deal_id: deal.id,
        // deal_name: deal.name,
      });
      onClose(contract);
    } catch (e) {
      setLoading(false);
      alert('Une erreur est survenue lors de la création du deal.');
    }
  };

  return (
    <Transition show={show} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-2">
                Ajouter un contrat
              </Dialog.Title>
              <form
                onSubmit={loading ? (e) => e.preventDefault() : _handleSubmit}
                className={`${loading ? 'opacity-50' : ''}`}
              >
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nom du deal"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                  />
                </div>

                <div className="mt-2">
                  <ProviderPicker value={provider} onChange={setProvider} />
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Valider
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateContractModal;
