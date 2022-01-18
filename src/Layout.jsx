import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import Sidebar from './components/Sidebar';

const Layout = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-row h-full">
      <Sidebar isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />

      <main className="flex-grow w-full bg-gray-100 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/*<div className="z-10 flex-shrink-0 flex h-16 border-b border-gray-300 mt-2">*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"*/}
          {/*    onClick={() => setMenuOpen(true)}*/}
          {/*  >*/}
          {/*    <span className="sr-only">Open sidebar</span>*/}
          {/*    /!* Heroicon name: outline/menu-alt-2 *!/*/}
          {/*    <svg*/}
          {/*      className="h-6 w-6"*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*      fill="none"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*      stroke="currentColor"*/}
          {/*      aria-hidden="true"*/}
          {/*    >*/}
          {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />*/}
          {/*    </svg>*/}
          {/*  </button>*/}
          {/*  <div className="flex-1 px-4 flex justify-between">*/}
          {/*    <div className="flex-1 flex">*/}
          {/*      <form className="w-full flex md:ml-0" action="#" method="GET" onSubmit={(e) => e.preventDefault()}>*/}
          {/*        <label htmlFor="search-field" className="sr-only">*/}
          {/*          Rechercher*/}
          {/*        </label>*/}
          {/*        <div className="relative w-full text-gray-400 focus-within:text-gray-600">*/}
          {/*          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">*/}
          {/*            <div className="h-6 w-6 flex items-center justify-center">*/}
          {/*              <FontAwesomeIcon icon={faSearch} />*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <input*/}
          {/*            id="search-field"*/}
          {/*            className="block w-full h-full pl-8 pr-3 py-2 bg-transparent border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"*/}
          {/*            placeholder="Rechercher"*/}
          {/*            type="search"*/}
          {/*            name="search"*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*      </form>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="py-6">{props.children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
