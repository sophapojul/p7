String.prototype.toCapitalize = function () {
    return this.toLowerCase().replace(/^./, (str) => str.toUpperCase());
};
