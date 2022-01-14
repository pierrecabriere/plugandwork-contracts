import { models, utils } from '@plugandwork/core-ui';

class User extends models.User {
  static search(term) {
    return utils.axios.get('/api/d3/user/users/', { params: { term } });
  }

  static searchByIds(ids) {
    return utils.axios.get('/api/d3/user/users/', { params: { id: ids } });
  }
}

export default User;
