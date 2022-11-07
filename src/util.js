module.exports.greet = function (date) {
    if (!date || !(date instanceof Date)) {
        throw 'Not a valid date';
    }

    const hour = date.getHours();
    if (hour >= 18) {
        return 'Good night';
    } else if (hour >= 12) {
        return 'Good afternoon';
    }

    return 'Good morning';
};

module.exports.double = function (number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNaN(number)) {
                reject('Not a valid number');
            }
            resolve(number * 2);
        }, 200);
    });
};
