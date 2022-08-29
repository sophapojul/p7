// String.prototype.toNormalize = function () {
//     return this.normalize('NFD')
//         .replace(/[\u0300-\u036f]/g, '')
//         .toLowerCase();
// };

/* Adding methods to the String prototype. */
Object.defineProperties(String.prototype, {
    toCapitalize: {
        value() {
            const lowerCase = this.toLowerCase();
            return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
        },
    },
    toNormalize: {
        value() {
            return this.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
        },
    },
    toTitleCase: {
        value() {
            return this.toLowerCase()
                .split(' ')
                .map((word) =>
                    word.length > 2
                        ? word.charAt(0).toUpperCase() + word.slice(1)
                        : word
                )
                .join(' ');
        },
    },
});
