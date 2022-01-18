import React, { useState } from 'react';
import { models } from '@plugandwork/core-ui';
import { Transition, Dialog } from '@headlessui/react';
import Deal from '../models/Deal';

const CreateDealModal = ({ show, onClose }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const deal = await Deal.create({ name });
      onClose(deal);
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
            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-2">
                Ajouter un deal
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
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
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

export default CreateDealModal;
