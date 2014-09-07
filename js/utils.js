function bind(fn, ctx) {
    var args = Array.prototype.slice.call(arguments,2);
    return function () {
        fn.apply(ctx, args);
    }
}

function $(str) {
    var nodes = document.querySelectorAll(str);
    return nodes.length > 1 && nodes || nodes[0];
}

Node.prototype.removeClass = function (cls) {
    this.className = this.className.replace(new RegExp(cls, 'g'),'');
    return this;
};

Node.prototype.addClass = function (cls) {
    this.removeClass(cls);
    var className = this.className.trim();
    className = className && className.split(' ') || [];
    className.push(cls);
    this.className = className.join(' ');
    return this;
};

Node.prototype.replaceClass = function (replaceCls, cls) {
    return this.removeClass(replaceCls).addClass(cls);
};


Array.prototype.addClass = function (cls) {
    var i = 0, len = this.length;
    for (i,len; i < len; i++) {
        this[i].addClass(cls);
    }
}