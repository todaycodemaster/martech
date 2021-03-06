import { configureStore } from '@reduxjs/toolkit';
import EventReducer from './actions/eventAction';
import ContactReducer from './actions/contactAction';
import CallReducer from './actions/callAction';
import FaqReducer from './actions/faqAction';
import TicketReducer from './actions/ticketAction';
import AuthReducer from './actions/authAction';
import EdpdatasetReducer from './actions/edpdatasetAction';
import EdpdqReducer from './actions/edpdqAction';

export default configureStore({
    reducer: {
        eventsData: EventReducer,
        contactsData:ContactReducer,
        callsData: CallReducer,
        faqsData: FaqReducer,
        ticketsData : TicketReducer,
        edpdatasetsData: EdpdatasetReducer,
        edpdqsData: EdpdqReducer,
        authData: AuthReducer
    },
});