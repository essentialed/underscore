(function(window, _, undefined){
    function emptyFn(){}

    window.console = (function() {
        var m = ['log', 'error', 'info', 'warn', 'time', 'timeEnd', 'dir'],
            c = {}, i = 0, l = m.length;

        if (window.console !== undefined) {
            return window.console;
        }

        for (; i < l; i++) {
            c[m[i]] = emptyFn;
        }

        return c;
    })();


    _.isNumeric = function isNumeric(n) {
        return !isNaN(parseInt(n, 10)) && isFinite(n);
    };

    _.extend = function extend() {
        /*
         * deep recursion, no limit
         * likely breaks in many scenarios, only use for raw objects.
         * currently doesn't merge arrays, overwrites
         *
         * Interesting discussion about deep recursion here:
         * https://github.com/documentcloud/underscore/issues/162
         *
         */

        var typeOf = Object.prototype.toString,
            target = arguments[0] || {},
            len = arguments.length,
            i = 0,
            options,
            name,
            src,
            copy;

        for (; i < len; i++) {
            if ((options = arguments[i]) !== null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (copy && typeOf.call(copy) === '[object Object]') {
                        target[name] = extend(src, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };

})(this, this._);
