// Action type constants
const LOAD_CONTACTUS_NOW = "LOAD_CONTACTUS_NOW"; // Imperative, hence "NOW"!
const FETCH_CONTACTUS_REQUEST = "FETCH_CONTACTUS_REQUEST";
const FETCH_CONTACTUS_SUCCESS = "FETCH_CONTACTUS_SUCCESS";
const FETCH_CONTACTUS_FAILURE = "FETCH_CONTACTUS_FAILURE";


const defaultState = {
  fetchStatus: "",
  fetchError: "",
  saveError: {},
  contactUs: {
    startBlurb: "",
    email1: "",
    email2: "",
    mobile: "",
    gettingThereBlurb: "",
    mapLinkText: "",
    venueAddress: "",
    venueEmail: "",
    venuePhone: ""
  }
};

// Reducer
const contactUsReducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case FETCH_CONTACTUS_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_CONTACTUS_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        contactUs: action.payload
      };
    case FETCH_CONTACTUS_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

export const loadContactUsNow = () => ({ type: LOAD_CONTACTUS_NOW });
// export const fetchCONTACTUSSucceeded = () => ({ type: FETCH_CONTACTUS_REQUEST });

const setFetchContactUsRequest = () => ({
  type: FETCH_CONTACTUS_REQUEST
});
const setFetchContactUsSucceeded = contactUs => ({
  type: FETCH_CONTACTUS_SUCCESS,
  payload: contactUs
});
const setFetchContactUsFailed = errorMessage => ({
  type: FETCH_CONTACTUS_FAILURE,
  payload: errorMessage
});

export const contactUsDuxActions = {
  setFetchContactUsFailed,
  setFetchContactUsRequest,
  setFetchContactUsSucceeded
};

export default contactUsReducer;
