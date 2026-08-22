const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">
                {message}
            </p>
        </div>
    );
};

export default ErrorMessage;