import { lib, utils } from '@plugandwork/core-ui';

class ContractDocument extends lib.PlugandworkModel {
  static apiType = 'blockchain/documents';

  static d3Compatible = false;

  isAnImage() {
    return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(this.document_type);
  }

  async download() {
    return utils
      .axios({
        url: `${process.env.REACT_APP_PAW_HOST}/${this.paw_doc.file_url}`,
        method: 'GET',
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.paw_doc.title);
        document.body.appendChild(link);
        link.click();
      });
  }
}

export default ContractDocument;
