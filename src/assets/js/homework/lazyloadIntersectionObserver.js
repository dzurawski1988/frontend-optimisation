function _typeof(obj) {
    return (
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (obj) {
                return typeof obj
            }
            : function (obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj
            }
    )(obj)
}
!function (t) {
    function n(r) {
        if (e[r]) 
            return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, n),
        o.l = !0,
        o.exports
    }
    var e = {};
    n.m = t,
    n.c = e,
    n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    },
    n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(
            t,
            Symbol.toStringTag,
            {value: "Module"}
        ),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    },
    n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) 
            return t;
        if (4 & e && "object" == _typeof(t) && t && t.__esModule) 
            return t;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) 
            for (var o in t) 
                n.d(r, o, function (e) {
                    return t[e]
                }.bind(null, o));
    return r
    },
    n.n = function (t) {
        var e = t && t.__esModule
            ? function () {
                return t["default"]
            }
            : function () {
                return t
            };
        return n.d(e, "a", e),
        e
    },
    n.o = function (t, e) {
        return Object
            .prototype
            .hasOwnProperty
            .call(t, e)
    },
    n.p = "",
    n(n.s = 13)
}({
    13: function (t, e, n) {
        var r,
            o,
            a,
            i = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) 
                        Object
                            .prototype
                            .hasOwnProperty
                            .call(n, r) && (t[r] = n[r])
                    }
                return t
            },
            s = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator)
                ? function (t) {
                    return _typeof(t)
                }
                : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                        ? "symbol"
                        : _typeof(t)
                };
        a = function a() {
            function t(t, e, n) {
                var r = e._settings;
                !n && s(t) || (
                    O(r.callback_enter, t),
                    S.indexOf(t.tagName) > -1 && (k(t, e), E(t, r.class_loading)),
                    w(t, e),
                    a(t),
                    O(r.callback_set, t)
                )
            }
            var e = {
                    elements_selector: "img",
                    container: document,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    load_delay: 0,
                    callback_load: null,
                    callback_error: null,
                    callback_set: null,
                    callback_enter: null,
                    callback_finish: null,
                    to_webp: !1
                },
                n = function (t) {
                    return i({}, e, t)
                },
                r = function (t, e) {
                    return t.getAttribute("data-" + e)
                },
                o = function (t, e, n) {
                    var r = "data-" + e;
                    null !== n
                        ? t.setAttribute(r, n)
                        : t.removeAttribute(r)
                },
                a = function (t) {
                    return o(t, "was-processed", "true")
                },
                s = function (t) {
                    return "true" === r(t, "was-processed")
                },
                c = function (t, e) {
                    return o(t, "ll-timeout", e)
                },
                l = function (t) {
                    return r(t, "ll-timeout")
                },
                u = function (t, e) {
                    var n,
                        r = new t(e);
                    try {
                        n = new CustomEvent("LazyLoad::Initialized", {
                            detail: {
                                instance: r
                            }
                        })
                    } catch (t) {
                        (n = document.createEvent("CustomEvent")).initCustomEvent(
                            "LazyLoad::Initialized",
                            !1,
                            !1,
                            {instance: r}
                        )
                    }
                    window.dispatchEvent(n)
                },
                d = function (t, e) {
                    return e
                        ? t.replace(/\.(jpe?g|png)/gi, ".webp")
                        : t
                },
                f = "undefined" != typeof window,
                _ = f && !("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(
                    navigator.userAgent
                ),
                v = f && "IntersectionObserver" in window,
                b = f && "classList" in document.createElement("p"),
                g = f && function () {
                    var t = document.createElement("canvas");
                    return !(!t.getContext || !t.getContext("2d")) && 0 === t
                        .toDataURL(
                            "image/webp"
                        )
                        .indexOf("data:image/webp")
                }(),
                p = function (t, e, n, o) {
                    for (var a, i = 0; a = t.children[i]; i += 1) 
                        if ("SOURCE" === a.tagName) {
                            var s = r(a, n);
                            h(a, e, s, o)
                        }
                    },
                h = function (t, e, n, r) {
                    n && t.setAttribute(e, d(n, r))
                },
                m = function (t, e) {
                    var n = g && e.to_webp,
                        o = r(t, e.data_src),
                        a = r(t, e.data_bg);
                    if (o) {
                        var i = d(o, n);
                        t.style.backgroundImage = 'url("' + i + '")'
                    }
                    if (a) {
                        var s = d(a, n);
                        t.style.backgroundImage = s
                    }
                },
                y = {
                    IMG: function (t, e) {
                        var n = g && e.to_webp,
                            o = e.data_srcset,
                            a = t.parentNode;
                        a && "PICTURE" === a.tagName && p(a, "srcset", o, n);
                        var i = r(t, e.data_sizes);
                        h(t, "sizes", i);
                        var s = r(t, o);
                        h(t, "srcset", s, n);
                        var c = r(t, e.data_src);
                        h(t, "src", c, n)
                    },
                    IFRAME: function (t, e) {
                        var n = r(t, e.data_src);
                        h(t, "src", n)
                    },
                    VIDEO: function (t, e) {
                        var n = e.data_src,
                            o = r(t, n);
                        p(t, "src", n),
                        h(t, "src", o),
                        t.load()
                    }
                },
                w = function (t, e) {
                    var n = e._settings,
                        r = t.tagName,
                        o = y[r];
                    return o
                        ? (
                            o(t, n),
                            e._updateLoadingCount(1),
                            void(e._elements = function (t, e) {
                                return t.filter(function (t) {
                                    return t !== e
                                })
                            }(e._elements, t))
                        )
                        : void m(t, n)
                },
                E = function (t, e) {
                    b
                        ? t
                            .classList
                            .add(e)
                        : t.className += (
                            t.className
                                ? " "
                                : ""
                        ) + e
                },
                O = function (t, e) {
                    t && t(e)
                },
                I = function (t, e, n) {
                    t.addEventListener(e, n)
                },
                L = function (t, e, n) {
                    t.removeEventListener(e, n)
                },
                x = function (t, e, n) {
                    L(t, "load", e),
                    L(t, "loadeddata", e),
                    L(t, "error", n)
                },
                C = function (t, e, n) {
                    var r = n._settings,
                        o = e
                            ? r.class_loaded
                            : r.class_error,
                        a = e
                            ? r.callback_load
                            : r.callback_error,
                        i = t.target;
                    !function (t, e) {
                        b
                            ? t
                                .classList
                                .remove(e)
                            : t.className = t
                                .className
                                .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                                .replace(/^\s+/, "")
                                .replace(/\s+$/, "")
                    }(i, r.class_loading),
                    E(i, o),
                    O(a, i),
                    n._updateLoadingCount(-1)
                },
                k = function (t, e) {
                    var n = function n(o) {
                            C(o, !0, e),
                            x(t, n, r)
                        },
                        r = function r(o) {
                            C(o, !1, e),
                            x(t, n, r)
                        };
                    !function (t, e, n) {
                        I(t, "load", e),
                        I(t, "loadeddata", e),
                        I(t, "error", n)
                    }(t, n, r)
                },
                S = [
                    "IMG", "IFRAME", "VIDEO"
                ],
                j = function (e, n, r) {
                    t(e, r),
                    n.unobserve(e)
                },
                A = function (t) {
                    var e = l(t);
                    e && (clearTimeout(e), c(t, null))
                },
                z = function (t) {
                    return t.isIntersecting || t.intersectionRatio > 0
                },
                M = function (t, e) {
                    this._settings = n(t),
                    this._setObserver(),
                    this._loadingCount = 0,
                    this.update(e)
                };
            return M.prototype = {
                _manageIntersection: function (t) {
                    var e = this._observer,
                        n = this._settings.load_delay,
                        r = t.target;
                    n
                        ? z(t)
                            ? function (t, e, n) {
                                var r = n._settings.load_delay,
                                    o = l(t);
                                o || (o = setTimeout(function () {
                                    j(t, e, n),
                                    A(t)
                                }, r), c(t, o))
                            }(r, e, this)
                            : A(r)
                        : z(t) && j(r, e, this)
                },
                _onIntersection: function (t) {
                    t.forEach(this._manageIntersection.bind(this))
                },
                _setObserver: function () {
                    var t;
                    v && (
                        this._observer = new IntersectionObserver(this._onIntersection.bind(this), {
                            root: (t = this._settings).container === document
                                ? null
                                : t.container,
                            rootMargin: t.thresholds || t.threshold + "px"
                        })
                    )
                },
                _updateLoadingCount: function (t) {
                    this._loadingCount += t,
                    0 === this._elements.length && 0 === this._loadingCount && O(
                        this._settings.callback_finish
                    )
                },
                update: function (t) {
                    var e = this,
                        n = this._settings,
                        r = t || n
                            .container
                            .querySelectorAll(n.elements_selector);
                    this._elements = function (t) {
                        return t.filter(function (t) {
                            return !s(t)
                        })
                    }(Array.prototype.slice.call(r)),
                    !_ && this._observer
                        ? this
                            ._elements
                            .forEach(function (t) {
                                e
                                    ._observer
                                    .observe(t)
                            })
                        : this.loadAll()
                },
                destroy: function () {
                    var t = this;
                    this._observer && (this._elements.forEach(function (e) {
                        t
                            ._observer
                            .unobserve(e)
                    }), this._observer = null),
                    this._elements = null,
                    this._settings = null
                },
                load: function (e, n) {
                    t(e, this, n)
                },
                loadAll: function () {
                    var t = this;
                    this
                        ._elements
                        .forEach(function (e) {
                            t.load(e)
                        })
                }
            },
            f && function (t, e) {
                if (e) 
                    if (e.length) 
                        for (var n, r = 0; n = e[r]; r += 1) 
                            u(t, n);
            else 
                    u(t, e)
            }(M, window.lazyLoadOptions),
            M
        },
        "object" === s(e) && void 0 !== t
            ? t.exports = a()
            : void 0 === (
                o = "function" == typeof(r = a)
                    ? r.call(e, n, e, t)
                    : r
            ) || (t.exports = o)
    }
});
