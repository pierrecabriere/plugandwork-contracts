import { models, lib, utils } from '@plugandwork/core-ui';

class Deal extends lib.PlugandworkModel {
  static apiType = 'blockchain/deals';

  static d3Compatible = false;

  static providers = () => utils.axios.get('/api/d2/blockchain/records/providers');
}

export default Deal;
