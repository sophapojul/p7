String.prototype.toNormalize = function () {
    return this.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};
