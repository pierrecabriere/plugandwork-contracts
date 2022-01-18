import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHome, faPlus } from '@fortawesome/pro-regular-svg-icons';
import Deal from '../models/Deal';
import NavLink from '../utils/NavLink';
import Contract from '../models/Contract';
import CreateDealModal from '../modals/CreateDeal';
import CreateContractModal from '../modals/CreateContract';

let SidebarNavDealContractsList = ({ deal, contracts }) => {
  const [createContractModalOpen, setCreateContractModalOpen] = useState(false);

  useEffect(() => {
    contracts.updateList({ query: { deal_id: deal.id } });
  }, [deal.id]);

  return (
    <div className="space-y-1 w-full" id={`sub-menu-${deal.id}`} onClick={(e) => e.stopPropagation()}>
      {contracts.loading ? (
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          type="button"
          className="cursor-pointer text-left text-gray-300 hover:bg-gray-700 hover:text-white block group py-2 pl-6 px-2 text-sm font-medium rounded-md w-full space-y-1"
        >
          Chargement ...
        </button>
      ) : (
        contracts.list.map((contract) => (
          <NavLink
            to={`/${deal.id}/${contract.id}`}
            className={(isActive) =>
              `${
                isActive ? 'bg-gray-900 text-gray-300' : 'text-gray-500 hover:bg-gray-900 hover:text-gray-300'
              } block group py-2 pl-6 px-2 text-sm font-medium rounded-md w-full space-y-1`
            }
          >
            {contract.title}
          </NavLink>
        ))
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          setCreateContractModalOpen(true);
        }}
        type="button"
        className="cursor-pointer text-left text-gray-300 hover:bg-gray-700 hover:text-white block group py-2 pl-6 px-2 text-sm font-medium rounded-md w-full space-y-1"
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

SidebarNavDealContractsList = Contract.connect('contracts')(SidebarNavDealContractsList);

let SidebarNav = ({ deals }) => {
  const [createDealModalOpen, setCreateDealModalOpen] = useState(false);

  return (
    <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
      <div>
        <NavLink
          to="/"
          exact
          className={(isActive) =>
            `${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`
          }
        >
          <div className="h-6 w-6 flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faHome} />
          </div>
          Dashboard
        </NavLink>
      </div>

      {deals.loading ? (
        <div>
          <button
            type="button"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
          >
            Chargement ...
          </button>
        </div>
      ) : (
        deals.list.map((deal) => {
          return (
            <NavLink
              key={deal.id}
              to={`/${deal.id}`}
              className={(isActive) =>
                `${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } block group px-2 py-2 text-base font-medium rounded-md w-full space-y-2`
              }
            >
              {(isActive) => (
                <>
                  <button
                    type="button"
                    className={`flex items-center`}
                    aria-controls={`sub-menu-${deal.id}`}
                    aria-expanded={isActive}
                  >
                    <svg
                      className={`${
                        isActive ? 'text-gray-400 rotate-90' : 'text-gray-300'
                      } mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150`}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                    {deal.name}
                  </button>

                  {isActive ? <SidebarNavDealContractsList deal={deal} /> : null}
                </>
              )}
            </NavLink>
          );
        })
      )}

      <div>
        <button
          onClick={() => setCreateDealModalOpen(true)}
          type="button"
          className={`text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
        >
          <div className="h-6 w-6 flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          Ajouter un deal
        </button>
      </div>

      <CreateDealModal show={createDealModalOpen} onClose={() => setCreateDealModalOpen(false)} />
    </nav>
  );
};

SidebarNav = Deal.connect('deals', { query: {} })(SidebarNav);

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-20 md:hidden" onClose={onClose}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="p-2 relative flex-1 flex flex-col ml-auto max-w-screen-md w-full bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12">
                <button
                  type="button"
                  className="mt-2 mr-2 flex items-center justify-center h-10 w-10 rounded-full"
                  onClick={() => onClose()}
                >
                  <span className="sr-only">Close sidebar</span>
                  <div className="h-6 w-6 text-white flex items-center justify-center">
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </div>
                </button>
              </div>

              <div className="flex-1 h-0 overflow-y-auto">
                <SidebarNav />
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true" />
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col overflow-y-auto py-4">
            <SidebarNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
