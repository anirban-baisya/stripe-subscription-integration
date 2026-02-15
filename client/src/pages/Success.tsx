import { Link } from 'react-router-dom';

const Success = () => (
    <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-green-500">Payment Successful!</h1>
        <p className="mt-4">Thank you for your subscription.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Back to Home
        </Link>
    </div>
);

export default Success;