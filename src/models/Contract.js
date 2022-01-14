import { models, lib, utils } from '@plugandwork/core-ui';
import ContractDocument from './ContractDocument';

const { Folder } = models;

class Contract extends lib.PlugandworkModel {
  static apiType = 'blockchain/records';

  static d3Compatible = false;

  static providers = () => utils.axios.get('/api/d2/blockchain/records/providers');

  async fetchDocuments(folderId) {
    return Contract.fetch(`${this.id}/documents?folder_id=${folderId}`)
      .then((response) => {
        response = response.map((doc) => new ContractDocument(doc));
        return response;
      })
      .catch((err) => err);
  }

  async fetchFolders(folderId = '') {
    return Folder.fetch({ parent_id: folderId })
      .then((response) => response.map((doc) => new Folder(doc)))
      .catch((err) => err);
  }

  async _uploadFiles(folderId, files, callback = undefined) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('folder_id', folderId);
    return utils.axios.post(`/api/d2/blockchain/records/${this.id}/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        if (callback) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          callback(progress);
        }
      },
    });
  }

  addDocuments(ids, folderId) {
    return new Promise(async (resolveAddDocs, rejectAddDocs) => {
      try {
        const selection = Array.isArray(ids) ? ids.map((id) => `doc_ids[]=${id}`).join('&') : `space_ids[]=${ids}`;
        const response = await utils.axios.put(
          `/api/d2/blockchain/records/${this.id}/add_documents?${selection}&folder_id=${folderId}`
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        ContractDocument.clearCache();
        ContractDocument.store.dispatch({ type: 'REINIT' });
        resolveAddDocs(response);
      } catch (error) {
        rejectAddDocs(error);
      }
    });
  }

  async get_signature() {
    const { data } = await utils.axios.get(`/api/d2/blockchain/records/${this.id}/get_signature`);
    this.signed = true;
    this.constructor.store.dispatch({ type: 'UPDATE', payload: data.data });
    this.constructor.clearCache();
  }

  async activate() {
    const { data } = await utils.axios.post(`/api/d2/blockchain/records/${this.id}/activate_contract`);
    this.blockchained = true;
    this.constructor.store.dispatch({ type: 'UPDATE', payload: data.data });
    this.constructor.clearCache();
  }

  async getRemoteStatus() {
    const { data } = await utils.axios.get(`/api/d2/blockchain/records/${this.id}/get_remote_status`);
    //this.blockchained = true;
    this.constructor.store.dispatch({ type: 'UPDATE', payload: data.data });
    this.constructor.clearCache();
  }

  async addContact(contactId) {
    const readers = this.readers || [];
    if (!readers.includes(contactId)) {
      readers.push(contactId);
    }
    await this.update({ readers });
  }

  async removeContact(contactId) {
    const readers = (this.readers || []).filter((r) => r !== contactId);
    return this.update({ readers });
  }

  async downloadZip() {
    return utils
      .axios({
        url: `/api/d2/contacts/records/${this.id}/zip`,
        method: 'GET',
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `contract_${this.title}_${this.id}.zip`);
        document.body.appendChild(link);
        link.click();
      });
  }

  refresh() {
    this.constructor.clearCache();
  }
}

export default Contract;
