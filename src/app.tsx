import * as React from 'react';
import { PawViewProps } from 'plugandwork-toolkit';
import isEqual from 'fast-deep-equal';
import './index.scss';
import { faBookmark, faEnvelope, faMailbox, faPaperPlane, faPlus } from '@fortawesome/pro-light-svg-icons';
import {
  faBookmark as farBookmark,
  faEmptySet,
  faPaperclip,
  faReply,
  faShare,
} from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasBookmark } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import 'moment/locale/fr';
import { dialog, DialogContainer } from 'react-dials';
import CreateMailModal from './components/CreateMailModal';
import { Editor } from '@tinymce/tinymce-react';

// Keep it
require('./index.css');

interface IEmailsAppProps extends PawViewProps {
  settings: any;
  contexts: any;
  docs: any;
  user: any;
}

class EmailsApp extends React.Component<IEmailsAppProps, any> {
  state = {
    openedMail: null,
  };

  boxes: any = [];

  constructor(props: IEmailsAppProps) {
    super(props);

    this.boxes = [
      {
        title: 'Boîte de réception',
        search_params: {
          type: 'email',
          superfields: { mail_from_not_equal: props.user?.email },
        },
        icon: faMailbox,
      },
      {
        title: 'Enregistrés',
        search_params: {
          type: 'email',
          superfields: { bookmark: true },
        },
        icon: faBookmark,
      },
      {
        title: 'Envoyés',
        search_params: {
          type: 'email',
          mail_from_me: true,
        },
        icon: faPaperPlane,
      },
    ];
  }

  componentDidMount() {
    this.props.docs.configure({
      query: this.boxes[0].search_params,
    });
  }

  componentDidUpdate(prevProps: Readonly<IEmailsAppProps>, prevState: any, snapshot?: any) {
    // @ts-ignore
    if (
      this.state.openedMail !== prevState.openedMail &&
      this.state.openedMail &&
      // @ts-ignore
      !this.state.openedMail.superfields.read
    ) {
      // @ts-ignore
      this.state.openedMail.update({ superfields: { ...this.state.openedMail.superfields, read: true } });
    }

    if (this.props.docs.query !== prevProps.docs.query) {
      this.setState({ openedMail: null });
    }
  }

  handleOpenMail = (doc: any) => {
    this.setState({ openedMail: doc });
  };

  handleToggleBookmark = async (doc: any, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    doc.update({ superfields: { ...doc.superfields, bookmark: !doc.superfields.bookmark } });
  };

  handleAttachmentsPreview = async (doc: any, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const _dialog = dialog(
      <div className="modal-container" onMouseDown={() => _dialog.close()}>
        <div className="modal-dialog modal-lg" role="document" onMouseDown={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Pièces jointes ({doc.superfields.mail_attachments?.length})</h5>
              <button aria-label="Close" className="close" onClick={() => _dialog.close()} type="button">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {doc.superfields.mail_attachments.map((url: string) => (
                  <li className="list-group-item">
                    <img src={url} alt="" height="50" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => _dialog.close()} type="button">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  handleCreateMail = (doc?: any, type?: string) => {
    const _dialog = dialog(
      <CreateMailModal
        onClose={() => _dialog.close()}
        doc={doc}
        type={type}
        onAdd={() => {
          alert("L'email a bien été envoyé");
          _dialog.close();
        }}
      />
    );
  };

  renderMailBoxes() {
    return (
      <div className="email-toolbars-wrapper">
        <div className="toolbar-header">
          <button type="button" className="btn btn-lg btn-block btn-compose-mail" onClick={this.handleCreateMail}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp; Nouveau mail
          </button>
        </div>
        <div className="toolbar-body">
          <div className="toolbar-title">Dossiers</div>
          <ul className="toolbar-menu">
            <div className="list-group">
              {this.boxes
                .concat(this.props.contexts.list)
                .concat(this.props.settings.folders)
                .map((box: any) => (
                  <li
                    className={`${isEqual(box.search_params, this.props.docs.query) ? 'active' : ''}`}
                    onClick={() => this.props.docs.configure({ query: box.search_params })}
                  >
                    <FontAwesomeIcon icon={box.icon || faEnvelope} />
                    <a href="#">{box.title}</a>
                    {/*<span className="badge badge-sb-base">8</span>*/}
                  </li>
                ))}
            </div>
          </ul>
          {/*}
            <div className="contact-header">
              <div className="contact-left">
                <h5 className="title">Contacts</h5>
                <span className="badge badge-sb-success">10</span>
              </div>
              <div className="dropdown">
                <button className="btn btn-sm btn-flash-primary" type="button" id="product-action-pane" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical toolbar-icon">
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={12} cy={5} r={1} />
                    <circle cx={12} cy={19} r={1} />
                  </svg>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li className="dropdown-item"><span className="dropdown-title">Action Pane</span></li>
                  <li className="dropdown-item">
                    <a className="dropdown-link" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-printer">
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x={6} y={14} width={12} height={8} />
                      </svg>
                      Print
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="dropdown-link" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-delete">
                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                        <line x1={18} y1={9} x2={12} y2={15} />
                        <line x1={12} y1={9} x2={18} y2={15} />
                      </svg>
                      Remove
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="dropdown-link" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-send">
                        <line x1={22} y1={2} x2={11} y2={13} />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Email
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="dropdown-link" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1={16} y1={13} x2={8} y2={13} />
                        <line x1={16} y1={17} x2={8} y2={17} />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      Export as PDF
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="dropdown-link" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      Save as Bookmark
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="contact-list">
              <li className="contact-list-item">
                <a href="#">
                      <span className="pro-pic">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Profile Picture" />
                        <i className="active">&nbsp;</i>
                      </span>
                  <div className="user">
                    <p className="user-name">Poul Smith</p>
                    <p className="user-designation">Founder @ Maxx</p>
                  </div>
                </a>
              </li>
              <li className="contact-list-item">
                <a href="#">
                      <span className="pro-pic">
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Support User" title="Support User" />
                        <i className="active">&nbsp;</i>
                      </span>
                  <div className="user">
                    <p className="user-name">John Wick</p>
                    <p className="user-designation">CTO @ Lax</p>
                  </div>
                </a>
              </li>
              <li className="contact-list-item">
                <a href="#">
                      <span className="pro-pic">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Support User" title="Support User" />
                        <i className="busy">&nbsp;</i>
                      </span>
                  <div className="user">
                    <p className="user-name">Susan Don</p>
                    <p className="user-designation">CEO @ Don Co.</p>
                  </div>
                </a>
              </li>
              <li className="contact-list-item">
                <a href="#">
                      <span className="pro-pic">
                        <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="profile pic" title="profile pic" />
                        <i className="busy">&nbsp;</i>
                      </span>
                  <div className="user">
                    <p className="user-name">Sam Doe</p>
                    <p className="user-designation">Tech Lead @ Poll</p>
                  </div>
                </a>
              </li>
              <li className="contact-list-item">
                <a href="#">
                      <span className="pro-pic">
                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="Support User" title="Support User" />
                        <i className="inactive">&nbsp;</i>
                      </span>
                  <div className="user">
                    <p className="user-name">John Smith</p>
                    <p className="user-designation">Founder @ Dove</p>
                  </div>
                </a>
              </li>
            </ul>*/}
        </div>
      </div>
    );
  }

  renderMailList() {
    if (!this.props.docs.query || !Object.keys(this.props.docs.query).length) {
      return null;
    }

    if (!this.props.docs.list?.length && !this.props.docs.loading) {
      return (
        <div className="email-list-wrapper">
          <div className="email-list-baseline">
            <FontAwesomeIcon icon={faEmptySet} />
            Aucun nouveau mail
            <br />
            dans ce dossier
          </div>
        </div>
      );
    } else if (this.props.docs.loading) {
      return (
        <div className="email-list-wrapper">
          <div className="email-list-baseline">Chargement des mails</div>
        </div>
      );
    }

    return (
      <div className="email-list-wrapper">
        <div className="email-list-header">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-flash-border-base shadow-none dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Trié par date
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li className="dropdown-item">
                <a className="dropdown-link" href="#">
                  Focused
                </a>
              </li>
              <li className="dropdown-item">
                <a className="dropdown-link" href="#">
                  Others
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="email-app-body" className="email-list-scroll-container ps ps--active-y">
          <ul className="email-list">
            {this.props.docs.list.map((doc: any) => (
              <li
                className={`email-list-item ${doc === this.state.openedMail ? 'active' : ''}`}
                onClick={() => this.handleOpenMail(doc)}
              >
                <div className="recipient">
                  <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Profile Picture" />
                  <a href="#" className="recipient-name">
                    {doc.superfields.mail_from || 'Expéditeur inconnu'}
                  </a>
                </div>
                <a href="#" className="email-subject">
                  {doc.superfields.mail_subject || ''}
                  {!doc.superfields.read ? <i className="unread">&nbsp;</i> : null}
                </a>
                <div className="email-footer">
                  <div className="email-action">
                    <a href="#" className="important" onClick={(e) => this.handleToggleBookmark(doc, e)}>
                      <FontAwesomeIcon icon={doc.superfields.bookmark ? fasBookmark : farBookmark} />
                    </a>
                    {/*<a href="#" className="starred">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </a>*/}
                    {doc.superfields.mail_attachments?.length ? (
                      <a href="#" className="attachment" onClick={(e) => this.handleAttachmentsPreview(doc, e)}>
                        <FontAwesomeIcon icon={faPaperclip} />
                      </a>
                    ) : null}
                  </div>
                  <span className="email-time">
                    {doc.superfields.mail_date ? moment(doc.superfields.mail_date).format('LL') : 'Date inconnue'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  renderMailContent() {
    if (!this.state.openedMail) {
      return null;
    }

    const doc: any = this.state.openedMail;

    return (
      <div className="email-desc-wrapper">
        <div className="email-header">
          <div className="email-date">
            {doc.superfields.mail_date ? moment(doc.superfields.mail_date).format('LLLL') : 'Date inconnue'}
          </div>
          <div className="email-subject">{doc.superfields.mail_subject || 'Aucun sujet'}</div>
          <p className="recipient">
            <span>De:</span> &lt;{doc.superfields.mail_from || 'Expéditeur inconnu'}&gt;
          </p>
        </div>
        <div className="email-body" dangerouslySetInnerHTML={{ __html: doc.superfields.body }} />
        {doc.superfields.mail_attachments?.length ? (
          <div className="email-attachment">
            <div className="file-info">
              <div className="file-size">
                <FontAwesomeIcon icon={faPaperclip} />
                <span>Pièces jointes ({doc.superfields.mail_attachments.length})</span>
              </div>
              <button className="btn btn-sm btn-soft-base" onClick={(e) => this.handleAttachmentsPreview(doc, e)}>
                Voir toutes
              </button>
            </div>
            <ul className="attachment-list">
              {doc.superfields.mail_attachments.map((url: string) => (
                <li className="attachment-list-item">
                  <img src={url} alt="" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="email-action">
          <button className="btn btn-base" onClick={() => this.handleCreateMail(doc, 'reply')}>
            <FontAwesomeIcon icon={faReply} />
            &nbsp;Répondre
          </button>
          <button className="btn btn-info" onClick={() => this.handleCreateMail(doc, 'forward')}>
            <FontAwesomeIcon icon={faShare} />
            &nbsp;Faire suivre
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="email-app card-margin">
        <DialogContainer default />
        {this.renderMailBoxes()}
        {this.renderMailList()}
        {this.renderMailContent()}
      </div>
    );
  }
}

export default EmailsApp;
