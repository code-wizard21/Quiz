import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_rGWIWC9peCMJJY0KXLhPScN3');

ReactDOM.createRoot(document.getElementById('root')!).render(
<Elements stripe={stripePromise}>
<App />
</Elements>);
