// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import ContactUsForm from "../screens/contactus.js";

const getCommonStateObject = state => ({
  fetchStatus: state.contactUsState.fetchStatus,
  fetchError: state.contactUsState.fetchError
});

// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
// const mapDispatchToPropsNew = dispatch =>
//   bindActionCreators({ submitDataToServer: saveNewContactUs }, dispatch);
// const mapStateToPropsNew = state => ({
//   ...getCommonStateObject(state),
//   isEditExisting: false
// });

const mapDispatchToPropsEdit = dispatch => ({});

const mapStateToPropsEdit = state => ({
  ...getCommonStateObject(state),
  startBlurb: state.contactUsState.contactUs.startBlurb,
  email1: state.contactUsState.contactUs.email1,
  email2: state.contactUsState.contactUs.email2,
  mobile: state.contactUsState.contactUs.mobile,
  gettingThereBlurb: state.contactUsState.contactUs.gettingThereBlurb,
  mapLinkText: state.contactUsState.contactUs.mapLinkText,
  venueAddress: state.contactUsState.contactUs.venueAddress,
  venueEmail: state.contactUsState.contactUs.venueEmail,
  venuePhone: state.contactUsState.contactUs.venuePhone,
  isEditExisting: true
});

// export const ContactUsFormNewConn = connect(
//   mapStateToPropsNew,
//   mapDispatchToPropsNew
// )(ContactUsForm);

const ContactUsFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(ContactUsForm);

export default ContactUsFormEditConn;
