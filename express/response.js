const response = (status_code, datas, message, res) => {
    res.status(status_code).json({
        payload: {
            datas,
            message,
        },
        metadata: {
            prev: "",
            next: "",
            current: "",
        },
    });
};

module.exports = response;
