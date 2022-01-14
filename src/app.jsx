import * as React from 'react';
import './index.css';
import Layout from './Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ContractPage from './pages/Contract';
import DashboardPage from './pages/Dashboard';
import ContractFolderPage from './pages/ContractFolder';
import DealPage from './pages/Deal';

class ContractsApp extends React.Component {
  render() {
    const basename = process.env.NODE_ENV === 'development' ? undefined : `/front${this.props.match.url}`;
    return (
      <BrowserRouter basename={basename}>
        <Layout>
          <Switch>
            <Route path="/:dealId/:contractId/:folderId" component={ContractFolderPage} />
            <Route path="/:dealId/:contractId" component={ContractPage} />
            <Route path="/:dealId" component={DealPage} />
            <Route component={DashboardPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default ContractsApp;
