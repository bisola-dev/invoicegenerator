// error/error.js
const handleYupError = (err, res) => {
    const yupErrors = {};
    if (err.inner) {
        err.inner.forEach(error => {
            yupErrors[error.path] = error.message;
        });
    }
    res.status(400).json({ errors: yupErrors });
};

const handleServerError = (err, res) => {
    console.error('Server Error:', err.message); // Log the error for debugging
    res.status(500).send('Server Error');
};

module.exports = {
    handleYupError,
    handleServerError
};
