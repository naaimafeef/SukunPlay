/*
 Highcharts JS v8.0.4 (2020-03-10)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (aa, S) {
    "object" === typeof module && module.exports ? (S["default"] = S, module.exports = aa.document ? S(aa) : S) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function () {
        return S(aa)
    }) : (aa.Highcharts && aa.Highcharts.error(16, !0), aa.Highcharts = S(aa))
})("undefined" !== typeof window ? window : this, function (aa) {
    function S(d, g, W, u) {
        d.hasOwnProperty(g) || (d[g] = u.apply(null, W))
    }

    var r = {};
    S(r, "parts/Globals.js", [], function () {
        var d = "undefined" !== typeof aa ? aa : "undefined" !== typeof window ? window :
            {}, g = d.document, W = d.navigator && d.navigator.userAgent || "",
            u = g && g.createElementNS && !!g.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            r = /(edge|msie|trident)/i.test(W) && !d.opera, M = -1 !== W.indexOf("Firefox"),
            E = -1 !== W.indexOf("Chrome"), A = M && 4 > parseInt(W.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "8.0.4",
            deg2rad: 2 * Math.PI / 360,
            doc: g,
            hasBidiBug: A,
            hasTouch: !!d.TouchEvent,
            isMS: r,
            isWebKit: -1 !== W.indexOf("AppleWebKit"),
            isFirefox: M,
            isChrome: E,
            isSafari: !E && -1 !== W.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(W),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: u,
            win: d,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            },
            charts: [],
            dateFormats: {}
        }
    });
    S(r, "parts/Utilities.js", [r["parts/Globals.js"]], function (d) {
        function g() {
            var b, a = arguments, m = {}, f = function (b, a) {
                "object" !== typeof b && (b = {});
                Y(a, function (m, c) {
                    !h(m, !0) || q(m) || N(m) ? b[c] = a[c] : b[c] = f(b[c] || {}, m)
                });
                return b
            };
            !0 === a[0] && (m = a[1], a = Array.prototype.slice.call(a,
                2));
            var c = a.length;
            for (b = 0; b < c; b++) m = f(m, a[b]);
            return m
        }

        function W(b, a, m) {
            var f;
            t(a) ? c(m) ? b.setAttribute(a, m) : b && b.getAttribute && ((f = b.getAttribute(a)) || "class" !== a || (f = b.getAttribute(a + "Name"))) : Y(a, function (a, m) {
                b.setAttribute(m, a)
            });
            return f
        }

        function u() {
            for (var b = arguments, a = b.length, m = 0; m < a; m++) {
                var f = b[m];
                if ("undefined" !== typeof f && null !== f) return f
            }
        }

        function r(b, a) {
            if (!b) return a;
            var m = b.split(".").reverse();
            if (1 === m.length) return a[b];
            for (b = m.pop(); "undefined" !== typeof b && "undefined" !== typeof a &&
            null !== a;) a = a[b], b = m.pop();
            return a
        }

        d.timers = [];
        var M = d.charts, E = d.doc, A = d.win, G = d.error = function (b, a, m, f) {
            var c = P(b), p = c ? "Highcharts error #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString(),
                e = function () {
                    if (a) throw Error(p);
                    A.console && console.log(p)
                };
            if ("undefined" !== typeof f) {
                var x = "";
                c && (p += "?");
                d.objectEach(f, function (b, a) {
                    x += "\n" + a + ": " + b;
                    c && (p += encodeURI(a) + "=" + encodeURI(b))
                });
                p += x
            }
            m ? d.fireEvent(m, "displayError", {code: b, message: p, params: f}, e) : e()
        }, J = function () {
            function b(b, a, m) {
                this.options =
                    a;
                this.elem = b;
                this.prop = m
            }

            b.prototype.dSetter = function () {
                var b = this.paths[0], a = this.paths[1], m = [], f = this.now, c = b.length;
                if (1 === f) m = this.toD; else if (c === a.length && 1 > f) for (; c--;) {
                    var p = parseFloat(b[c]);
                    m[c] = isNaN(p) || "A" === a[c - 4] || "A" === a[c - 5] ? a[c] : f * parseFloat("" + (a[c] - p)) + p
                } else m = a;
                this.elem.attr("d", m, null, !0)
            };
            b.prototype.update = function () {
                var b = this.elem, a = this.prop, m = this.now, f = this.options.step;
                if (this[a + "Setter"]) this[a + "Setter"](); else b.attr ? b.element && b.attr(a, m, null, !0) : b.style[a] = m + this.unit;
                f && f.call(b, m, this)
            };
            b.prototype.run = function (b, a, m) {
                var f = this, c = f.options, p = function (b) {
                    return p.stopped ? !1 : f.step(b)
                }, e = A.requestAnimationFrame || function (b) {
                    setTimeout(b, 13)
                }, x = function () {
                    for (var b = 0; b < d.timers.length; b++) d.timers[b]() || d.timers.splice(b--, 1);
                    d.timers.length && e(x)
                };
                b !== a || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = a, this.unit = m, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === d.timers.push(p) && e(x)) : (delete c.curAnim[this.prop],
                c.complete && 0 === Object.keys(c.curAnim).length && c.complete.call(this.elem))
            };
            b.prototype.step = function (b) {
                var a = +new Date, m = this.options, f = this.elem, c = m.complete, p = m.duration, e = m.curAnim;
                if (f.attr && !f.element) b = !1; else if (b || a >= p + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var x = e[this.prop] = !0;
                    Y(e, function (b) {
                        !0 !== b && (x = !1)
                    });
                    x && c && c.call(f);
                    b = !1
                } else this.pos = m.easing((a - this.startTime) / p), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
                return b
            };
            b.prototype.initPath =
                function (b, a, m) {
                    function f(b) {
                        for (C = b.length; C--;) {
                            var a = "M" === b[C] || "L" === b[C];
                            var m = /[a-zA-Z]/.test(b[C + 3]);
                            a && m && b.splice(C + 1, 0, b[C + 1], b[C + 2], b[C + 1], b[C + 2])
                        }
                    }

                    function c(b, a) {
                        for (; b.length < v;) {
                            b[0] = a[v - b.length];
                            var m = b.slice(0, T);
                            [].splice.apply(b, [0, 0].concat(m));
                            k && (m = b.slice(b.length - T), [].splice.apply(b, [b.length, 0].concat(m)), C--)
                        }
                        b[0] = "M"
                    }

                    function p(b, a) {
                        for (var m = (v - b.length) / T; 0 < m && m--;) l = b.slice().splice(b.length / n - T, T * n), l[0] = a[v - T - m * T], F && (l[T - 6] = l[T - 2], l[T - 5] = l[T - 1]), [].splice.apply(b,
                            [b.length / n, 0].concat(l)), k && m--
                    }

                    a = a || "";
                    var e = b.startX, x = b.endX, F = -1 < a.indexOf("C"), T = F ? 7 : 3, l, C;
                    a = a.split(" ");
                    m = m.slice();
                    var k = b.isArea, n = k ? 2 : 1;
                    F && (f(a), f(m));
                    if (e && x) {
                        for (C = 0; C < e.length; C++) if (e[C] === x[0]) {
                            var V = C;
                            break
                        } else if (e[0] === x[x.length - e.length + C]) {
                            V = C;
                            var w = !0;
                            break
                        } else if (e[e.length - 1] === x[x.length - e.length + C]) {
                            V = e.length - C;
                            break
                        }
                        "undefined" === typeof V && (a = [])
                    }
                    if (a.length && P(V)) {
                        var v = m.length + V * n * T;
                        w ? (c(a, m), p(m, a)) : (c(m, a), p(a, m))
                    }
                    return [a, m]
                };
            b.prototype.fillSetter = function () {
                d.Fx.prototype.strokeSetter.apply(this,
                    arguments)
            };
            b.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, d.color(this.start).tweenTo(d.color(this.end), this.pos), null, !0)
            };
            return b
        }();
        d.Fx = J;
        d.merge = g;
        var y = d.pInt = function (b, a) {
            return parseInt(b, a || 10)
        }, t = d.isString = function (b) {
            return "string" === typeof b
        }, D = d.isArray = function (b) {
            b = Object.prototype.toString.call(b);
            return "[object Array]" === b || "[object Array Iterator]" === b
        }, h = d.isObject = function (b, a) {
            return !!b && "object" === typeof b && (!a || !D(b))
        }, N = d.isDOMElement = function (b) {
            return h(b) &&
                "number" === typeof b.nodeType
        }, q = d.isClass = function (b) {
            var a = b && b.constructor;
            return !(!h(b, !0) || N(b) || !a || !a.name || "Object" === a.name)
        }, P = d.isNumber = function (b) {
            return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
        }, e = d.erase = function (b, a) {
            for (var m = b.length; m--;) if (b[m] === a) {
                b.splice(m, 1);
                break
            }
        }, c = d.defined = function (b) {
            return "undefined" !== typeof b && null !== b
        };
        d.attr = W;
        var k = d.splat = function (b) {
                return D(b) ? b : [b]
            }, n = d.syncTimeout = function (b, a, m) {
                if (0 < a) return setTimeout(b, a, m);
                b.call(0, m);
                return -1
            },
            f = d.clearTimeout = function (b) {
                c(b) && clearTimeout(b)
            }, a = d.extend = function (b, a) {
                var m;
                b || (b = {});
                for (m in a) b[m] = a[m];
                return b
            };
        d.pick = u;
        var l = d.css = function (b, m) {
            d.isMS && !d.svg && m && "undefined" !== typeof m.opacity && (m.filter = "alpha(opacity=" + 100 * m.opacity + ")");
            a(b.style, m)
        }, v = d.createElement = function (b, m, f, c, p) {
            b = E.createElement(b);
            m && a(b, m);
            p && l(b, {padding: "0", border: "none", margin: "0"});
            f && l(b, f);
            c && c.appendChild(b);
            return b
        }, z = d.extendClass = function (b, m) {
            var f = function () {
            };
            f.prototype = new b;
            a(f.prototype,
                m);
            return f
        }, w = d.pad = function (b, a, m) {
            return Array((a || 2) + 1 - String(b).replace("-", "").length).join(m || "0") + b
        }, B = d.relativeLength = function (b, a, m) {
            return /%$/.test(b) ? a * parseFloat(b) / 100 + (m || 0) : parseFloat(b)
        }, L = d.wrap = function (b, a, m) {
            var f = b[a];
            b[a] = function () {
                var b = Array.prototype.slice.call(arguments), a = arguments, c = this;
                c.proceed = function () {
                    f.apply(c, arguments.length ? arguments : a)
                };
                b.unshift(f);
                b = m.apply(this, b);
                c.proceed = null;
                return b
            }
        }, Q = d.format = function (b, a, m) {
            var f = "{", c = !1, p = [], e = /f$/, x = /\.([0-9])/,
                F = d.defaultOptions.lang, C = m && m.time || d.time;
            for (m = m && m.numberFormatter || T; b;) {
                var l = b.indexOf(f);
                if (-1 === l) break;
                var k = b.slice(0, l);
                if (c) {
                    k = k.split(":");
                    f = r(k.shift() || "", a);
                    if (k.length && "number" === typeof f) if (k = k.join(":"), e.test(k)) {
                        var n = parseInt((k.match(x) || ["", "-1"])[1], 10);
                        null !== f && (f = m(f, n, F.decimalPoint, -1 < k.indexOf(",") ? F.thousandsSep : ""))
                    } else f = C.dateFormat(k, f);
                    p.push(f)
                } else p.push(k);
                b = b.slice(l + 1);
                f = (c = !c) ? "}" : "{"
            }
            p.push(b);
            return p.join("")
        }, H = d.getMagnitude = function (b) {
            return Math.pow(10,
                Math.floor(Math.log(b) / Math.LN10))
        }, K = d.normalizeTickInterval = function (b, a, m, f, c) {
            var p = b;
            m = u(m, 1);
            var e = b / m;
            a || (a = c ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === f && (1 === m ? a = a.filter(function (b) {
                return 0 === b % 1
            }) : .1 >= m && (a = [1 / m])));
            for (f = 0; f < a.length && !(p = a[f], c && p * m >= b || !c && e <= (a[f] + (a[f + 1] || a[f])) / 2); f++) ;
            return p = O(p * m, -Math.round(Math.log(.001) / Math.LN10))
        }, p = d.stableSort = function (b, a) {
            var m = b.length, f, c;
            for (c = 0; c < m; c++) b[c].safeI = c;
            b.sort(function (b, m) {
                f = a(b, m);
                return 0 === f ? b.safeI - m.safeI :
                    f
            });
            for (c = 0; c < m; c++) delete b[c].safeI
        }, b = d.arrayMin = function (b) {
            for (var a = b.length, m = b[0]; a--;) b[a] < m && (m = b[a]);
            return m
        }, C = d.arrayMax = function (b) {
            for (var a = b.length, m = b[0]; a--;) b[a] > m && (m = b[a]);
            return m
        }, x = d.destroyObjectProperties = function (b, a) {
            Y(b, function (m, f) {
                m && m !== a && m.destroy && m.destroy();
                delete b[f]
            })
        }, R = d.discardElement = function (b) {
            var a = d.garbageBin;
            a || (a = v("div"));
            b && a.appendChild(b);
            a.innerHTML = ""
        }, O = d.correctFloat = function (b, a) {
            return parseFloat(b.toPrecision(a || 14))
        }, X = d.setAnimation =
            function (b, a) {
                a.renderer.globalAnimation = u(b, a.options.chart.animation, !0)
            }, U = d.animObject = function (b) {
            return h(b) ? g(b) : {duration: b ? 500 : 0}
        }, m = d.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        }, T = d.numberFormat = function (b, a, m, f) {
            b = +b || 0;
            a = +a;
            var c = d.defaultOptions.lang, p = (b.toString().split(".")[1] || "").split("e")[0].length,
                e = b.toString().split("e");
            if (-1 === a) a = Math.min(p, 20); else if (!P(a)) a = 2; else if (a && e[1] && 0 > e[1]) {
                var x = a + +e[1];
                0 <= x ? (e[0] =
                    (+e[0]).toExponential(x).split("e")[0], a = x) : (e[0] = e[0].split(".")[0] || 0, b = 20 > a ? (e[0] * Math.pow(10, e[1])).toFixed(a) : 0, e[1] = 0)
            }
            var F = (Math.abs(e[1] ? e[0] : b) + Math.pow(10, -Math.max(a, p) - 1)).toFixed(a);
            p = String(y(F));
            x = 3 < p.length ? p.length % 3 : 0;
            m = u(m, c.decimalPoint);
            f = u(f, c.thousandsSep);
            b = (0 > b ? "-" : "") + (x ? p.substr(0, x) + f : "");
            b += p.substr(x).replace(/(\d{3})(?=\d)/g, "$1" + f);
            a && (b += m + F.slice(-a));
            e[1] && 0 !== +b && (b += "e" + e[1]);
            return b
        };
        Math.easeInOutSine = function (b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        };
        var Z = d.getStyle =
                function (b, a, m) {
                    if ("width" === a) return a = Math.min(b.offsetWidth, b.scrollWidth), m = b.getBoundingClientRect && b.getBoundingClientRect().width, m < a && m >= a - 1 && (a = Math.floor(m)), Math.max(0, a - d.getStyle(b, "padding-left") - d.getStyle(b, "padding-right"));
                    if ("height" === a) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - d.getStyle(b, "padding-top") - d.getStyle(b, "padding-bottom"));
                    A.getComputedStyle || G(27, !0);
                    if (b = A.getComputedStyle(b, void 0)) b = b.getPropertyValue(a), u(m, "opacity" !== a) && (b = y(b));
                    return b
                },
            ca = d.inArray = function (b, a, m) {
                return a.indexOf(b, m)
            }, F = d.find = Array.prototype.find ? function (b, a) {
                return b.find(a)
            } : function (b, a) {
                var m, f = b.length;
                for (m = 0; m < f; m++) if (a(b[m], m)) return b[m]
            };
        d.keys = Object.keys;
        var V = d.offset = function (b) {
            var a = E.documentElement;
            b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {top: 0, left: 0};
            return {
                top: b.top + (A.pageYOffset || a.scrollTop) - (a.clientTop || 0),
                left: b.left + (A.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
            }
        }, ba = d.stop = function (b, a) {
            for (var m = d.timers.length; m--;) d.timers[m].elem !==
            b || a && a !== d.timers[m].prop || (d.timers[m].stopped = !0)
        }, Y = d.objectEach = function (b, a, m) {
            for (var f in b) Object.hasOwnProperty.call(b, f) && a.call(m || b[f], b[f], f, b)
        };
        Y({map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some"}, function (b, a) {
            d[a] = function (a) {
                return Array.prototype[b].apply(a, [].slice.call(arguments, 1))
            }
        });
        var fa = d.addEvent = function (b, a, m, f) {
            void 0 === f && (f = {});
            var c = b.addEventListener || d.addEventListenerPolyfill;
            var p = "function" === typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents ||
                {} : b.hcEvents = b.hcEvents || {};
            d.Point && b instanceof d.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
            c && c.call(b, a, m, !1);
            p[a] || (p[a] = []);
            p[a].push({fn: m, order: "number" === typeof f.order ? f.order : Infinity});
            p[a].sort(function (b, a) {
                return b.order - a.order
            });
            return function () {
                da(b, a, m)
            }
        }, da = d.removeEvent = function (b, a, m) {
            function f(a, m) {
                var f = b.removeEventListener || d.removeEventListenerPolyfill;
                f && f.call(b, a, m, !1)
            }

            function c(m) {
                var c;
                if (b.nodeName) {
                    if (a) {
                        var p = {};
                        p[a] = !0
                    } else p = m;
                    Y(p,
                        function (b, a) {
                            if (m[a]) for (c = m[a].length; c--;) f(a, m[a][c].fn)
                        })
                }
            }

            var p;
            ["protoEvents", "hcEvents"].forEach(function (e, x) {
                var F = (x = x ? b : b.prototype) && x[e];
                F && (a ? (p = F[a] || [], m ? (F[a] = p.filter(function (b) {
                    return m !== b.fn
                }), f(a, m)) : (c(F), F[a] = [])) : (c(F), x[e] = {}))
            })
        }, ha = d.fireEvent = function (b, m, f, c) {
            var p;
            f = f || {};
            if (E.createEvent && (b.dispatchEvent || b.fireEvent)) {
                var e = E.createEvent("Events");
                e.initEvent(m, !0, !0);
                a(e, f);
                b.dispatchEvent ? b.dispatchEvent(e) : b.fireEvent(m, e)
            } else f.target || a(f, {
                preventDefault: function () {
                    f.defaultPrevented =
                        !0
                }, target: b, type: m
            }), function (a, m) {
                void 0 === a && (a = []);
                void 0 === m && (m = []);
                var c = 0, e = 0, x = a.length + m.length;
                for (p = 0; p < x; p++) !1 === (a[c] ? m[e] ? a[c].order <= m[e].order ? a[c++] : m[e++] : a[c++] : m[e++]).fn.call(b, f) && f.preventDefault()
            }(b.protoEvents && b.protoEvents[m], b.hcEvents && b.hcEvents[m]);
            c && !f.defaultPrevented && c.call(b, f)
        }, ia = d.animate = function (b, a, m) {
            var f, c = "", p, e;
            if (!h(m)) {
                var x = arguments;
                m = {duration: x[2], easing: x[3], complete: x[4]}
            }
            P(m.duration) || (m.duration = 400);
            m.easing = "function" === typeof m.easing ?
                m.easing : Math[m.easing] || Math.easeInOutSine;
            m.curAnim = g(a);
            Y(a, function (x, F) {
                ba(b, F);
                e = new J(b, m, F);
                p = null;
                "d" === F ? (e.paths = e.initPath(b, b.d, a.d), e.toD = a.d, f = 0, p = 1) : b.attr ? f = b.attr(F) : (f = parseFloat(Z(b, F)) || 0, "opacity" !== F && (c = "px"));
                p || (p = x);
                p && p.match && p.match("px") && (p = p.replace(/px/g, ""));
                e.run(f, p, c)
            })
        }, ja = d.seriesType = function (b, a, m, f, c) {
            var p = d.getOptions(), e = d.seriesTypes;
            p.plotOptions[b] = g(p.plotOptions[a], m);
            e[b] = z(e[a] || function () {
            }, f);
            e[b].prototype.type = b;
            c && (e[b].prototype.pointClass =
                z(d.Point, c));
            return e[b]
        }, ea = d.uniqueKey = function () {
            var b = Math.random().toString(36).substring(2, 9), a = 0;
            return function () {
                return "highcharts-" + b + "-" + a++
            }
        }(), ka = d.isFunction = function (b) {
            return "function" === typeof b
        };
        A.jQuery && (A.jQuery.fn.highcharts = function () {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new (d[t(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : M[W(this[0], "data-highcharts-chart")]
        });
        return {
            Fx: J,
            addEvent: fa,
            animate: ia,
            animObject: U,
            arrayMax: C,
            arrayMin: b,
            attr: W,
            clamp: function (b,
                             a, m) {
                return b > a ? b < m ? b : m : a
            },
            clearTimeout: f,
            correctFloat: O,
            createElement: v,
            css: l,
            defined: c,
            destroyObjectProperties: x,
            discardElement: R,
            erase: e,
            error: G,
            extend: a,
            extendClass: z,
            find: F,
            fireEvent: ha,
            format: Q,
            getMagnitude: H,
            getNestedProperty: r,
            getStyle: Z,
            inArray: ca,
            isArray: D,
            isClass: q,
            isDOMElement: N,
            isFunction: ka,
            isNumber: P,
            isObject: h,
            isString: t,
            merge: g,
            normalizeTickInterval: K,
            numberFormat: T,
            objectEach: Y,
            offset: V,
            pad: w,
            pick: u,
            pInt: y,
            relativeLength: B,
            removeEvent: da,
            seriesType: ja,
            setAnimation: X,
            splat: k,
            stableSort: p,
            stop: ba,
            syncTimeout: n,
            timeUnits: m,
            uniqueKey: ea,
            wrap: L
        }
    });
    S(r, "parts/Color.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var W = g.isNumber, u = g.merge, r = g.pInt;
        g = function () {
            function d(g) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (d) {
                        return [r(d[1]), r(d[2]), r(d[3]), parseFloat(d[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (d) {
                        return [r(d[1]), r(d[2]),
                            r(d[3]), 1]
                    }
                }];
                this.rgba = [];
                if (!(this instanceof d)) return new d(g);
                this.init(g)
            }

            d.parse = function (g) {
                return new d(g)
            };
            d.prototype.init = function (g) {
                var A, G;
                if ((this.input = g = d.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = g.stops.map(function (t) {
                    return new d(t[1])
                }); else {
                    if (g && g.charAt && "#" === g.charAt()) {
                        var u = g.length;
                        g = parseInt(g.substr(1), 16);
                        7 === u ? A = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === u && (A = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1])
                    }
                    if (!A) for (G = this.parsers.length; G-- &&
                    !A;) {
                        var y = this.parsers[G];
                        (u = y.regex.exec(g)) && (A = y.parse(u))
                    }
                }
                this.rgba = A || []
            };
            d.prototype.get = function (d) {
                var g = this.input, G = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var E = u(g);
                    E.stops = [].concat(E.stops);
                    this.stops.forEach(function (g, t) {
                        E.stops[t] = [E.stops[t][0], g.get(d)]
                    })
                } else E = G && W(G[0]) ? "rgb" === d || !d && 1 === G[3] ? "rgb(" + G[0] + "," + G[1] + "," + G[2] + ")" : "a" === d ? G[3] : "rgba(" + G.join(",") + ")" : g;
                return E
            };
            d.prototype.brighten = function (d) {
                var g, u = this.rgba;
                if (this.stops) this.stops.forEach(function (g) {
                    g.brighten(d)
                });
                else if (W(d) && 0 !== d) for (g = 0; 3 > g; g++) u[g] += r(255 * d), 0 > u[g] && (u[g] = 0), 255 < u[g] && (u[g] = 255);
                return this
            };
            d.prototype.setOpacity = function (d) {
                this.rgba[3] = d;
                return this
            };
            d.prototype.tweenTo = function (d, g) {
                var u = this.rgba, A = d.rgba;
                A.length && u && u.length ? (d = 1 !== A[3] || 1 !== u[3], g = (d ? "rgba(" : "rgb(") + Math.round(A[0] + (u[0] - A[0]) * (1 - g)) + "," + Math.round(A[1] + (u[1] - A[1]) * (1 - g)) + "," + Math.round(A[2] + (u[2] - A[2]) * (1 - g)) + (d ? "," + (A[3] + (u[3] - A[3]) * (1 - g)) : "") + ")") : g = d.input || "none";
                return g
            };
            d.names = {white: "#ffffff", black: "#000000"};
            return d
        }();
        d.Color = g;
        d.color = g.parse;
        return d.Color
    });
    S(r, "parts/SvgRenderer.js", [r["parts/Globals.js"], r["parts/Color.js"], r["parts/Utilities.js"]], function (d, g, r) {
        var u = g.parse, I = r.addEvent, M = r.animate, E = r.animObject, A = r.attr, G = r.createElement, J = r.css,
            y = r.defined, t = r.destroyObjectProperties, D = r.erase, h = r.extend, N = r.inArray, q = r.isArray,
            P = r.isNumber, e = r.isObject, c = r.isString, k = r.merge, n = r.objectEach, f = r.pick, a = r.pInt,
            l = r.removeEvent, v = r.splat, z = r.stop, w = r.uniqueKey, B = d.charts, L = d.deg2rad, Q = d.doc,
            H = d.hasTouch, K = d.isFirefox, p = d.isMS, b = d.isWebKit, C = d.noop, x = d.svg, R = d.SVG_NS,
            O = d.symbolSizes, X = d.win;
        var U = d.SVGElement = function () {
            return this
        };
        h(U.prototype, {
            opacity: 1,
            SVG_NS: R,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function (b, a) {
                this.element = "span" === a ? G(a) : Q.createElementNS(this.SVG_NS, a);
                this.renderer = b;
                d.fireEvent(this, "afterInit")
            },
            animate: function (b, a, c) {
                var m = E(f(a, this.renderer.globalAnimation,
                    !0));
                f(Q.hidden, Q.msHidden, Q.webkitHidden, !1) && (m.duration = 0);
                0 !== m.duration ? (c && (m.complete = c), M(this, b, m)) : (this.attr(b, void 0, c), n(b, function (b, a) {
                    m.step && m.step.call(this, b, {prop: a, pos: 1})
                }, this));
                return this
            },
            complexColor: function (b, a, f) {
                var m = this.renderer, c, p, e, x, T, C, l, v, z, Z, O, R = [], B;
                d.fireEvent(this.renderer, "complexColor", {args: arguments}, function () {
                    b.radialGradient ? p = "radialGradient" : b.linearGradient && (p = "linearGradient");
                    p && (e = b[p], T = m.gradients, l = b.stops, Z = f.radialReference, q(e) && (b[p] =
                        e = {
                            x1: e[0],
                            y1: e[1],
                            x2: e[2],
                            y2: e[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === p && Z && !y(e.gradientUnits) && (x = e, e = k(e, m.getRadialAttr(Z, x), {gradientUnits: "userSpaceOnUse"})), n(e, function (b, a) {
                        "id" !== a && R.push(a, b)
                    }), n(l, function (b) {
                        R.push(b)
                    }), R = R.join(","), T[R] ? O = T[R].attr("id") : (e.id = O = w(), T[R] = C = m.createElement(p).attr(e).add(m.defs), C.radAttr = x, C.stops = [], l.forEach(function (b) {
                        0 === b[1].indexOf("rgba") ? (c = u(b[1]), v = c.get("rgb"), z = c.get("a")) : (v = b[1], z = 1);
                        b = m.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": v, "stop-opacity": z
                        }).add(C);
                        C.stops.push(b)
                    })), B = "url(" + m.url + "#" + O + ")", f.setAttribute(a, B), f.gradient = R, b.toString = function () {
                        return B
                    })
                })
            },
            applyTextOutline: function (b) {
                var a = this.element, m;
                -1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(a.style.fill)));
                b = b.split(" ");
                var f = b[b.length - 1];
                if ((m = b[0]) && "none" !== m && d.svg) {
                    this.fakeTS = !0;
                    b = [].slice.call(a.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    m = m.replace(/(^[\d\.]+)(.*?)$/g, function (b, a,
                                                                 m) {
                        return 2 * a + m
                    });
                    this.removeTextOutline(b);
                    var c = a.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(a.textContent) : !1;
                    var p = a.firstChild;
                    b.forEach(function (b, e) {
                        0 === e && (b.setAttribute("x", a.getAttribute("x")), e = a.getAttribute("y"), b.setAttribute("y", e || 0), null === e && a.setAttribute("y", 0));
                        e = b.cloneNode(!0);
                        A(c && !K ? b : e, {
                            "class": "highcharts-text-outline",
                            fill: f,
                            stroke: f,
                            "stroke-width": m,
                            "stroke-linejoin": "round"
                        });
                        a.insertBefore(e, p)
                    });
                    c && K && b[0] && (b = b[0].cloneNode(!0), b.textContent =
                        " ", a.insertBefore(b, p))
                }
            },
            removeTextOutline: function (b) {
                for (var a = b.length, m; a--;) m = b[a], "highcharts-text-outline" === m.getAttribute("class") && D(b, this.element.removeChild(m))
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function (b, a, f, c) {
                var m = this.element, p, e = this, x, C, l = this.symbolCustomAttribs;
                if ("string" === typeof b && "undefined" !== typeof a) {
                    var T = b;
                    b = {};
                    b[T] = a
                }
                "string" === typeof b ? e = (this[b + "Getter"] || this._defaultGetter).call(this, b, m) : (n(b,
                    function (a, f) {
                        x = !1;
                        c || z(this, f);
                        this.symbolName && -1 !== N(f, l) && (p || (this.symbolAttr(b), p = !0), x = !0);
                        !this.rotation || "x" !== f && "y" !== f || (this.doTransform = !0);
                        x || (C = this[f + "Setter"] || this._defaultSetter, C.call(this, a, f, m), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(f) && this.updateShadows(f, a, C))
                    }, this), this.afterSetters());
                f && f.call(this);
                return e
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (b,
                                     a, f) {
                for (var m = this.shadows, c = m.length; c--;) f.call(m[c], "height" === b ? Math.max(a - (m[c].cutHeight || 0), 0) : "d" === b ? this.d : a, b, m[c])
            },
            addClass: function (b, a) {
                var m = a ? "" : this.attr("class") || "";
                b = (b || "").split(/ /g).reduce(function (b, a) {
                    -1 === m.indexOf(a) && b.push(a);
                    return b
                }, m ? [m] : []).join(" ");
                b !== m && this.attr("class", b);
                return this
            },
            hasClass: function (b) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(b)
            },
            removeClass: function (b) {
                return this.attr("class", (this.attr("class") || "").replace(c(b) ? new RegExp(" ?" +
                    b + " ?") : b, ""))
            },
            symbolAttr: function (b) {
                var a = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (m) {
                    a[m] = f(b[m], a[m])
                });
                a.attr({d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a)})
            },
            clip: function (b) {
                return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none")
            },
            crisp: function (b, a) {
                a = a || b.strokeWidth || 0;
                var m = Math.round(a) % 2 / 2;
                b.x = Math.floor(b.x || this.x || 0) + m;
                b.y = Math.floor(b.y || this.y || 0) + m;
                b.width = Math.floor((b.width || this.width ||
                    0) - 2 * m);
                b.height = Math.floor((b.height || this.height || 0) - 2 * m);
                y(b.strokeWidth) && (b.strokeWidth = a);
                return b
            },
            css: function (b) {
                var m = this.styles, f = {}, c = this.element, p = "", e = !m,
                    C = ["textOutline", "textOverflow", "width"];
                b && b.color && (b.fill = b.color);
                m && n(b, function (b, a) {
                    b !== m[a] && (f[a] = b, e = !0)
                });
                if (e) {
                    m && (b = h(m, f));
                    if (b) if (null === b.width || "auto" === b.width) delete this.textWidth; else if ("text" === c.nodeName.toLowerCase() && b.width) var l = this.textWidth = a(b.width);
                    this.styles = b;
                    l && !x && this.renderer.forExport && delete b.width;
                    if (c.namespaceURI === this.SVG_NS) {
                        var k = function (b, a) {
                            return "-" + a.toLowerCase()
                        };
                        n(b, function (b, a) {
                            -1 === C.indexOf(a) && (p += a.replace(/([A-Z])/g, k) + ":" + b + ";")
                        });
                        p && A(c, "style", p)
                    } else J(c, b);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b && b.textOutline && this.applyTextOutline(b.textOutline))
                }
                return this
            },
            getStyle: function (b) {
                return X.getComputedStyle(this.element || this, "").getPropertyValue(b)
            },
            strokeWidth: function () {
                if (!this.renderer.styledMode) return this["stroke-width"] ||
                    0;
                var b = this.getStyle("stroke-width"), f = 0;
                if (b.indexOf("px") === b.length - 2) f = a(b); else if ("" !== b) {
                    var c = Q.createElementNS(R, "rect");
                    A(c, {width: b, "stroke-width": 0});
                    this.element.parentNode.appendChild(c);
                    f = c.getBBox().width;
                    c.parentNode.removeChild(c)
                }
                return f
            },
            on: function (b, a) {
                var m, f, c = this.element, p;
                H && "click" === b ? (c.ontouchstart = function (b) {
                    m = b.touches[0].clientX;
                    f = b.touches[0].clientY
                }, c.ontouchend = function (b) {
                    m && 4 <= Math.sqrt(Math.pow(m - b.changedTouches[0].clientX, 2) + Math.pow(f - b.changedTouches[0].clientY,
                        2)) || a.call(c, b);
                    p = !0;
                    b.preventDefault()
                }, c.onclick = function (b) {
                    p || a.call(c, b)
                }) : c["on" + b] = a;
                return this
            },
            setRadialReference: function (b) {
                var a = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = b;
                a && a.radAttr && a.animate(this.renderer.getRadialAttr(b, a.radAttr));
                return this
            },
            translate: function (b, a) {
                return this.attr({translateX: b, translateY: a})
            },
            invert: function (b) {
                this.inverted = b;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var b = this.translateX || 0, a = this.translateY ||
                    0, c = this.scaleX, p = this.scaleY, e = this.inverted, x = this.rotation, C = this.matrix,
                    l = this.element;
                e && (b += this.width, a += this.height);
                b = ["translate(" + b + "," + a + ")"];
                y(C) && b.push("matrix(" + C.join(",") + ")");
                e ? b.push("rotate(90) scale(-1,1)") : x && b.push("rotate(" + x + " " + f(this.rotationOriginX, l.getAttribute("x"), 0) + " " + f(this.rotationOriginY, l.getAttribute("y") || 0) + ")");
                (y(c) || y(p)) && b.push("scale(" + f(c, 1) + " " + f(p, 1) + ")");
                b.length && l.setAttribute("transform", b.join(" "))
            },
            toFront: function () {
                var b = this.element;
                b.parentNode.appendChild(b);
                return this
            },
            align: function (b, a, p) {
                var m, e = {};
                var x = this.renderer;
                var C = x.alignedObjects;
                var l, k;
                if (b) {
                    if (this.alignOptions = b, this.alignByTranslate = a, !p || c(p)) this.alignTo = m = p || "renderer", D(C, this), C.push(this), p = null
                } else b = this.alignOptions, a = this.alignByTranslate, m = this.alignTo;
                p = f(p, x[m], x);
                m = b.align;
                x = b.verticalAlign;
                C = (p.x || 0) + (b.x || 0);
                var T = (p.y || 0) + (b.y || 0);
                "right" === m ? l = 1 : "center" === m && (l = 2);
                l && (C += (p.width - (b.width || 0)) / l);
                e[a ? "translateX" : "x"] = Math.round(C);
                "bottom" === x ? k = 1 : "middle" ===
                    x && (k = 2);
                k && (T += (p.height - (b.height || 0)) / k);
                e[a ? "translateY" : "y"] = Math.round(T);
                this[this.placed ? "animate" : "attr"](e);
                this.placed = !0;
                this.alignAttr = e;
                return this
            },
            getBBox: function (b, a) {
                var m, c = this.renderer, p = this.element, e = this.styles, x = this.textStr, C, l = c.cache,
                    k = c.cacheKeys, T = p.namespaceURI === this.SVG_NS;
                a = f(a, this.rotation, 0);
                var n = c.styledMode ? p && U.prototype.getStyle.call(p, "font-size") : e && e.fontSize;
                if (y(x)) {
                    var v = x.toString();
                    -1 === v.indexOf("<") && (v = v.replace(/[0-9]/g, "0"));
                    v += ["", a, n, this.textWidth,
                        e && e.textOverflow].join()
                }
                v && !b && (m = l[v]);
                if (!m) {
                    if (T || c.forExport) {
                        try {
                            (C = this.fakeTS && function (b) {
                                [].forEach.call(p.querySelectorAll(".highcharts-text-outline"), function (a) {
                                    a.style.display = b
                                })
                            }) && C("none"), m = p.getBBox ? h({}, p.getBBox()) : {
                                width: p.offsetWidth,
                                height: p.offsetHeight
                            }, C && C("")
                        } catch (ea) {
                            ""
                        }
                        if (!m || 0 > m.width) m = {width: 0, height: 0}
                    } else m = this.htmlGetBBox();
                    c.isSVG && (b = m.width, c = m.height, T && (m.height = c = {
                        "11px,17": 14,
                        "13px,20": 16
                    }[e && e.fontSize + "," + Math.round(c)] || c), a && (e = a * L, m.width = Math.abs(c *
                        Math.sin(e)) + Math.abs(b * Math.cos(e)), m.height = Math.abs(c * Math.cos(e)) + Math.abs(b * Math.sin(e))));
                    if (v && 0 < m.height) {
                        for (; 250 < k.length;) delete l[k.shift()];
                        l[v] || k.push(v);
                        l[v] = m
                    }
                }
                return m
            },
            show: function (b) {
                return this.attr({visibility: b ? "inherit" : "visible"})
            },
            hide: function (b) {
                b ? this.attr({y: -9999}) : this.attr({visibility: "hidden"});
                return this
            },
            fadeOut: function (b) {
                var a = this;
                a.animate({opacity: 0}, {
                    duration: b || 150, complete: function () {
                        a.attr({y: -9999})
                    }
                })
            },
            add: function (b) {
                var a = this.renderer, m = this.element;
                b && (this.parentGroup = b);
                this.parentInverted = b && b.inverted;
                "undefined" !== typeof this.textStr && a.buildText(this);
                this.added = !0;
                if (!b || b.handleZ || this.zIndex) var f = this.zIndexSetter();
                f || (b ? b.element : a.box).appendChild(m);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (b) {
                var a = b.parentNode;
                a && a.removeChild(b)
            },
            destroy: function () {
                var b = this, a = b.element || {}, f = b.renderer,
                    c = f.isSVG && "SPAN" === a.nodeName && b.parentGroup, p = a.ownerSVGElement, e = b.clipPath;
                a.onclick = a.onmouseout = a.onmouseover =
                    a.onmousemove = a.point = null;
                z(b);
                e && p && ([].forEach.call(p.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) {
                    -1 < b.getAttribute("clip-path").indexOf(e.element.id) && b.removeAttribute("clip-path")
                }), b.clipPath = e.destroy());
                if (b.stops) {
                    for (p = 0; p < b.stops.length; p++) b.stops[p] = b.stops[p].destroy();
                    b.stops = null
                }
                b.safeRemoveChild(a);
                for (f.styledMode || b.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) a = c.parentGroup, b.safeRemoveChild(c.div), delete c.div, c = a;
                b.alignTo && D(f.alignedObjects, b);
                n(b,
                    function (a, m) {
                        b[m] && b[m].parentGroup === b && b[m].destroy && b[m].destroy();
                        delete b[m]
                    })
            },
            shadow: function (b, a, c) {
                var m = [], p, e = this.element;
                if (!b) this.destroyShadows(); else if (!this.shadows) {
                    var x = f(b.width, 3);
                    var C = (b.opacity || .15) / x;
                    var l = this.parentInverted ? "(-1,-1)" : "(" + f(b.offsetX, 1) + ", " + f(b.offsetY, 1) + ")";
                    for (p = 1; p <= x; p++) {
                        var k = e.cloneNode(0);
                        var n = 2 * x + 1 - 2 * p;
                        A(k, {
                            stroke: b.color || "#000000",
                            "stroke-opacity": C * p,
                            "stroke-width": n,
                            transform: "translate" + l,
                            fill: "none"
                        });
                        k.setAttribute("class", (k.getAttribute("class") ||
                            "") + " highcharts-shadow");
                        c && (A(k, "height", Math.max(A(k, "height") - n, 0)), k.cutHeight = n);
                        a ? a.element.appendChild(k) : e.parentNode && e.parentNode.insertBefore(k, e);
                        m.push(k)
                    }
                    this.shadows = m
                }
                return this
            },
            destroyShadows: function () {
                (this.shadows || []).forEach(function (b) {
                    this.safeRemoveChild(b)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (b) {
                "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy"));
                return this._defaultGetter(b)
            },
            _defaultGetter: function (b) {
                b = f(this[b + "Value"], this[b], this.element ?
                    this.element.getAttribute(b) : null, 0);
                /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
                return b
            },
            dSetter: function (b, a, f) {
                b && b.join && (b = b.join(" "));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[a] !== b && (f.setAttribute(a, b), this[a] = b)
            },
            dashstyleSetter: function (b) {
                var f, c = this["stroke-width"];
                "inherit" === c && (c = 1);
                if (b = b && b.toLowerCase()) {
                    b = b.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g,
                        "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (f = b.length; f--;) b[f] = a(b[f]) * c;
                    b = b.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", b)
                }
            },
            alignSetter: function (b) {
                var a = {left: "start", center: "middle", right: "end"};
                a[b] && (this.alignValue = b, this.element.setAttribute("text-anchor", a[b]))
            },
            opacitySetter: function (b, a, f) {
                this[a] = b;
                f.setAttribute(a, b)
            },
            titleSetter: function (b) {
                var a = this.element.getElementsByTagName("title")[0];
                a || (a = Q.createElementNS(this.SVG_NS, "title"),
                    this.element.appendChild(a));
                a.firstChild && a.removeChild(a.firstChild);
                a.appendChild(Q.createTextNode(String(f(b, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            },
            textSetter: function (b) {
                b !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this))
            },
            setTextPath: function (b, a) {
                var f = this.element, c = {textAnchor: "text-anchor"}, m = !1, p = this.textPathWrapper, e = !p;
                a = k(!0, {enabled: !0, attributes: {dy: -5, startOffset: "50%", textAnchor: "middle"}},
                    a);
                var x = a.attributes;
                if (b && a && a.enabled) {
                    p && null === p.element.parentNode ? (e = !0, p = p.destroy()) : p && this.removeTextOutline.call(p.parentGroup, [].slice.call(f.getElementsByTagName("tspan")));
                    this.options && this.options.padding && (x.dx = -this.options.padding);
                    p || (this.textPathWrapper = p = this.renderer.createElement("textPath"), m = !0);
                    var l = p.element;
                    (a = b.element.getAttribute("id")) || b.element.setAttribute("id", a = w());
                    if (e) for (b = f.getElementsByTagName("tspan"); b.length;) b[0].setAttribute("y", 0), P(x.dx) && b[0].setAttribute("x",
                        -x.dx), l.appendChild(b[0]);
                    m && p.add({element: this.text ? this.text.element : f});
                    l.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + a);
                    y(x.dy) && (l.parentNode.setAttribute("dy", x.dy), delete x.dy);
                    y(x.dx) && (l.parentNode.setAttribute("dx", x.dx), delete x.dx);
                    n(x, function (b, a) {
                        l.setAttribute(c[a] || a, b)
                    });
                    f.removeAttribute("transform");
                    this.removeTextOutline.call(p, [].slice.call(f.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({fill: "none", "stroke-width": 0});
                    this.applyTextOutline = this.updateTransform = C
                } else p && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(f, b), this.updateTransform(), this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            },
            destroyTextPath: function (b, a) {
                var f = b.getElementsByTagName("text")[0];
                if (f) {
                    if (f.removeAttribute("dx"), f.removeAttribute("dy"), a.element.setAttribute("id", ""), f.getElementsByTagName("textPath").length) {
                        for (b = this.textPathWrapper.element.childNodes; b.length;) f.appendChild(b[0]);
                        f.removeChild(this.textPathWrapper.element)
                    }
                } else if (b.getAttribute("dx") || b.getAttribute("dy")) b.removeAttribute("dx"), b.removeAttribute("dy");
                this.textPathWrapper = this.textPathWrapper.destroy()
            },
            fillSetter: function (b, a, f) {
                "string" === typeof b ? f.setAttribute(a, b) : b && this.complexColor(b, a, f)
            },
            visibilitySetter: function (b, a, f) {
                "inherit" === b ? f.removeAttribute(a) : this[a] !== b && f.setAttribute(a, b);
                this[a] = b
            },
            zIndexSetter: function (b, f) {
                var c = this.renderer, m = this.parentGroup, p = (m || c).element || c.box, e = this.element,
                    x = !1;
                c = p === c.box;
                var C = this.added;
                var l;
                y(b) ? (e.setAttribute("data-z-index", b), b = +b, this[f] === b && (C = !1)) : y(this[f]) && e.removeAttribute("data-z-index");
                this[f] = b;
                if (C) {
                    (b = this.zIndex) && m && (m.handleZ = !0);
                    f = p.childNodes;
                    for (l = f.length - 1; 0 <= l && !x; l--) {
                        m = f[l];
                        C = m.getAttribute("data-z-index");
                        var k = !y(C);
                        if (m !== e) if (0 > b && k && !c && !l) p.insertBefore(e, f[l]), x = !0; else if (a(C) <= b || k && (!y(b) || 0 <= b)) p.insertBefore(e, f[l + 1] || null), x = !0
                    }
                    x || (p.insertBefore(e, f[c ? 3 : 0] || null), x = !0)
                }
                return x
            },
            _defaultSetter: function (b,
                                      a, f) {
                f.setAttribute(a, b)
            }
        });
        U.prototype.yGetter = U.prototype.xGetter;
        U.prototype.translateXSetter = U.prototype.translateYSetter = U.prototype.rotationSetter = U.prototype.verticalAlignSetter = U.prototype.rotationOriginXSetter = U.prototype.rotationOriginYSetter = U.prototype.scaleXSetter = U.prototype.scaleYSetter = U.prototype.matrixSetter = function (b, a) {
            this[a] = b;
            this.doTransform = !0
        };
        U.prototype["stroke-widthSetter"] = U.prototype.strokeSetter = function (b, a, f) {
            this[a] = b;
            this.stroke && this["stroke-width"] ? (U.prototype.fillSetter.call(this,
                this.stroke, "stroke", f), f.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === a && 0 === b && this.hasStroke ? (f.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (f.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
        };
        g = d.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        h(g.prototype, {
            Element: U, SVG_NS: R, init: function (a, f, c, p, e, x, C) {
                var m = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
                C || m.css(this.getStyle(p));
                p = m.element;
                a.appendChild(p);
                A(a, "dir", "ltr");
                -1 === a.innerHTML.indexOf("xmlns") && A(p, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = p;
                this.boxWrapper = m;
                this.alignedObjects = [];
                this.url = (K || b) && Q.getElementsByTagName("base").length ? X.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(Q.createTextNode("Created with Highcharts 8.0.4"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = x;
                this.forExport = e;
                this.styledMode = C;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, c, !1);
                var l;
                K && a.getBoundingClientRect && (f = function () {
                    J(a, {left: 0, top: 0});
                    l = a.getBoundingClientRect();
                    J(a, {left: Math.ceil(l.left) - l.left + "px", top: Math.ceil(l.top) - l.top + "px"})
                }, f(), this.unSubPixelFix = I(X, "resize", f))
            }, definition: function (b) {
                function a(b, c) {
                    var p;
                    v(b).forEach(function (b) {
                        var m = f.createElement(b.tagName), e = {};
                        n(b, function (b, a) {
                            "tagName" !== a && "children" !==
                            a && "textContent" !== a && (e[a] = b)
                        });
                        m.attr(e);
                        m.add(c || f.defs);
                        b.textContent && m.element.appendChild(Q.createTextNode(b.textContent));
                        a(b.children || [], m);
                        p = m
                    });
                    return p
                }

                var f = this;
                return a(b)
            }, getStyle: function (b) {
                return this.style = h({
                    fontFamily: 'MVAWAHEED',
                    fontSize: "15px"
                }, b)
            }, setStyle: function (b) {
                this.boxWrapper.css(this.getStyle(b))
            }, isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var b = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                t(this.gradients || {});
                this.gradients = null;
                b && (this.defs = b.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }, createElement: function (b) {
                var a = new this.Element;
                a.init(this, b);
                return a
            }, draw: C, getRadialAttr: function (b, a) {
                return {cx: b[0] - b[2] / 2 + a.cx * b[2], cy: b[1] - b[2] / 2 + a.cy * b[2], r: a.r * b[2]}
            }, truncate: function (b, a, f, c, p, e, x) {
                var m = this, C = b.rotation, l, k = c ? 1 : 0, F = (f || c).length, n = F, v = [], w = function (b) {
                    a.firstChild && a.removeChild(a.firstChild);
                    b && a.appendChild(Q.createTextNode(b))
                }, z = function (e, l) {
                    l = l || e;
                    if ("undefined" === typeof v[l]) if (a.getSubStringLength) try {
                        v[l] = p + a.getSubStringLength(0, c ? l + 1 : l)
                    } catch (la) {
                        ""
                    } else m.getSpanWidth && (w(x(f || c, e)), v[l] = p + m.getSpanWidth(b, a));
                    return v[l]
                }, O;
                b.rotation = 0;
                var T = z(a.textContent.length);
                if (O = p + T > e) {
                    for (; k <= F;) n = Math.ceil((k + F) / 2), c && (l = x(c, n)), T = z(n, l && l.length - 1), k === F ? k = F + 1 : T > e ? F = n - 1 : k = n;
                    0 === F ? w("") : f && F === f.length - 1 || w(l || x(f || c, n))
                }
                c && c.splice(0, n);
                b.actualWidth = T;
                b.rotation = C;
                return O
            }, escapes: {
                "&": "&amp;",
                "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
            }, buildText: function (b) {
                var c = b.element, p = this, e = p.forExport, m = f(b.textStr, "").toString(),
                    l = -1 !== m.indexOf("<"), C = c.childNodes, k, v = A(c, "x"), w = b.styles, z = b.textWidth,
                    O = w && w.lineHeight, q = w && w.textOutline, B = w && "ellipsis" === w.textOverflow,
                    d = w && "nowrap" === w.whiteSpace, N = w && w.fontSize, X, h = C.length;
                w = z && !b.added && this.box;
                var L = function (b) {
                    var f;
                    p.styledMode || (f = /(px|em)$/.test(b && b.style.fontSize) ? b.style.fontSize : N || p.style.fontSize || 12);
                    return O ? a(O) : p.fontMetrics(f,
                        b.getAttribute("style") ? b : c).h
                }, t = function (b, a) {
                    n(p.escapes, function (f, c) {
                        a && -1 !== a.indexOf(f) || (b = b.toString().replace(new RegExp(f, "g"), c))
                    });
                    return b
                }, U = function (b, a) {
                    var f = b.indexOf("<");
                    b = b.substring(f, b.indexOf(">") - f);
                    f = b.indexOf(a + "=");
                    if (-1 !== f && (f = f + a.length + 1, a = b.charAt(f), '"' === a || "'" === a)) return b = b.substring(f + 1), b.substring(0, b.indexOf(a))
                }, P = /<br.*?>/g;
                var g = [m, B, d, O, q, N, z].join();
                if (g !== b.textCache) {
                    for (b.textCache = g; h--;) c.removeChild(C[h]);
                    l || q || B || z || -1 !== m.indexOf(" ") && (!d ||
                        P.test(m)) ? (w && w.appendChild(c), l ? (m = p.styledMode ? m.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : m.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), m = m.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(P)) : m = [m], m = m.filter(function (b) {
                        return "" !== b
                    }), m.forEach(function (a, f) {
                        var m = 0, l = 0;
                        a = a.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g,
                            "</span>|||");
                        var C = a.split("|||");
                        C.forEach(function (a) {
                            if ("" !== a || 1 === C.length) {
                                var n = {}, F = Q.createElementNS(p.SVG_NS, "tspan"), w, O;
                                (w = U(a, "class")) && A(F, "class", w);
                                if (w = U(a, "style")) w = w.replace(/(;| |^)color([ :])/, "$1fill$2"), A(F, "style", w);
                                (O = U(a, "href")) && !e && (A(F, "onclick", 'location.href="' + O + '"'), A(F, "class", "highcharts-anchor"), p.styledMode || J(F, {cursor: "pointer"}));
                                a = t(a.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== a) {
                                    F.appendChild(Q.createTextNode(a));
                                    m ? n.dx = 0 : f && null !== v && (n.x = v);
                                    A(F, n);
                                    c.appendChild(F);
                                    !m && X && (!x && e && J(F, {display: "block"}), A(F, "dy", L(F)));
                                    if (z) {
                                        var q = a.replace(/([^\^])-/g, "$1- ").split(" ");
                                        n = !d && (1 < C.length || f || 1 < q.length);
                                        O = 0;
                                        var T = L(F);
                                        if (B) k = p.truncate(b, F, a, void 0, 0, Math.max(0, z - parseInt(N || 12, 10)), function (b, a) {
                                            return b.substring(0, a) + "\u2026"
                                        }); else if (n) for (; q.length;) q.length && !d && 0 < O && (F = Q.createElementNS(R, "tspan"), A(F, {
                                            dy: T,
                                            x: v
                                        }), w && A(F, "style", w), F.appendChild(Q.createTextNode(q.join(" ").replace(/- /g, "-"))), c.appendChild(F)), p.truncate(b, F,
                                            null, q, 0 === O ? l : 0, z, function (b, a) {
                                                return q.slice(0, a).join(" ").replace(/- /g, "-")
                                            }), l = b.actualWidth, O++
                                    }
                                    m++
                                }
                            }
                        });
                        X = X || c.childNodes.length
                    }), B && k && b.attr("title", t(b.textStr, ["&lt;", "&gt;"])), w && w.removeChild(c), q && b.applyTextOutline && b.applyTextOutline(q)) : c.appendChild(Q.createTextNode(t(m)))
                }
            }, getContrast: function (b) {
                b = u(b).rgba;
                b[0] *= 1;
                b[1] *= 1.2;
                b[2] *= .5;
                return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
            }, button: function (b, a, f, c, e, x, l, C, n, w) {
                var m = this.label(b, a, f, n, null, null, w, null, "button"), F = 0, v =
                    this.styledMode;
                m.attr(k({padding: 8, r: 2}, e));
                if (!v) {
                    e = k({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                    }, e);
                    var z = e.style;
                    delete e.style;
                    x = k(e, {fill: "#e6e6e6"}, x);
                    var O = x.style;
                    delete x.style;
                    l = k(e, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, l);
                    var q = l.style;
                    delete l.style;
                    C = k(e, {style: {color: "#cccccc"}}, C);
                    var R = C.style;
                    delete C.style
                }
                I(m.element, p ? "mouseover" : "mouseenter", function () {
                    3 !== F && m.setState(1)
                });
                I(m.element,
                    p ? "mouseout" : "mouseleave", function () {
                        3 !== F && m.setState(F)
                    });
                m.setState = function (b) {
                    1 !== b && (m.state = F = b);
                    m.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
                    v || m.attr([e, x, l, C][b || 0]).css([z, O, q, R][b || 0])
                };
                v || m.attr(e).css(h({cursor: "default"}, z));
                return m.on("click", function (b) {
                    3 !== F && c.call(m, b)
                })
            }, crispLine: function (b, a) {
                b[1] === b[4] && (b[1] = b[4] = Math.round(b[1]) - a % 2 / 2);
                b[2] === b[5] && (b[2] = b[5] = Math.round(b[2]) +
                    a % 2 / 2);
                return b
            }, path: function (b) {
                var a = this.styledMode ? {} : {fill: "none"};
                q(b) ? a.d = b : e(b) && h(a, b);
                return this.createElement("path").attr(a)
            }, circle: function (b, a, f) {
                b = e(b) ? b : "undefined" === typeof b ? {} : {x: b, y: a, r: f};
                a = this.createElement("circle");
                a.xSetter = a.ySetter = function (b, a, f) {
                    f.setAttribute("c" + a, b)
                };
                return a.attr(b)
            }, arc: function (b, a, f, c, p, x) {
                e(b) ? (c = b, a = c.y, f = c.r, b = c.x) : c = {innerR: c, start: p, end: x};
                b = this.symbol("arc", b, a, f, f, c);
                b.r = f;
                return b
            }, rect: function (b, a, f, c, p, x) {
                p = e(b) ? b.r : p;
                var m = this.createElement("rect");
                b = e(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: a,
                    width: Math.max(f, 0),
                    height: Math.max(c, 0)
                };
                this.styledMode || ("undefined" !== typeof x && (b.strokeWidth = x, b = m.crisp(b)), b.fill = "none");
                p && (b.r = p);
                m.rSetter = function (b, a, f) {
                    m.r = b;
                    A(f, {rx: b, ry: b})
                };
                m.rGetter = function () {
                    return m.r
                };
                return m.attr(b)
            }, setSize: function (b, a, c) {
                var p = this.alignedObjects, e = p.length;
                this.width = b;
                this.height = a;
                for (this.boxWrapper.animate({width: b, height: a}, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    },
                    duration: f(c, !0) ? void 0 : 0
                }); e--;) p[e].align()
            }, g: function (b) {
                var a = this.createElement("g");
                return b ? a.attr({"class": "highcharts-" + b}) : a
            }, image: function (b, a, f, c, p, e) {
                var x = {preserveAspectRatio: "none"}, m = function (b, a) {
                    b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : b.setAttribute("hc-svg-href", a)
                }, l = function (a) {
                    m(C.element, b);
                    e.call(C, a)
                };
                1 < arguments.length && h(x, {x: a, y: f, width: c, height: p});
                var C = this.createElement("image").attr(x);
                e ? (m(C.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                    x = new X.Image, I(x, "load", l), x.src = b, x.complete && l({})) : m(C.element, b);
                return C
            }, symbol: function (b, a, c, p, e, x) {
                var m = this, l = /^url\((.*?)\)$/, C = l.test(b), k = !C && (this.symbols[b] ? b : "circle"),
                    n = k && this.symbols[k],
                    F = y(a) && n && n.call(this.symbols, Math.round(a), Math.round(c), p, e, x);
                if (n) {
                    var w = this.path(F);
                    m.styledMode || w.attr("fill", "none");
                    h(w, {symbolName: k, x: a, y: c, width: p, height: e});
                    x && h(w, x)
                } else if (C) {
                    var v = b.match(l)[1];
                    w = this.image(v);
                    w.imgwidth = f(O[v] && O[v].width, x && x.width);
                    w.imgheight = f(O[v] && O[v].height,
                        x && x.height);
                    var z = function () {
                        w.attr({width: w.width, height: w.height})
                    };
                    ["width", "height"].forEach(function (b) {
                        w[b + "Setter"] = function (b, a) {
                            var f = {}, c = this["img" + a], p = "width" === a ? "translateX" : "translateY";
                            this[a] = b;
                            y(c) && (x && "within" === x.backgroundSize && this.width && this.height && (c = Math.round(c * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(a, c), this.alignByTranslate || (f[p] = ((this[a] || 0) - c) / 2, this.attr(f)))
                        }
                    });
                    y(a) && w.attr({x: a, y: c});
                    w.isImg = !0;
                    y(w.imgwidth) && y(w.imgheight) ? z() : (w.attr({
                        width: 0,
                        height: 0
                    }), G("img", {
                        onload: function () {
                            var b = B[m.chartIndex];
                            0 === this.width && (J(this, {
                                position: "absolute",
                                top: "-999em"
                            }), Q.body.appendChild(this));
                            O[v] = {width: this.width, height: this.height};
                            w.imgwidth = this.width;
                            w.imgheight = this.height;
                            w.element && z();
                            this.parentNode && this.parentNode.removeChild(this);
                            m.imgCount--;
                            if (!m.imgCount && b && !b.hasLoaded) b.onload()
                        }, src: v
                    }), this.imgCount++)
                }
                return w
            }, symbols: {
                circle: function (b, a, f, c) {
                    return this.arc(b + f / 2, a +
                        c / 2, f / 2, c / 2, {start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1})
                }, square: function (b, a, f, c) {
                    return ["M", b, a, "L", b + f, a, b + f, a + c, b, a + c, "Z"]
                }, triangle: function (b, a, f, c) {
                    return ["M", b + f / 2, a, "L", b + f, a + c, b, a + c, "Z"]
                }, "triangle-down": function (b, a, f, c) {
                    return ["M", b, a, "L", b + f, a, b + f / 2, a + c, "Z"]
                }, diamond: function (b, a, f, c) {
                    return ["M", b + f / 2, a, "L", b + f, a + c / 2, b + f / 2, a + c, b, a + c / 2, "Z"]
                }, arc: function (b, a, c, p, e) {
                    var x = e.start, m = e.r || c, l = e.r || p || c, C = e.end - .001;
                    c = e.innerR;
                    p = f(e.open, .001 > Math.abs(e.end - e.start - 2 * Math.PI));
                    var k = Math.cos(x),
                        n = Math.sin(x), w = Math.cos(C);
                    C = Math.sin(C);
                    x = f(e.longArc, .001 > e.end - x - Math.PI ? 0 : 1);
                    m = ["M", b + m * k, a + l * n, "A", m, l, 0, x, f(e.clockwise, 1), b + m * w, a + l * C];
                    y(c) && m.push(p ? "M" : "L", b + c * w, a + c * C, "A", c, c, 0, x, y(e.clockwise) ? 1 - e.clockwise : 0, b + c * k, a + c * n);
                    m.push(p ? "" : "Z");
                    return m
                }, callout: function (b, a, f, c, p) {
                    var e = Math.min(p && p.r || 0, f, c), x = e + 6, l = p && p.anchorX;
                    p = p && p.anchorY;
                    var m = ["M", b + e, a, "L", b + f - e, a, "C", b + f, a, b + f, a, b + f, a + e, "L", b + f, a + c - e, "C", b + f, a + c, b + f, a + c, b + f - e, a + c, "L", b + e, a + c, "C", b, a + c, b, a + c, b, a + c - e, "L", b, a + e, "C",
                        b, a, b, a, b + e, a];
                    l && l > f ? p > a + x && p < a + c - x ? m.splice(13, 3, "L", b + f, p - 6, b + f + 6, p, b + f, p + 6, b + f, a + c - e) : m.splice(13, 3, "L", b + f, c / 2, l, p, b + f, c / 2, b + f, a + c - e) : l && 0 > l ? p > a + x && p < a + c - x ? m.splice(33, 3, "L", b, p + 6, b - 6, p, b, p - 6, b, a + e) : m.splice(33, 3, "L", b, c / 2, l, p, b, c / 2, b, a + e) : p && p > c && l > b + x && l < b + f - x ? m.splice(23, 3, "L", l + 6, a + c, l, a + c + 6, l - 6, a + c, b + e, a + c) : p && 0 > p && l > b + x && l < b + f - x && m.splice(3, 3, "L", l - 6, a, l, a - 6, l + 6, a, f - e, a);
                    return m
                }
            }, clipRect: function (b, a, f, c) {
                var p = w() + "-", e = this.createElement("clipPath").attr({id: p}).add(this.defs);
                b = this.rect(b,
                    a, f, c, 0).add(e);
                b.id = p;
                b.clipPath = e;
                b.count = 0;
                return b
            }, text: function (b, a, f, c) {
                var p = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(b, a, f);
                p.x = Math.round(a || 0);
                f && (p.y = Math.round(f));
                y(b) && (p.text = b);
                b = this.createElement("text").attr(p);
                c || (b.xSetter = function (b, a, f) {
                    var c = f.getElementsByTagName("tspan"), p = f.getAttribute(a), e;
                    for (e = 0; e < c.length; e++) {
                        var x = c[e];
                        x.getAttribute(a) === p && x.setAttribute(a, b)
                    }
                    f.setAttribute(a, b)
                });
                return b
            }, fontMetrics: function (b, f) {
                b = !this.styledMode && /px/.test(b) ||
                !X.getComputedStyle ? b || f && f.style && f.style.fontSize || this.style && this.style.fontSize : f && U.prototype.getStyle.call(f, "font-size");
                b = /px/.test(b) ? a(b) : 12;
                f = 24 > b ? b + 3 : Math.round(1.2 * b);
                return {h: f, b: Math.round(.8 * f), f: b}
            }, rotCorr: function (b, a, f) {
                var c = b;
                a && f && (c = Math.max(c * Math.cos(a * L), 4));
                return {x: -b / 3 * Math.sin(a * L), y: c}
            }, label: function (b, a, f, c, p, e, x, C, n) {
                var m = this, w = m.styledMode, v = m.g("button" !== n && "label"),
                    F = v.text = m.text("", 0, 0, x).attr({zIndex: 1}), z, O, q = 0, R = 3, B = 0, d, N, X, V, L,
                    t = {}, T, g, Q = /^url\((.*?)\)$/.test(c),
                    H = w || Q, K = function () {
                        return w ? z.strokeWidth() % 2 / 2 : (T ? parseInt(T, 10) : 0) % 2 / 2
                    };
                n && v.addClass("highcharts-" + n);
                var ba = function () {
                    var b = F.element.style, a = {};
                    O = ("undefined" === typeof d || "undefined" === typeof N || L) && y(F.textStr) && F.getBBox();
                    v.width = (d || O.width || 0) + 2 * R + B;
                    v.height = (N || O.height || 0) + 2 * R;
                    g = R + Math.min(m.fontMetrics(b && b.fontSize, F).b, O ? O.height : Infinity);
                    H && (z || (v.box = z = m.symbols[c] || Q ? m.symbol(c) : m.rect(), z.addClass(("button" === n ? "" : "highcharts-label-box") + (n ? " highcharts-" + n + "-box" : "")), z.add(v),
                        b = K(), a.x = b, a.y = (C ? -g : 0) + b), a.width = Math.round(v.width), a.height = Math.round(v.height), z.attr(h(a, t)), t = {})
                };
                var u = function () {
                    var b = B + R;
                    var a = C ? 0 : g;
                    y(d) && O && ("center" === L || "right" === L) && (b += {center: .5, right: 1}[L] * (d - O.width));
                    if (b !== F.x || a !== F.y) F.attr("x", b), F.hasBoxWidthChanged && (O = F.getBBox(!0), ba()), "undefined" !== typeof a && F.attr("y", a);
                    F.x = b;
                    F.y = a
                };
                var Y = function (b, a) {
                    z ? z.attr(b, a) : t[b] = a
                };
                v.onAdd = function () {
                    F.add(v);
                    v.attr({text: b || 0 === b ? b : "", x: a, y: f});
                    z && y(p) && v.attr({anchorX: p, anchorY: e})
                };
                v.widthSetter = function (b) {
                    d = P(b) ? b : null
                };
                v.heightSetter = function (b) {
                    N = b
                };
                v["text-alignSetter"] = function (b) {
                    L = b
                };
                v.paddingSetter = function (b) {
                    y(b) && b !== R && (R = v.padding = b, u())
                };
                v.paddingLeftSetter = function (b) {
                    y(b) && b !== B && (B = b, u())
                };
                v.alignSetter = function (b) {
                    b = {left: 0, center: .5, right: 1}[b];
                    b !== q && (q = b, O && v.attr({x: X}))
                };
                v.textSetter = function (b) {
                    "undefined" !== typeof b && F.attr({text: b});
                    ba();
                    u()
                };
                v["stroke-widthSetter"] = function (b, a) {
                    b && (H = !0);
                    T = this["stroke-width"] = b;
                    Y(a, b)
                };
                w ? v.rSetter = function (b, a) {
                    Y(a,
                        b)
                } : v.strokeSetter = v.fillSetter = v.rSetter = function (b, a) {
                    "r" !== a && ("fill" === a && b && (H = !0), v[a] = b);
                    Y(a, b)
                };
                v.anchorXSetter = function (b, a) {
                    p = v.anchorX = b;
                    Y(a, Math.round(b) - K() - X)
                };
                v.anchorYSetter = function (b, a) {
                    e = v.anchorY = b;
                    Y(a, b - V)
                };
                v.xSetter = function (b) {
                    v.x = b;
                    q && (b -= q * ((d || O.width) + 2 * R), v["forceAnimate:x"] = !0);
                    X = Math.round(b);
                    v.attr("translateX", X)
                };
                v.ySetter = function (b) {
                    V = v.y = Math.round(b);
                    v.attr("translateY", V)
                };
                var D = v.css;
                x = {
                    css: function (b) {
                        if (b) {
                            var a = {};
                            b = k(b);
                            v.textProps.forEach(function (f) {
                                "undefined" !==
                                typeof b[f] && (a[f] = b[f], delete b[f])
                            });
                            F.css(a);
                            "width" in a && ba();
                            "fontSize" in a && (ba(), u())
                        }
                        return D.call(v, b)
                    }, getBBox: function () {
                        return {width: O.width + 2 * R, height: O.height + 2 * R, x: O.x - R, y: O.y - R}
                    }, destroy: function () {
                        l(v.element, "mouseenter");
                        l(v.element, "mouseleave");
                        F && (F = F.destroy());
                        z && (z = z.destroy());
                        U.prototype.destroy.call(v);
                        v = m = ba = u = Y = null
                    }
                };
                w || (x.shadow = function (b) {
                    b && (ba(), z && z.shadow(b));
                    return v
                });
                return h(v, x)
            }
        });
        d.Renderer = g
    });
    S(r, "parts/Html.js", [r["parts/Globals.js"], r["parts/Utilities.js"]],
        function (d, g) {
            var r = g.attr, u = g.createElement, I = g.css, M = g.defined, E = g.extend, A = g.pick, G = g.pInt,
                J = d.isFirefox, y = d.isMS, t = d.isWebKit, D = d.SVGElement;
            g = d.SVGRenderer;
            var h = d.win;
            E(D.prototype, {
                htmlCss: function (d) {
                    var q = "SPAN" === this.element.tagName && d && "width" in d, N = A(q && d.width, void 0);
                    if (q) {
                        delete d.width;
                        this.textWidth = N;
                        var e = !0
                    }
                    d && "ellipsis" === d.textOverflow && (d.whiteSpace = "nowrap", d.overflow = "hidden");
                    this.styles = E(this.styles, d);
                    I(this.element, d);
                    e && this.htmlUpdateTransform();
                    return this
                }, htmlGetBBox: function () {
                    var d =
                        this.element;
                    return {x: d.offsetLeft, y: d.offsetTop, width: d.offsetWidth, height: d.offsetHeight}
                }, htmlUpdateTransform: function () {
                    if (this.added) {
                        var d = this.renderer, q = this.element, h = this.translateX || 0, e = this.translateY || 0,
                            c = this.x || 0, k = this.y || 0, n = this.textAlign || "left",
                            f = {left: 0, center: .5, right: 1}[n], a = this.styles, l = a && a.whiteSpace;
                        I(q, {marginLeft: h, marginTop: e});
                        !d.styledMode && this.shadows && this.shadows.forEach(function (a) {
                            I(a, {marginLeft: h + 1, marginTop: e + 1})
                        });
                        this.inverted && [].forEach.call(q.childNodes,
                            function (a) {
                                d.invertChild(a, q)
                            });
                        if ("SPAN" === q.tagName) {
                            a = this.rotation;
                            var v = this.textWidth && G(this.textWidth),
                                z = [a, n, q.innerHTML, this.textWidth, this.textAlign].join(), w;
                            (w = v !== this.oldTextWidth) && !(w = v > this.oldTextWidth) && ((w = this.textPxLength) || (I(q, {
                                width: "",
                                whiteSpace: l || "nowrap"
                            }), w = q.offsetWidth), w = w > v);
                            w && (/[ \-]/.test(q.textContent || q.innerText) || "ellipsis" === q.style.textOverflow) ? (I(q, {
                                    width: v + "px",
                                    display: "block",
                                    whiteSpace: l || "normal"
                                }), this.oldTextWidth = v, this.hasBoxWidthChanged = !0) :
                                this.hasBoxWidthChanged = !1;
                            z !== this.cTT && (l = d.fontMetrics(q.style.fontSize, q).b, !M(a) || a === (this.oldRotation || 0) && n === this.oldAlign || this.setSpanRotation(a, f, l), this.getSpanCorrection(!M(a) && this.textPxLength || q.offsetWidth, l, f, a, n));
                            I(q, {left: c + (this.xCorr || 0) + "px", top: k + (this.yCorr || 0) + "px"});
                            this.cTT = z;
                            this.oldRotation = a;
                            this.oldAlign = n
                        }
                    } else this.alignOnAdd = !0
                }, setSpanRotation: function (d, q, h) {
                    var e = {}, c = this.renderer.getTransformKey();
                    e[c] = e.transform = "rotate(" + d + "deg)";
                    e[c + (J ? "Origin" : "-origin")] =
                        e.transformOrigin = 100 * q + "% " + h + "px";
                    I(this.element, e)
                }, getSpanCorrection: function (d, q, h) {
                    this.xCorr = -d * h;
                    this.yCorr = -q
                }
            });
            E(g.prototype, {
                getTransformKey: function () {
                    return y && !/Edge/.test(h.navigator.userAgent) ? "-ms-transform" : t ? "-webkit-transform" : J ? "MozTransform" : h.opera ? "-o-transform" : ""
                }, html: function (d, q, h) {
                    var e = this.createElement("span"), c = e.element, k = e.renderer, n = k.isSVG,
                        f = function (a, f) {
                            ["opacity", "visibility"].forEach(function (c) {
                                a[c + "Setter"] = function (e, l, k) {
                                    var v = a.div ? a.div.style : f;
                                    D.prototype[c +
                                    "Setter"].call(this, e, l, k);
                                    v && (v[l] = e)
                                }
                            });
                            a.addedSetters = !0
                        };
                    e.textSetter = function (a) {
                        a !== c.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                        this.textStr = a;
                        c.innerHTML = A(a, "");
                        e.doTransform = !0
                    };
                    n && f(e, e.element.style);
                    e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function (a, f) {
                        "align" === f && (f = "textAlign");
                        e[f] = a;
                        e.doTransform = !0
                    };
                    e.afterSetters = function () {
                        this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                    };
                    e.attr({text: d, x: Math.round(q), y: Math.round(h)}).css({position: "absolute"});
                    k.styledMode || e.css({fontFamily: this.style.fontFamily, fontSize: this.style.fontSize});
                    c.style.whiteSpace = "nowrap";
                    e.css = e.htmlCss;
                    n && (e.add = function (a) {
                        var l = k.box.parentNode, v = [];
                        if (this.parentGroup = a) {
                            var n = a.div;
                            if (!n) {
                                for (; a;) v.push(a), a = a.parentGroup;
                                v.reverse().forEach(function (a) {
                                    function c(f, c) {
                                        a[c] = f;
                                        "translateX" === c ? w.left = f + "px" : w.top = f + "px";
                                        a.doTransform = !0
                                    }

                                    var k = r(a.element, "class");
                                    n = a.div = a.div || u("div", k ? {className: k} : void 0, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY ||
                                            0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, n || l);
                                    var w = n.style;
                                    E(a, {
                                        classSetter: function (a) {
                                            return function (f) {
                                                this.element.setAttribute("class", f);
                                                a.className = f
                                            }
                                        }(n), on: function () {
                                            v[0].div && e.on.apply({element: v[0].div}, arguments);
                                            return a
                                        }, translateXSetter: c, translateYSetter: c
                                    });
                                    a.addedSetters || f(a)
                                })
                            }
                        } else n = l;
                        n.appendChild(c);
                        e.added = !0;
                        e.alignOnAdd && e.htmlUpdateTransform();
                        return e
                    });
                    return e
                }
            })
        });
    S(r, "parts/Tick.js", [r["parts/Globals.js"], r["parts/Utilities.js"]],
        function (d, g) {
            var r = g.clamp, u = g.correctFloat, I = g.defined, M = g.destroyObjectProperties, E = g.extend,
                A = g.isNumber, G = g.merge, J = g.objectEach, y = g.pick, t = d.fireEvent, D = d.deg2rad;
            g = function () {
                function h(d, q, h, e, c) {
                    this.isNewLabel = this.isNew = !0;
                    this.axis = d;
                    this.pos = q;
                    this.type = h || "";
                    this.parameters = c || {};
                    this.tickmarkOffset = this.parameters.tickmarkOffset;
                    this.options = this.parameters.options;
                    h || e || this.addLabel()
                }

                h.prototype.addLabel = function () {
                    var d = this, q = d.axis, h = q.options, e = q.chart, c = q.categories, k = q.names,
                        n = d.pos, f = y(d.options && d.options.labels, h.labels), a = q.tickPositions, l = n === a[0],
                        v = n === a[a.length - 1];
                    k = this.parameters.category || (c ? y(c[n], k[n], n) : n);
                    var z = d.label;
                    c = (!f.step || 1 === f.step) && 1 === q.tickInterval;
                    a = a.info;
                    var w, B;
                    if (q.isDatetimeAxis && a) {
                        var L = e.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid && a.higherRanks[n] || a.unitName]);
                        var t = L.main
                    }
                    d.isFirst = l;
                    d.isLast = v;
                    d.formatCtx = {
                        axis: q,
                        chart: e,
                        isFirst: l,
                        isLast: v,
                        dateTimeLabelFormat: t,
                        tickPositionInfo: a,
                        value: q.isLog ? u(q.lin2log(k)) : k,
                        pos: n
                    };
                    h = q.labelFormatter.call(d.formatCtx, this.formatCtx);
                    if (B = L && L.list) d.shortenLabel = function () {
                        for (w = 0; w < B.length; w++) if (z.attr({text: q.labelFormatter.call(E(d.formatCtx, {dateTimeLabelFormat: B[w]}))}), z.getBBox().width < q.getSlotWidth(d) - 2 * y(f.padding, 5)) return;
                        z.attr({text: ""})
                    };
                    c && q._addedPlotLB && q.isXAxis && d.moveLabel(h, f);
                    I(z) || d.movedLabel ? z && z.textStr !== h && !c && (!z.textWidth || f.style && f.style.width || z.styles.width || z.css({width: null}), z.attr({text: h}), z.textPxLength = z.getBBox().width) : (d.label =
                        z = d.createLabel({x: 0, y: 0}, h, f), d.rotation = 0)
                };
                h.prototype.createLabel = function (d, q, h) {
                    var e = this.axis, c = e.chart;
                    if (d = I(q) && h.enabled ? c.renderer.text(q, d.x, d.y, h.useHTML).add(e.labelGroup) : null) c.styledMode || d.css(G(h.style)), d.textPxLength = d.getBBox().width;
                    return d
                };
                h.prototype.destroy = function () {
                    M(this, this.axis)
                };
                h.prototype.getPosition = function (d, q, h, e) {
                    var c = this.axis, k = c.chart, n = e && k.oldChartHeight || k.chartHeight;
                    d = {
                        x: d ? u(c.translate(q + h, null, null, e) + c.transB) : c.left + c.offset + (c.opposite ? (e &&
                            k.oldChartWidth || k.chartWidth) - c.right - c.left : 0),
                        y: d ? n - c.bottom + c.offset - (c.opposite ? c.height : 0) : u(n - c.translate(q + h, null, null, e) - c.transB)
                    };
                    d.y = r(d.y, -1E5, 1E5);
                    t(this, "afterGetPosition", {pos: d});
                    return d
                };
                h.prototype.getLabelPosition = function (d, q, h, e, c, k, n, f) {
                    var a = this.axis, l = a.transA,
                        v = a.isLinked && a.linkedParent ? a.linkedParent.reversed : a.reversed, z = a.staggerLines,
                        w = a.tickRotCorr || {x: 0, y: 0}, B = c.y,
                        L = e || a.reserveSpaceDefault ? 0 : -a.labelOffset * ("center" === a.labelAlign ? .5 : 1),
                        N = {};
                    I(B) || (B = 0 === a.side ?
                        h.rotation ? -8 : -h.getBBox().height : 2 === a.side ? w.y + 8 : Math.cos(h.rotation * D) * (w.y - h.getBBox(!1, 0).height / 2));
                    d = d + c.x + L + w.x - (k && e ? k * l * (v ? -1 : 1) : 0);
                    q = q + B - (k && !e ? k * l * (v ? 1 : -1) : 0);
                    z && (h = n / (f || 1) % z, a.opposite && (h = z - h - 1), q += a.labelOffset / z * h);
                    N.x = d;
                    N.y = Math.round(q);
                    t(this, "afterGetLabelPosition", {pos: N, tickmarkOffset: k, index: n});
                    return N
                };
                h.prototype.getLabelSize = function () {
                    return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
                };
                h.prototype.getMarkPath = function (d, q, h, e, c, k) {
                    return k.crispLine(["M",
                        d, q, "L", d + (c ? 0 : -h), q + (c ? h : 0)], e)
                };
                h.prototype.handleOverflow = function (d) {
                    var q = this.axis, h = q.options.labels, e = d.x, c = q.chart.chartWidth, k = q.chart.spacing,
                        n = y(q.labelLeft, Math.min(q.pos, k[3]));
                    k = y(q.labelRight, Math.max(q.isRadial ? 0 : q.pos + q.len, c - k[1]));
                    var f = this.label, a = this.rotation,
                        l = {left: 0, center: .5, right: 1}[q.labelAlign || f.attr("align")], v = f.getBBox().width,
                        z = q.getSlotWidth(this), w = z, B = 1, L, t = {};
                    if (a || "justify" !== y(h.overflow, "justify")) 0 > a && e - l * v < n ? L = Math.round(e / Math.cos(a * D) - n) : 0 < a && e + l * v > k &&
                        (L = Math.round((c - e) / Math.cos(a * D))); else if (c = e + (1 - l) * v, e - l * v < n ? w = d.x + w * (1 - l) - n : c > k && (w = k - d.x + w * l, B = -1), w = Math.min(z, w), w < z && "center" === q.labelAlign && (d.x += B * (z - w - l * (z - Math.min(v, w)))), v > w || q.autoRotation && (f.styles || {}).width) L = w;
                    L && (this.shortenLabel ? this.shortenLabel() : (t.width = Math.floor(L), (h.style || {}).textOverflow || (t.textOverflow = "ellipsis"), f.css(t)))
                };
                h.prototype.moveLabel = function (d, q) {
                    var h = this, e = h.label, c = !1, k = h.axis, n = k.reversed, f = k.chart.inverted;
                    e && e.textStr === d ? (h.movedLabel = e, c =
                        !0, delete h.label) : J(k.ticks, function (a) {
                        c || a.isNew || a === h || !a.label || a.label.textStr !== d || (h.movedLabel = a.label, c = !0, a.labelPos = h.movedLabel.xy, delete a.label)
                    });
                    if (!c && (h.labelPos || e)) {
                        var a = h.labelPos || e.xy;
                        e = f ? a.x : n ? 0 : k.width + k.left;
                        k = f ? n ? k.width + k.left : 0 : a.y;
                        h.movedLabel = h.createLabel({x: e, y: k}, d, q);
                        h.movedLabel && h.movedLabel.attr({opacity: 0})
                    }
                };
                h.prototype.render = function (h, q, t) {
                    var e = this.axis, c = e.horiz, k = this.pos, n = y(this.tickmarkOffset, e.tickmarkOffset);
                    k = this.getPosition(c, k, n, q);
                    n = k.x;
                    var f = k.y;
                    e = c && n === e.pos + e.len || !c && f === e.pos ? -1 : 1;
                    t = y(t, 1);
                    this.isActive = !0;
                    this.renderGridLine(q, t, e);
                    this.renderMark(k, t, e);
                    this.renderLabel(k, q, t, h);
                    this.isNew = !1;
                    d.fireEvent(this, "afterRender")
                };
                h.prototype.renderGridLine = function (d, q, h) {
                    var e = this.axis, c = e.options, k = this.gridLine, n = {}, f = this.pos, a = this.type,
                        l = y(this.tickmarkOffset, e.tickmarkOffset), v = e.chart.renderer, z = a ? a + "Grid" : "grid",
                        w = c[z + "LineWidth"], B = c[z + "LineColor"];
                    c = c[z + "LineDashStyle"];
                    k || (e.chart.styledMode || (n.stroke = B, n["stroke-width"] =
                        w, c && (n.dashstyle = c)), a || (n.zIndex = 1), d && (q = 0), this.gridLine = k = v.path().attr(n).addClass("highcharts-" + (a ? a + "-" : "") + "grid-line").add(e.gridGroup));
                    if (k && (h = e.getPlotLinePath({
                        value: f + l,
                        lineWidth: k.strokeWidth() * h,
                        force: "pass",
                        old: d
                    }))) k[d || this.isNew ? "attr" : "animate"]({d: h, opacity: q})
                };
                h.prototype.renderMark = function (d, q, h) {
                    var e = this.axis, c = e.options, k = e.chart.renderer, n = this.type, f = n ? n + "Tick" : "tick",
                        a = e.tickSize(f), l = this.mark, v = !l, z = d.x;
                    d = d.y;
                    var w = y(c[f + "Width"], !n && e.isXAxis ? 1 : 0);
                    c = c[f + "Color"];
                    a && (e.opposite && (a[0] = -a[0]), v && (this.mark = l = k.path().addClass("highcharts-" + (n ? n + "-" : "") + "tick").add(e.axisGroup), e.chart.styledMode || l.attr({
                        stroke: c,
                        "stroke-width": w
                    })), l[v ? "attr" : "animate"]({
                        d: this.getMarkPath(z, d, a[0], l.strokeWidth() * h, e.horiz, k),
                        opacity: q
                    }))
                };
                h.prototype.renderLabel = function (d, q, h, e) {
                    var c = this.axis, k = c.horiz, n = c.options, f = this.label, a = n.labels, l = a.step;
                    c = y(this.tickmarkOffset, c.tickmarkOffset);
                    var v = !0, z = d.x;
                    d = d.y;
                    f && A(z) && (f.xy = d = this.getLabelPosition(z, d, f, k, a, c, e, l), this.isFirst &&
                    !this.isLast && !y(n.showFirstLabel, 1) || this.isLast && !this.isFirst && !y(n.showLastLabel, 1) ? v = !1 : !k || a.step || a.rotation || q || 0 === h || this.handleOverflow(d), l && e % l && (v = !1), v && A(d.y) ? (d.opacity = h, f[this.isNewLabel ? "attr" : "animate"](d), this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0))
                };
                h.prototype.replaceMovedLabel = function () {
                    var d = this.label, q = this.axis, h = q.reversed, e = this.axis.chart.inverted;
                    if (d && !this.isNew) {
                        var c = e ? d.xy.x : h ? q.left : q.width + q.left;
                        h = e ? h ? q.width + q.top : q.top : d.xy.y;
                        d.animate({
                            x: c,
                            y: h, opacity: 0
                        }, void 0, d.destroy);
                        delete this.label
                    }
                    q.isDirty = !0;
                    this.label = this.movedLabel;
                    delete this.movedLabel
                };
                return h
            }();
            d.Tick = g;
            return d.Tick
        });
    S(r, "parts/Time.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.defined, u = g.error, I = g.extend, M = g.isObject, E = g.merge, A = g.objectEach, G = g.pad,
            J = g.pick, y = g.splat, t = g.timeUnits, D = d.win;
        g = function () {
            function h(d) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = D.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(d)
            }

            h.prototype.get = function (d, q) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var h = q.getTime(), e = h - this.getTimezoneOffset(q);
                    q.setTime(e);
                    d = q["getUTC" + d]();
                    q.setTime(h);
                    return d
                }
                return this.useUTC ? q["getUTC" + d]() : q["get" + d]()
            };
            h.prototype.set = function (d, q, h) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === d || "Seconds" === d || "Minutes" === d) return q["setUTC" + d](h);
                    var e = this.getTimezoneOffset(q);
                    e = q.getTime() - e;
                    q.setTime(e);
                    q["setUTC" + d](h);
                    d = this.getTimezoneOffset(q);
                    e = q.getTime() + d;
                    return q.setTime(e)
                }
                return this.useUTC ? q["setUTC" + d](h) : q["set" + d](h)
            };
            h.prototype.update = function (d) {
                var q = J(d && d.useUTC, !0);
                this.options = d = E(!0, this.options || {}, d);
                this.Date = d.Date || D.Date || Date;
                this.timezoneOffset = (this.useUTC = q) && d.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = !(q && !d.getTimezoneOffset && !d.timezone)
            };
            h.prototype.makeTime = function (h, q, t, e, c, k) {
                if (this.useUTC) {
                    var n = this.Date.UTC.apply(0, arguments);
                    var f = this.getTimezoneOffset(n);
                    n += f;
                    var a = this.getTimezoneOffset(n);
                    f !== a ? n += a - f : f - 36E5 !== this.getTimezoneOffset(n - 36E5) || d.isSafari || (n -= 36E5)
                } else n = (new this.Date(h, q, J(t, 1), J(e, 0), J(c, 0), J(k, 0))).getTime();
                return n
            };
            h.prototype.timezoneOffsetFunction = function () {
                var d = this, q = this.options, h = D.moment;
                if (!this.useUTC) return function (e) {
                    return 6E4 * (new Date(e.toString())).getTimezoneOffset()
                };
                if (q.timezone) {
                    if (h) return function (e) {
                        return 6E4 * -h.tz(e, q.timezone).utcOffset()
                    };
                    u(25)
                }
                return this.useUTC && q.getTimezoneOffset ? function (e) {
                    return 6E4 *
                        q.getTimezoneOffset(e.valueOf())
                } : function () {
                    return 6E4 * (d.timezoneOffset || 0)
                }
            };
            h.prototype.dateFormat = function (h, q, t) {
                var e;
                if (!r(q) || isNaN(q)) return (null === (e = d.defaultOptions.lang) || void 0 === e ? void 0 : e.invalidDate) || "";
                h = J(h, "%Y-%m-%d %H:%M:%S");
                var c = this;
                e = new this.Date(q);
                var k = this.get("Hours", e), n = this.get("Day", e), f = this.get("Date", e), a = this.get("Month", e),
                    l = this.get("FullYear", e), v = d.defaultOptions.lang,
                    z = null === v || void 0 === v ? void 0 : v.weekdays,
                    w = null === v || void 0 === v ? void 0 : v.shortWeekdays;
                e = I({
                    a: w ? w[n] : z[n].substr(0, 3),
                    A: z[n],
                    d: G(f),
                    e: G(f, 2, " "),
                    w: n,
                    b: v.shortMonths[a],
                    B: v.months[a],
                    m: G(a + 1),
                    o: a + 1,
                    y: l.toString().substr(2, 2),
                    Y: l,
                    H: G(k),
                    k: k,
                    I: G(k % 12 || 12),
                    l: k % 12 || 12,
                    M: G(this.get("Minutes", e)),
                    p: 12 > k ? "AM" : "PM",
                    P: 12 > k ? "am" : "pm",
                    S: G(e.getSeconds()),
                    L: G(Math.floor(q % 1E3), 3)
                }, d.dateFormats);
                A(e, function (a, f) {
                    for (; -1 !== h.indexOf("%" + f);) h = h.replace("%" + f, "function" === typeof a ? a.call(c, q) : a)
                });
                return t ? h.substr(0, 1).toUpperCase() + h.substr(1) : h
            };
            h.prototype.resolveDTLFormat = function (d) {
                return M(d,
                    !0) ? d : (d = y(d), {main: d[0], from: d[1], to: d[2]})
            };
            h.prototype.getTimeTicks = function (d, h, g, e) {
                var c = this, k = [], n = {};
                var f = new c.Date(h);
                var a = d.unitRange, l = d.count || 1, v;
                e = J(e, 1);
                if (r(h)) {
                    c.set("Milliseconds", f, a >= t.second ? 0 : l * Math.floor(c.get("Milliseconds", f) / l));
                    a >= t.second && c.set("Seconds", f, a >= t.minute ? 0 : l * Math.floor(c.get("Seconds", f) / l));
                    a >= t.minute && c.set("Minutes", f, a >= t.hour ? 0 : l * Math.floor(c.get("Minutes", f) / l));
                    a >= t.hour && c.set("Hours", f, a >= t.day ? 0 : l * Math.floor(c.get("Hours", f) / l));
                    a >= t.day &&
                    c.set("Date", f, a >= t.month ? 1 : Math.max(1, l * Math.floor(c.get("Date", f) / l)));
                    if (a >= t.month) {
                        c.set("Month", f, a >= t.year ? 0 : l * Math.floor(c.get("Month", f) / l));
                        var z = c.get("FullYear", f)
                    }
                    a >= t.year && c.set("FullYear", f, z - z % l);
                    a === t.week && (z = c.get("Day", f), c.set("Date", f, c.get("Date", f) - z + e + (z < e ? -7 : 0)));
                    z = c.get("FullYear", f);
                    e = c.get("Month", f);
                    var w = c.get("Date", f), q = c.get("Hours", f);
                    h = f.getTime();
                    c.variableTimezone && (v = g - h > 4 * t.month || c.getTimezoneOffset(h) !== c.getTimezoneOffset(g));
                    h = f.getTime();
                    for (f = 1; h < g;) k.push(h),
                        h = a === t.year ? c.makeTime(z + f * l, 0) : a === t.month ? c.makeTime(z, e + f * l) : !v || a !== t.day && a !== t.week ? v && a === t.hour && 1 < l ? c.makeTime(z, e, w, q + f * l) : h + a * l : c.makeTime(z, e, w + f * l * (a === t.day ? 1 : 7)), f++;
                    k.push(h);
                    a <= t.hour && 1E4 > k.length && k.forEach(function (a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (n[a] = "day")
                    })
                }
                k.info = I(d, {higherRanks: n, totalRange: a * l});
                return k
            };
            h.defaultOptions = {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            };
            return h
        }();
        d.Time = g;
        return d.Time
    });
    S(r,
        "parts/Options.js", [r["parts/Globals.js"], r["parts/Time.js"], r["parts/Color.js"], r["parts/Utilities.js"]], function (d, g, r, u) {
            r = r.parse;
            var I = u.merge;
            d.defaultOptions = {
                colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {},
                time: g.defaultOptions,
                chart: {
                    styledMode: !1,
                    borderRadius: 0,
                    colorCount: 10,
                    defaultSeriesType: "line",
                    ignoreHiddenSeries: !0,
                    spacing: [10, 10, 15, 10],
                    resetZoomButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}},
                    width: null,
                    height: null,
                    borderColor: "#335cad",
                    backgroundColor: "#ffffff",
                    plotBorderColor: "#cccccc"
                },
                title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
                subtitle: {text: "", align: "center", widthAdjust: -44},
                caption: {margin: 15, text: "", align: "left", verticalAlign: "bottom"},
                plotOptions: {},
                labels: {style: {position: "absolute", color: "#333333"}},
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    layout: "horizontal",
                    labelFormatter: function () {
                        return this.name
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                    itemStyle: {
                        color: "#333333",
                        cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis"
                    },
                    itemHoverStyle: {color: "#000000"},
                    itemHiddenStyle: {color: "#cccccc"},
                    shadow: !1,
                    itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: {style: {fontWeight: "bold"}}
                },
                loading: {
                    labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                    style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
                },
                tooltip: {
                    enabled: !0,
                    animation: d.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    padding: 8,
                    snap: d.isTouchDevice ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: r("#f7f7f7").setOpacity(.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    style: {color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap"}
                },
                credits: {
                    enabled: !0,
                    href: "#",
                    position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                    style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                    text: "Developed By Deploy"
                }
            };
            d.setOptions = function (g) {
                d.defaultOptions = I(!0, d.defaultOptions, g);
                (g.time || g.global) && d.time.update(I(d.defaultOptions.global, d.defaultOptions.time, g.global, g.time));
                return d.defaultOptions
            };
            d.getOptions =
                function () {
                    return d.defaultOptions
                };
            d.defaultPlotOptions = d.defaultOptions.plotOptions;
            d.time = new g(I(d.defaultOptions.global, d.defaultOptions.time));
            d.dateFormat = function (g, u, A) {
                return d.time.dateFormat(g, u, A)
            };
            ""
        });
    S(r, "parts/Axis.js", [r["parts/Globals.js"], r["parts/Color.js"], r["parts/Tick.js"], r["parts/Utilities.js"]], function (d, g, r, u) {
        var I = g.parse, M = u.addEvent, E = u.animObject, A = u.arrayMax, G = u.arrayMin, J = u.clamp,
            y = u.correctFloat, t = u.defined, D = u.destroyObjectProperties, h = u.error, N = u.extend,
            q = u.fireEvent,
            P = u.format, e = u.getMagnitude, c = u.isArray, k = u.isFunction, n = u.isNumber, f = u.isString,
            a = u.merge, l = u.normalizeTickInterval, v = u.objectEach, z = u.pick, w = u.relativeLength,
            B = u.removeEvent, L = u.splat, Q = u.syncTimeout, H = d.defaultOptions, K = d.deg2rad;
        g = function () {
            this.init.apply(this, arguments)
        };
        N(g.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {main: "%H:%M:%S.%L", range: !1},
                    second: {main: "%H:%M:%S", range: !1},
                    minute: {main: "%H:%M", range: !1},
                    hour: {main: "%H:%M", range: !1},
                    day: {main: "%e. %b"},
                    week: {main: "%e. %b"},
                    month: {main: "%b '%y"},
                    year: {main: "%Y"}
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {color: "#666666", cursor: "default", fontSize: "11px"}
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function () {
                        var a = this.axis.chart.numberFormatter;
                        return a(this.total, -1)
                    }, style: {color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast"}
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {x: -15},
                title: {rotation: 270}
            },
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}},
            init: function (a, b) {
                var f = b.isX, c = this;
                c.chart = a;
                c.horiz = a.inverted && !c.isZAxis ? !f : f;
                c.isXAxis = f;
                c.coll = c.coll || (f ? "xAxis" : "yAxis");
                q(this, "init", {userOptions: b});
                c.opposite = b.opposite;
                c.side = b.side || (c.horiz ? c.opposite ? 0 : 2 : c.opposite ? 1 : 3);
                c.setOptions(b);
                var p = this.options, e = p.type;
                c.labelFormatter = p.labels.formatter || c.defaultLabelFormatter;
                c.userOptions = b;
                c.minPixelPadding = 0;
                c.reversed = p.reversed;
                c.visible = !1 !== p.visible;
                c.zoomEnabled = !1 !== p.zoomEnabled;
                c.hasNames = "category" === e || !0 === p.categories;
                c.categories = p.categories || c.hasNames;
                c.names || (c.names = [], c.names.keys = {});
                c.plotLinesAndBandsGroups = {};
                c.isLog = "logarithmic" === e;
                c.isDatetimeAxis = "datetime" === e;
                c.positiveValuesOnly = c.isLog && !c.allowNegativeLog;
                c.isLinked = t(p.linkedTo);
                c.ticks = {};
                c.labelEdge =
                    [];
                c.minorTicks = {};
                c.plotLinesAndBands = [];
                c.alternateBands = {};
                c.len = 0;
                c.minRange = c.userMinRange = p.minRange || p.maxZoom;
                c.range = p.range;
                c.offset = p.offset || 0;
                c.stacks = {};
                c.oldStacks = {};
                c.stacksTouched = 0;
                c.max = null;
                c.min = null;
                c.crosshair = z(p.crosshair, L(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);
                b = c.options.events;
                -1 === a.axes.indexOf(c) && (f ? a.axes.splice(a.xAxis.length, 0, c) : a.axes.push(c), a[c.coll].push(c));
                c.series = c.series || [];
                a.inverted && !c.isZAxis && f && "undefined" === typeof c.reversed && (c.reversed = !0);
                v(b, function (b, a) {
                    k(b) && M(c, a, b)
                });
                c.lin2log = p.linearToLogConverter || c.lin2log;
                c.isLog && (c.val2lin = c.log2lin, c.lin2val = c.lin2log);
                q(this, "afterInit")
            },
            setOptions: function (c) {
                this.options = a(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], a(H[this.coll], c));
                q(this, "afterSetOptions", {userOptions: c})
            },
            defaultLabelFormatter: function () {
                var a = this.axis, b = this.value,
                    c = a.chart.time, f = a.categories, e = this.dateTimeLabelFormat, l = H.lang, k = l.numericSymbols;
                l = l.numericSymbolMagnitude || 1E3;
                var v = k && k.length, m = a.options.labels.format;
                a = a.isLog ? Math.abs(b) : a.tickInterval;
                var n = this.chart, d = n.numberFormatter;
                if (m) var w = P(m, this, n); else if (f) w = b; else if (e) w = c.dateFormat(e, b); else if (v && 1E3 <= a) for (; v-- && "undefined" === typeof w;) c = Math.pow(l, v + 1), a >= c && 0 === 10 * b % c && null !== k[v] && 0 !== b && (w = d(b / c, -1) + k[v]);
                "undefined" === typeof w && (w = 1E4 <= Math.abs(b) ? d(b, -1) : d(b, -1, void 0, ""));
                return w
            },
            getSeriesExtremes: function () {
                var a = this, b = a.chart, c;
                q(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function (f) {
                        if (f.visible || !b.options.chart.ignoreHiddenSeries) {
                            var e = f.options, p = e.threshold;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= p && (p = null);
                            if (a.isXAxis) {
                                if (e = f.xData, e.length) {
                                    c = f.getXExtremes(e);
                                    var x = c.min;
                                    var l = c.max;
                                    n(x) || x instanceof Date || (e = e.filter(n),
                                        c = f.getXExtremes(e), x = c.min, l = c.max);
                                    e.length && (a.dataMin = Math.min(z(a.dataMin, x), x), a.dataMax = Math.max(z(a.dataMax, l), l))
                                }
                            } else if (f.getExtremes(), l = f.dataMax, x = f.dataMin, t(x) && t(l) && (a.dataMin = Math.min(z(a.dataMin, x), x), a.dataMax = Math.max(z(a.dataMax, l), l)), t(p) && (a.threshold = p), !e.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                q(this, "afterGetSeriesExtremes")
            },
            translate: function (a, b, c, f, e, l) {
                var p = this.linkedParent || this, x = 1, m = 0, C = f ? p.oldTransA : p.transA;
                f = f ? p.oldMin : p.min;
                var k = p.minPixelPadding;
                e = (p.isOrdinal || p.isBroken || p.isLog && e) && p.lin2val;
                C || (C = p.transA);
                c && (x *= -1, m = p.len);
                p.reversed && (x *= -1, m -= x * (p.sector || p.len));
                b ? (a = (a * x + m - k) / C + f, e && (a = p.lin2val(a))) : (e && (a = p.val2lin(a)), a = n(f) ? x * (a - f) * C + m + x * k + (n(l) ? C * l : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a) {
                var b = this, c = b.chart, f = b.left, e = b.top, p = a.old, l = a.value,
                    k = a.translatedValue, m = a.lineWidth, v = a.force, d, w, F, h,
                    B = p && c.oldChartHeight || c.chartHeight, L = p && c.oldChartWidth || c.chartWidth, t,
                    g = b.transB, H = function (b, a, c) {
                        if ("pass" !== v && b < a || b > c) v ? b = J(b, a, c) : t = !0;
                        return b
                    };
                a = {value: l, lineWidth: m, old: p, force: v, acrossPanes: a.acrossPanes, translatedValue: k};
                q(this, "getPlotLinePath", a, function (a) {
                    k = z(k, b.translate(l, null, null, p));
                    k = J(k, -1E5, 1E5);
                    d = F = Math.round(k + g);
                    w = h = Math.round(B - k - g);
                    n(k) ? b.horiz ? (w = e, h = B - b.bottom, d = F = H(d, f, f + b.width)) : (d = f, F = L - b.right, w = h = H(w, e, e +
                        b.height)) : (t = !0, v = !1);
                    a.path = t && !v ? null : c.renderer.crispLine(["M", d, w, "L", F, h], m || 1)
                });
                return a.path
            },
            getLinearTickPositions: function (a, b, c) {
                var f = y(Math.floor(b / a) * a);
                c = y(Math.ceil(c / a) * a);
                var e = [], p;
                y(f + a) === f && (p = 20);
                if (this.single) return [b];
                for (b = f; b <= c;) {
                    e.push(b);
                    b = y(b + a, p);
                    if (b === l) break;
                    var l = b
                }
                return e
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? z(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a =
                        this, b = a.options, c = a.tickPositions, f = a.minorTickInterval, e = [],
                    l = a.pointRangePadding || 0, k = a.min - l;
                l = a.max + l;
                var v = l - k;
                if (v && v / f < a.len / 3) if (a.isLog) this.paddedTicks.forEach(function (b, c, p) {
                    c && e.push.apply(e, a.getLogTickPositions(f, p[c - 1], p[c], !0))
                }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) e = e.concat(a.getTimeTicks(a.normalizeTimeTickInterval(f), k, l, b.startOfWeek)); else for (b = k + (c[0] - k) % f; b <= l && b !== e[0]; b += f) e.push(b);
                0 !== e.length && a.trimTicks(e);
                return e
            },
            adjustForMinRange: function () {
                var a =
                    this.options, b = this.min, c = this.max, f, e, l, k, v;
                this.isXAxis && "undefined" === typeof this.minRange && !this.isLog && (t(a.min) || t(a.max) ? this.minRange = null : (this.series.forEach(function (b) {
                    k = b.xData;
                    for (e = v = b.xIncrement ? 1 : k.length - 1; 0 < e; e--) if (l = k[e] - k[e - 1], "undefined" === typeof f || l < f) f = l
                }), this.minRange = Math.min(5 * f, this.dataMax - this.dataMin)));
                if (c - b < this.minRange) {
                    var m = this.dataMax - this.dataMin >= this.minRange;
                    var n = this.minRange;
                    var d = (n - c + b) / 2;
                    d = [b - d, z(a.min, b - d)];
                    m && (d[2] = this.isLog ? this.log2lin(this.dataMin) :
                        this.dataMin);
                    b = A(d);
                    c = [b + n, z(a.max, b + n)];
                    m && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax);
                    c = G(c);
                    c - b < n && (d[0] = c - n, d[1] = z(a.min, c - n), b = A(d))
                }
                this.min = b;
                this.max = c
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : this.series.forEach(function (b) {
                    var c = b.closestPointRange, f = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && t(c) && f && (a = t(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function (a) {
                var b = c(this.categories), f = b ? this.categories : this.names, e = a.options.x;
                a.series.requireSorting =
                    !1;
                t(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? f.indexOf(a.name) : z(f.keys[a.name], -1));
                if (-1 === e) {
                    if (!b) var p = f.length
                } else p = e;
                "undefined" !== typeof p && (this.names[p] = a.name, this.names.keys[a.name] = p);
                return p
            },
            updateNames: function () {
                var a = this, b = this.names;
                0 < b.length && (Object.keys(b.keys).forEach(function (a) {
                    delete b.keys[a]
                }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length -
                        1), b.processData(), b.generatePoints();
                    b.data.forEach(function (c, f) {
                        if (c && c.options && "undefined" !== typeof c.name) {
                            var e = a.nameToX(c);
                            "undefined" !== typeof e && e !== c.x && (c.x = e, b.xData[f] = e)
                        }
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this, c = b.max - b.min, e = b.axisPointRange || 0, p = 0, l = 0, k = b.linkedParent,
                    v = !!b.categories, m = b.transA, d = b.isXAxis;
                if (d || v || e) {
                    var n = b.getClosest();
                    k ? (p = k.minPointOffset, l = k.pointRangePadding) : b.series.forEach(function (a) {
                        var c = v ? 1 : d ? z(a.options.pointRange, n, 0) : b.axisPointRange ||
                            0, x = a.options.pointPlacement;
                        e = Math.max(e, c);
                        if (!b.single || v) a = a.is("xrange") ? !d : d, p = Math.max(p, a && f(x) ? 0 : c / 2), l = Math.max(l, a && "on" === x ? 0 : c)
                    });
                    k = b.ordinalSlope && n ? b.ordinalSlope / n : 1;
                    b.minPointOffset = p *= k;
                    b.pointRangePadding = l *= k;
                    b.pointRange = Math.min(e, b.single && v ? 1 : c);
                    d && (b.closestPointRange = n)
                }
                a && (b.oldTransA = m);
                b.translationSlope = b.transA = m = b.staticScale || b.len / (c + l || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = m * p;
                q(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max -
                    this.range
            },
            setTickInterval: function (a) {
                var b = this, c = b.chart, f = b.options, p = b.isLog, k = b.isDatetimeAxis, v = b.isXAxis,
                    d = b.isLinked, m = f.maxPadding, w = f.minPadding, B = f.tickInterval, L = f.tickPixelInterval,
                    F = b.categories, V = n(b.threshold) ? b.threshold : null, g = b.softThreshold;
                k || F || d || this.getTickAmount();
                var H = z(b.userMin, f.min);
                var K = z(b.userMax, f.max);
                if (d) {
                    b.linkedParent = c[b.coll][f.linkedTo];
                    var Q = b.linkedParent.getExtremes();
                    b.min = z(Q.min, Q.dataMin);
                    b.max = z(Q.max, Q.dataMax);
                    f.type !== b.linkedParent.options.type &&
                    h(11, 1, c)
                } else {
                    if (!g && t(V)) if (b.dataMin >= V) Q = V, w = 0; else if (b.dataMax <= V) {
                        var u = V;
                        m = 0
                    }
                    b.min = z(H, Q, b.dataMin);
                    b.max = z(K, u, b.dataMax)
                }
                p && (b.positiveValuesOnly && !a && 0 >= Math.min(b.min, z(b.dataMin, b.min)) && h(10, 1, c), b.min = y(b.log2lin(b.min), 16), b.max = y(b.log2lin(b.max), 16));
                b.range && t(b.max) && (b.userMin = b.min = H = Math.max(b.dataMin, b.minFromRange()), b.userMax = K = b.max, b.range = null);
                q(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(F || b.axisPointRange || b.usePercentage || d) && t(b.min) &&
                t(b.max) && (c = b.max - b.min) && (!t(H) && w && (b.min -= c * w), !t(K) && m && (b.max += c * m));
                n(b.userMin) || (n(f.softMin) && f.softMin < b.min && (b.min = H = f.softMin), n(f.floor) && (b.min = Math.max(b.min, f.floor)));
                n(b.userMax) || (n(f.softMax) && f.softMax > b.max && (b.max = K = f.softMax), n(f.ceiling) && (b.max = Math.min(b.max, f.ceiling)));
                g && t(b.dataMin) && (V = V || 0, !t(H) && b.min < V && b.dataMin >= V ? b.min = b.options.minRange ? Math.min(V, b.max - b.minRange) : V : !t(K) && b.max > V && b.dataMax <= V && (b.max = b.options.minRange ? Math.max(V, b.min + b.minRange) : V));
                b.tickInterval =
                    b.min === b.max || "undefined" === typeof b.min || "undefined" === typeof b.max ? 1 : d && !B && L === b.linkedParent.options.tickPixelInterval ? B = b.linkedParent.tickInterval : z(B, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, F ? 1 : (b.max - b.min) * L / Math.max(b.len, L));
                v && !a && b.series.forEach(function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !B && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                a = z(f.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !B && b.tickInterval < a && (b.tickInterval = a);
                k || p || B || (b.tickInterval = l(b.tickInterval, null, e(b.tickInterval), z(f.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options, b = a.tickPositions;
                var c = this.getMinorTickInterval();
                var f = a.tickPositioner, e = a.startOnTick, l = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
                this.single = this.min === this.max && t(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = c = b && b.slice();
                !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], h(19, !1,
                    this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = c = f);
                this.paddedTicks = c.slice(0);
                this.trimTicks(c, e, l);
                this.isLinked || (this.single && 2 > c.length && !this.categories && !this.series.some(function (b) {
                    return b.is("heatmap") && "between" === b.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), b || f || this.adjustTickAmount());
                q(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, c) {
                var f = a[0], e = a[a.length - 1], p = !this.isOrdinal && this.minPointOffset || 0;
                q(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== f) this.min = f; else for (; this.min - p > a[0];) a.shift();
                    if (c) this.max = e; else for (; this.max +
                                                     p < a[a.length - 1];) a.pop();
                    0 === a.length && t(f) && !this.options.tickPositions && a.push((e + f) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || this.chart[this.coll].forEach(function (c) {
                    var f = c.options;
                    f = [c.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
                    c.series.length && (a[f] ? b = !0 : a[f] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, c = a.tickPixelInterval;
                !t(a.tickInterval) &&
                this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.options, b = this.tickInterval, c = this.tickPositions, f = this.tickAmount,
                    e = this.finalTickAmt, l = c && c.length, k = z(this.threshold, this.softThreshold ? 0 : null), v;
                if (this.hasData()) {
                    if (l < f) {
                        for (v = this.min; c.length < f;) c.length % 2 || v === k ? c.push(y(c[c.length - 1] + b)) : c.unshift(y(c[0] - b));
                        this.transA *= (l -
                            1) / (f - 1);
                        this.min = a.startOnTick ? c[0] : Math.min(this.min, c[0]);
                        this.max = a.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1])
                    } else l > f && (this.tickInterval *= 2, this.setTickPositions());
                    if (t(e)) {
                        for (b = a = c.length; b--;) (3 === e && 1 === b % 2 || 2 >= e && 0 < b && b < a - 1) && c.splice(b, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a = this.series.some(function (b) {
                    return b.isDirtyData || b.isDirty || b.xAxis && b.xAxis.isDirty
                }), b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                q(this, "afterSetScale")
            },
            setExtremes: function (a, b, c, f, e) {
                var p = this,
                    l = p.chart;
                c = z(c, !0);
                p.series.forEach(function (b) {
                    delete b.kdTree
                });
                e = N(e, {min: a, max: b});
                q(p, "setExtremes", e, function () {
                    p.userMin = a;
                    p.userMax = b;
                    p.eventArgs = e;
                    c && l.redraw(f)
                })
            },
            zoom: function (a, b) {
                var c = this.dataMin, f = this.dataMax, e = this.options, p = Math.min(c, z(e.min, c)),
                    l = Math.max(f, z(e.max, f));
                a = {newMin: a, newMax: b};
                q(this, "zoom", a, function (b) {
                    var a = b.newMin, e = b.newMax;
                    if (a !== this.min || e !== this.max) this.allowZoomOutside || (t(c) && (a < p && (a = p), a > l && (a = l)), t(f) && (e < p && (e = p), e > l && (e = l))), this.displayBtn = "undefined" !==
                        typeof a || "undefined" !== typeof e, this.setExtremes(a, e, !1, void 0, {trigger: "zoom"});
                    b.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function () {
                var a = this.chart, b = this.options, c = b.offsets || [0, 0, 0, 0], f = this.horiz,
                    e = this.width = Math.round(w(z(b.width, a.plotWidth - c[3] + c[1]), a.plotWidth)),
                    l = this.height = Math.round(w(z(b.height, a.plotHeight - c[0] + c[2]), a.plotHeight)),
                    k = this.top = Math.round(w(z(b.top, a.plotTop + c[0]), a.plotHeight, a.plotTop));
                b = this.left = Math.round(w(z(b.left, a.plotLeft + c[3]), a.plotWidth, a.plotLeft));
                this.bottom = a.chartHeight - l - k;
                this.right = a.chartWidth - e - b;
                this.len = Math.max(f ? e : l, 0);
                this.pos = f ? b : k
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? y(this.lin2log(this.min)) : this.min,
                    max: a ? y(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, c = b ? this.lin2log(this.min) : this.min;
                b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = c : Infinity === a ? a = b : c > a ? a = c : b < a && (a = b);
                return this.translate(a,
                    0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                var b = (z(a, 0) - 90 * this.side + 720) % 360;
                a = {align: "center"};
                q(this, "autoLabelAlign", a, function (a) {
                    15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left")
                });
                return a.align
            },
            tickSize: function (a) {
                var b = this.options, c = b[a + "Length"],
                    f = z(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0);
                if (f && c) {
                    "inside" === b[a + "Position"] && (c = -c);
                    var e = [c, f]
                }
                a = {tickSize: e};
                q(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] ||
                    0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, c = this.tickInterval, f = c,
                    e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), l, k = a.rotation,
                    v = this.labelMetrics(), m, d = Number.MAX_VALUE, n, w = this.max - this.min, F = function (b) {
                        var a = b / (e || 1);
                        a = 1 < a ? Math.ceil(a) : 1;
                        a * c > w && Infinity !== b && Infinity !== e && w && (a = Math.ceil(w / c));
                        return y(a * c)
                    };
                b ? (n = !a.staggerLines &&
                    !a.step && (t(k) ? [k] : e < z(a.autoRotationLimit, 80) && a.autoRotation)) && n.forEach(function (b) {
                    if (b === k || b && -90 <= b && 90 >= b) {
                        m = F(Math.abs(v.h / Math.sin(K * b)));
                        var a = m + Math.abs(b / 360);
                        a < d && (d = a, l = b, f = m)
                    }
                }) : a.step || (f = F(v.h));
                this.autoRotation = n;
                this.labelRotation = z(l, k);
                return f
            },
            getSlotWidth: function (a) {
                var b = this.chart, c = this.horiz, f = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), l = b.margin[3];
                return a && a.slotWidth || c && 2 > (f.step || 0) && !f.rotation && (this.staggerLines || 1) * this.len /
                    e || !c && (f.style && parseInt(f.style.width, 10) || l && l - b.spacing[3] || .33 * b.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, c = this.tickPositions, e = this.ticks, l = this.options.labels,
                    k = l && l.style || {}, v = this.horiz, d = this.getSlotWidth(),
                    m = Math.max(1, Math.round(d - 2 * (l.padding || 5))), n = {}, w = this.labelMetrics(),
                    h = l.style && l.style.textOverflow, F = 0;
                f(l.rotation) || (n.rotation = l.rotation || 0);
                c.forEach(function (b) {
                    b = e[b];
                    b.movedLabel && b.replaceMovedLabel();
                    b && b.label && b.label.textPxLength > F && (F =
                        b.label.textPxLength)
                });
                this.maxLabelLength = F;
                if (this.autoRotation) F > m && F > w.h ? n.rotation = this.labelRotation : this.labelRotation = 0; else if (d) {
                    var z = m;
                    if (!h) {
                        var q = "clip";
                        for (m = c.length; !v && m--;) {
                            var B = c[m];
                            if (B = e[B].label) B.styles && "ellipsis" === B.styles.textOverflow ? B.css({textOverflow: "clip"}) : B.textPxLength > d && B.css({width: d + "px"}), B.getBBox().height > this.len / c.length - (w.h - w.f) && (B.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                n.rotation && (z = F > .5 * a.chartHeight ? .33 * a.chartHeight : F, h || (q = "ellipsis"));
                if (this.labelAlign =
                    l.align || this.autoLabelAlign(this.labelRotation)) n.align = this.labelAlign;
                c.forEach(function (b) {
                    var a = (b = e[b]) && b.label, c = k.width, f = {};
                    a && (a.attr(n), b.shortenLabel ? b.shortenLabel() : z && !c && "nowrap" !== k.whiteSpace && (z < a.textPxLength || "SPAN" === a.element.tagName) ? (f.width = z, h || (f.textOverflow = a.specificTextOverflow || q), a.css(f)) : a.styles && a.styles.width && !f.width && !c && a.css({width: null}), delete a.specificTextOverflow, b.rotation = n.rotation)
                }, this);
                this.tickRotCorr = b.rotCorr(w.b, this.labelRotation || 0, 0 !==
                    this.side)
            },
            hasData: function () {
                return this.series.some(function (a) {
                    return a.hasData()
                }) || this.options.showEmpty && t(this.min) && t(this.max)
            },
            addTitle: function (c) {
                var b = this.chart.renderer, f = this.horiz, e = this.opposite, l = this.options.title, p,
                    k = this.chart.styledMode;
                this.axisTitle || ((p = l.textAlign) || (p = (f ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: e ? "right" : "left",
                    middle: "center",
                    high: e ? "left" : "right"
                })[l.align]), this.axisTitle = b.text(l.text, 0, 0, l.useHTML).attr({
                    zIndex: 7,
                    rotation: l.rotation || 0,
                    align: p
                }).addClass("highcharts-axis-title"),
                k || this.axisTitle.css(a(l.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                k || l.style.width || this.isRadial || this.axisTitle.css({width: this.len});
                this.axisTitle[c ? "show" : "hide"](c)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new r(this, a)
            },
            getOffset: function () {
                var a = this, b = a.chart, c = b.renderer, f = a.options, e = a.tickPositions, l = a.ticks, k = a.horiz,
                    d = a.side, m = b.inverted && !a.isZAxis ? [1, 0, 3, 2][d] : d, n, w = 0, h = 0, F = f.title,
                    B = f.labels, L = 0, g = b.axisOffset;
                b = b.clipOffset;
                var H = [-1, 1, 1, -1][d], K = f.className, Q = a.axisParent;
                var y = a.hasData();
                a.showAxis = n = y || z(f.showEmpty, !0);
                a.staggerLines = a.horiz && B.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({zIndex: f.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (K || "")).add(Q), a.axisGroup = c.g("axis").attr({zIndex: f.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (K || "")).add(Q), a.labelGroup = c.g("axis-labels").attr({zIndex: B.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() +
                    "-labels " + (K || "")).add(Q));
                y || a.isLinked ? (e.forEach(function (b, c) {
                    a.generateTick(b, c)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === d || 2 === d || {
                    1: "left",
                    3: "right"
                }[d] === a.labelAlign, z(B.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && e.forEach(function (b) {
                    L = Math.max(l[b].getLabelSize(), L)
                }), a.staggerLines && (L *= a.staggerLines), a.labelOffset = L * (a.opposite ? -1 : 1)) : v(l, function (b, a) {
                    b.destroy();
                    delete l[a]
                });
                if (F && F.text && !1 !== F.enabled && (a.addTitle(n), n && !1 !== F.reserveSpace)) {
                    a.titleOffset =
                        w = a.axisTitle.getBBox()[k ? "height" : "width"];
                    var u = F.offset;
                    h = t(u) ? 0 : z(F.margin, k ? 5 : 10)
                }
                a.renderLine();
                a.offset = H * z(f.offset, g[d] ? g[d] + (f.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                c = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
                h = Math.abs(L) + h;
                L && (h = h - c + H * (k ? z(B.y, a.tickRotCorr.y + 8 * H) : B.x));
                a.axisTitleMargin = z(u, h);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(l, e));
                k = this.tickSize("tick");
                g[d] = Math.max(g[d], a.axisTitleMargin + w + H * a.offset, h, e && e.length && k ? k[0] +
                    H * a.offset : 0);
                f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[m] = Math.max(b[m], f);
                q(this, "afterGetOffset")
            },
            getLinePath: function (a) {
                var b = this.chart, c = this.opposite, f = this.offset, e = this.horiz,
                    l = this.left + (c ? this.width : 0) + f;
                f = b.chartHeight - this.bottom - (c ? this.height : 0) + f;
                c && (a *= -1);
                return b.renderer.crispLine(["M", e ? this.left : l, e ? f : this.top, "L", e ? b.chartWidth - this.right : l, e ? f : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, c = this.top, f = this.len, e = this.options.title, l = a ? b : c,
                    k = this.opposite, d = this.offset, m = e.x || 0, v = e.y || 0, n = this.axisTitle,
                    w = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, n);
                n = Math.max(n.getBBox(null, 0).height - w.h - 1, 0);
                f = {low: l + (a ? 0 : f), middle: l + f / 2, high: l + (a ? f : 0)}[e.align];
                b = (a ? c + this.height : b) + (a ? 1 : -1) * (k ? -1 : 1) * this.axisTitleMargin +
                    [-n, n, w.f, -n][this.side];
                a = {x: a ? f + m : b + (k ? this.width : 0) + d + m, y: a ? b + v - (k ? this.height : 0) + d : f + v};
                q(this, "afterGetTitlePosition", {titlePosition: a});
                return a
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && n(this.oldMin), c = this.minorTicks;
                c[a] || (c[a] = new r(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var c = this.isLinked, f = this.ticks, e = this.chart.hasRendered && n(this.oldMin);
                if (!c || a >= this.min && a <= this.max) f[a] || (f[a] = new r(this, a)), e && f[a].isNew &&
                f[a].render(b, !0, -1), f[a].render(b)
            },
            render: function () {
                var a = this, b = a.chart, c = a.options, f = a.isLog, e = a.isLinked, l = a.tickPositions,
                    k = a.axisTitle, w = a.ticks, m = a.minorTicks, h = a.alternateBands, z = c.stackLabels,
                    B = c.alternateGridColor, F = a.tickmarkOffset, L = a.axisLine, t = a.showAxis,
                    g = E(b.renderer.globalAnimation), H, K;
                a.labelEdge.length = 0;
                a.overlap = !1;
                [w, m, h].forEach(function (b) {
                    v(b, function (b) {
                        b.isActive = !1
                    })
                });
                if (a.hasData() || e) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function (b) {
                    a.renderMinorTick(b)
                }),
                l.length && (l.forEach(function (b, c) {
                    a.renderTick(b, c)
                }), F && (0 === a.min || a.single) && (w[-1] || (w[-1] = new r(a, -1, null, !0)), w[-1].render(-1))), B && l.forEach(function (c, e) {
                    K = "undefined" !== typeof l[e + 1] ? l[e + 1] + F : a.max - F;
                    0 === e % 2 && c < a.max && K <= a.max + (b.polar ? -F : F) && (h[c] || (h[c] = new d.PlotLineOrBand(a)), H = c + F, h[c].options = {
                        from: f ? a.lin2log(H) : H,
                        to: f ? a.lin2log(K) : K,
                        color: B
                    }, h[c].render(), h[c].isActive = !0)
                }), a._addedPlotLB || ((c.plotLines || []).concat(c.plotBands || []).forEach(function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB =
                    !0);
                [w, m, h].forEach(function (a) {
                    var c, f = [], e = g.duration;
                    v(a, function (b, a) {
                        b.isActive || (b.render(a, !1, 0), b.isActive = !1, f.push(a))
                    });
                    Q(function () {
                        for (c = f.length; c--;) a[f[c]] && !a[f[c]].isActive && (a[f[c]].destroy(), delete a[f[c]])
                    }, a !== h && b.hasRendered && e ? e : 0)
                });
                L && (L[L.isPlaced ? "animate" : "attr"]({d: this.getLinePath(L.strokeWidth())}), L.isPlaced = !0, L[t ? "show" : "hide"](t));
                k && t && (c = a.getTitlePosition(), n(c.y) ? (k[k.isNew ? "attr" : "animate"](c), k.isNew = !1) : (k.attr("y", -9999), k.isNew = !0));
                z && z.enabled && a.renderStackTotals();
                a.isDirty = !1;
                q(this, "afterRender")
            },
            redraw: function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) {
                    a.render()
                }));
                this.series.forEach(function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this, c = b.stacks, f = b.plotLinesAndBands, e;
                q(this, "destroy", {keepEvents: a});
                a || B(b);
                v(c, function (b, a) {
                    D(b);
                    c[a] = null
                });
                [b.ticks, b.minorTicks, b.alternateBands].forEach(function (b) {
                    D(b)
                });
                if (f) for (a = f.length; a--;) f[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (e in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[e] = b.plotLinesAndBandsGroups[e].destroy();
                v(b, function (a, c) {
                    -1 === b.keepProps.indexOf(c) && delete b[c]
                })
            },
            drawCrosshair: function (a, b) {
                var c = this.crosshair, f = z(c.snap, !0), e, l = this.cross, k = this.chart;
                q(this, "drawCrosshair", {e: a, point: b});
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (t(b) ||
                    !f)) {
                    f ? t(b) && (e = z("colorAxis" !== this.coll ? b.crosshairPos : null, this.isXAxis ? b.plotX : this.len - b.plotY)) : e = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    if (t(e)) {
                        var d = {value: b && (this.isXAxis ? b.x : z(b.stackY, b.y)), translatedValue: e};
                        k.polar && N(d, {isCrosshair: !0, chartX: a && a.chartX, chartY: a && a.chartY, point: b});
                        d = this.getPlotLinePath(d) || null
                    }
                    if (!t(d)) {
                        this.hideCrosshair();
                        return
                    }
                    f = this.categories && !this.isRadial;
                    l || (this.cross = l = k.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" +
                        (f ? "category " : "thin ") + c.className).attr({zIndex: z(c.zIndex, 2)}).add(), k.styledMode || (l.attr({
                        stroke: c.color || (f ? I("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": z(c.width, 1)
                    }).css({"pointer-events": "none"}), c.dashStyle && l.attr({dashstyle: c.dashStyle})));
                    l.show().attr({d: d});
                    f && !c.width && l.attr({"stroke-width": this.transA});
                    this.cross.e = a
                } else this.hideCrosshair();
                q(this, "afterDrawCrosshair", {e: a, point: b})
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide();
                q(this, "afterHideCrosshair")
            }
        });
        return d.Axis = g
    });
    S(r, "parts/DateTimeAxis.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.getMagnitude, u = g.normalizeTickInterval, I = g.timeUnits;
        d = d.Axis;
        d.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        d.prototype.normalizeTimeTickInterval = function (d, g) {
            var A = g || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1,
                2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            g = A[A.length - 1];
            var G = I[g[0]], E = g[1], y;
            for (y = 0; y < A.length && !(g = A[y], G = I[g[0]], E = g[1], A[y + 1] && d <= (G * E[E.length - 1] + I[A[y + 1][0]]) / 2); y++) ;
            G === I.year && d < 5 * G && (E = [1, 2, 5]);
            d = u(d / G, E, "year" === g[0] ? Math.max(r(d / G), 1) : 1);
            return {unitRange: G, count: d, unitName: g[0]}
        }
    });
    S(r, "parts/LogarithmicAxis.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.getMagnitude, u = g.normalizeTickInterval, I = g.pick;
        d = d.Axis;
        d.prototype.getLogTickPositions = function (d, g,
                                                    A, G) {
            var E = this.options, y = this.len, t = [];
            G || (this._minorAutoInterval = null);
            if (.5 <= d) d = Math.round(d), t = this.getLinearTickPositions(d, g, A); else if (.08 <= d) {
                y = Math.floor(g);
                var D, h;
                for (E = .3 < d ? [1, 2, 4] : .15 < d ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; y < A + 1 && !h; y++) {
                    var N = E.length;
                    for (D = 0; D < N && !h; D++) {
                        var q = this.log2lin(this.lin2log(y) * E[D]);
                        q > g && (!G || P <= A) && "undefined" !== typeof P && t.push(P);
                        P > A && (h = !0);
                        var P = q
                    }
                }
            } else g = this.lin2log(g), A = this.lin2log(A), d = G ? this.getMinorTickInterval() : E.tickInterval, d = I("auto" === d ?
                null : d, this._minorAutoInterval, E.tickPixelInterval / (G ? 5 : 1) * (A - g) / ((G ? y / this.tickPositions.length : y) || 1)), d = u(d, null, r(d)), t = this.getLinearTickPositions(d, g, A).map(this.log2lin), G || (this._minorAutoInterval = d / 5);
            G || (this.tickInterval = d);
            return t
        };
        d.prototype.log2lin = function (d) {
            return Math.log(d) / Math.LN10
        };
        d.prototype.lin2log = function (d) {
            return Math.pow(10, d)
        }
    });
    S(r, "parts/PlotLineOrBand.js", [r["parts/Globals.js"], r["parts/Axis.js"], r["parts/Utilities.js"]], function (d, g, r) {
        var u = r.arrayMax, I = r.arrayMin,
            M = r.defined, E = r.destroyObjectProperties, A = r.erase, G = r.extend, J = r.merge, y = r.objectEach,
            t = r.pick, D = function () {
                function h(d, h) {
                    this.axis = d;
                    h && (this.options = h, this.id = h.id)
                }

                h.prototype.render = function () {
                    d.fireEvent(this, "render");
                    var h = this, q = h.axis, g = q.horiz, e = h.options, c = e.label, k = h.label, n = e.to, f = e.from,
                        a = e.value, l = M(f) && M(n), v = M(a), z = h.svgElem, w = !z, B = [], L = e.color,
                        Q = t(e.zIndex, 0), H = e.events;
                    B = {"class": "highcharts-plot-" + (l ? "band " : "line ") + (e.className || "")};
                    var K = {}, p = q.chart.renderer, b = l ? "bands" :
                        "lines";
                    q.isLog && (f = q.log2lin(f), n = q.log2lin(n), a = q.log2lin(a));
                    q.chart.styledMode || (v ? (B.stroke = L || "#999999", B["stroke-width"] = t(e.width, 1), e.dashStyle && (B.dashstyle = e.dashStyle)) : l && (B.fill = L || "#e6ebf5", e.borderWidth && (B.stroke = e.borderColor, B["stroke-width"] = e.borderWidth)));
                    K.zIndex = Q;
                    b += "-" + Q;
                    (L = q.plotLinesAndBandsGroups[b]) || (q.plotLinesAndBandsGroups[b] = L = p.g("plot-" + b).attr(K).add());
                    w && (h.svgElem = z = p.path().attr(B).add(L));
                    if (v) B = q.getPlotLinePath({value: a, lineWidth: z.strokeWidth(), acrossPanes: e.acrossPanes});
                    else if (l) B = q.getPlotBandPath(f, n, e); else return;
                    (w || !z.d) && B && B.length ? (z.attr({d: B}), H && y(H, function (b, a) {
                        z.on(a, function (b) {
                            H[a].apply(h, [b])
                        })
                    })) : z && (B ? (z.show(!0), z.animate({d: B})) : z.d && (z.hide(), k && (h.label = k = k.destroy())));
                    c && (M(c.text) || M(c.formatter)) && B && B.length && 0 < q.width && 0 < q.height && !B.isFlat ? (c = J({
                        align: g && l && "center",
                        x: g ? !l && 4 : 10,
                        verticalAlign: !g && l && "middle",
                        y: g ? l ? 16 : 10 : l ? 6 : -4,
                        rotation: g && !l && 90
                    }, c), this.renderLabel(c, B, l, Q)) : k && k.hide();
                    return h
                };
                h.prototype.renderLabel = function (d,
                                                    h, g, e) {
                    var c = this.label, k = this.axis.chart.renderer;
                    c || (c = {
                        align: d.textAlign || d.align,
                        rotation: d.rotation,
                        "class": "highcharts-plot-" + (g ? "band" : "line") + "-label " + (d.className || "")
                    }, c.zIndex = e, e = this.getLabelText(d), this.label = c = k.text(e, 0, 0, d.useHTML).attr(c).add(), this.axis.chart.styledMode || c.css(d.style));
                    k = h.xBounds || [h[1], h[4], g ? h[6] : h[1]];
                    h = h.yBounds || [h[2], h[5], g ? h[7] : h[2]];
                    g = I(k);
                    e = I(h);
                    c.align(d, !1, {x: g, y: e, width: u(k) - g, height: u(h) - e});
                    c.show(!0)
                };
                h.prototype.getLabelText = function (d) {
                    return M(d.formatter) ?
                        d.formatter.call(this) : d.text
                };
                h.prototype.destroy = function () {
                    A(this.axis.plotLinesAndBands, this);
                    delete this.axis;
                    E(this)
                };
                return h
            }();
        G(g.prototype, {
            getPlotBandPath: function (d, g) {
                var h = this.getPlotLinePath({value: g, force: !0, acrossPanes: this.options.acrossPanes}),
                    t = this.getPlotLinePath({value: d, force: !0, acrossPanes: this.options.acrossPanes}), e = [],
                    c = this.horiz, k = 1;
                d = d < this.min && g < this.min || d > this.max && g > this.max;
                if (t && h) {
                    if (d) {
                        var n = t.toString() === h.toString();
                        k = 0
                    }
                    for (d = 0; d < t.length; d += 6) c && h[d + 1] ===
                    t[d + 1] ? (h[d + 1] += k, h[d + 4] += k) : c || h[d + 2] !== t[d + 2] || (h[d + 2] += k, h[d + 5] += k), e.push("M", t[d + 1], t[d + 2], "L", t[d + 4], t[d + 5], h[d + 4], h[d + 5], h[d + 1], h[d + 2], "z"), e.isFlat = n
                }
                return e
            }, addPlotBand: function (d) {
                return this.addPlotBandOrLine(d, "plotBands")
            }, addPlotLine: function (d) {
                return this.addPlotBandOrLine(d, "plotLines")
            }, addPlotBandOrLine: function (d, g) {
                var h = (new D(this, d)).render(), t = this.userOptions;
                if (h) {
                    if (g) {
                        var e = t[g] || [];
                        e.push(d);
                        t[g] = e
                    }
                    this.plotLinesAndBands.push(h)
                }
                return h
            }, removePlotBandOrLine: function (d) {
                for (var h =
                    this.plotLinesAndBands, q = this.options, g = this.userOptions, e = h.length; e--;) h[e].id === d && h[e].destroy();
                [q.plotLines || [], g.plotLines || [], q.plotBands || [], g.plotBands || []].forEach(function (c) {
                    for (e = c.length; e--;) c[e].id === d && A(c, c[e])
                })
            }, removePlotBand: function (d) {
                this.removePlotBandOrLine(d)
            }, removePlotLine: function (d) {
                this.removePlotBandOrLine(d)
            }
        });
        d.PlotLineOrBand = D;
        return d.PlotLineOrBand
    });
    S(r, "parts/Tooltip.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.clamp, u = g.css,
            I = g.defined, M = g.discardElement, E = g.extend, A = g.format, G = g.isNumber, J = g.isString,
            y = g.merge, t = g.pick, D = g.splat, h = g.syncTimeout, N = g.timeUnits;
        "";
        var q = d.doc, P = function () {
            function e(c, e) {
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = c;
                this.init(c, e)
            }

            e.prototype.applyFilter = function () {
                var c = this.chart;
                c.renderer.definition({
                    tagName: "filter", id: "drop-shadow-" + c.index, opacity: .5, children: [{
                        tagName: "feGaussianBlur", "in": "SourceAlpha",
                        stdDeviation: 1
                    }, {tagName: "feOffset", dx: 1, dy: 1}, {
                        tagName: "feComponentTransfer",
                        children: [{tagName: "feFuncA", type: "linear", slope: .3}]
                    }, {
                        tagName: "feMerge",
                        children: [{tagName: "feMergeNode"}, {tagName: "feMergeNode", "in": "SourceGraphic"}]
                    }]
                });
                c.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + c.index + "{filter:url(#drop-shadow-" + c.index + ")}"
                })
            };
            e.prototype.bodyFormatter = function (c) {
                return c.map(function (c) {
                    var e = c.series.tooltipOptions;
                    return (e[(c.point.formatPrefix || "point") + "Formatter"] ||
                        c.point.tooltipFormatter).call(c.point, e[(c.point.formatPrefix || "point") + "Format"] || "")
                })
            };
            e.prototype.cleanSplit = function (c) {
                this.chart.series.forEach(function (e) {
                    var d = e && e.tt;
                    d && (!d.isActive || c ? e.tt = d.destroy() : d.isActive = !1)
                })
            };
            e.prototype.defaultFormatter = function (c) {
                var e = this.points || D(this);
                var d = [c.tooltipFooterHeaderFormatter(e[0])];
                d = d.concat(c.bodyFormatter(e));
                d.push(c.tooltipFooterHeaderFormatter(e[0], !0));
                return d
            };
            e.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), M(this.container));
                g.clearTimeout(this.hideTimer);
                g.clearTimeout(this.tooltipTimeout)
            };
            e.prototype.getAnchor = function (c, e) {
                var d = this.chart, f = d.pointer, a = d.inverted, l = d.plotTop, k = d.plotLeft, h = 0, w = 0, B, q;
                c = D(c);
                this.followPointer && e ? ("undefined" === typeof e.chartX && (e = f.normalize(e)), c = [e.chartX - k, e.chartY - l]) : c[0].tooltipPos ? c = c[0].tooltipPos : (c.forEach(function (c) {
                    B =
                        c.series.yAxis;
                    q = c.series.xAxis;
                    h += c.plotX + (!a && q ? q.left - k : 0);
                    w += (c.plotLow ? (c.plotLow + c.plotHigh) / 2 : c.plotY) + (!a && B ? B.top - l : 0)
                }), h /= c.length, w /= c.length, c = [a ? d.plotWidth - w : h, this.shared && !a && 1 < c.length && e ? e.chartY - l : a ? d.plotHeight - h : w]);
                return c.map(Math.round)
            };
            e.prototype.getDateFormat = function (c, e, d, f) {
                var a = this.chart.time, l = a.dateFormat("%m-%d %H:%M:%S.%L", e),
                    k = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, n = "millisecond";
                for (w in N) {
                    if (c === N.week && +a.dateFormat("%w", e) === d && "00:00:00.000" ===
                        l.substr(6)) {
                        var w = "week";
                        break
                    }
                    if (N[w] > c) {
                        w = n;
                        break
                    }
                    if (k[w] && l.substr(k[w]) !== "01-01 00:00:00.000".substr(k[w])) break;
                    "week" !== w && (n = w)
                }
                if (w) var h = a.resolveDTLFormat(f[w]).main;
                return h
            };
            e.prototype.getLabel = function () {
                var c, e = this, n = this.chart.renderer, f = this.chart.styledMode, a = this.options,
                    l = "tooltip" + (I(a.className) ? " " + a.className : ""),
                    v = (null === (c = a.style) || void 0 === c ? void 0 : c.pointerEvents) || (!this.followPointer && a.stickOnContact ? "auto" : "none"),
                    h;
                c = function () {
                    e.inContact = !0
                };
                var w = function () {
                    var a =
                        e.chart.hoverSeries;
                    e.inContact = !1;
                    if (a && a.onMouseOut) a.onMouseOut()
                };
                if (!this.label) {
                    this.outside && (this.container = h = d.doc.createElement("div"), h.className = "highcharts-tooltip-container", u(h, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: v,
                        zIndex: 3
                    }), d.doc.body.appendChild(h), this.renderer = n = new d.Renderer(h, 0, 0, {}, void 0, void 0, n.styledMode));
                    this.split ? this.label = n.g(l) : (this.label = n.label("", 0, 0, a.shape || "callout", null, null, a.useHTML, null, l).attr({
                        padding: a.padding,
                        r: a.borderRadius
                    }), f || this.label.attr({
                        fill: a.backgroundColor,
                        "stroke-width": a.borderWidth
                    }).css(a.style).css({pointerEvents: v}).shadow(a.shadow));
                    f && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                    if (e.outside && !e.split) {
                        var B = {x: this.label.xSetter, y: this.label.ySetter};
                        this.label.xSetter = function (a, c) {
                            B[c].call(this.label, e.distance);
                            h.style.left = a + "px"
                        };
                        this.label.ySetter = function (a, c) {
                            B[c].call(this.label, e.distance);
                            h.style.top = a + "px"
                        }
                    }
                    this.label.on("mouseenter", c).on("mouseleave", w).attr({zIndex: 8}).add()
                }
                return this.label
            };
            e.prototype.getPosition = function (c, e, d) {
                var f = this.chart, a = this.distance, l = {}, k = f.inverted && d.h || 0, n, w = this.outside,
                    h = w ? q.documentElement.clientWidth - 2 * a : f.chartWidth,
                    g = w ? Math.max(q.body.scrollHeight, q.documentElement.scrollHeight, q.body.offsetHeight, q.documentElement.offsetHeight, q.documentElement.clientHeight) : f.chartHeight,
                    Q = f.pointer.getChartPosition(), H = f.containerScaling, K = function (b) {
                        return H ? b * H.scaleX : b
                    }, p = function (b) {
                        return H ? b * H.scaleY : b
                    }, b = function (b) {
                        var l = "x" === b;
                        return [b, l ? h : g, l ? c :
                            e].concat(w ? [l ? K(c) : p(e), l ? Q.left - a + K(d.plotX + f.plotLeft) : Q.top - a + p(d.plotY + f.plotTop), 0, l ? h : g] : [l ? c : e, l ? d.plotX + f.plotLeft : d.plotY + f.plotTop, l ? f.plotLeft : f.plotTop, l ? f.plotLeft + f.plotWidth : f.plotTop + f.plotHeight])
                    }, C = b("y"), x = b("x"), R = !this.followPointer && t(d.ttBelow, !f.inverted === !!d.negative),
                    O = function (b, c, f, e, d, m, v) {
                        var n = "y" === b ? p(a) : K(a), w = (f - e) / 2, x = e < d - a, h = d + a + e < c,
                            F = d - n - f + w;
                        d = d + n - w;
                        if (R && h) l[b] = d; else if (!R && x) l[b] = F; else if (x) l[b] = Math.min(v - e, 0 > F - k ? F : F - k); else if (h) l[b] = Math.max(m, d + k + f >
                        c ? d : d + k); else return !1
                    }, y = function (b, c, f, e, d) {
                        var k;
                        d < a || d > c - a ? k = !1 : l[b] = d < f / 2 ? 1 : d > c - e / 2 ? c - e - 2 : d - f / 2;
                        return k
                    }, u = function (b) {
                        var a = C;
                        C = x;
                        x = a;
                        n = b
                    }, m = function () {
                        !1 !== O.apply(0, C) ? !1 !== y.apply(0, x) || n || (u(!0), m()) : n ? l.x = l.y = 0 : (u(!0), m())
                    };
                (f.inverted || 1 < this.len) && u();
                m();
                return l
            };
            e.prototype.getXDateFormat = function (c, e, d) {
                e = e.dateTimeLabelFormats;
                var f = d && d.closestPointRange;
                return (f ? this.getDateFormat(f, c.x, d.options.startOfWeek, e) : e.day) || e.year
            };
            e.prototype.hide = function (c) {
                var e = this;
                g.clearTimeout(this.hideTimer);
                c = t(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = h(function () {
                    e.getLabel()[c ? "fadeOut" : "hide"]();
                    e.isHidden = !0
                }, c))
            };
            e.prototype.init = function (c, e) {
                this.chart = c;
                this.options = e;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = e.split && !c.inverted && !c.polar;
                this.shared = e.shared || this.split;
                this.outside = t(e.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY))
            };
            e.prototype.isStickyOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact)
            };
            e.prototype.move = function (c, e, d, f) {
                var a = this, l = a.now,
                    k = !1 !== a.options.animation && !a.isHidden && (1 < Math.abs(c - l.x) || 1 < Math.abs(e - l.y)),
                    n = a.followPointer || 1 < a.len;
                E(l, {
                    x: k ? (2 * l.x + c) / 3 : c,
                    y: k ? (l.y + e) / 2 : e,
                    anchorX: n ? void 0 : k ? (2 * l.anchorX + d) / 3 : d,
                    anchorY: n ? void 0 : k ? (l.anchorY + f) / 2 : f
                });
                a.getLabel().attr(l);
                a.drawTracker();
                k && (g.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    a && a.move(c, e, d, f)
                }, 32))
            };
            e.prototype.refresh = function (c, e) {
                var k = this.chart, f = this.options, a = c, l = {}, v = [],
                    h = f.formatter || this.defaultFormatter;
                l = this.shared;
                var w = k.styledMode;
                if (f.enabled) {
                    g.clearTimeout(this.hideTimer);
                    this.followPointer = D(a)[0].series.tooltipOptions.followPointer;
                    var B = this.getAnchor(a, e);
                    e = B[0];
                    var q = B[1];
                    !l || a.series && a.series.noSharedTooltip ? l = a.getLabelConfig() : (k.pointer.applyInactiveState(a), a.forEach(function (a) {
                        a.setState("hover");
                        v.push(a.getLabelConfig())
                    }), l = {x: a[0].category, y: a[0].y}, l.points = v, a = a[0]);
                    this.len = v.length;
                    k = h.call(l, this);
                    h = a.series;
                    this.distance = t(h.tooltipOptions.distance,
                        16);
                    !1 === k ? this.hide() : (this.split ? this.renderSplit(k, D(c)) : (c = this.getLabel(), f.style.width && !w || c.css({width: this.chart.spacingBox.width}), c.attr({text: k && k.join ? k.join("") : k}), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(a.colorIndex, h.colorIndex)), w || c.attr({stroke: f.borderColor || a.color || h.color || "#666666"}), this.updatePosition({
                        plotX: e,
                        plotY: q,
                        negative: a.negative,
                        ttBelow: a.ttBelow,
                        h: B[2] || 0
                    })), this.isHidden && this.label && this.label.attr({opacity: 1}).show(), this.isHidden =
                        !1);
                    d.fireEvent(this, "refresh")
                }
            };
            e.prototype.renderSplit = function (c, e) {
                function k(b, a, c, f, e) {
                    void 0 === e && (e = !0);
                    c ? (a = u ? 0 : A, b = r(b - f / 2, O.left, O.right - f)) : (a -= m, b = e ? b - f - C : b + C, b = r(b, e ? b : O.left, O.right));
                    return {x: b, y: a}
                }

                var f = this, a = f.chart, l = f.chart, v = l.plotHeight, h = l.plotLeft, w = l.plotTop, B = l.pointer,
                    q = l.renderer, g = l.scrollablePixelsY, H = void 0 === g ? 0 : g;
                g = l.scrollingContainer;
                g = void 0 === g ? {scrollLeft: 0, scrollTop: 0} : g;
                var K = g.scrollLeft, p = g.scrollTop, b = l.styledMode, C = f.distance, x = f.options,
                    R = f.options.positioner,
                    O = {left: K, right: K + l.chartWidth, top: p, bottom: p + l.chartHeight}, y = f.getLabel(),
                    u = !(!a.xAxis[0] || !a.xAxis[0].opposite), m = w + p, D = 0, A = v - H;
                J(c) && (c = [!1, c]);
                c = c.slice(0, e.length + 1).reduce(function (a, c, l) {
                    if (!1 !== c && "" !== c) {
                        l = e[l - 1] || {isHeader: !0, plotX: e[0].plotX, plotY: v, series: {}};
                        var d = l.isHeader, n = d ? f : l.series, F = n.tt, z = l.isHeader;
                        var B = l.series;
                        var g = "highcharts-color-" + t(l.colorIndex, B.colorIndex, "none");
                        F || (F = {
                            padding: x.padding,
                            r: x.borderRadius
                        }, b || (F.fill = x.backgroundColor, F["stroke-width"] = x.borderWidth),
                            F = q.label("", 0, 0, x[z ? "headerShape" : "shape"] || "callout", void 0, void 0, x.useHTML).addClass((z ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + g).attr(F).add(y));
                        F.isActive = !0;
                        F.attr({text: c});
                        b || F.css(x.style).shadow(x.shadow).attr({stroke: x.borderColor || l.color || B.color || "#333333"});
                        c = n.tt = F;
                        z = c.getBBox();
                        n = z.width + c.strokeWidth();
                        d && (D = z.height, A += D, u && (m -= D));
                        B = l.plotX;
                        B = void 0 === B ? 0 : B;
                        g = l.plotY;
                        g = void 0 === g ? 0 : g;
                        var L = l.series;
                        if (l.isHeader) {
                            B = h + B;
                            var K = w + v / 2
                        } else F = L.xAxis, L = L.yAxis,
                            B = F.pos + r(B, -C, F.len + C), L.pos + g >= p + w && L.pos + g <= p + w + v - H && (K = L.pos + g);
                        B = r(B, O.left - C, O.right + C);
                        "number" === typeof K ? (z = z.height + 1, g = R ? R.call(f, n, z, l) : k(B, K, d, n), a.push({
                            align: R ? 0 : void 0,
                            anchorX: B,
                            anchorY: K,
                            boxWidth: n,
                            point: l,
                            rank: t(g.rank, d ? 1 : 0),
                            size: z,
                            target: g.y,
                            tt: c,
                            x: g.x
                        })) : c.isActive = !1
                    }
                    return a
                }, []);
                !R && c.some(function (b) {
                    return b.x < O.left
                }) && (c = c.map(function (b) {
                    var a = k(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
                    return E(b, {target: a.y, x: a.x})
                }));
                f.cleanSplit();
                d.distribute(c, A);
                c.forEach(function (b) {
                    var a =
                        b.pos;
                    b.tt.attr({
                        visibility: "undefined" === typeof a ? "hidden" : "inherit",
                        x: b.x,
                        y: a + m,
                        anchorX: b.anchorX,
                        anchorY: b.anchorY
                    })
                });
                c = f.container;
                a = f.renderer;
                f.outside && c && a && (l = y.getBBox(), a.setSize(l.width + l.x, l.height + l.y, !1), B = B.getChartPosition(), c.style.left = B.left + "px", c.style.top = B.top + "px")
            };
            e.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy(); else {
                    var c = this.chart, e = this.label, d = c.hoverPoint;
                    if (e && d) {
                        var f = {x: 0, y: 0, width: 0, height: 0};
                        d = this.getAnchor(d);
                        var a = e.getBBox();
                        d[0] += c.plotLeft - e.translateX;
                        d[1] += c.plotTop - e.translateY;
                        f.x = Math.min(0, d[0]);
                        f.y = Math.min(0, d[1]);
                        f.width = 0 > d[0] ? Math.max(Math.abs(d[0]), a.width - d[0]) : Math.max(Math.abs(d[0]), a.width);
                        f.height = 0 > d[1] ? Math.max(Math.abs(d[1]), a.height - Math.abs(d[1])) : Math.max(Math.abs(d[1]), a.height);
                        this.tracker ? this.tracker.attr(f) : (this.tracker = e.renderer.rect(f).addClass("highcharts-tracker").add(e), c.styledMode || this.tracker.attr({fill: "rgba(0,0,0,0)"}))
                    }
                }
            };
            e.prototype.styledModeFormat =
                function (c) {
                    return c.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
                };
            e.prototype.tooltipFooterHeaderFormatter = function (c, e) {
                var k = e ? "footer" : "header", f = c.series, a = f.tooltipOptions, l = a.xDateFormat, v = f.xAxis,
                    h = v && "datetime" === v.options.type && G(c.key), w = a[k + "Format"];
                e = {isFooter: e, labelConfig: c};
                d.fireEvent(this, "headerFormatter", e, function (e) {
                    h && !l && (l = this.getXDateFormat(c, a, v));
                    h && l && (c.point &&
                        c.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                        w = w.replace("{point." + a + "}", "{point." + a + ":" + l + "}")
                    });
                    f.chart.styledMode && (w = this.styledModeFormat(w));
                    e.text = A(w, {point: c, series: f}, this.chart)
                });
                return e.text
            };
            e.prototype.update = function (c) {
                this.destroy();
                y(!0, this.chart.options.tooltip.userOptions, c);
                this.init(this.chart, y(!0, this.options, c))
            };
            e.prototype.updatePosition = function (c) {
                var e = this.chart, d = e.pointer, f = this.getLabel(), a = c.plotX + e.plotLeft,
                    l = c.plotY + e.plotTop;
                d = d.getChartPosition();
                c = (this.options.positioner || this.getPosition).call(this, f.width, f.height, c);
                if (this.outside) {
                    var v = (this.options.borderWidth || 0) + 2 * this.distance;
                    this.renderer.setSize(f.width + v, f.height + v, !1);
                    if (e = e.containerScaling) u(this.container, {transform: "scale(" + e.scaleX + ", " + e.scaleY + ")"}), a *= e.scaleX, l *= e.scaleY;
                    a += d.left - c.x;
                    l += d.top - c.y
                }
                this.move(Math.round(c.x), Math.round(c.y || 0), a, l)
            };
            return e
        }();
        d.Tooltip = P;
        return d.Tooltip
    });
    S(r, "parts/Pointer.js", [r["parts/Globals.js"], r["parts/Utilities.js"], r["parts/Tooltip.js"],
        r["parts/Color.js"]], function (d, g, r, u) {
        var I = g.addEvent, M = g.attr, E = g.css, A = g.defined, G = g.extend, J = g.find, y = g.fireEvent,
            t = g.isNumber, D = g.isObject, h = g.objectEach, N = g.offset, q = g.pick, P = g.splat, e = u.parse,
            c = d.charts, k = d.noop;
        g = function () {
            function n(c, a) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.chart = c;
                this.hasDragged = !1;
                this.options = a;
                this.unbindContainerMouseLeave = function () {
                };
                this.init(c, a)
            }

            n.prototype.applyInactiveState = function (c) {
                var a = [], f;
                (c || []).forEach(function (c) {
                    f =
                        c.series;
                    a.push(f);
                    f.linkedParent && a.push(f.linkedParent);
                    f.linkedSeries && (a = a.concat(f.linkedSeries));
                    f.navigatorSeries && a.push(f.navigatorSeries)
                });
                this.chart.series.forEach(function (c) {
                    -1 === a.indexOf(c) ? c.setState("inactive", !0) : c.options.inactiveOtherPoints && c.setAllPointsToState("inactive")
                })
            };
            n.prototype.destroy = function () {
                var c = this;
                "undefined" !== typeof c.unDocMouseMove && c.unDocMouseMove();
                this.unbindContainerMouseLeave();
                d.chartCount || (d.unbindDocumentMouseUp && (d.unbindDocumentMouseUp = d.unbindDocumentMouseUp()),
                d.unbindDocumentTouchEnd && (d.unbindDocumentTouchEnd = d.unbindDocumentTouchEnd()));
                clearInterval(c.tooltipTimeout);
                h(c, function (a, f) {
                    c[f] = null
                })
            };
            n.prototype.drag = function (c) {
                var a = this.chart, f = a.options.chart, d = c.chartX, k = c.chartY, w = this.zoomHor,
                    n = this.zoomVert, h = a.plotLeft, q = a.plotTop, g = a.plotWidth, t = a.plotHeight,
                    p = this.selectionMarker, b = this.mouseDownX || 0, C = this.mouseDownY || 0,
                    x = D(f.panning) ? f.panning && f.panning.enabled : f.panning, y = f.panKey && c[f.panKey + "Key"];
                if (!p || !p.touch) if (d < h ? d = h : d > h + g && (d =
                    h + g), k < q ? k = q : k > q + t && (k = q + t), this.hasDragged = Math.sqrt(Math.pow(b - d, 2) + Math.pow(C - k, 2)), 10 < this.hasDragged) {
                    var O = a.isInsidePlot(b - h, C - q);
                    a.hasCartesianSeries && (this.zoomX || this.zoomY) && O && !y && !p && (this.selectionMarker = p = a.renderer.rect(h, q, w ? 1 : g, n ? 1 : t, 0).attr({
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add(), a.styledMode || p.attr({fill: f.selectionMarkerFill || e("#335cad").setOpacity(.25).get()}));
                    p && w && (d -= b, p.attr({width: Math.abs(d), x: (0 < d ? 0 : d) + b}));
                    p && n && (d = k - C, p.attr({
                        height: Math.abs(d), y: (0 <
                        d ? 0 : d) + C
                    }));
                    O && !p && x && a.pan(c, f.panning)
                }
            };
            n.prototype.dragStart = function (c) {
                var a = this.chart;
                a.mouseIsDown = c.type;
                a.cancelClick = !1;
                a.mouseDownX = this.mouseDownX = c.chartX;
                a.mouseDownY = this.mouseDownY = c.chartY
            };
            n.prototype.drop = function (c) {
                var a = this, f = this.chart, e = this.hasPinched;
                if (this.selectionMarker) {
                    var d = {originalEvent: c, xAxis: [], yAxis: []}, k = this.selectionMarker,
                        n = k.attr ? k.attr("x") : k.x, h = k.attr ? k.attr("y") : k.y,
                        q = k.attr ? k.attr("width") : k.width, g = k.attr ? k.attr("height") : k.height, K;
                    if (this.hasDragged ||
                        e) f.axes.forEach(function (f) {
                        if (f.zoomEnabled && A(f.min) && (e || a[{xAxis: "zoomX", yAxis: "zoomY"}[f.coll]])) {
                            var b = f.horiz, l = "touchend" === c.type ? f.minPixelPadding : 0,
                                k = f.toValue((b ? n : h) + l);
                            b = f.toValue((b ? n + q : h + g) - l);
                            d[f.coll].push({axis: f, min: Math.min(k, b), max: Math.max(k, b)});
                            K = !0
                        }
                    }), K && y(f, "selection", d, function (a) {
                        f.zoom(G(a, e ? {animation: !1} : null))
                    });
                    t(f.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    e && this.scaleGroups()
                }
                f && t(f.index) && (E(f.container, {cursor: f._cursor}), f.cancelClick =
                    10 < this.hasDragged, f.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            n.prototype.findNearestKDPoint = function (c, a, e) {
                var f = this.chart, d = f.hoverPoint;
                f = f.tooltip;
                if (d && f && f.isStickyOnContact()) return d;
                var l;
                c.forEach(function (c) {
                    var f = !(c.noSharedTooltip && a) && 0 > c.options.findNearestPointBy.indexOf("y");
                    c = c.searchPoint(e, f);
                    if ((f = D(c, !0)) && !(f = !D(l, !0))) {
                        f = l.distX - c.distX;
                        var d = l.dist - c.dist,
                            k = (c.series.group && c.series.group.zIndex) - (l.series.group && l.series.group.zIndex);
                        f = 0 < (0 !==
                        f && a ? f : 0 !== d ? d : 0 !== k ? k : l.series.index > c.series.index ? -1 : 1)
                    }
                    f && (l = c)
                });
                return l
            };
            n.prototype.getChartCoordinatesFromPoint = function (c, a) {
                var f = c.series, e = f.xAxis;
                f = f.yAxis;
                var d = q(c.clientX, c.plotX), k = c.shapeArgs;
                if (e && f) return a ? {
                    chartX: e.len + e.pos - d,
                    chartY: f.len + f.pos - c.plotY
                } : {chartX: d + e.pos, chartY: c.plotY + f.pos};
                if (k && k.x && k.y) return {chartX: k.x, chartY: k.y}
            };
            n.prototype.getChartPosition = function () {
                return this.chartPosition || (this.chartPosition = N(this.chart.container))
            };
            n.prototype.getCoordinates =
                function (c) {
                    var a = {xAxis: [], yAxis: []};
                    this.chart.axes.forEach(function (f) {
                        a[f.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: f,
                            value: f.toValue(c[f.horiz ? "chartX" : "chartY"])
                        })
                    });
                    return a
                };
            n.prototype.getHoverData = function (c, a, e, d, k, n) {
                var f, l = [];
                d = !(!d || !c);
                var v = a && !a.stickyTracking,
                    h = {chartX: n ? n.chartX : void 0, chartY: n ? n.chartY : void 0, shared: k};
                y(this, "beforeGetHoverData", h);
                v = v ? [a] : e.filter(function (a) {
                    return h.filter ? h.filter(a) : a.visible && !(!k && a.directTouch) && q(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                a = (f = d || !n ? c : this.findNearestKDPoint(v, k, n)) && f.series;
                f && (k && !a.noSharedTooltip ? (v = e.filter(function (a) {
                    return h.filter ? h.filter(a) : a.visible && !(!k && a.directTouch) && q(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), v.forEach(function (a) {
                    var c = J(a.points, function (b) {
                        return b.x === f.x && !b.isNull
                    });
                    D(c) && (a.chart.isBoosting && (c = a.getPoint(c)), l.push(c))
                })) : l.push(f));
                h = {hoverPoint: f};
                y(this, "afterGetHoverData", h);
                return {hoverPoint: h.hoverPoint, hoverSeries: a, hoverPoints: l}
            };
            n.prototype.getPointFromEvent =
                function (c) {
                    c = c.target;
                    for (var a; c && !a;) a = c.point, c = c.parentNode;
                    return a
                };
            n.prototype.onTrackerMouseOut = function (c) {
                var a = this.chart.hoverSeries;
                c = c.relatedTarget || c.toElement;
                this.isDirectTouch = !1;
                if (!(!a || !c || a.stickyTracking || this.inClass(c, "highcharts-tooltip") || this.inClass(c, "highcharts-series-" + a.index) && this.inClass(c, "highcharts-tracker"))) a.onMouseOut()
            };
            n.prototype.inClass = function (c, a) {
                for (var f; c;) {
                    if (f = M(c, "class")) {
                        if (-1 !== f.indexOf(a)) return !0;
                        if (-1 !== f.indexOf("highcharts-container")) return !1
                    }
                    c =
                        c.parentNode
                }
            };
            n.prototype.init = function (c, a) {
                this.options = a;
                this.chart = c;
                this.runChartClick = a.chart.events && !!a.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                r && (c.tooltip = new r(c, a.tooltip), this.followTouchMove = q(a.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            n.prototype.normalize = function (c, a) {
                var f = c.touches, e = f ? f.length ? f.item(0) : f.changedTouches[0] : c;
                a || (a = this.getChartPosition());
                f = e.pageX - a.left;
                a = e.pageY - a.top;
                if (e = this.chart.containerScaling) f /= e.scaleX, a /= e.scaleY;
                return G(c,
                    {chartX: Math.round(f), chartY: Math.round(a)})
            };
            n.prototype.onContainerClick = function (c) {
                var a = this.chart, f = a.hoverPoint, e = a.plotLeft, d = a.plotTop;
                c = this.normalize(c);
                a.cancelClick || (f && this.inClass(c.target, "highcharts-tracker") ? (y(f.series, "click", G(c, {point: f})), a.hoverPoint && f.firePointEvent("click", c)) : (G(c, this.getCoordinates(c)), a.isInsidePlot(c.chartX - e, c.chartY - d) && y(a, "click", c)))
            };
            n.prototype.onContainerMouseDown = function (c) {
                c = this.normalize(c);
                2 !== c.button && (this.zoomOption(c), c.preventDefault &&
                c.preventDefault(), this.dragStart(c))
            };
            n.prototype.onContainerMouseLeave = function (f) {
                var a = c[d.hoverChartIndex];
                a && (f.relatedTarget || f.toElement) && (a.pointer.reset(), a.pointer.chartPosition = void 0)
            };
            n.prototype.onContainerMouseMove = function (f) {
                var a = this.chart;
                A(d.hoverChartIndex) && c[d.hoverChartIndex] && c[d.hoverChartIndex].mouseIsDown || (d.hoverChartIndex = a.index);
                f = this.normalize(f);
                f.preventDefault || (f.returnValue = !1);
                "mousedown" === a.mouseIsDown && this.drag(f);
                a.openMenu || !this.inClass(f.target,
                    "highcharts-tracker") && !a.isInsidePlot(f.chartX - a.plotLeft, f.chartY - a.plotTop) || this.runPointActions(f)
            };
            n.prototype.onDocumentTouchEnd = function (f) {
                c[d.hoverChartIndex] && c[d.hoverChartIndex].pointer.drop(f)
            };
            n.prototype.onContainerTouchMove = function (c) {
                this.touch(c)
            };
            n.prototype.onContainerTouchStart = function (c) {
                this.zoomOption(c);
                this.touch(c, !0)
            };
            n.prototype.onDocumentMouseMove = function (c) {
                var a = this.chart, f = this.chartPosition, e = a.tooltip;
                c = this.normalize(c, f);
                !f || e && e.isStickyOnContact() || a.isInsidePlot(c.chartX -
                    a.plotLeft, c.chartY - a.plotTop) || this.inClass(c.target, "highcharts-tracker") || this.reset()
            };
            n.prototype.onDocumentMouseUp = function (f) {
                c[d.hoverChartIndex] && c[d.hoverChartIndex].pointer.drop(f)
            };
            n.prototype.pinch = function (c) {
                var a = this, f = a.chart, e = a.pinchDown, d = c.touches || [], n = d.length, h = a.lastValidTouch,
                    g = a.hasZoom, t = a.selectionMarker, H = {},
                    K = 1 === n && (a.inClass(c.target, "highcharts-tracker") && f.runTrackerClick || a.runChartClick),
                    p = {};
                1 < n && (a.initiated = !0);
                g && a.initiated && !K && c.preventDefault();
                [].map.call(d,
                    function (b) {
                        return a.normalize(b)
                    });
                "touchstart" === c.type ? ([].forEach.call(d, function (b, a) {
                    e[a] = {chartX: b.chartX, chartY: b.chartY}
                }), h.x = [e[0].chartX, e[1] && e[1].chartX], h.y = [e[0].chartY, e[1] && e[1].chartY], f.axes.forEach(function (b) {
                    if (b.zoomEnabled) {
                        var a = f.bounds[b.horiz ? "h" : "v"], c = b.minPixelPadding,
                            e = b.toPixels(Math.min(q(b.options.min, b.dataMin), b.dataMin)),
                            d = b.toPixels(Math.max(q(b.options.max, b.dataMax), b.dataMax)), l = Math.max(e, d);
                        a.min = Math.min(b.pos, Math.min(e, d) - c);
                        a.max = Math.max(b.pos + b.len,
                            l + c)
                    }
                }), a.res = !0) : a.followTouchMove && 1 === n ? this.runPointActions(a.normalize(c)) : e.length && (t || (a.selectionMarker = t = G({
                    destroy: k,
                    touch: !0
                }, f.plotBox)), a.pinchTranslate(e, d, H, t, p, h), a.hasPinched = g, a.scaleGroups(H, p), a.res && (a.res = !1, this.reset(!1, 0)))
            };
            n.prototype.pinchTranslate = function (c, a, e, d, k, n) {
                this.zoomHor && this.pinchTranslateDirection(!0, c, a, e, d, k, n);
                this.zoomVert && this.pinchTranslateDirection(!1, c, a, e, d, k, n)
            };
            n.prototype.pinchTranslateDirection = function (c, a, e, d, k, n, h, q) {
                var f = this.chart, l =
                        c ? "x" : "y", v = c ? "X" : "Y", p = "chart" + v, b = c ? "width" : "height",
                    w = f["plot" + (c ? "Left" : "Top")], x, B, g = q || 1, z = f.inverted, t = f.bounds[c ? "h" : "v"],
                    m = 1 === a.length, L = a[0][p], y = e[0][p], u = !m && a[1][p], F = !m && e[1][p];
                e = function () {
                    "number" === typeof F && 20 < Math.abs(L - u) && (g = q || Math.abs(y - F) / Math.abs(L - u));
                    B = (w - y) / g + L;
                    x = f["plot" + (c ? "Width" : "Height")] / g
                };
                e();
                a = B;
                if (a < t.min) {
                    a = t.min;
                    var V = !0
                } else a + x > t.max && (a = t.max - x, V = !0);
                V ? (y -= .8 * (y - h[l][0]), "number" === typeof F && (F -= .8 * (F - h[l][1])), e()) : h[l] = [y, F];
                z || (n[l] = B - w, n[b] = x);
                n = z ?
                    1 / g : g;
                k[b] = x;
                k[l] = a;
                d[z ? c ? "scaleY" : "scaleX" : "scale" + v] = g;
                d["translate" + v] = n * w + (y - n * L)
            };
            n.prototype.reset = function (c, a) {
                var f = this.chart, e = f.hoverSeries, d = f.hoverPoint, k = f.hoverPoints, n = f.tooltip,
                    h = n && n.shared ? k : d;
                c && h && P(h).forEach(function (a) {
                    a.series.isCartesian && "undefined" === typeof a.plotX && (c = !1)
                });
                if (c) n && h && P(h).length && (n.refresh(h), n.shared && k ? k.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair &&
                    a.series.yAxis.drawCrosshair(null, a))
                }) : d && (d.setState(d.state, !0), f.axes.forEach(function (a) {
                    a.crosshair && d.series[a.coll] === a && a.drawCrosshair(null, d)
                }))); else {
                    if (d) d.onMouseOut();
                    k && k.forEach(function (a) {
                        a.setState()
                    });
                    if (e) e.onMouseOut();
                    n && n.hide(a);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    f.axes.forEach(function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = f.hoverPoints = f.hoverPoint = null
                }
            };
            n.prototype.runPointActions = function (f, a) {
                var e = this.chart, k = e.tooltip && e.tooltip.options.enabled ?
                    e.tooltip : void 0, n = k ? k.shared : !1, h = a || e.hoverPoint,
                    g = h && h.series || e.hoverSeries;
                g = this.getHoverData(h, g, e.series, (!f || "touchmove" !== f.type) && (!!a || g && g.directTouch && this.isDirectTouch), n, f);
                h = g.hoverPoint;
                var t = g.hoverPoints;
                a = (g = g.hoverSeries) && g.tooltipOptions.followPointer;
                n = n && g && !g.noSharedTooltip;
                if (h && (h !== e.hoverPoint || k && k.isHidden)) {
                    (e.hoverPoints || []).forEach(function (a) {
                        -1 === t.indexOf(a) && a.setState()
                    });
                    if (e.hoverSeries !== g) g.onMouseOver();
                    this.applyInactiveState(t);
                    (t || []).forEach(function (a) {
                        a.setState("hover")
                    });
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    if (!h.series) return;
                    h.firePointEvent("mouseOver");
                    e.hoverPoints = t;
                    e.hoverPoint = h;
                    k && k.refresh(n ? t : h, f)
                } else a && k && !k.isHidden && (h = k.getAnchor([{}], f), k.updatePosition({
                    plotX: h[0],
                    plotY: h[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = I(e.container.ownerDocument, "mousemove", function (a) {
                    var f = c[d.hoverChartIndex];
                    if (f) f.pointer.onDocumentMouseMove(a)
                }));
                e.axes.forEach(function (a) {
                    var c = q(a.crosshair.snap, !0), e = c ? J(t, function (c) {
                        return c.series[a.coll] ===
                            a
                    }) : void 0;
                    e || !c ? a.drawCrosshair(f, e) : a.hideCrosshair()
                })
            };
            n.prototype.scaleGroups = function (c, a) {
                var f = this.chart, e;
                f.series.forEach(function (d) {
                    e = c || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(e), d.markerGroup && (d.markerGroup.attr(e), d.markerGroup.clip(a ? f.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(e))
                });
                f.clipRect.attr(a || f.clipBox)
            };
            n.prototype.setDOMEvents = function () {
                var c = this, a = c.chart.container, e = a.ownerDocument;
                a.onmousedown = function (a) {
                    c.onContainerMouseDown(a)
                };
                a.onmousemove = function (a) {
                    c.onContainerMouseMove(a)
                };
                a.onclick = function (a) {
                    c.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = I(a, "mouseleave", c.onContainerMouseLeave);
                d.unbindDocumentMouseUp || (d.unbindDocumentMouseUp = I(e, "mouseup", c.onDocumentMouseUp));
                d.hasTouch && (I(a, "touchstart", function (a) {
                    c.onContainerTouchStart(a)
                }), I(a, "touchmove", function (a) {
                    c.onContainerTouchMove(a)
                }), d.unbindDocumentTouchEnd || (d.unbindDocumentTouchEnd = I(e, "touchend", c.onDocumentTouchEnd)))
            };
            n.prototype.touch = function (c,
                                          a) {
                var f = this.chart, e;
                if (f.index !== d.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
                d.hoverChartIndex = f.index;
                if (1 === c.touches.length) if (c = this.normalize(c), (e = f.isInsidePlot(c.chartX - f.plotLeft, c.chartY - f.plotTop)) && !f.openMenu) {
                    a && this.runPointActions(c);
                    if ("touchmove" === c.type) {
                        a = this.pinchDown;
                        var k = a[0] ? 4 <= Math.sqrt(Math.pow(a[0].chartX - c.chartX, 2) + Math.pow(a[0].chartY - c.chartY, 2)) : !1
                    }
                    q(k, !0) && this.pinch(c)
                } else a && this.reset(); else 2 === c.touches.length && this.pinch(c)
            };
            n.prototype.zoomOption =
                function (c) {
                    var a = this.chart, f = a.options.chart, e = f.zoomType || "";
                    a = a.inverted;
                    /touch/.test(c.type) && (e = q(f.pinchType, e));
                    this.zoomX = c = /x/.test(e);
                    this.zoomY = e = /y/.test(e);
                    this.zoomHor = c && !a || e && a;
                    this.zoomVert = e && !a || c && a;
                    this.hasZoom = c || e
                };
            return n
        }();
        d.Pointer = g;
        return d.Pointer
    });
    S(r, "parts/MSPointer.js", [r["parts/Globals.js"], r["parts/Pointer.js"], r["parts/Utilities.js"]], function (d, g, r) {
        function u() {
            var d = [];
            d.item = function (d) {
                return this[d]
            };
            G(h, function (h) {
                d.push({
                    pageX: h.pageX, pageY: h.pageY,
                    target: h.target
                })
            });
            return d
        }

        function I(h, g, e, c) {
            "touch" !== h.pointerType && h.pointerType !== h.MSPOINTER_TYPE_TOUCH || !y[d.hoverChartIndex] || (c(h), c = y[d.hoverChartIndex].pointer, c[g]({
                type: e,
                target: h.currentTarget,
                preventDefault: D,
                touches: u()
            }))
        }

        var M = this && this.__extends || function () {
                var d = function (h, e) {
                    d = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (c, e) {
                        c.__proto__ = e
                    } || function (c, e) {
                        for (var d in e) e.hasOwnProperty(d) && (c[d] = e[d])
                    };
                    return d(h, e)
                };
                return function (h, e) {
                    function c() {
                        this.constructor =
                            h
                    }

                    d(h, e);
                    h.prototype = null === e ? Object.create(e) : (c.prototype = e.prototype, new c)
                }
            }(), E = r.addEvent, A = r.css, G = r.objectEach, J = r.removeEvent, y = d.charts, t = d.doc, D = d.noop,
            h = {}, N = !!d.win.PointerEvent;
        return function (d) {
            function g() {
                return null !== d && d.apply(this, arguments) || this
            }

            M(g, d);
            g.prototype.batchMSEvents = function (e) {
                e(this.chart.container, N ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                e(this.chart.container, N ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                e(t, N ? "pointerup" :
                    "MSPointerUp", this.onDocumentPointerUp)
            };
            g.prototype.destroy = function () {
                this.batchMSEvents(J);
                d.prototype.destroy.call(this)
            };
            g.prototype.init = function (e, c) {
                d.prototype.init.call(this, e, c);
                this.hasZoom && A(e.container, {"-ms-touch-action": "none", "touch-action": "none"})
            };
            g.prototype.onContainerPointerDown = function (e) {
                I(e, "onContainerTouchStart", "touchstart", function (c) {
                    h[c.pointerId] = {pageX: c.pageX, pageY: c.pageY, target: c.currentTarget}
                })
            };
            g.prototype.onContainerPointerMove = function (e) {
                I(e, "onContainerTouchMove",
                    "touchmove", function (c) {
                        h[c.pointerId] = {pageX: c.pageX, pageY: c.pageY};
                        h[c.pointerId].target || (h[c.pointerId].target = c.currentTarget)
                    })
            };
            g.prototype.onDocumentPointerUp = function (e) {
                I(e, "onDocumentTouchEnd", "touchend", function (c) {
                    delete h[c.pointerId]
                })
            };
            g.prototype.setDOMEvents = function () {
                d.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(E)
            };
            return g
        }(g)
    });
    S(r, "parts/Legend.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent,
            u = g.css, I = g.defined, M = g.discardElement, E = g.find, A = g.fireEvent, G = g.format, J = g.isNumber,
            y = g.merge, t = g.pick, D = g.relativeLength, h = g.setAnimation, N = g.stableSort, q = g.syncTimeout;
        g = g.wrap;
        var P = d.isFirefox, e = d.marginNames, c = d.win, k = function () {
            function c(c, a) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop =
                    this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = c;
                this.init(c, a)
            }

            c.prototype.init = function (c, a) {
                this.chart = c;
                this.setOptions(a);
                a.enabled && (this.render(), r(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = r(this.chart, "render", function () {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            };
            c.prototype.setOptions = function (c) {
                var a = t(c.padding, 8);
                this.options = c;
                this.chart.styledMode || (this.itemStyle = c.itemStyle, this.itemHiddenStyle = y(this.itemStyle, c.itemHiddenStyle));
                this.itemMarginTop = c.itemMarginTop || 0;
                this.itemMarginBottom = c.itemMarginBottom || 0;
                this.padding = a;
                this.initialItemY = a - 5;
                this.symbolWidth = t(c.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === c.layout && !this.chart.inverted;
                this.baseline = void 0
            };
            c.prototype.update = function (c, a) {
                var f = this.chart;
                this.setOptions(y(!0, this.options, c));
                this.destroy();
                f.isDirtyLegend = f.isDirtyBox = !0;
                t(a, !0) && f.redraw();
                A(this, "afterUpdate")
            };
            c.prototype.colorizeItem = function (c, a) {
                c.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var f = this.options, e = c.legendItem, d = c.legendLine, k = c.legendSymbol,
                        h = this.itemHiddenStyle.color;
                    f = a ? f.itemStyle.color : h;
                    var n = a ? c.color || h : h, g = c.options && c.options.marker, q = {fill: n};
                    e &&
                    e.css({fill: f, color: f});
                    d && d.attr({stroke: n});
                    k && (g && k.isMarker && (q = c.pointAttribs(), a || (q.stroke = q.fill = h)), k.attr(q))
                }
                A(this, "afterColorizeItem", {item: c, visible: a})
            };
            c.prototype.positionItems = function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            };
            c.prototype.positionItem = function (c) {
                var a = this.options, f = a.symbolPadding;
                a = !a.rtl;
                var e = c._legendItemPos, d = e[0];
                e = e[1];
                var k = c.checkbox;
                if ((c = c.legendGroup) && c.element) c[I(c.translateY) ? "animate" : "attr"]({
                    translateX: a ?
                        d : this.legendWidth - d - 2 * f - 4, translateY: e
                });
                k && (k.x = d, k.y = e)
            };
            c.prototype.destroyItem = function (c) {
                var a = c.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (a) {
                    c[a] && (c[a] = c[a].destroy())
                });
                a && M(c.checkbox)
            };
            c.prototype.destroy = function () {
                function c(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                this.getAllItems().forEach(function (a) {
                    ["legendItem", "legendGroup"].forEach(c, a)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(c, this);
                this.display = null
            };
            c.prototype.positionCheckboxes =
                function () {
                    var c = this.group && this.group.alignAttr, a = this.clipHeight || this.legendHeight,
                        e = this.titleHeight;
                    if (c) {
                        var d = c.translateY;
                        this.allItems.forEach(function (f) {
                            var k = f.checkbox;
                            if (k) {
                                var l = d + e + k.y + (this.scrollOffset || 0) + 3;
                                u(k, {
                                    left: c.translateX + f.checkboxOffset + k.x - 20 + "px",
                                    top: l + "px",
                                    display: this.proximate || l > d - 6 && l < d + a - 6 ? "" : "none"
                                })
                            }
                        }, this)
                    }
                };
            c.prototype.renderTitle = function () {
                var c = this.options, a = this.padding, e = c.title, d = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, a -
                    3, a - 4, null, null, null, c.useHTML, null, "legend-title").attr({zIndex: 1}), this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)), e.width || this.title.css({width: this.maxLegendWidth + "px"}), c = this.title.getBBox(), d = c.height, this.offsetWidth = c.width, this.contentGroup.attr({translateY: d}));
                this.titleHeight = d
            };
            c.prototype.setText = function (c) {
                var a = this.options;
                c.legendItem.attr({text: a.labelFormat ? G(a.labelFormat, c, this.chart) : a.labelFormatter.call(c)})
            };
            c.prototype.renderItem = function (c) {
                var a =
                        this.chart, e = a.renderer, f = this.options, d = this.symbolWidth, k = f.symbolPadding,
                    h = this.itemStyle, n = this.itemHiddenStyle,
                    g = "horizontal" === f.layout ? t(f.itemDistance, 20) : 0, q = !f.rtl, K = c.legendItem,
                    p = !c.series, b = !p && c.series.drawLegendSymbol ? c.series : c, C = b.options;
                C = this.createCheckboxForItem && C && C.showCheckbox;
                g = d + k + g + (C ? 20 : 0);
                var x = f.useHTML, R = c.options.className;
                K || (c.legendGroup = e.g("legend-item").addClass("highcharts-" + b.type + "-series highcharts-color-" + c.colorIndex + (R ? " " + R : "") + (p ? " highcharts-series-" +
                    c.index : "")).attr({zIndex: 1}).add(this.scrollGroup), c.legendItem = K = e.text("", q ? d + k : -k, this.baseline || 0, x), a.styledMode || K.css(y(c.visible ? h : n)), K.attr({
                    align: q ? "left" : "right",
                    zIndex: 2
                }).add(c.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(a.styledMode ? 12 : h.fontSize, K), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, K.attr("y", this.baseline)), this.symbolHeight = f.symbolHeight || this.fontMetrics.f, b.drawLegendSymbol(this, c), this.setItemEvents && this.setItemEvents(c, K, x));
                C && !c.checkbox &&
                this.createCheckboxForItem && this.createCheckboxForItem(c);
                this.colorizeItem(c, c.visible);
                !a.styledMode && h.width || K.css({width: (f.itemWidth || this.widthOption || a.spacingBox.width) - g});
                this.setText(c);
                a = K.getBBox();
                c.itemWidth = c.checkboxOffset = f.itemWidth || c.legendItemWidth || a.width + g;
                this.maxItemWidth = Math.max(this.maxItemWidth, c.itemWidth);
                this.totalItemWidth += c.itemWidth;
                this.itemHeight = c.itemHeight = Math.round(c.legendItemHeight || a.height || this.symbolHeight)
            };
            c.prototype.layoutItem = function (c) {
                var a =
                        this.options, e = this.padding, f = "horizontal" === a.layout, d = c.itemHeight,
                    k = this.itemMarginBottom, h = this.itemMarginTop, n = f ? t(a.itemDistance, 20) : 0,
                    g = this.maxLegendWidth;
                a = a.alignColumns && this.totalItemWidth > g ? this.maxItemWidth : c.itemWidth;
                f && this.itemX - e + a > g && (this.itemX = e, this.lastLineHeight && (this.itemY += h + this.lastLineHeight + k), this.lastLineHeight = 0);
                this.lastItemY = h + this.itemY + k;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                c._legendItemPos = [this.itemX, this.itemY];
                f ? this.itemX += a : (this.itemY +=
                    h + d + k, this.lastLineHeight = d);
                this.offsetWidth = this.widthOption || Math.max((f ? this.itemX - e - (c.checkbox ? 0 : n) : a) + e, this.offsetWidth)
            };
            c.prototype.getAllItems = function () {
                var c = [];
                this.chart.series.forEach(function (a) {
                    var e = a && a.options;
                    a && t(e.showInLegend, I(e.linkedTo) ? !1 : void 0, !0) && (c = c.concat(a.legendItems || ("point" === e.legendType ? a.data : a)))
                });
                A(this, "afterGetAllItems", {allItems: c});
                return c
            };
            c.prototype.getAlignment = function () {
                var c = this.options;
                return this.proximate ? c.align.charAt(0) + "tv" : c.floating ?
                    "" : c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0)
            };
            c.prototype.adjustMargins = function (c, a) {
                var f = this.chart, d = this.options, k = this.getAlignment();
                k && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (l, h) {
                    l.test(k) && !I(c[h]) && (f[e[h]] = Math.max(f[e[h]], f.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * d[h % 2 ? "x" : "y"] + t(d.margin, 12) + a[h] + (f.titleOffset[h] || 0)))
                })
            };
            c.prototype.proximatePositions = function () {
                var c = this.chart, a = [], e = "left" === this.options.align;
                this.allItems.forEach(function (f) {
                    var d = e;
                    if (f.yAxis && f.points) {
                        f.xAxis.options.reversed && (d = !d);
                        var k = E(d ? f.points : f.points.slice(0).reverse(), function (a) {
                            return J(a.plotY)
                        });
                        d = this.itemMarginTop + f.legendItem.getBBox().height + this.itemMarginBottom;
                        var l = f.yAxis.top - c.plotTop;
                        f.visible ? (k = k ? k.plotY : f.yAxis.height, k += l - .3 * d) : k = l + f.yAxis.height;
                        a.push({target: k, size: d, item: f})
                    }
                }, this);
                d.distribute(a, c.plotHeight);
                a.forEach(function (a) {
                    a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
                })
            };
            c.prototype.render =
                function () {
                    var c = this.chart, a = c.renderer, e = this.group, d, k = this.box, h = this.options,
                        n = this.padding;
                    this.itemX = n;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth = 0;
                    this.widthOption = D(h.width, c.spacingBox.width - n);
                    var g = c.spacingBox.width - 2 * n - h.x;
                    -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (g /= 2);
                    this.maxLegendWidth = this.widthOption || g;
                    e || (this.group = e = a.g("legend").attr({zIndex: 7}).add(), this.contentGroup = a.g().attr({zIndex: 1}).add(e), this.scrollGroup = a.g().add(this.contentGroup));
                    this.renderTitle();
                    g = this.getAllItems();
                    N(g, function (a, c) {
                        return (a.options && a.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                    });
                    h.reversed && g.reverse();
                    this.allItems = g;
                    this.display = d = !!g.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    g.forEach(this.renderItem, this);
                    g.forEach(this.layoutItem, this);
                    g = (this.widthOption || this.offsetWidth) + n;
                    var q = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    q = this.handleOverflow(q);
                    q += n;
                    k || (this.box = k = a.rect().addClass("highcharts-legend-box").attr({r: h.borderRadius}).add(e),
                        k.isNew = !0);
                    c.styledMode || k.attr({
                        stroke: h.borderColor,
                        "stroke-width": h.borderWidth || 0,
                        fill: h.backgroundColor || "none"
                    }).shadow(h.shadow);
                    0 < g && 0 < q && (k[k.isNew ? "attr" : "animate"](k.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: g,
                        height: q
                    }, k.strokeWidth())), k.isNew = !1);
                    k[d ? "show" : "hide"]();
                    c.styledMode && "none" === e.getStyle("display") && (g = q = 0);
                    this.legendWidth = g;
                    this.legendHeight = q;
                    d && (a = c.spacingBox, k = a.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0] ? k += c.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                        0 < c.titleOffset[2] && (k -= c.titleOffset[2]), k !== a.y && (a = y(a, {y: k})), e.align(y(h, {
                        width: g,
                        height: q,
                        verticalAlign: this.proximate ? "top" : h.verticalAlign
                    }), !0, a));
                    this.proximate || this.positionItems();
                    A(this, "afterRender")
                };
            c.prototype.handleOverflow = function (c) {
                var a = this, e = this.chart, f = e.renderer, d = this.options, k = d.y, h = this.padding;
                k = e.spacingBox.height + ("top" === d.verticalAlign ? -k : k) - h;
                var n = d.maxHeight, g, q = this.clipRect, y = d.navigation, p = t(y.animation, !0),
                    b = y.arrowSize || 12, C = this.nav, x = this.pages, R, O = this.allItems,
                    u = function (b) {
                        "number" === typeof b ? q.attr({height: b}) : q && (a.clipRect = q.destroy(), a.contentGroup.clip());
                        a.contentGroup.div && (a.contentGroup.div.style.clip = b ? "rect(" + h + "px,9999px," + (h + b) + "px,0)" : "auto")
                    }, D = function (c) {
                        a[c] = f.circle(0, 0, 1.3 * b).translate(b / 2, b / 2).add(C);
                        e.styledMode || a[c].attr("fill", "rgba(0,0,0,0.0001)");
                        return a[c]
                    };
                "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (k /= 2);
                n && (k = Math.min(k, n));
                x.length = 0;
                c > k && !1 !== y.enabled ? (this.clipHeight = g = Math.max(k - 20 - this.titleHeight -
                    h, 0), this.currentPage = t(this.currentPage, 1), this.fullHeight = c, O.forEach(function (b, a) {
                    var c = b._legendItemPos[1], e = Math.round(b.legendItem.getBBox().height), f = x.length;
                    if (!f || c - x[f - 1] > g && (R || c) !== x[f - 1]) x.push(R || c), f++;
                    b.pageIx = f - 1;
                    R && (O[a - 1].pageIx = f - 1);
                    a === O.length - 1 && c + e - x[f - 1] > g && c !== R && (x.push(c), b.pageIx = f);
                    c !== R && (R = c)
                }), q || (q = a.clipRect = f.clipRect(0, h, 9999, 0), a.contentGroup.clip(q)), u(g), C || (this.nav = C = f.g().attr({zIndex: 1}).add(this.group), this.up = f.symbol("triangle", 0, 0, b, b).add(C), D("upTracker").on("click",
                    function () {
                        a.scroll(-1, p)
                    }), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(y.style), this.pager.add(C), this.down = f.symbol("triangle-down", 0, 0, b, b).add(C), D("downTracker").on("click", function () {
                    a.scroll(1, p)
                })), a.scroll(0), c = k) : C && (u(), this.nav = C.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return c
            };
            c.prototype.scroll = function (c, a) {
                var e = this, f = this.chart, k = this.pages, n = k.length, g = this.currentPage + c;
                c = this.clipHeight;
                var y = this.options.navigation,
                    u = this.pager, H = this.padding;
                g > n && (g = n);
                0 < g && ("undefined" !== typeof a && h(a, f), this.nav.attr({
                    translateX: H,
                    translateY: c + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function (a) {
                    a.attr({"class": 1 === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"})
                }), u.attr({text: g + "/" + n}), [this.down, this.downTracker].forEach(function (a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": g === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this),
                f.styledMode || (this.up.attr({fill: 1 === g ? y.inactiveColor : y.activeColor}), this.upTracker.css({cursor: 1 === g ? "default" : "pointer"}), this.down.attr({fill: g === n ? y.inactiveColor : y.activeColor}), this.downTracker.css({cursor: g === n ? "default" : "pointer"})), this.scrollOffset = -k[g - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = g, this.positionCheckboxes(), a = d.animObject(t(a, f.renderer.globalAnimation, !0)), q(function () {
                    A(e, "afterScroll", {currentPage: g})
                }, a.duration ||
                    0))
            };
            return c
        }();
        (/Trident\/7\.0/.test(c.navigator && c.navigator.userAgent) || P) && g(k.prototype, "positionItem", function (c, e) {
            var a = this, f = function () {
                e._legendItemPos && c.call(a, e)
            };
            f();
            a.bubbleLegend || setTimeout(f)
        });
        d.Legend = k;
        return d.Legend
    });
    S(r, "parts/Chart.js", [r["parts/Globals.js"], r["parts/Legend.js"], r["parts/MSPointer.js"], r["parts/Pointer.js"], r["parts/Time.js"], r["parts/Utilities.js"]], function (d, g, r, u, I, M) {
        var E = M.addEvent, A = M.animate, G = M.animObject, J = M.attr, y = M.createElement, t = M.css, D =
                M.defined, h = M.discardElement, N = M.erase, q = M.error, P = M.extend, e = M.find, c = M.fireEvent,
            k = M.getStyle, n = M.isArray, f = M.isFunction, a = M.isNumber, l = M.isObject, v = M.isString,
            z = M.merge, w = M.numberFormat, B = M.objectEach, L = M.pick, Q = M.pInt, H = M.relativeLength,
            K = M.removeEvent, p = M.setAnimation, b = M.splat, C = M.syncTimeout, x = M.uniqueKey, R = d.doc,
            O = d.Axis, X = d.defaultOptions, U = d.charts, m = d.marginNames, T = d.seriesTypes, Z = d.win,
            ca = d.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        d.chart = function (b, a, c) {
            return new ca(b, a,
                c)
        };
        P(ca.prototype, {
            callbacks: [], getArgs: function () {
                var b = [].slice.call(arguments);
                if (v(b[0]) || b[0].nodeName) this.renderTo = b.shift();
                this.init(b[0], b[1])
            }, init: function (b, a) {
                var e, k = b.series, h = b.plotOptions || {};
                c(this, "init", {args: arguments}, function () {
                    b.series = null;
                    e = z(X, b);
                    B(e.plotOptions, function (b, a) {
                        l(b) && (b.tooltip = h[a] && z(h[a].tooltip) || void 0)
                    });
                    e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    e.series = b.series = k;
                    this.userOptions = b;
                    var m = e.chart, n = m.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {h: {}, v: {}};
                    this.labelCollectors = [];
                    this.callback = a;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new I(b.time) : d.time;
                    this.numberFormatter = m.numberFormatter || w;
                    this.styledMode = m.styledMode;
                    this.hasCartesianSeries = m.showAxes;
                    var p = this;
                    p.index = U.length;
                    U.push(p);
                    d.chartCount++;
                    n && B(n, function (b, a) {
                        f(b) && E(p, a, b)
                    });
                    p.xAxis = [];
                    p.yAxis = [];
                    p.pointCount = p.colorCounter = p.symbolCounter = 0;
                    c(p, "afterInit");
                    p.firstRender()
                })
            }, initSeries: function (b) {
                var a = this.options.chart;
                a = b.type || a.type || a.defaultSeriesType;
                var c = T[a];
                c || q(17, !0, this, {missingModuleFor: a});
                a = new c;
                a.init(this, b);
                return a
            }, setSeriesData: function () {
                this.getSeriesOrderByLinks().forEach(function (b) {
                    b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
                })
            }, getSeriesOrderByLinks: function () {
                return this.series.concat().sort(function (b, a) {
                    return b.linkedSeries.length || a.linkedSeries.length ? a.linkedSeries.length - b.linkedSeries.length :
                        0
                })
            }, orderSeries: function (b) {
                var a = this.series;
                for (b = b || 0; b < a.length; b++) a[b] && (a[b].index = b, a[b].name = a[b].getName())
            }, isInsidePlot: function (b, a, e) {
                var f = e ? a : b;
                b = e ? b : a;
                f = {x: f, y: b, isInsidePlot: 0 <= f && f <= this.plotWidth && 0 <= b && b <= this.plotHeight};
                c(this, "afterIsInsidePlot", f);
                return f.isInsidePlot
            }, redraw: function (b) {
                c(this, "beforeRedraw");
                var a = this.axes, e = this.series, f = this.pointer, d = this.legend, k = this.userOptions.legend,
                    l = this.isDirtyLegend, h = this.hasCartesianSeries, m = this.isDirtyBox, n = this.renderer,
                    x = n.isHidden(), g = [];
                this.setResponsive && this.setResponsive(!1);
                p(this.hasRendered ? b : !1, this);
                x && this.temporaryDisplay();
                this.layOutTitles();
                for (b = e.length; b--;) {
                    var w = e[b];
                    if (w.options.stacking) {
                        var C = !0;
                        if (w.isDirty) {
                            var v = !0;
                            break
                        }
                    }
                }
                if (v) for (b = e.length; b--;) w = e[b], w.options.stacking && (w.isDirty = !0);
                e.forEach(function (b) {
                    b.isDirty && ("point" === b.options.legendType ? (b.updateTotals && b.updateTotals(), l = !0) : k && (k.labelFormatter || k.labelFormat) && (l = !0));
                    b.isDirtyData && c(b, "updatedData")
                });
                l && d && d.options.enabled &&
                (d.render(), this.isDirtyLegend = !1);
                C && this.getStacks();
                h && a.forEach(function (b) {
                    b.updateNames();
                    b.setScale()
                });
                this.getMargins();
                h && (a.forEach(function (b) {
                    b.isDirty && (m = !0)
                }), a.forEach(function (b) {
                    var a = b.min + "," + b.max;
                    b.extKey !== a && (b.extKey = a, g.push(function () {
                        c(b, "afterSetExtremes", P(b.eventArgs, b.getExtremes()));
                        delete b.eventArgs
                    }));
                    (m || C) && b.redraw()
                }));
                m && this.drawChartBox();
                c(this, "predraw");
                e.forEach(function (b) {
                    (m || b.isDirty) && b.visible && b.redraw();
                    b.isDirtyData = !1
                });
                f && f.reset(!0);
                n.draw();
                c(this, "redraw");
                c(this, "render");
                x && this.temporaryDisplay(!0);
                g.forEach(function (b) {
                    b.call()
                })
            }, get: function (b) {
                function a(a) {
                    return a.id === b || a.options && a.options.id === b
                }

                var c = this.series, f;
                var d = e(this.axes, a) || e(this.series, a);
                for (f = 0; !d && f < c.length; f++) d = e(c[f].points || [], a);
                return d
            }, getAxes: function () {
                var a = this, e = this.options, f = e.xAxis = b(e.xAxis || {});
                e = e.yAxis = b(e.yAxis || {});
                c(this, "getAxes");
                f.forEach(function (b, a) {
                    b.index = a;
                    b.isX = !0
                });
                e.forEach(function (b, a) {
                    b.index = a
                });
                f.concat(e).forEach(function (b) {
                    new O(a,
                        b)
                });
                c(this, "afterGetAxes")
            }, getSelectedPoints: function () {
                var b = [];
                this.series.forEach(function (a) {
                    b = b.concat(a.getPointsCollection().filter(function (b) {
                        return L(b.selectedStaging, b.selected)
                    }))
                });
                return b
            }, getSelectedSeries: function () {
                return this.series.filter(function (b) {
                    return b.selected
                })
            }, setTitle: function (b, a, c) {
                this.applyDescription("title", b);
                this.applyDescription("subtitle", a);
                this.applyDescription("caption", void 0);
                this.layOutTitles(c)
            }, applyDescription: function (b, a) {
                var c = this, e = "title" ===
                b ? {color: "#333333", fontSize: this.options.isStock ? "16px" : "40px", fontFamily: "AAMUFKF"} : {color: "#666666"};
                e = this.options[b] = z(!this.styledMode && {style: e}, this.options[b], a);
                var f = this[b];
                f && a && (this[b] = f = f.destroy());
                e && !f && (f = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
                    align: e.align,
                    "class": "highcharts-" + b,
                    zIndex: e.zIndex || 4
                }).add(), f.update = function (a) {
                    c[{title: "setTitle", subtitle: "setSubtitle", caption: "setCaption"}[b]](a)
                }, this.styledMode || f.css(e.style), this[b] = f)
            }, layOutTitles: function (b) {
                var a = [0, 0, 0], e = this.renderer,
                    f = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function (b) {
                    var c = this[b], d = this.options[b], k = d.verticalAlign || "top";
                    b = "title" === b ? -3 : "top" === k ? a[0] + 2 : 0;
                    if (c) {
                        if (!this.styledMode) var l = d.style.fontSize;
                        l = e.fontMetrics(l, c).b;
                        c.css({width: (d.width || f.width + (d.widthAdjust || 0)) + "px"});
                        var h = Math.round(c.getBBox(d.useHTML).height);
                        c.align(P({y: "bottom" === k ? l : b + l, height: h}, d), !1, "spacingBox");
                        d.floating || ("top" === k ? a[0] = Math.ceil(a[0] + h) : "bottom" === k && (a[2] = Math.ceil(a[2] + h)))
                    }
                }, this);
                a[0] && "top" ===
                (this.options.title.verticalAlign || "top") && (a[0] += this.options.title.margin);
                a[2] && "bottom" === this.options.caption.verticalAlign && (a[2] += this.options.caption.margin);
                var d = !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
                this.titleOffset = a;
                c(this, "afterLayOutTitles");
                !this.isDirtyBox && d && (this.isDirtyBox = this.isDirtyLegend = d, this.hasRendered && L(b, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var b = this.options.chart, a = b.width;
                b = b.height;
                var c = this.renderTo;
                D(a) || (this.containerWidth =
                    k(c, "width"));
                D(b) || (this.containerHeight = k(c, "height"));
                this.chartWidth = Math.max(0, a || this.containerWidth || 600);
                this.chartHeight = Math.max(0, H(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            }, temporaryDisplay: function (b) {
                var a = this.renderTo;
                if (b) for (; a && a.style;) a.hcOrigStyle && (t(a, a.hcOrigStyle), delete a.hcOrigStyle), a.hcOrigDetached && (R.body.removeChild(a), a.hcOrigDetached = !1), a = a.parentNode; else for (; a && a.style;) {
                    R.body.contains(a) || a.parentNode || (a.hcOrigDetached = !0, R.body.appendChild(a));
                    if ("none" === k(a, "display", !1) || a.hcOricDetached) a.hcOrigStyle = {
                        display: a.style.display,
                        height: a.style.height,
                        overflow: a.style.overflow
                    }, b = {
                        display: "block",
                        overflow: "hidden"
                    }, a !== this.renderTo && (b.height = 0), t(a, b), a.offsetWidth || a.style.setProperty("display", "block", "important");
                    a = a.parentNode;
                    if (a === R.body) break
                }
            }, setClassName: function (b) {
                this.container.className = "highcharts-container " + (b || "")
            }, getContainer: function () {
                var b = this.options, e = b.chart;
                var f = this.renderTo;
                var k = x(), l, h;
                f || (this.renderTo =
                    f = e.renderTo);
                v(f) && (this.renderTo = f = R.getElementById(f));
                f || q(13, !0, this);
                var m = Q(J(f, "data-highcharts-chart"));
                a(m) && U[m] && U[m].hasRendered && U[m].destroy();
                J(f, "data-highcharts-chart", this.index);
                f.innerHTML = "";
                e.skipClone || f.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                m = this.chartWidth;
                var n = this.chartHeight;
                t(f, {overflow: "hidden"});
                this.styledMode || (l = P({
                        position: "relative",
                        overflow: "hidden",
                        width: m + "px",
                        height: n + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                    },
                    e.style));
                this.container = f = y("div", {id: k}, l, f);
                this._cursor = f.style.cursor;
                this.renderer = new (d[e.renderer] || d.Renderer)(f, m, n, null, e.forExport, b.exporting && b.exporting.allowHTML, this.styledMode);
                p(void 0, this);
                this.setClassName(e.className);
                if (this.styledMode) for (h in b.defs) this.renderer.definition(b.defs[h]); else this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index;
                c(this, "afterGetContainer")
            }, getMargins: function (b) {
                var a = this.spacing, e = this.margin, f = this.titleOffset;
                this.resetMargins();
                f[0] && !D(e[0]) && (this.plotTop = Math.max(this.plotTop, f[0] + a[0]));
                f[2] && !D(e[2]) && (this.marginBottom = Math.max(this.marginBottom, f[2] + a[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(e, a);
                c(this, "getMargins");
                b || this.getAxisMargins()
            }, getAxisMargins: function () {
                var b = this, a = b.axisOffset = [0, 0, 0, 0], c = b.colorAxis, e = b.margin, f = function (b) {
                    b.forEach(function (b) {
                        b.visible && b.getOffset()
                    })
                };
                b.hasCartesianSeries ? f(b.axes) : c && c.length && f(c);
                m.forEach(function (c, f) {
                    D(e[f]) || (b[c] += a[f])
                });
                b.setChartSize()
            },
            reflow: function (b) {
                var a = this, c = a.options.chart, e = a.renderTo, f = D(c.width) && D(c.height),
                    d = c.width || k(e, "width");
                c = c.height || k(e, "height");
                e = b ? b.target : Z;
                if (!f && !a.isPrinting && d && c && (e === Z || e === R)) {
                    if (d !== a.containerWidth || c !== a.containerHeight) M.clearTimeout(a.reflowTimeout), a.reflowTimeout = C(function () {
                        a.container && a.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    a.containerWidth = d;
                    a.containerHeight = c
                }
            }, setReflow: function (b) {
                var a = this;
                !1 === b || this.unbindReflow ? !1 === b && this.unbindReflow && (this.unbindReflow =
                    this.unbindReflow()) : (this.unbindReflow = E(Z, "resize", function (b) {
                    a.options && a.reflow(b)
                }), E(this, "destroy", this.unbindReflow))
            }, setSize: function (b, a, e) {
                var f = this, d = f.renderer;
                f.isResizing += 1;
                p(e, f);
                e = d.globalAnimation;
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                "undefined" !== typeof b && (f.options.chart.width = b);
                "undefined" !== typeof a && (f.options.chart.height = a);
                f.getChartSize();
                f.styledMode || (e ? A : t)(f.container, {width: f.chartWidth + "px", height: f.chartHeight + "px"}, e);
                f.setChartSize(!0);
                d.setSize(f.chartWidth, f.chartHeight, e);
                f.axes.forEach(function (b) {
                    b.isDirty = !0;
                    b.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.redraw(e);
                f.oldChartHeight = null;
                c(f, "resize");
                C(function () {
                    f && c(f, "endResize", null, function () {
                        --f.isResizing
                    })
                }, G(e).duration || 0)
            }, setChartSize: function (b) {
                var a = this.inverted, e = this.renderer, f = this.chartWidth, d = this.chartHeight,
                    k = this.options.chart, l = this.spacing, h = this.clipOffset, m, n, p, x;
                this.plotLeft = m = Math.round(this.plotLeft);
                this.plotTop =
                    n = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(f - m - this.marginRight));
                this.plotHeight = x = Math.max(0, Math.round(d - n - this.marginBottom));
                this.plotSizeX = a ? x : p;
                this.plotSizeY = a ? p : x;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = {x: l[3], y: l[0], width: f - l[3] - l[1], height: d - l[0] - l[2]};
                this.plotBox = e.plotBox = {x: m, y: n, width: p, height: x};
                f = 2 * Math.floor(this.plotBorderWidth / 2);
                a = Math.ceil(Math.max(f, h[3]) / 2);
                e = Math.ceil(Math.max(f, h[0]) / 2);
                this.clipBox = {
                    x: a,
                    y: e,
                    width: Math.floor(this.plotSizeX -
                        Math.max(f, h[1]) / 2 - a),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, h[2]) / 2 - e))
                };
                b || this.axes.forEach(function (b) {
                    b.setAxisSize();
                    b.setAxisTranslation()
                });
                c(this, "afterSetChartSize", {skipAxes: b})
            }, resetMargins: function () {
                c(this, "resetMargins");
                var b = this, a = b.options.chart;
                ["margin", "spacing"].forEach(function (c) {
                    var e = a[c], f = l(e) ? e : [e, e, e, e];
                    ["Top", "Right", "Bottom", "Left"].forEach(function (e, d) {
                        b[c][d] = L(a[c + e], f[d])
                    })
                });
                m.forEach(function (a, c) {
                    b[a] = L(b.margin[c], b.spacing[c])
                });
                b.axisOffset =
                    [0, 0, 0, 0];
                b.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var b = this.options.chart, a = this.renderer, e = this.chartWidth, f = this.chartHeight,
                    d = this.chartBackground, k = this.plotBackground, l = this.plotBorder, h = this.styledMode,
                    m = this.plotBGImage, n = b.backgroundColor, p = b.plotBackgroundColor, x = b.plotBackgroundImage,
                    g, w = this.plotLeft, C = this.plotTop, v = this.plotWidth, q = this.plotHeight, t = this.plotBox,
                    B = this.clipRect, z = this.clipBox, O = "animate";
                d || (this.chartBackground = d = a.rect().addClass("highcharts-background").add(),
                    O = "attr");
                if (h) var y = g = d.strokeWidth(); else {
                    y = b.borderWidth || 0;
                    g = y + (b.shadow ? 8 : 0);
                    n = {fill: n || "none"};
                    if (y || d["stroke-width"]) n.stroke = b.borderColor, n["stroke-width"] = y;
                    d.attr(n).shadow(b.shadow)
                }
                d[O]({x: g / 2, y: g / 2, width: e - g - y % 2, height: f - g - y % 2, r: b.borderRadius});
                O = "animate";
                k || (O = "attr", this.plotBackground = k = a.rect().addClass("highcharts-plot-background").add());
                k[O](t);
                h || (k.attr({fill: p || "none"}).shadow(b.plotShadow), x && (m ? (x !== m.attr("href") && m.attr("href", x), m.animate(t)) : this.plotBGImage = a.image(x,
                    w, C, v, q).add()));
                B ? B.animate({width: z.width, height: z.height}) : this.clipRect = a.clipRect(z);
                O = "animate";
                l || (O = "attr", this.plotBorder = l = a.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                h || l.attr({stroke: b.plotBorderColor, "stroke-width": b.plotBorderWidth || 0, fill: "none"});
                l[O](l.crisp({x: w, y: C, width: v, height: q}, -l.strokeWidth()));
                this.isDirtyBox = !1;
                c(this, "afterDrawChartBox")
            }, propFromSeries: function () {
                var b = this, a = b.options.chart, c, e = b.options.series, f, d;
                ["inverted", "angular", "polar"].forEach(function (k) {
                    c =
                        T[a.type || a.defaultSeriesType];
                    d = a[k] || c && c.prototype[k];
                    for (f = e && e.length; !d && f--;) (c = T[e[f].type]) && c.prototype[k] && (d = !0);
                    b[k] = d
                })
            }, linkSeries: function () {
                var b = this, a = b.series;
                a.forEach(function (b) {
                    b.linkedSeries.length = 0
                });
                a.forEach(function (a) {
                    var c = a.options.linkedTo;
                    v(c) && (c = ":previous" === c ? b.series[a.index - 1] : b.get(c)) && c.linkedParent !== a && (c.linkedSeries.push(a), a.linkedParent = c, c.enabledDataSorting && a.setDataSortingOptions(), a.visible = L(a.options.visible, c.options.visible, a.visible))
                });
                c(this, "afterLinkSeries")
            }, renderSeries: function () {
                this.series.forEach(function (b) {
                    b.translate();
                    b.render()
                })
            }, renderLabels: function () {
                var b = this, a = b.options.labels;
                a.items && a.items.forEach(function (c) {
                    var e = P(a.style, c.style), f = Q(e.left) + b.plotLeft, d = Q(e.top) + b.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    b.renderer.text(c.html, f, d).attr({zIndex: 2}).css(e).add()
                })
            }, render: function () {
                var b = this.axes, a = this.colorAxis, c = this.renderer, e = this.options, f = 0, d = function (b) {
                    b.forEach(function (b) {
                        b.visible && b.render()
                    })
                };
                this.setTitle();
                this.legend = new g(this, e.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                e = this.plotWidth;
                b.some(function (b) {
                    if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return f = 21, !0
                });
                var k = this.plotHeight = Math.max(this.plotHeight - f, 0);
                b.forEach(function (b) {
                    b.setScale()
                });
                this.getAxisMargins();
                var l = 1.1 < e / this.plotWidth;
                var h = 1.05 < k / this.plotHeight;
                if (l || h) b.forEach(function (b) {
                    (b.horiz && l || !b.horiz && h) && b.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? d(b) : a && a.length && d(a);
                this.seriesGroup || (this.seriesGroup = c.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.updateContainerScaling();
                this.hasRendered = !0
            }, addCredits: function (b) {
                var a = this;
                b = z(!0, this.options.credits, b);
                b.enabled && !this.credits && (this.credits = this.renderer.text(b.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    b.href &&
                    (Z.location.href = b.href)
                }).attr({
                    align: b.position.align,
                    zIndex: 8
                }), a.styledMode || this.credits.css(b.style), this.credits.add().align(b.position), this.credits.update = function (b) {
                    a.credits = a.credits.destroy();
                    a.addCredits(b)
                })
            }, updateContainerScaling: function () {
                var b = this.container;
                if (b.offsetWidth && b.offsetHeight && b.getBoundingClientRect) {
                    var a = b.getBoundingClientRect(), c = a.width / b.offsetWidth;
                    b = a.height / b.offsetHeight;
                    1 !== c || 1 !== b ? this.containerScaling = {scaleX: c, scaleY: b} : delete this.containerScaling
                }
            },
            destroy: function () {
                var b = this, a = b.axes, e = b.series, f = b.container, k, l = f && f.parentNode;
                c(b, "destroy");
                b.renderer.forExport ? N(U, b) : U[b.index] = void 0;
                d.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                K(b);
                for (k = a.length; k--;) a[k] = a[k].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (k = e.length; k--;) e[k] = e[k].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                    var c =
                        b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                f && (f.innerHTML = "", K(f), l && h(f));
                B(b, function (a, c) {
                    delete b[c]
                })
            }, firstRender: function () {
                var b = this, a = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (n(a.series) ? a.series : []).forEach(function (a) {
                        b.initSeries(a)
                    });
                    b.linkSeries();
                    b.setSeriesData();
                    c(b, "beforeRender");
                    u && (b.pointer = d.hasTouch || !Z.PointerEvent && !Z.MSPointerEvent ? new u(b, a) : new r(b, a));
                    b.render();
                    if (!b.renderer.imgCount &&
                        !b.hasLoaded) b.onload();
                    b.temporaryDisplay(!0)
                }
            }, onload: function () {
                this.callbacks.concat([this.callback]).forEach(function (b) {
                    b && "undefined" !== typeof this.index && b.apply(this, [this])
                }, this);
                c(this, "load");
                c(this, "render");
                D(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            }
        })
    });
    S(r, "parts/ScrollablePlotArea.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent, u = g.createElement, I = g.pick, M = g.stop;
        g = d.Chart;
        "";
        r(g, "afterSetChartSize", function (g) {
            var u =
                this.options.chart.scrollablePlotArea, r = u && u.minWidth;
            u = u && u.minHeight;
            if (!this.renderer.forExport) {
                if (r) {
                    if (this.scrollablePixelsX = r = Math.max(0, r - this.chartWidth)) {
                        this.plotWidth += r;
                        this.inverted ? (this.clipBox.height += r, this.plotBox.height += r) : (this.clipBox.width += r, this.plotBox.width += r);
                        var E = {1: {name: "right", value: r}}
                    }
                } else u && (this.scrollablePixelsY = r = Math.max(0, u - this.chartHeight)) && (this.plotHeight += r, this.inverted ? (this.clipBox.width += r, this.plotBox.width += r) : (this.clipBox.height += r, this.plotBox.height +=
                    r), E = {2: {name: "bottom", value: r}});
                E && !g.skipAxes && this.axes.forEach(function (g) {
                    E[g.side] ? g.getPlotLinePath = function () {
                        var t = E[g.side].name, y = this[t];
                        this[t] = y - E[g.side].value;
                        var h = d.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this[t] = y;
                        return h
                    } : (g.setAxisSize(), g.setAxisTranslation())
                })
            }
        });
        r(g, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        g.prototype.setUpScrolling = function () {
            var d =
                this, g = {WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden"};
            this.scrollablePixelsX && (g.overflowX = "auto");
            this.scrollablePixelsY && (g.overflowY = "auto");
            this.scrollingContainer = u("div", {className: "highcharts-scrolling"}, g, this.renderTo);
            r(this.scrollingContainer, "scroll", function () {
                d.pointer && delete d.pointer.chartPosition
            });
            this.innerContainer = u("div", {className: "highcharts-inner-container"}, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling =
                null
        };
        g.prototype.moveFixedElements = function () {
            var d = this.container, g = this.fixedRenderer,
                u = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                r;
            this.scrollablePixelsX && !this.inverted ? r = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? r = ".highcharts-xaxis" :
                this.scrollablePixelsY && !this.inverted ? r = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (r = ".highcharts-yaxis");
            u.push(r, r + "-labels");
            u.forEach(function (y) {
                [].forEach.call(d.querySelectorAll(y), function (d) {
                    (d.namespaceURI === g.SVG_NS ? g.box : g.box.parentNode).appendChild(d);
                    d.style.pointerEvents = "auto"
                })
            })
        };
        g.prototype.applyFixed = function () {
            var g, A = !this.fixedDiv, G = this.options.chart.scrollablePlotArea;
            A ? (this.fixedDiv = u("div", {className: "highcharts-fixed"}, {
                position: "absolute", overflow: "hidden",
                pointerEvents: "none", zIndex: 2
            }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = g = new d.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = g.path().attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": I(G.opacity, .85),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), r(this, "afterShowResetZoom", this.moveFixedElements), r(this, "afterLayOutTitles",
                this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            g = this.chartWidth + (this.scrollablePixelsX || 0);
            var J = this.chartHeight + (this.scrollablePixelsY || 0);
            M(this.container);
            this.container.style.width = g + "px";
            this.container.style.height = J + "px";
            this.renderer.boxWrapper.attr({width: g, height: J, viewBox: [0, 0, g, J].join(" ")});
            this.chartBackground.attr({width: g, height: J});
            this.scrollablePixelsY && (this.scrollingContainer.style.height = this.chartHeight + "px");
            A && (G.scrollPositionX &&
            (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * G.scrollPositionX), G.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * G.scrollPositionY));
            J = this.axisOffset;
            A = this.plotTop - J[0] - 1;
            G = this.plotLeft - J[3] - 1;
            g = this.plotTop + this.plotHeight + J[2] + 1;
            J = this.plotLeft + this.plotWidth + J[1] + 1;
            var y = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                t = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            A = this.scrollablePixelsX ? ["M", 0, A, "L", this.plotLeft - 1, A, "L", this.plotLeft -
            1, g, "L", 0, g, "Z", "M", y, A, "L", this.chartWidth, A, "L", this.chartWidth, g, "L", y, g, "Z"] : this.scrollablePixelsY ? ["M", G, 0, "L", G, this.plotTop - 1, "L", J, this.plotTop - 1, "L", J, 0, "Z", "M", G, t, "L", G, this.chartHeight, "L", J, this.chartHeight, "L", J, t, "Z"] : ["M", 0, 0];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({d: A})
        }
    });
    S(r, "mixins/legend-symbol.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.merge, u = g.pick;
        d.LegendSymbolMixin = {
            drawRectangle: function (d, g) {
                var r = d.symbolHeight,
                    A = d.options.squareSymbol;
                g.legendSymbol = this.chart.renderer.rect(A ? (d.symbolWidth - r) / 2 : 0, d.baseline - r + 1, A ? r : d.symbolWidth, r, u(d.options.symbolRadius, r / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(g.legendGroup)
            }, drawLineMarker: function (d) {
                var g = this.options, E = g.marker, A = d.symbolWidth, G = d.symbolHeight, J = G / 2,
                    y = this.chart.renderer, t = this.legendGroup;
                d = d.baseline - Math.round(.3 * d.fontMetrics.b);
                var D = {};
                this.chart.styledMode || (D = {"stroke-width": g.lineWidth || 0}, g.dashStyle && (D.dashstyle = g.dashStyle));
                this.legendLine = y.path(["M", 0, d, "L", A, d]).addClass("highcharts-graph").attr(D).add(t);
                E && !1 !== E.enabled && A && (g = Math.min(u(E.radius, J), J), 0 === this.symbol.indexOf("url") && (E = r(E, {
                    width: G,
                    height: G
                }), g = 0), this.legendSymbol = E = y.symbol(this.symbol, A / 2 - g, d - g, 2 * g, 2 * g, E).addClass("highcharts-point").add(t), E.isMarker = !0)
            }
        };
        return d.LegendSymbolMixin
    });
    S(r, "parts/Point.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        "";
        var r = g.animObject, u = g.defined, I = g.erase, M = g.extend, E = g.format, A = g.getNestedProperty,
            G = g.isArray, J = g.isNumber, y = g.isObject, t = g.syncTimeout, D = g.pick, h = g.removeEvent,
            N = g.uniqueKey, q = d.fireEvent;
        g = function () {
            function d() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }

            d.prototype.animateBeforeDestroy = function () {
                var e = this, c = {x: e.startXPos, opacity: 0}, d, h = e.getGraphicalProps();
                h.singular.forEach(function (f) {
                    d = "dataLabel" ===
                        f;
                    e[f] = e[f].animate(d ? {x: e[f].startXPos, y: e[f].startYPos, opacity: 0} : c)
                });
                h.plural.forEach(function (c) {
                    e[c].forEach(function (a) {
                        a.element && a.animate(M({x: e.startXPos}, a.startYPos ? {x: a.startXPos, y: a.startYPos} : {}))
                    })
                })
            };
            d.prototype.applyOptions = function (e, c) {
                var k = this.series, h = k.options.pointValKey || k.pointValKey;
                e = d.prototype.optionsToObject.call(this, e);
                M(this, e);
                this.options = this.options ? M(this.options, e) : e;
                e.group && delete this.group;
                e.dataLabels && delete this.dataLabels;
                h && (this.y = d.prototype.getNestedProperty.call(this,
                    h));
                this.formatPrefix = (this.isNull = D(this.isValid && !this.isValid(), null === this.x || !J(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof c && k.xAxis && k.xAxis.hasNames && (this.x = k.xAxis.nameToX(this));
                "undefined" === typeof this.x && k && (this.x = "undefined" === typeof c ? k.autoIncrement(this) : c);
                return this
            };
            d.prototype.destroy = function () {
                function e() {
                    if (c.graphic || c.dataLabel || c.dataLabels) h(c), c.destroyElements();
                    for (l in c) c[l] = null
                }

                var c = this, d = c.series, n = d.chart;
                d = d.options.dataSorting;
                var f = n.hoverPoints, a = r(c.series.chart.renderer.globalAnimation), l;
                c.legendItem && n.legend.destroyItem(c);
                f && (c.setState(), I(f, c), f.length || (n.hoverPoints = null));
                if (c === n.hoverPoint) c.onMouseOut();
                d && d.enabled ? (this.animateBeforeDestroy(), t(e, a.duration)) : e();
                n.pointCount--
            };
            d.prototype.destroyElements = function (e) {
                var c = this;
                e = c.getGraphicalProps(e);
                e.singular.forEach(function (e) {
                    c[e] = c[e].destroy()
                });
                e.plural.forEach(function (e) {
                    c[e].forEach(function (c) {
                        c.element && c.destroy()
                    });
                    delete c[e]
                })
            };
            d.prototype.firePointEvent = function (e, c, d) {
                var k = this, f = this.series.options;
                (f.point.events[e] || k.options && k.options.events && k.options.events[e]) && k.importEvents();
                "click" === e && f.allowPointSelect && (d = function (a) {
                    k.select && k.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                q(k, e, c, d)
            };
            d.prototype.getClassName = function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !==
                typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            };
            d.prototype.getGraphicalProps = function (e) {
                var c = this, d = [], h, f = {singular: [], plural: []};
                e = e || {graphic: 1, dataLabel: 1};
                e.graphic && d.push("graphic", "shadowGroup");
                e.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (h = d.length; h--;) {
                    var a = d[h];
                    c[a] && f.singular.push(a)
                }
                ["dataLabel",
                    "connector"].forEach(function (a) {
                    var d = a + "s";
                    e[a] && c[d] && f.plural.push(d)
                });
                return f
            };
            d.prototype.getLabelConfig = function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            d.prototype.getNestedProperty = function (e) {
                if (e) return 0 === e.indexOf("custom.") ? A(e, this.options) : this[e]
            };
            d.prototype.getZone = function () {
                var e = this.series, c = e.zones;
                e = e.zoneAxis ||
                    "y";
                var d = 0, h;
                for (h = c[d]; this[e] >= h.value;) h = c[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor;
                return h
            };
            d.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            };
            d.prototype.init = function (e, c, d) {
                this.series = e;
                this.applyOptions(c, d);
                this.id = u(this.id) ? this.id : N();
                this.resolveColor();
                e.chart.pointCount++;
                q(this, "afterInit");
                return this
            };
            d.prototype.optionsToObject =
                function (e) {
                    var c = {}, k = this.series, h = k.options.keys, f = h || k.pointArrayMap || ["y"], a = f.length,
                        l = 0, g = 0;
                    if (J(e) || null === e) c[f[0]] = e; else if (G(e)) for (!h && e.length > a && (k = typeof e[0], "string" === k ? c.name = e[0] : "number" === k && (c.x = e[0]), l++); g < a;) h && "undefined" === typeof e[l] || (0 < f[g].indexOf(".") ? d.prototype.setNestedProperty(c, e[l], f[g]) : c[f[g]] = e[l]), l++, g++; else "object" === typeof e && (c = e, e.dataLabels && (k._hasPointLabels = !0), e.marker && (k._hasPointMarkers = !0));
                    return c
                };
            d.prototype.resolveColor = function () {
                var e =
                    this.series;
                var c = e.chart.options.chart.colorCount;
                var d = e.chart.styledMode;
                d || this.options.color || (this.color = e.color);
                e.options.colorByPoint ? (d || (c = e.options.colors || e.chart.options.colors, this.color = this.color || c[e.colorCounter], c = c.length), d = e.colorCounter, e.colorCounter++, e.colorCounter === c && (e.colorCounter = 0)) : d = e.colorIndex;
                this.colorIndex = D(this.colorIndex, d)
            };
            d.prototype.setNestedProperty = function (e, c, d) {
                d.split(".").reduce(function (e, f, a, d) {
                        e[f] = d.length - 1 === a ? c : y(e[f], !0) ? e[f] : {};
                        return e[f]
                    },
                    e);
                return e
            };
            d.prototype.tooltipFormatter = function (e) {
                var c = this.series, d = c.tooltipOptions, h = D(d.valueDecimals, ""), f = d.valuePrefix || "",
                    a = d.valueSuffix || "";
                c.chart.styledMode && (e = c.chart.tooltip.styledModeFormat(e));
                (c.pointArrayMap || ["y"]).forEach(function (c) {
                    c = "{point." + c;
                    if (f || a) e = e.replace(RegExp(c + "}", "g"), f + c + "}" + a);
                    e = e.replace(RegExp(c + "}", "g"), c + ":,." + h + "f}")
                });
                return E(e, {point: this, series: this.series}, c.chart)
            };
            return d
        }();
        d.Point = g;
        return d.Point
    });
    S(r, "parts/Series.js", [r["parts/Globals.js"],
        r["mixins/legend-symbol.js"], r["parts/Point.js"], r["parts/Utilities.js"]], function (d, g, r, u) {
        "";
        var I = u.addEvent, M = u.animObject, E = u.arrayMax, A = u.arrayMin, G = u.clamp, J = u.correctFloat,
            y = u.defined, t = u.erase, D = u.error, h = u.extend, N = u.find, q = u.fireEvent, P = u.getNestedProperty,
            e = u.isArray, c = u.isFunction, k = u.isNumber, n = u.isString, f = u.merge, a = u.objectEach, l = u.pick,
            v = u.removeEvent, z = u.seriesType, w = u.splat, B = u.syncTimeout, L = d.defaultOptions,
            Q = d.defaultPlotOptions, H = d.seriesTypes, K = d.SVGElement, p = d.win;
        d.Series =
            z("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                marker: {
                    enabledThreshold: 2,
                    lineColor: "#ffffff",
                    lineWidth: 0,
                    radius: 4,
                    states: {
                        normal: {animation: !0},
                        hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                        select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
                    }
                },
                point: {events: {}},
                dataLabels: {
                    align: "center", formatter: function () {
                        var b = this.series.chart.numberFormatter;
                        return "number" !== typeof this.y ? "" : b(this.y, -1)
                    }, padding: 5, style: {
                        fontSize: "11px",
                        fontWeight: "bold", color: "contrast", textOutline: "1px contrast"
                    }, verticalAlign: "bottom", x: 0, y: 0
                },
                cropThreshold: 300,
                opacity: 1,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    normal: {animation: !0},
                    hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}},
                    select: {animation: {duration: 0}},
                    inactive: {animation: {duration: 50}, opacity: .2}
                },
                stickyTracking: !0,
                turboThreshold: 1E3,
                findNearestPointBy: "x"
            }, {
                axisTypes: ["xAxis", "yAxis"],
                coll: "series",
                colorCounter: 0,
                cropShoulder: 1,
                directTouch: !1,
                eventsToUnbind: [],
                isCartesian: !0,
                parallelArrays: ["x", "y"],
                pointClass: r,
                requireSorting: !0,
                sorted: !0,
                init: function (b, e) {
                    q(this, "init", {options: e});
                    var f = this, d = b.series, k;
                    this.eventOptions = this.eventOptions || {};
                    f.chart = b;
                    f.options = e = f.setOptions(e);
                    f.linkedSeries = [];
                    f.bindAxes();
                    h(f, {name: e.name, state: "", visible: !1 !== e.visible, selected: !0 === e.selected});
                    var p = e.events;
                    a(p, function (b, a) {
                        c(b) && f.eventOptions[a] !== b && (c(f.eventOptions[a]) && v(f, a, f.eventOptions[a]), f.eventOptions[a] = b, I(f, a, b))
                    });
                    if (p && p.click || e.point &&
                        e.point.events && e.point.events.click || e.allowPointSelect) b.runTrackerClick = !0;
                    f.getColor();
                    f.getSymbol();
                    f.parallelArrays.forEach(function (b) {
                        f[b + "Data"] || (f[b + "Data"] = [])
                    });
                    f.isCartesian && (b.hasCartesianSeries = !0);
                    d.length && (k = d[d.length - 1]);
                    f._i = l(k && k._i, -1) + 1;
                    b.orderSeries(this.insert(d));
                    e.dataSorting && e.dataSorting.enabled ? f.setDataSortingOptions() : f.points || f.data || f.setData(e.data, !1);
                    q(this, "afterInit")
                },
                is: function (b) {
                    return H[b] && this instanceof H[b]
                },
                insert: function (b) {
                    var a = this.options.index,
                        c;
                    if (k(a)) {
                        for (c = b.length; c--;) if (a >= l(b[c].options.index, b[c]._i)) {
                            b.splice(c + 1, 0, this);
                            break
                        }
                        -1 === c && b.unshift(this);
                        c += 1
                    } else b.push(this);
                    return l(c, b.length - 1)
                },
                bindAxes: function () {
                    var b = this, a = b.options, c = b.chart, e;
                    q(this, "bindAxes", null, function () {
                        (b.axisTypes || []).forEach(function (f) {
                            c[f].forEach(function (c) {
                                e = c.options;
                                if (a[f] === e.index || "undefined" !== typeof a[f] && a[f] === e.id || "undefined" === typeof a[f] && 0 === e.index) b.insert(c.series), b[f] = c, c.isDirty = !0
                            });
                            b[f] || b.optionalAxis === f || D(18, !0,
                                c)
                        })
                    });
                    q(this, "afterBindAxes")
                },
                updateParallelArrays: function (b, a) {
                    var c = b.series, e = arguments, f = k(a) ? function (e) {
                        var f = "y" === e && c.toYData ? c.toYData(b) : b[e];
                        c[e + "Data"][a] = f
                    } : function (b) {
                        Array.prototype[a].apply(c[b + "Data"], Array.prototype.slice.call(e, 2))
                    };
                    c.parallelArrays.forEach(f)
                },
                hasData: function () {
                    return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
                },
                autoIncrement: function () {
                    var b = this.options, a = this.xIncrement,
                        c, e = b.pointIntervalUnit, f = this.chart.time;
                    a = l(a, b.pointStart, 0);
                    this.pointInterval = c = l(this.pointInterval, b.pointInterval, 1);
                    e && (b = new f.Date(a), "day" === e ? f.set("Date", b, f.get("Date", b) + c) : "month" === e ? f.set("Month", b, f.get("Month", b) + c) : "year" === e && f.set("FullYear", b, f.get("FullYear", b) + c), c = b.getTime() - a);
                    this.xIncrement = a + c;
                    return a
                },
                setDataSortingOptions: function () {
                    var b = this.options;
                    h(this, {requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1});
                    y(b.pointRange) || (b.pointRange = 1)
                },
                setOptions: function (b) {
                    var a =
                        this.chart, c = a.options, e = c.plotOptions, d = a.userOptions || {};
                    b = f(b);
                    a = a.styledMode;
                    var k = {plotOptions: e, userOptions: b};
                    q(this, "setOptions", k);
                    var h = k.plotOptions[this.type], m = d.plotOptions || {};
                    this.userOptions = k.userOptions;
                    d = f(h, e.series, d.plotOptions && d.plotOptions[this.type], b);
                    this.tooltipOptions = f(L.tooltip, L.plotOptions.series && L.plotOptions.series.tooltip, L.plotOptions[this.type].tooltip, c.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, b.tooltip);
                    this.stickyTracking = l(b.stickyTracking,
                        m[this.type] && m[this.type].stickyTracking, m.series && m.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : d.stickyTracking);
                    null === h.marker && delete d.marker;
                    this.zoneAxis = d.zoneAxis;
                    c = this.zones = (d.zones || []).slice();
                    !d.negativeColor && !d.negativeFillColor || d.zones || (e = {
                        value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
                        className: "highcharts-negative"
                    }, a || (e.color = d.negativeColor, e.fillColor = d.negativeFillColor), c.push(e));
                    c.length && y(c[c.length - 1].value) && c.push(a ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    });
                    q(this, "afterSetOptions", {options: d});
                    return d
                },
                getName: function () {
                    return l(this.options.name, "Series " + (this.index + 1))
                },
                getCyclic: function (b, a, c) {
                    var e = this.chart, f = this.userOptions, d = b + "Index", k = b + "Counter",
                        h = c ? c.length : l(e.options.chart[b + "Count"], e[b + "Count"]);
                    if (!a) {
                        var p = l(f[d], f["_" + d]);
                        y(p) || (e.series.length || (e[k] = 0), f["_" + d] = p = e[k] % h, e[k] += 1);
                        c && (a = c[p])
                    }
                    "undefined" !== typeof p && (this[d] = p);
                    this[b] = a
                },
                getColor: function () {
                    this.chart.styledMode ? this.getCyclic("color") :
                        this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || Q[this.type].color, this.chart.options.colors)
                },
                getPointsCollection: function () {
                    return (this.hasGroupedData ? this.points : this.data) || []
                },
                getSymbol: function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                findPointIndex: function (b, a) {
                    var c = b.id, e = b.x, f = this.points, d, h = this.options.dataSorting;
                    if (c) var l = this.chart.get(c); else if (this.linkedParent || this.enabledDataSorting) {
                        var p =
                            h && h.matchByName ? "name" : "index";
                        l = N(f, function (a) {
                            return !a.touched && a[p] === b[p]
                        });
                        if (!l) return
                    }
                    if (l) {
                        var n = l && l.index;
                        "undefined" !== typeof n && (d = !0)
                    }
                    "undefined" === typeof n && k(e) && (n = this.xData.indexOf(e, a));
                    -1 !== n && "undefined" !== typeof n && this.cropped && (n = n >= this.cropStart ? n - this.cropStart : n);
                    !d && f[n] && f[n].touched && (n = void 0);
                    return n
                },
                drawLegendSymbol: g.drawLineMarker,
                updateData: function (b, a) {
                    var c = this.options, e = c.dataSorting, f = this.points, d = [], h, l, n, p = this.requireSorting,
                        g = b.length === f.length,
                        w = !0;
                    this.xIncrement = null;
                    b.forEach(function (b, a) {
                        var l = y(b) && this.pointClass.prototype.optionsToObject.call({series: this}, b) || {};
                        var m = l.x;
                        if (l.id || k(m)) {
                            if (m = this.findPointIndex(l, n), -1 === m || "undefined" === typeof m ? d.push(b) : f[m] && b !== c.data[m] ? (f[m].update(b, !1, null, !1), f[m].touched = !0, p && (n = m + 1)) : f[m] && (f[m].touched = !0), !g || a !== m || e && e.enabled || this.hasDerivedData) h = !0
                        } else d.push(b)
                    }, this);
                    if (h) for (b = f.length; b--;) (l = f[b]) && !l.touched && l.remove && l.remove(!1, a); else !g || e && e.enabled ? w = !1 : (b.forEach(function (b,
                                                                                                                                                                       a) {
                        f[a].update && b !== f[a].y && f[a].update(b, !1, null, !1)
                    }), d.length = 0);
                    f.forEach(function (b) {
                        b && (b.touched = !1)
                    });
                    if (!w) return !1;
                    d.forEach(function (b) {
                        this.addPoint(b, !1, null, null, !1)
                    }, this);
                    null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = E(this.xData), this.autoIncrement());
                    return !0
                },
                setData: function (b, a, c, f) {
                    var d = this, h = d.points, p = h && h.length || 0, m, g = d.options, w = d.chart,
                        x = g.dataSorting, q = null, v = d.xAxis;
                    q = g.turboThreshold;
                    var C = this.xData, t = this.yData, B = (m = d.pointArrayMap) && m.length,
                        z = g.keys, y = 0, L = 1, u;
                    b = b || [];
                    m = b.length;
                    a = l(a, !0);
                    x && x.enabled && (b = this.sortData(b));
                    !1 !== f && m && p && !d.cropped && !d.hasGroupedData && d.visible && !d.isSeriesBoosting && (u = this.updateData(b, c));
                    if (!u) {
                        d.xIncrement = null;
                        d.colorCounter = 0;
                        this.parallelArrays.forEach(function (b) {
                            d[b + "Data"].length = 0
                        });
                        if (q && m > q) if (q = d.getFirstValidPoint(b), k(q)) for (c = 0; c < m; c++) C[c] = this.autoIncrement(), t[c] = b[c]; else if (e(q)) if (B) for (c = 0; c < m; c++) f = b[c], C[c] = f[0], t[c] = f.slice(1, B + 1); else for (z && (y = z.indexOf("x"), L = z.indexOf("y"),
                            y = 0 <= y ? y : 0, L = 0 <= L ? L : 1), c = 0; c < m; c++) f = b[c], C[c] = f[y], t[c] = f[L]; else D(12, !1, w); else for (c = 0; c < m; c++) "undefined" !== typeof b[c] && (f = {series: d}, d.pointClass.prototype.applyOptions.apply(f, [b[c]]), d.updateParallelArrays(f, c));
                        t && n(t[0]) && D(14, !0, w);
                        d.data = [];
                        d.options.data = d.userOptions.data = b;
                        for (c = p; c--;) h[c] && h[c].destroy && h[c].destroy();
                        v && (v.minRange = v.userMinRange);
                        d.isDirty = w.isDirtyBox = !0;
                        d.isDirtyData = !!h;
                        c = !1
                    }
                    "point" === g.legendType && (this.processData(), this.generatePoints());
                    a && w.redraw(c)
                },
                sortData: function (b) {
                    var a = this, c = a.options.dataSorting.sortKey || "y", e = function (b, a) {
                        return y(a) && b.pointClass.prototype.optionsToObject.call({series: b}, a) || {}
                    };
                    b.forEach(function (c, f) {
                        b[f] = e(a, c);
                        b[f].index = f
                    }, this);
                    b.concat().sort(function (b, a) {
                        b = P(c, b);
                        a = P(c, a);
                        return a < b ? -1 : a > b ? 1 : 0
                    }).forEach(function (b, a) {
                        b.x = a
                    }, this);
                    a.linkedSeries && a.linkedSeries.forEach(function (a) {
                        var c = a.options, f = c.data;
                        c.dataSorting && c.dataSorting.enabled || !f || (f.forEach(function (c, d) {
                            f[d] = e(a, c);
                            b[d] && (f[d].x = b[d].x, f[d].index =
                                d)
                        }), a.setData(f, !1))
                    });
                    return b
                },
                processData: function (b) {
                    var a = this.xData, c = this.yData, e = a.length;
                    var f = 0;
                    var d = this.xAxis, k = this.options;
                    var h = k.cropThreshold;
                    var l = this.getExtremesFromAll || k.getExtremesFromAll, p = this.isCartesian;
                    k = d && d.val2lin;
                    var n = d && d.isLog, g = this.requireSorting;
                    if (p && !this.isDirty && !d.isDirty && !this.yAxis.isDirty && !b) return !1;
                    if (d) {
                        b = d.getExtremes();
                        var w = b.min;
                        var q = b.max
                    }
                    if (p && this.sorted && !l && (!h || e > h || this.forceCrop)) if (a[e - 1] < w || a[0] > q) a = [], c = []; else if (this.yData && (a[0] <
                        w || a[e - 1] > q)) {
                        f = this.cropData(this.xData, this.yData, w, q);
                        a = f.xData;
                        c = f.yData;
                        f = f.start;
                        var v = !0
                    }
                    for (h = a.length || 1; --h;) if (e = n ? k(a[h]) - k(a[h - 1]) : a[h] - a[h - 1], 0 < e && ("undefined" === typeof t || e < t)) var t = e; else 0 > e && g && (D(15, !1, this.chart), g = !1);
                    this.cropped = v;
                    this.cropStart = f;
                    this.processedXData = a;
                    this.processedYData = c;
                    this.closestPointRange = this.basePointRange = t
                },
                cropData: function (b, a, c, e, f) {
                    var d = b.length, k = 0, h = d, p;
                    f = l(f, this.cropShoulder);
                    for (p = 0; p < d; p++) if (b[p] >= c) {
                        k = Math.max(0, p - f);
                        break
                    }
                    for (c = p; c <
                    d; c++) if (b[c] > e) {
                        h = c + f;
                        break
                    }
                    return {xData: b.slice(k, h), yData: a.slice(k, h), start: k, end: h}
                },
                generatePoints: function () {
                    var b = this.options, a = b.data, c = this.data, e, f = this.processedXData,
                        d = this.processedYData, k = this.pointClass, l = f.length, p = this.cropStart || 0,
                        n = this.hasGroupedData;
                    b = b.keys;
                    var g = [], v;
                    c || n || (c = [], c.length = a.length, c = this.data = c);
                    b && n && (this.options.keys = !1);
                    for (v = 0; v < l; v++) {
                        var t = p + v;
                        if (n) {
                            var B = (new k).init(this, [f[v]].concat(w(d[v])));
                            B.dataGroup = this.groupMap[v];
                            B.dataGroup.options && (B.options =
                                B.dataGroup.options, h(B, B.dataGroup.options), delete B.dataLabels)
                        } else (B = c[t]) || "undefined" === typeof a[t] || (c[t] = B = (new k).init(this, a[t], f[v]));
                        B && (B.index = t, g[v] = B)
                    }
                    this.options.keys = b;
                    if (c && (l !== (e = c.length) || n)) for (v = 0; v < e; v++) v !== p || n || (v += l), c[v] && (c[v].destroyElements(), c[v].plotX = void 0);
                    this.data = c;
                    this.points = g;
                    q(this, "afterGeneratePoints")
                },
                getXExtremes: function (b) {
                    return {min: A(b), max: E(b)}
                },
                getExtremes: function (b) {
                    var a = this.xAxis, c = this.yAxis, f = this.processedXData || this.xData, d = [], h =
                        0, l = 0;
                    var m = 0;
                    var p = this.requireSorting ? this.cropShoulder : 0, n = c ? c.positiveValuesOnly : !1, g;
                    b = b || this.stackedYData || this.processedYData || [];
                    c = b.length;
                    a && (m = a.getExtremes(), l = m.min, m = m.max);
                    for (g = 0; g < c; g++) {
                        var w = f[g];
                        var v = b[g];
                        var t = (k(v) || e(v)) && (v.length || 0 < v || !n);
                        w = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !a || (f[g + p] || w) >= l && (f[g - p] || w) <= m;
                        if (t && w) if (t = v.length) for (; t--;) k(v[t]) && (d[h++] = v[t]); else d[h++] = v
                    }
                    this.dataMin = A(d);
                    this.dataMax = E(d);
                    q(this, "afterGetExtremes")
                },
                getFirstValidPoint: function (b) {
                    for (var a = null, c = b.length, e = 0; null === a && e < c;) a = b[e], e++;
                    return a
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var b = this.options, a = b.stacking, c = this.xAxis, f = c.categories, d = this.enabledDataSorting,
                        h = this.yAxis, p = this.points, m = p.length, n = !!this.modifyValue, g,
                        w = this.pointPlacementToXValue(), v = !!w, t = b.threshold, B = b.startFromThreshold ? t : 0,
                        z, L = this.zoneAxis || "y", u = Number.MAX_VALUE;
                    for (g = 0; g < m; g++) {
                        var K = p[g], r = K.x, H = K.y, D = K.low, A = a &&
                            h.stacks[(this.negStacks && H < (B ? 0 : t) ? "-" : "") + this.stackKey];
                        h.positiveValuesOnly && null !== H && 0 >= H && (K.isNull = !0);
                        K.plotX = z = J(G(c.translate(r, 0, 0, 0, 1, w, "flags" === this.type), -1E5, 1E5));
                        if (a && this.visible && A && A[r]) {
                            var N = this.getStackIndicator(N, r, this.index);
                            if (!K.isNull) {
                                var Q = A[r];
                                var E = Q.points[N.key]
                            }
                        }
                        e(E) && (D = E[0], H = E[1], D === B && N.key === A[r].base && (D = l(k(t) && t, h.min)), h.positiveValuesOnly && 0 >= D && (D = null), K.total = K.stackTotal = Q.total, K.percentage = Q.total && K.y / Q.total * 100, K.stackY = H, this.irregularWidths ||
                        Q.setOffset(this.pointXOffset || 0, this.barW || 0));
                        K.yBottom = y(D) ? G(h.translate(D, 0, 1, 0, 1), -1E5, 1E5) : null;
                        n && (H = this.modifyValue(H, K));
                        K.plotY = "number" === typeof H && Infinity !== H ? G(h.translate(H, 0, 1, 0, 1), -1E5, 1E5) : void 0;
                        K.isInside = this.isPointInside(K);
                        K.clientX = v ? J(c.translate(r, 0, 0, 0, 1, w)) : z;
                        K.negative = K[L] < (b[L + "Threshold"] || t || 0);
                        K.category = f && "undefined" !== typeof f[K.x] ? f[K.x] : K.x;
                        if (!K.isNull && !1 !== K.visible) {
                            "undefined" !== typeof P && (u = Math.min(u, Math.abs(z - P)));
                            var P = z
                        }
                        K.zone = this.zones.length &&
                            K.getZone();
                        !K.graphic && this.group && d && (K.isNew = !0)
                    }
                    this.closestPointRangePx = u;
                    q(this, "afterTranslate")
                },
                getValidPoints: function (b, a, c) {
                    var e = this.chart;
                    return (b || this.points || []).filter(function (b) {
                        return a && !e.isInsidePlot(b.plotX, b.plotY, e.inverted) ? !1 : !1 !== b.visible && (c || !b.isNull)
                    })
                },
                getClipBox: function (b, a) {
                    var c = this.options, e = this.chart, f = e.inverted, d = this.xAxis, k = d && this.yAxis;
                    b && !1 === c.clip && k ? b = f ? {
                        y: -e.chartWidth + k.len + k.pos,
                        height: e.chartWidth,
                        width: e.chartHeight,
                        x: -e.chartHeight + d.len +
                            d.pos
                    } : {
                        y: -k.pos,
                        height: e.chartHeight,
                        width: e.chartWidth,
                        x: -d.pos
                    } : (b = this.clipBox || e.clipBox, a && (b.width = e.plotSizeX, b.x = 0));
                    return a ? {width: b.width, x: b.x} : b
                },
                setClip: function (b) {
                    var a = this.chart, c = this.options, e = a.renderer, f = a.inverted, d = this.clipBox,
                        k = this.getClipBox(b),
                        h = this.sharedClipKey || ["_sharedClip", b && b.duration, b && b.easing, k.height, c.xAxis, c.yAxis].join(),
                        l = a[h], p = a[h + "m"];
                    b && (k.width = 0, f && (k.x = a.plotHeight + (!1 !== c.clip ? 0 : a.plotTop)));
                    l ? a.hasLoaded || l.attr(k) : (b && (a[h + "m"] = p = e.clipRect(f ?
                        a.plotSizeX + 99 : -99, f ? -a.plotLeft : -a.plotTop, 99, f ? a.chartWidth : a.chartHeight)), a[h] = l = e.clipRect(k), l.count = {length: 0});
                    b && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1);
                    if (!1 !== c.clip || b) this.group.clip(b || d ? l : a.clipRect), this.markerGroup.clip(p), this.sharedClipKey = h;
                    b || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && h && a[h] && (d || (a[h] = a[h].destroy()), a[h + "m"] && (a[h + "m"] = a[h + "m"].destroy())))
                },
                animate: function (b) {
                    var a = this.chart, c = M(this.options.animation);
                    if (!a.hasRendered) if (b) this.setClip(c); else {
                        var e = this.sharedClipKey;
                        b = a[e];
                        var f = this.getClipBox(c, !0);
                        b && b.animate(f, c);
                        a[e + "m"] && a[e + "m"].animate({width: f.width + 99, x: f.x - (a.inverted ? 0 : 99)}, c)
                    }
                },
                afterAnimate: function () {
                    this.setClip();
                    q(this, "afterAnimate");
                    this.finishedAnimating = !0
                },
                drawPoints: function () {
                    var b = this.points, a = this.chart, c, e, f = this.options.marker,
                        d = this[this.specialGroup] || this.markerGroup, k = this.xAxis,
                        h = l(f.enabled, !k || k.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold *
                            f.radius);
                    if (!1 !== f.enabled || this._hasPointMarkers) for (c = 0; c < b.length; c++) {
                        var p = b[c];
                        var n = (e = p.graphic) ? "animate" : "attr";
                        var g = p.marker || {};
                        var w = !!p.marker;
                        if ((h && "undefined" === typeof g.enabled || g.enabled) && !p.isNull && !1 !== p.visible) {
                            var v = l(g.symbol, this.symbol);
                            var q = this.markerAttribs(p, p.selected && "select");
                            this.enabledDataSorting && (p.startXPos = k.reversed ? -q.width : k.width);
                            var t = !1 !== p.isInside;
                            e ? e[t ? "show" : "hide"](t).animate(q) : t && (0 < q.width || p.hasImage) && (p.graphic = e = a.renderer.symbol(v,
                                q.x, q.y, q.width, q.height, w ? g : f).add(d), this.enabledDataSorting && a.hasRendered && (e.attr({x: p.startXPos}), n = "animate"));
                            e && "animate" === n && e[t ? "show" : "hide"](t).animate(q);
                            if (e && !a.styledMode) e[n](this.pointAttribs(p, p.selected && "select"));
                            e && e.addClass(p.getClassName(), !0)
                        } else e && (p.graphic = e.destroy())
                    }
                },
                markerAttribs: function (b, a) {
                    var c = this.options.marker, e = b.marker || {}, f = e.symbol || c.symbol,
                        d = l(e.radius, c.radius);
                    a && (c = c.states[a], a = e.states && e.states[a], d = l(a && a.radius, c && c.radius, d + (c && c.radiusPlus ||
                        0)));
                    b.hasImage = f && 0 === f.indexOf("url");
                    b.hasImage && (d = 0);
                    b = {x: Math.floor(b.plotX) - d, y: b.plotY - d};
                    d && (b.width = b.height = 2 * d);
                    return b
                },
                pointAttribs: function (b, a) {
                    var c = this.options.marker, e = b && b.options, f = e && e.marker || {}, d = this.color,
                        k = e && e.color, h = b && b.color;
                    e = l(f.lineWidth, c.lineWidth);
                    var p = b && b.zone && b.zone.color;
                    b = 1;
                    d = k || p || h || d;
                    k = f.fillColor || c.fillColor || d;
                    d = f.lineColor || c.lineColor || d;
                    a = a || "normal";
                    c = c.states[a];
                    a = f.states && f.states[a] || {};
                    e = l(a.lineWidth, c.lineWidth, e + l(a.lineWidthPlus, c.lineWidthPlus,
                        0));
                    k = a.fillColor || c.fillColor || k;
                    d = a.lineColor || c.lineColor || d;
                    b = l(a.opacity, c.opacity, b);
                    return {stroke: d, "stroke-width": e, fill: k, opacity: b}
                },
                destroy: function (b) {
                    var c = this, e = c.chart, f = /AppleWebKit\/533/.test(p.navigator.userAgent), d, k,
                        h = c.data || [], l, n;
                    q(c, "destroy");
                    this.removeEvents(b);
                    (c.axisTypes || []).forEach(function (b) {
                        (n = c[b]) && n.series && (t(n.series, c), n.isDirty = n.forceRedraw = !0)
                    });
                    c.legendItem && c.chart.legend.destroyItem(c);
                    for (k = h.length; k--;) (l = h[k]) && l.destroy && l.destroy();
                    c.points = null;
                    u.clearTimeout(c.animationTimeout);
                    a(c, function (b, a) {
                        b instanceof K && !b.survive && (d = f && "group" === a ? "hide" : "destroy", b[d]())
                    });
                    e.hoverSeries === c && (e.hoverSeries = null);
                    t(e.series, c);
                    e.orderSeries();
                    a(c, function (a, e) {
                        b && "hcEvents" === e || delete c[e]
                    })
                },
                getGraphPath: function (b, a, c) {
                    var e = this, f = e.options, d = f.step, k, h = [], l = [], p;
                    b = b || e.points;
                    (k = b.reversed) && b.reverse();
                    (d = {right: 1, center: 2}[d] || d && 3) && k && (d = 4 - d);
                    b = this.getValidPoints(b, !1, !(f.connectNulls && !a && !c));
                    b.forEach(function (k, n) {
                        var m = k.plotX,
                            g = k.plotY, w = b[n - 1];
                        (k.leftCliff || w && w.rightCliff) && !c && (p = !0);
                        k.isNull && !y(a) && 0 < n ? p = !f.connectNulls : k.isNull && !a ? p = !0 : (0 === n || p ? n = ["M", k.plotX, k.plotY] : e.getPointSpline ? n = e.getPointSpline(b, k, n) : d ? (n = 1 === d ? ["L", w.plotX, g] : 2 === d ? ["L", (w.plotX + m) / 2, w.plotY, "L", (w.plotX + m) / 2, g] : ["L", m, w.plotY], n.push("L", m, g)) : n = ["L", m, g], l.push(k.x), d && (l.push(k.x), 2 === d && l.push(k.x)), h.push.apply(h, n), p = !1)
                    });
                    h.xMap = l;
                    return e.graphPath = h
                },
                drawGraph: function () {
                    var b = this, a = this.options, c = (this.gappedPath || this.getGraphPath).call(this),
                        e = this.chart.styledMode, f = [["graph", "highcharts-graph"]];
                    e || f[0].push(a.lineColor || this.color || "#cccccc", a.dashStyle);
                    f = b.getZonesGraphs(f);
                    f.forEach(function (f, d) {
                        var k = f[0], h = b[k], l = h ? "animate" : "attr";
                        h ? (h.endX = b.preventGraphAnimation ? null : c.xMap, h.animate({d: c})) : c.length && (b[k] = h = b.chart.renderer.path(c).addClass(f[1]).attr({zIndex: 1}).add(b.group));
                        h && !e && (k = {
                            stroke: f[2],
                            "stroke-width": a.lineWidth,
                            fill: b.fillGraph && b.color || "none"
                        }, f[3] ? k.dashstyle = f[3] : "square" !== a.linecap && (k["stroke-linecap"] =
                            k["stroke-linejoin"] = "round"), h[l](k).shadow(2 > d && a.shadow));
                        h && (h.startX = c.xMap, h.isArea = c.isArea)
                    })
                },
                getZonesGraphs: function (a) {
                    this.zones.forEach(function (b, c) {
                        c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")];
                        this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                        a.push(c)
                    }, this);
                    return a
                },
                applyZones: function () {
                    var a = this, c = this.chart, e = c.renderer, f = this.zones, d, k, h = this.clips || [], p,
                        n = this.graph, g = this.area, w = Math.max(c.chartWidth,
                        c.chartHeight), v = this[(this.zoneAxis || "y") + "Axis"], q = c.inverted, t, B, z, y = !1;
                    if (f.length && (n || g) && v && "undefined" !== typeof v.min) {
                        var K = v.reversed;
                        var L = v.horiz;
                        n && !this.showLine && n.hide();
                        g && g.hide();
                        var u = v.getExtremes();
                        f.forEach(function (b, f) {
                            d = K ? L ? c.plotWidth : 0 : L ? 0 : v.toPixels(u.min) || 0;
                            d = G(l(k, d), 0, w);
                            k = G(Math.round(v.toPixels(l(b.value, u.max), !0) || 0), 0, w);
                            y && (d = k = v.toPixels(u.max));
                            t = Math.abs(d - k);
                            B = Math.min(d, k);
                            z = Math.max(d, k);
                            v.isXAxis ? (p = {x: q ? z : B, y: 0, width: t, height: w}, L || (p.x = c.plotHeight -
                                p.x)) : (p = {x: 0, y: q ? z : B, width: w, height: t}, L && (p.y = c.plotWidth - p.y));
                            q && e.isVML && (p = v.isXAxis ? {
                                x: 0,
                                y: K ? B : z,
                                height: p.width,
                                width: c.chartWidth
                            } : {x: p.y - c.plotLeft - c.spacingBox.x, y: 0, width: p.height, height: c.chartHeight});
                            h[f] ? h[f].animate(p) : h[f] = e.clipRect(p);
                            n && a["zone-graph-" + f].clip(h[f]);
                            g && a["zone-area-" + f].clip(h[f]);
                            y = b.value > u.max;
                            a.resetZones && 0 === k && (k = void 0)
                        });
                        this.clips = h
                    } else a.visible && (n && n.show(!0), g && g.show(!0))
                },
                invertGroups: function (a) {
                    function b() {
                        ["group", "markerGroup"].forEach(function (b) {
                            c[b] &&
                            (e.renderer.isVML && c[b].attr({
                                width: c.yAxis.len,
                                height: c.xAxis.len
                            }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(c.isRadialSeries ? !1 : a))
                        })
                    }

                    var c = this, e = c.chart;
                    c.xAxis && (c.eventsToUnbind.push(I(e, "resize", b)), b(), c.invertGroups = b)
                },
                plotGroup: function (a, c, e, f, d) {
                    var b = this[a], k = !b;
                    k && (this[a] = b = this.chart.renderer.g().attr({zIndex: f || .1}).add(d));
                    b.addClass("highcharts-" + c + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (y(this.colorIndex) ? "highcharts-color-" + this.colorIndex +
                        " " : "") + (this.options.className || "") + (b.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                    b.attr({visibility: e})[k ? "attr" : "animate"](this.getPlotBox());
                    return b
                },
                getPlotBox: function () {
                    var a = this.chart, c = this.xAxis, e = this.yAxis;
                    a.inverted && (c = e, e = this.xAxis);
                    return {
                        translateX: c ? c.left : a.plotLeft,
                        translateY: e ? e.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                removeEvents: function (a) {
                    a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
                        a()
                    }), this.eventsToUnbind.length = 0) : v(this)
                },
                render: function () {
                    var a =
                            this, c = a.chart, e = a.options,
                        f = !a.finishedAnimating && c.renderer.isSVG && M(e.animation).duration,
                        d = a.visible ? "inherit" : "hidden", k = e.zIndex, h = a.hasRendered, l = c.seriesGroup,
                        p = c.inverted;
                    q(this, "render");
                    var n = a.plotGroup("group", "series", d, k, l);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", d, k, l);
                    f && a.animate && a.animate(!0);
                    n.inverted = a.isCartesian || a.invertable ? p : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.visible && a.drawPoints();
                    a.drawDataLabels && a.drawDataLabels();
                    a.redrawPoints && a.redrawPoints();
                    a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(p);
                    !1 === e.clip || a.sharedClipKey || h || n.clip(c.clipRect);
                    f && a.animate && a.animate();
                    h || (a.animationTimeout = B(function () {
                        a.afterAnimate()
                    }, f || 0));
                    a.isDirty = !1;
                    a.hasRendered = !0;
                    q(a, "afterRender")
                },
                redraw: function () {
                    var a = this.chart, c = this.isDirty || this.isDirtyData, e = this.group, f = this.xAxis,
                        d = this.yAxis;
                    e && (a.inverted && e.attr({width: a.plotWidth, height: a.plotHeight}), e.animate({
                        translateX: l(f && f.left, a.plotLeft), translateY: l(d &&
                            d.top, a.plotTop)
                    }));
                    this.translate();
                    this.render();
                    c && delete this.kdTree
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function (a, c) {
                    var b = this.xAxis, e = this.yAxis, f = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: f ? b.len - a.chartY + b.pos : a.chartX - b.pos,
                        plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                    }, c, a)
                },
                buildKDTree: function (a) {
                    function b(a, e, f) {
                        var d;
                        if (d = a && a.length) {
                            var k = c.kdAxisArray[e % f];
                            a.sort(function (a, b) {
                                return a[k] - b[k]
                            });
                            d = Math.floor(d / 2);
                            return {
                                point: a[d], left: b(a.slice(0, d), e + 1, f),
                                right: b(a.slice(d + 1), e + 1, f)
                            }
                        }
                    }

                    this.buildingKdTree = !0;
                    var c = this, e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete c.kdTree;
                    B(function () {
                        c.kdTree = b(c.getValidPoints(null, !c.directTouch), e, e);
                        c.buildingKdTree = !1
                    }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                },
                searchKDTree: function (a, c, e) {
                    function b(a, c, e, l) {
                        var p = c.point, n = f.kdAxisArray[e % l], g = p;
                        var m = y(a[d]) && y(p[d]) ? Math.pow(a[d] - p[d], 2) : null;
                        var w = y(a[k]) && y(p[k]) ? Math.pow(a[k] - p[k], 2) : null;
                        w = (m || 0) + (w || 0);
                        p.dist = y(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                        p.distX = y(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                        n = a[n] - p[n];
                        w = 0 > n ? "left" : "right";
                        m = 0 > n ? "right" : "left";
                        c[w] && (w = b(a, c[w], e + 1, l), g = w[h] < g[h] ? w : p);
                        c[m] && Math.sqrt(n * n) < g[h] && (a = b(a, c[m], e + 1, l), g = a[h] < g[h] ? a : g);
                        return g
                    }

                    var f = this, d = this.kdAxisArray[0], k = this.kdAxisArray[1], h = c ? "distX" : "dist";
                    c = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree(e);
                    if (this.kdTree) return b(a, this.kdTree, c, c)
                },
                pointPlacementToXValue: function () {
                    var a = this.options, c = a.pointRange,
                        e = this.xAxis;
                    a = a.pointPlacement;
                    "between" === a && (a = e.reversed ? -.5 : .5);
                    return k(a) ? a * l(c, e.pointRange) : 0
                },
                isPointInside: function (a) {
                    return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len
                }
            });
        ""
    });
    S(r, "parts/Stacking.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.correctFloat, u = g.defined, I = g.destroyObjectProperties, M = g.format, E = g.objectEach,
            A = g.pick;
        g = d.Axis;
        var G = d.Chart, J = d.Series;
        d.StackItem =
            function (d, g, u, h, r) {
                var q = d.chart.inverted;
                this.axis = d;
                this.isNegative = u;
                this.options = g = g || {};
                this.x = h;
                this.total = null;
                this.points = {};
                this.stack = r;
                this.rightCliff = this.leftCliff = 0;
                this.alignOptions = {
                    align: g.align || (q ? u ? "left" : "right" : "center"),
                    verticalAlign: g.verticalAlign || (q ? "middle" : u ? "bottom" : "top"),
                    y: g.y,
                    x: g.x
                };
                this.textAlign = g.textAlign || (q ? u ? "right" : "left" : "center")
            };
        d.StackItem.prototype = {
            destroy: function () {
                I(this, this.axis)
            }, render: function (d) {
                var g = this.axis.chart, y = this.options, h = y.format;
                h = h ? M(h, this, g) : y.formatter.call(this);
                this.label ? this.label.attr({
                    text: h,
                    visibility: "hidden"
                }) : (this.label = g.renderer.label(h, null, null, y.shape, null, null, y.useHTML, !1, "stack-labels"), h = {
                    text: h,
                    rotation: y.rotation,
                    padding: A(y.padding, 5),
                    visibility: "hidden"
                }, this.label.attr(h), g.styledMode || this.label.css(y.style), this.label.added || this.label.add(d));
                this.label.labelrank = g.plotHeight
            }, setOffset: function (d, g, r, h, N) {
                var q = this.axis, t = q.chart;
                h = q.translate(q.usePercentage ? 100 : h ? h : this.total, 0, 0, 0, 1);
                r = q.translate(r ? r : 0);
                r = u(h) && Math.abs(h - r);
                d = A(N, t.xAxis[0].translate(this.x)) + d;
                q = u(h) && this.getStackBox(t, this, d, h, g, r, q);
                g = this.label;
                r = this.isNegative;
                d = "justify" === A(this.options.overflow, "justify");
                var e = this.textAlign;
                g && q && (N = g.getBBox(), h = g.padding, e = "left" === e ? t.inverted ? -h : h : "right" === e ? N.width : t.inverted && "center" === e ? N.width / 2 : t.inverted ? r ? N.width + h : -h : N.width / 2, r = t.inverted ? N.height / 2 : r ? -h : N.height, this.alignOptions.x = A(this.options.x, 0), this.alignOptions.y = A(this.options.y, 0), q.x -=
                    e, q.y -= r, g.align(this.alignOptions, null, q), t.isInsidePlot(g.alignAttr.x + e - this.alignOptions.x, g.alignAttr.y + r - this.alignOptions.y) ? g.show() : (g.alignAttr.y = -9999, d = !1), d && J.prototype.justifyDataLabel.call(this.axis, g, this.alignOptions, g.alignAttr, N, q), g.attr({
                    x: g.alignAttr.x,
                    y: g.alignAttr.y
                }), A(!d && this.options.crop, !0) && ((t = t.isInsidePlot(g.x - h + g.width, g.y) && t.isInsidePlot(g.x + h, g.y)) || g.hide()))
            }, getStackBox: function (d, g, r, h, u, q, A) {
                var e = g.axis.reversed, c = d.inverted;
                d = A.height + A.pos - (c ? d.plotLeft :
                    d.plotTop);
                g = g.isNegative && !e || !g.isNegative && e;
                return {
                    x: c ? g ? h : h - q : r,
                    y: c ? d - r - u : g ? d - h - q : d - h,
                    width: c ? q : u,
                    height: c ? u : q
                }
            }
        };
        G.prototype.getStacks = function () {
            var d = this, g = d.inverted;
            d.yAxis.forEach(function (d) {
                d.stacks && d.hasVisibleSeries && (d.oldStacks = d.stacks)
            });
            d.series.forEach(function (t) {
                var h = t.xAxis && t.xAxis.options || {};
                !t.options.stacking || !0 !== t.visible && !1 !== d.options.chart.ignoreHiddenSeries || (t.stackKey = [t.type, A(t.options.stack, ""), g ? h.top : h.left, g ? h.height : h.width].join())
            })
        };
        g.prototype.buildStacks =
            function () {
                var g = this.series, t = A(this.options.reversedStacks, !0), r = g.length, h;
                if (!this.isXAxis) {
                    this.usePercentage = !1;
                    for (h = r; h--;) {
                        var u = g[t ? h : r - h - 1];
                        u.setStackedPoints()
                    }
                    for (h = 0; h < r; h++) g[h].modifyStacks();
                    d.fireEvent(this, "afterBuildStacks")
                }
            };
        g.prototype.renderStackTotals = function () {
            var d = this.chart, g = d.renderer, r = this.stacks, h = this.stackTotalGroup;
            h || (this.stackTotalGroup = h = g.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            h.translate(d.plotLeft, d.plotTop);
            E(r, function (d) {
                E(d,
                    function (d) {
                        d.render(h)
                    })
            })
        };
        g.prototype.resetStacks = function () {
            var d = this, g = d.stacks;
            d.isXAxis || E(g, function (g) {
                E(g, function (h, t) {
                    h.touched < d.stacksTouched ? (h.destroy(), delete g[t]) : (h.total = null, h.cumulative = null)
                })
            })
        };
        g.prototype.cleanStacks = function () {
            if (!this.isXAxis) {
                if (this.oldStacks) var d = this.stacks = this.oldStacks;
                E(d, function (d) {
                    E(d, function (d) {
                        d.cumulative = d.total
                    })
                })
            }
        };
        J.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var g =
                        this.processedXData, t = this.processedYData, D = [], h = t.length, N = this.options,
                    q = N.threshold, G = A(N.startFromThreshold && q, 0), e = N.stack;
                N = N.stacking;
                var c = this.stackKey, k = "-" + c, n = this.negStacks, f = this.yAxis, a = f.stacks, l = f.oldStacks,
                    v, z;
                f.stacksTouched += 1;
                for (z = 0; z < h; z++) {
                    var w = g[z];
                    var B = t[z];
                    var L = this.getStackIndicator(L, w, this.index);
                    var Q = L.key;
                    var H = (v = n && B < (G ? 0 : q)) ? k : c;
                    a[H] || (a[H] = {});
                    a[H][w] || (l[H] && l[H][w] ? (a[H][w] = l[H][w], a[H][w].total = null) : a[H][w] = new d.StackItem(f, f.options.stackLabels, v, w, e));
                    H = a[H][w];
                    null !== B ? (H.points[Q] = H.points[this.index] = [A(H.cumulative, G)], u(H.cumulative) || (H.base = Q), H.touched = f.stacksTouched, 0 < L.index && !1 === this.singleStacks && (H.points[Q][0] = H.points[this.index + "," + w + ",0"][0])) : H.points[Q] = H.points[this.index] = null;
                    "percent" === N ? (v = v ? c : k, n && a[v] && a[v][w] ? (v = a[v][w], H.total = v.total = Math.max(v.total, H.total) + Math.abs(B) || 0) : H.total = r(H.total + (Math.abs(B) || 0))) : H.total = r(H.total + (B || 0));
                    H.cumulative = A(H.cumulative, G) + (B || 0);
                    null !== B && (H.points[Q].push(H.cumulative),
                        D[z] = H.cumulative)
                }
                "percent" === N && (f.usePercentage = !0);
                this.stackedYData = D;
                f.oldStacks = {}
            }
        };
        J.prototype.modifyStacks = function () {
            var d = this, g = d.stackKey, r = d.yAxis.stacks, h = d.processedXData, u, q = d.options.stacking;
            d[q + "Stacker"] && [g, "-" + g].forEach(function (g) {
                for (var e = h.length, c, k; e--;) if (c = h[e], u = d.getStackIndicator(u, c, d.index, g), k = (c = r[g] && r[g][c]) && c.points[u.key]) d[q + "Stacker"](k, c, e)
            })
        };
        J.prototype.percentStacker = function (d, g, u) {
            g = g.total ? 100 / g.total : 0;
            d[0] = r(d[0] * g);
            d[1] = r(d[1] * g);
            this.stackedYData[u] =
                d[1]
        };
        J.prototype.getStackIndicator = function (d, g, r, h) {
            !u(d) || d.x !== g || h && d.key !== h ? d = {x: g, index: 0, key: h} : d.index++;
            d.key = [r, g, d.index].join();
            return d
        }
    });
    S(r, "parts/Dynamics.js", [r["parts/Globals.js"], r["parts/Point.js"], r["parts/Time.js"], r["parts/Utilities.js"]], function (d, g, r, u) {
        var I = u.addEvent, M = u.animate, E = u.createElement, A = u.css, G = u.defined, J = u.erase, y = u.error,
            t = u.extend, D = u.fireEvent, h = u.isArray, N = u.isNumber, q = u.isObject, P = u.isString, e = u.merge,
            c = u.objectEach, k = u.pick, n = u.relativeLength, f =
                u.setAnimation, a = u.splat, l = d.Axis;
        u = d.Chart;
        var v = d.Series, z = d.seriesTypes;
        d.cleanRecursively = function (a, e) {
            var f = {};
            c(a, function (c, k) {
                if (q(a[k], !0) && !a.nodeType && e[k]) c = d.cleanRecursively(a[k], e[k]), Object.keys(c).length && (f[k] = c); else if (q(a[k]) || a[k] !== e[k]) f[k] = a[k]
            });
            return f
        };
        t(u.prototype, {
            addSeries: function (a, c, e) {
                var f, d = this;
                a && (c = k(c, !0), D(d, "addSeries", {options: a}, function () {
                    f = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    f.enabledDataSorting && f.setData(a.data, !1);
                    D(d, "afterAddSeries",
                        {series: f});
                    c && d.redraw(e)
                }));
                return f
            },
            addAxis: function (a, c, e, f) {
                return this.createAxis(c ? "xAxis" : "yAxis", {axis: a, redraw: e, animation: f})
            },
            addColorAxis: function (a, c, e) {
                return this.createAxis("colorAxis", {axis: a, redraw: c, animation: e})
            },
            createAxis: function (c, f) {
                var h = this.options, g = "colorAxis" === c, n = f.redraw, w = f.animation;
                f = e(f.axis, {index: this[c].length, isX: "xAxis" === c});
                var p = g ? new d.ColorAxis(this, f) : new l(this, f);
                h[c] = a(h[c] || {});
                h[c].push(f);
                g && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
                    a.series =
                        []
                }), this.series.forEach(function (a) {
                    a.bindAxes();
                    a.isDirtyData = !0
                }));
                k(n, !0) && this.redraw(w);
                return p
            },
            showLoading: function (a) {
                var c = this, e = c.options, f = c.loadingDiv, d = e.loading, h = function () {
                    f && A(f, {
                        left: c.plotLeft + "px",
                        top: c.plotTop + "px",
                        width: c.plotWidth + "px",
                        height: c.plotHeight + "px"
                    })
                };
                f || (c.loadingDiv = f = E("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, c.container), c.loadingSpan = E("span", {className: "highcharts-loading-inner"}, null, f), I(c, "redraw", h));
                f.className = "highcharts-loading";
                c.loadingSpan.innerHTML = k(a, e.lang.loading, "");
                c.styledMode || (A(f, t(d.style, {zIndex: 10})), A(c.loadingSpan, d.labelStyle), c.loadingShown || (A(f, {
                    opacity: 0,
                    display: ""
                }), M(f, {opacity: d.style.opacity || .5}, {duration: d.showDuration || 0})));
                c.loadingShown = !0;
                h()
            },
            hideLoading: function () {
                var a = this.options, c = this.loadingDiv;
                c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || M(c, {opacity: 0}, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        A(c, {display: "none"})
                    }
                }));
                this.loadingShown =
                    !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis",
                "series"],
            update: function (f, h, l, g) {
                var v = this,
                    w = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption"}, p,
                    b, q, t = f.isResponsiveOptions, z = [];
                D(v, "update", {options: f});
                t || v.setResponsive(!1, !0);
                f = d.cleanRecursively(f, v.options);
                e(!0, v.userOptions, f);
                if (p = f.chart) {
                    e(!0, v.options.chart, p);
                    "className" in p && v.setClassName(p.className);
                    "reflow" in p && v.setReflow(p.reflow);
                    if ("inverted" in p || "polar" in p || "type" in p) {
                        v.propFromSeries();
                        var B = !0
                    }
                    "alignTicks" in p && (B = !0);
                    c(p, function (a,
                                   c) {
                        -1 !== v.propsRequireUpdateSeries.indexOf("chart." + c) && (b = !0);
                        -1 !== v.propsRequireDirtyBox.indexOf(c) && (v.isDirtyBox = !0);
                        t || -1 === v.propsRequireReflow.indexOf(c) || (q = !0)
                    });
                    !v.styledMode && "style" in p && v.renderer.setStyle(p.style)
                }
                !v.styledMode && f.colors && (this.options.colors = f.colors);
                f.plotOptions && e(!0, this.options.plotOptions, f.plotOptions);
                f.time && this.time === d.time && (this.time = new r(f.time));
                c(f, function (a, c) {
                    if (v[c] && "function" === typeof v[c].update) v[c].update(a, !1); else if ("function" === typeof v[w[c]]) v[w[c]](a);
                    "chart" !== c && -1 !== v.propsRequireUpdateSeries.indexOf(c) && (b = !0)
                });
                this.collectionsWithUpdate.forEach(function (b) {
                    if (f[b]) {
                        if ("series" === b) {
                            var c = [];
                            v[b].forEach(function (a, b) {
                                a.options.isInternal || c.push(k(a.options.index, b))
                            })
                        }
                        a(f[b]).forEach(function (a, e) {
                            (e = G(a.id) && v.get(a.id) || v[b][c ? c[e] : e]) && e.coll === b && (e.update(a, !1), l && (e.touched = !0));
                            !e && l && v.collectionsWithInit[b] && (v.collectionsWithInit[b][0].apply(v, [a].concat(v.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                        });
                        l && v[b].forEach(function (a) {
                            a.touched ||
                            a.options.isInternal ? delete a.touched : z.push(a)
                        })
                    }
                });
                z.forEach(function (a) {
                    a.remove && a.remove(!1)
                });
                B && v.axes.forEach(function (a) {
                    a.update({}, !1)
                });
                b && v.getSeriesOrderByLinks().forEach(function (a) {
                    a.chart && a.update({}, !1)
                }, this);
                f.loading && e(!0, v.options.loading, f.loading);
                B = p && p.width;
                p = p && p.height;
                P(p) && (p = n(p, B || v.chartWidth));
                q || N(B) && B !== v.chartWidth || N(p) && p !== v.chartHeight ? v.setSize(B, p, g) : k(h, !0) && v.redraw(g);
                D(v, "afterUpdate", {options: f, redraw: h, animation: g})
            },
            setSubtitle: function (a, c) {
                this.applyDescription("subtitle",
                    a);
                this.layOutTitles(c)
            },
            setCaption: function (a, c) {
                this.applyDescription("caption", a);
                this.layOutTitles(c)
            }
        });
        u.prototype.collectionsWithInit = {
            xAxis: [u.prototype.addAxis, [!0]],
            yAxis: [u.prototype.addAxis, [!1]],
            series: [u.prototype.addSeries]
        };
        t(g.prototype, {
            update: function (a, c, e, f) {
                function d() {
                    h.applyOptions(a);
                    var f = b && h.hasDummyGraphic;
                    f = null === h.y ? !f : f;
                    b && f && (h.graphic = b.destroy(), delete h.hasDummyGraphic);
                    q(a, !0) && (b && b.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (h.graphic = b.destroy()),
                    a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                    g = h.index;
                    l.updateParallelArrays(h, g);
                    v.data[g] = q(v.data[g], !0) || q(a, !0) ? h.options : k(a, v.data[g]);
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === v.legendType && (n.isDirtyLegend = !0);
                    c && n.redraw(e)
                }

                var h = this, l = h.series, b = h.graphic, g, n = l.chart, v = l.options;
                c = k(c, !0);
                !1 === f ? d() : h.firePointEvent("update", {options: a}, d)
            }, remove: function (a, c) {
                this.series.removePoint(this.series.data.indexOf(this),
                    a, c)
            }
        });
        t(v.prototype, {
            addPoint: function (a, c, e, f, d) {
                var h = this.options, l = this.data, b = this.chart, g = this.xAxis;
                g = g && g.hasNames && g.names;
                var n = h.data, v = this.xData, q;
                c = k(c, !0);
                var w = {series: this};
                this.pointClass.prototype.applyOptions.apply(w, [a]);
                var t = w.x;
                var m = v.length;
                if (this.requireSorting && t < v[m - 1]) for (q = !0; m && v[m - 1] > t;) m--;
                this.updateParallelArrays(w, "splice", m, 0, 0);
                this.updateParallelArrays(w, m);
                g && w.name && (g[t] = w.name);
                n.splice(m, 0, a);
                q && (this.data.splice(m, 0, null), this.processData());
                "point" ===
                h.legendType && this.generatePoints();
                e && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(w, "shift"), n.shift()));
                !1 !== d && D(this, "addPoint", {point: w});
                this.isDirtyData = this.isDirty = !0;
                c && b.redraw(f)
            }, removePoint: function (a, c, e) {
                var d = this, h = d.data, l = h[a], g = d.points, b = d.chart, n = function () {
                    g && g.length === h.length && g.splice(a, 1);
                    h.splice(a, 1);
                    d.options.data.splice(a, 1);
                    d.updateParallelArrays(l || {series: d}, "splice", a, 1);
                    l && l.destroy();
                    d.isDirty = !0;
                    d.isDirtyData = !0;
                    c && b.redraw()
                };
                f(e,
                    b);
                c = k(c, !0);
                l ? l.firePointEvent("remove", null, n) : n()
            }, remove: function (a, c, e, f) {
                function d() {
                    h.destroy(f);
                    h.remove = null;
                    l.isDirtyLegend = l.isDirtyBox = !0;
                    l.linkSeries();
                    k(a, !0) && l.redraw(c)
                }

                var h = this, l = h.chart;
                !1 !== e ? D(h, "remove", null, d) : d()
            }, update: function (a, c) {
                a = d.cleanRecursively(a, this.userOptions);
                D(this, "update", {options: a});
                var f = this, h = f.chart, l = f.userOptions, g = f.initialType || f.type,
                    n = a.type || l.type || h.options.chart.type,
                    b = !(this.hasDerivedData || a.dataGrouping || n && n !== this.type || "undefined" !==
                        typeof a.pointStart || a.pointInterval || a.pointIntervalUnit || a.keys), v = z[g].prototype, q,
                    w = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"],
                    r = ["eventOptions", "navigatorSeries", "baseSeries"], B = f.finishedAnimating && {animation: !1},
                    u = {};
                b && (r.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && r.push("area", "graph"), f.parallelArrays.forEach(function (a) {
                    r.push(a + "Data")
                }),
                a.data && (a.dataSorting && t(f.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                a = e(l, B, {
                    index: "undefined" === typeof l.index ? f.index : l.index,
                    pointStart: k(l.pointStart, f.xData[0])
                }, !b && {data: f.options.data}, a);
                b && a.data && (a.data = f.options.data);
                r = w.concat(r);
                r.forEach(function (a) {
                    r[a] = f[a];
                    delete f[a]
                });
                f.remove(!1, null, !1, !0);
                for (q in v) f[q] = void 0;
                z[n || g] ? t(f, z[n || g].prototype) : y(17, !0, h, {missingModuleFor: n || g});
                r.forEach(function (a) {
                    f[a] = r[a]
                });
                f.init(h, a);
                if (b && this.points) {
                    var m = f.options;
                    !1 === m.visible ? (u.graphic = 1, u.dataLabel = 1) : f._hasPointLabels || (n = m.marker, v = m.dataLabels, n && (!1 === n.enabled || "symbol" in n) && (u.graphic = 1), v && !1 === v.enabled && (u.dataLabel = 1));
                    this.points.forEach(function (a) {
                        a && a.series && (a.resolveColor(), Object.keys(u).length && a.destroyElements(u), !1 === m.showInLegend && a.legendItem && h.legend.destroyItem(a))
                    }, this)
                }
                a.zIndex !== l.zIndex && w.forEach(function (b) {
                    f[b] && f[b].attr({zIndex: a.zIndex})
                });
                f.initialType = g;
                h.linkSeries();
                D(this, "afterUpdate");
                k(c, !0) && h.redraw(b ?
                    void 0 : !1)
            }, setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        t(l.prototype, {
            update: function (a, f) {
                var d = this.chart, h = a && a.events || {};
                a = e(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
                c(d.options[this.coll].events, function (a, c) {
                    "undefined" === typeof h[c] && (h[c] = void 0)
                });
                this.destroy(!0);
                this.init(d, t(a, {events: h}));
                d.isDirtyBox = !0;
                k(f, !0) && d.redraw()
            }, remove: function (a) {
                for (var c =
                    this.chart, e = this.coll, f = this.series, d = f.length; d--;) f[d] && f[d].remove(!1);
                J(c.axes, this);
                J(c[e], this);
                h(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];
                c[e].forEach(function (a, c) {
                    a.options.index = a.userOptions.index = c
                });
                this.destroy();
                c.isDirtyBox = !0;
                k(a, !0) && c.redraw()
            }, setTitle: function (a, c) {
                this.update({title: a}, c)
            }, setCategories: function (a, c) {
                this.update({categories: a}, c)
            }
        })
    });
    S(r, "parts/AreaSeries.js", [r["parts/Globals.js"], r["parts/Color.js"], r["mixins/legend-symbol.js"],
        r["parts/Utilities.js"]], function (d, g, r, u) {
        var I = g.parse, M = u.objectEach, E = u.pick;
        g = u.seriesType;
        var A = d.Series;
        g("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function (d) {
                var g = [], r = [], t = this.xAxis, u = this.yAxis, h = u.stacks[this.stackKey], A = {}, q = this.index,
                    G = u.series, e = G.length, c = E(u.options.reversedStacks, !0) ? 1 : -1, k;
                d = d || this.points;
                if (this.options.stacking) {
                    for (k = 0; k < d.length; k++) d[k].leftNull = d[k].rightNull = void 0, A[d[k].x] = d[k];
                    M(h, function (c, a) {
                        null !== c.total && r.push(a)
                    });
                    r.sort(function (c, a) {
                        return c - a
                    });
                    var n = G.map(function (c) {
                        return c.visible
                    });
                    r.forEach(function (f, a) {
                        var d = 0, v, z;
                        if (A[f] && !A[f].isNull) g.push(A[f]), [-1, 1].forEach(function (d) {
                            var l = 1 === d ? "rightNull" : "leftNull", g = 0, w = h[r[a + d]];
                            if (w) for (k = q; 0 <= k && k < e;) v = w.points[k], v || (k === q ? A[f][l] = !0 : n[k] && (z = h[f].points[k]) && (g -= z[1] - z[0])), k += c;
                            A[f][1 === d ? "rightCliff" : "leftCliff"] = g
                        }); else {
                            for (k = q; 0 <= k && k < e;) {
                                if (v = h[f].points[k]) {
                                    d = v[1];
                                    break
                                }
                                k += c
                            }
                            d = u.translate(d, 0, 1, 0, 1);
                            g.push({
                                isNull: !0, plotX: t.translate(f, 0,
                                    0, 0, 1), x: f, plotY: d, yBottom: d
                            })
                        }
                    })
                }
                return g
            }, getGraphPath: function (d) {
                var g = A.prototype.getGraphPath, r = this.options, t = r.stacking, u = this.yAxis, h, N = [], q = [],
                    G = this.index, e = u.stacks[this.stackKey], c = r.threshold,
                    k = Math.round(u.getThreshold(r.threshold));
                r = E(r.connectNulls, "percent" === t);
                var n = function (f, h, l) {
                    var g = d[f];
                    f = t && e[g.x].points[G];
                    var n = g[l + "Null"] || 0;
                    l = g[l + "Cliff"] || 0;
                    g = !0;
                    if (l || n) {
                        var v = (n ? f[0] : f[1]) + l;
                        var w = f[0] + l;
                        g = !!n
                    } else !t && d[h] && d[h].isNull && (v = w = c);
                    "undefined" !== typeof v && (q.push({
                        plotX: a,
                        plotY: null === v ? k : u.getThreshold(v), isNull: g, isCliff: !0
                    }), N.push({plotX: a, plotY: null === w ? k : u.getThreshold(w), doCurve: !1}))
                };
                d = d || this.points;
                t && (d = this.getStackPoints(d));
                for (h = 0; h < d.length; h++) {
                    t || (d[h].leftCliff = d[h].rightCliff = d[h].leftNull = d[h].rightNull = void 0);
                    var f = d[h].isNull;
                    var a = E(d[h].rectPlotX, d[h].plotX);
                    var l = E(d[h].yBottom, k);
                    if (!f || r) r || n(h, h - 1, "left"), f && !t && r || (q.push(d[h]), N.push({
                        x: h,
                        plotX: a,
                        plotY: l
                    })), r || n(h, h + 1, "right")
                }
                h = g.call(this, q, !0, !0);
                N.reversed = !0;
                f = g.call(this, N, !0,
                    !0);
                f.length && (f[0] = "L");
                f = h.concat(f);
                g = g.call(this, q, !1, r);
                f.xMap = h.xMap;
                this.areaPath = f;
                return g
            }, drawGraph: function () {
                this.areaPath = [];
                A.prototype.drawGraph.apply(this);
                var d = this, g = this.areaPath, r = this.options,
                    t = [["area", "highcharts-area", this.color, r.fillColor]];
                this.zones.forEach(function (g, h) {
                    t.push(["zone-area-" + h, "highcharts-area highcharts-zone-area-" + h + " " + g.className, g.color || d.color, g.fillColor || r.fillColor])
                });
                t.forEach(function (t) {
                    var h = t[0], u = d[h], q = u ? "animate" : "attr", y = {};
                    u ? (u.endX =
                        d.preventGraphAnimation ? null : g.xMap, u.animate({d: g})) : (y.zIndex = 0, u = d[h] = d.chart.renderer.path(g).addClass(t[1]).add(d.group), u.isArea = !0);
                    d.chart.styledMode || (y.fill = E(t[3], I(t[2]).setOpacity(E(r.fillOpacity, .75)).get()));
                    u[q](y);
                    u.startX = g.xMap;
                    u.shiftUnit = r.step ? 2 : 1
                })
            }, drawLegendSymbol: r.drawRectangle
        });
        ""
    });
    S(r, "parts/SplineSeries.js", [r["parts/Utilities.js"]], function (d) {
        var g = d.pick;
        d = d.seriesType;
        d("spline", "line", {}, {
            getPointSpline: function (d, r, I) {
                var u = r.plotX, E = r.plotY, A = d[I - 1];
                I = d[I + 1];
                if (A && !A.isNull && !1 !== A.doCurve && !r.isCliff && I && !I.isNull && !1 !== I.doCurve && !r.isCliff) {
                    d = A.plotY;
                    var G = I.plotX;
                    I = I.plotY;
                    var J = 0;
                    var y = (1.5 * u + A.plotX) / 2.5;
                    var t = (1.5 * E + d) / 2.5;
                    G = (1.5 * u + G) / 2.5;
                    var D = (1.5 * E + I) / 2.5;
                    G !== y && (J = (D - t) * (G - u) / (G - y) + E - D);
                    t += J;
                    D += J;
                    t > d && t > E ? (t = Math.max(d, E), D = 2 * E - t) : t < d && t < E && (t = Math.min(d, E), D = 2 * E - t);
                    D > I && D > E ? (D = Math.max(I, E), t = 2 * E - D) : D < I && D < E && (D = Math.min(I, E), t = 2 * E - D);
                    r.rightContX = G;
                    r.rightContY = D
                }
                r = ["C", g(A.rightContX, A.plotX), g(A.rightContY, A.plotY), g(y, u), g(t, E), u, E];
                A.rightContX =
                    A.rightContY = null;
                return r
            }
        });
        ""
    });
    S(r, "parts/AreaSplineSeries.js", [r["parts/Globals.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]], function (d, g, r) {
        r = r.seriesType;
        var u = d.seriesTypes.area.prototype;
        r("areaspline", "spline", d.defaultPlotOptions.area, {
            getStackPoints: u.getStackPoints,
            getGraphPath: u.getGraphPath,
            drawGraph: u.drawGraph,
            drawLegendSymbol: g.drawRectangle
        });
        ""
    });
    S(r, "parts/ColumnSeries.js", [r["parts/Globals.js"], r["parts/Color.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]],
        function (d, g, r, u) {
            "";
            var I = g.parse, M = u.animObject, E = u.clamp, A = u.defined, G = u.extend, J = u.isNumber, y = u.merge,
                t = u.pick;
            g = u.seriesType;
            var D = d.Series;
            g("column", "line", {
                borderRadius: 0,
                crisp: !0,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {hover: {halo: !1, brightness: .1}, select: {color: "#cccccc", borderColor: "#000000"}},
                dataLabels: {align: null, verticalAlign: null, y: null},
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {distance: 6},
                threshold: 0,
                borderColor: "#ffffff"
            }, {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function () {
                    D.prototype.init.apply(this, arguments);
                    var d = this, g = d.chart;
                    g.hasRendered && g.series.forEach(function (h) {
                        h.type === d.type && (h.isDirty = !0)
                    })
                },
                getColumnMetrics: function () {
                    var d = this, g = d.options, q = d.xAxis, r = d.yAxis, e = q.options.reversedStacks;
                    e = q.reversed && !e || !q.reversed && e;
                    var c, k = {}, n = 0;
                    !1 === g.grouping ? n = 1 : d.chart.series.forEach(function (a) {
                        var e = a.yAxis, f = a.options;
                        if (a.type ===
                            d.type && (a.visible || !d.chart.options.chart.ignoreHiddenSeries) && r.len === e.len && r.pos === e.pos) {
                            if (f.stacking) {
                                c = a.stackKey;
                                "undefined" === typeof k[c] && (k[c] = n++);
                                var h = k[c]
                            } else !1 !== f.grouping && (h = n++);
                            a.columnIndex = h
                        }
                    });
                    var f = Math.min(Math.abs(q.transA) * (q.ordinalSlope || g.pointRange || q.closestPointRange || q.tickInterval || 1), q.len),
                        a = f * g.groupPadding, l = (f - 2 * a) / (n || 1);
                    g = Math.min(g.maxPointWidth || q.len, t(g.pointWidth, l * (1 - 2 * g.pointPadding)));
                    d.columnMetrics = {
                        width: g, offset: (l - g) / 2 + (a + ((d.columnIndex ||
                            0) + (e ? 1 : 0)) * l - f / 2) * (e ? -1 : 1)
                    };
                    return d.columnMetrics
                },
                crispCol: function (d, g, q, t) {
                    var e = this.chart, c = this.borderWidth, k = -(c % 2 ? .5 : 0);
                    c = c % 2 ? .5 : 1;
                    e.inverted && e.renderer.isVML && (c += 1);
                    this.options.crisp && (q = Math.round(d + q) + k, d = Math.round(d) + k, q -= d);
                    t = Math.round(g + t) + c;
                    k = .5 >= Math.abs(g) && .5 < t;
                    g = Math.round(g) + c;
                    t -= g;
                    k && t && (--g, t += 1);
                    return {x: d, y: g, width: q, height: t}
                },
                translate: function () {
                    var d = this, g = d.chart, q = d.options, r = d.dense = 2 > d.closestPointRange * d.xAxis.transA;
                    r = d.borderWidth = t(q.borderWidth, r ? 0 : 1);
                    var e = d.xAxis, c = d.yAxis, k = q.threshold, n = d.translatedThreshold = c.getThreshold(k),
                        f = t(q.minPointLength, 5), a = d.getColumnMetrics(), l = a.width,
                        v = d.barW = Math.max(l, 1 + 2 * r), z = d.pointXOffset = a.offset, w = d.dataMin,
                        u = d.dataMax;
                    g.inverted && (n -= .5);
                    q.pointPadding && (v = Math.ceil(v));
                    D.prototype.translate.apply(d);
                    d.points.forEach(function (a) {
                        var h = t(a.yBottom, n), q = 999 + Math.abs(h), r = l, p = a.plotX;
                        q = E(a.plotY, -q, c.len + q);
                        var b = a.plotX + z, B = v, x = Math.min(q, h), y = Math.max(q, h) - x;
                        if (f && Math.abs(y) < f) {
                            y = f;
                            var L = !c.reversed &&
                                !a.negative || c.reversed && a.negative;
                            a.y === k && d.dataMax <= k && c.min < k && w !== u && (L = !L);
                            x = Math.abs(x - n) > f ? h - f : n - (L ? f : 0)
                        }
                        A(a.options.pointWidth) && (r = B = Math.ceil(a.options.pointWidth), b -= Math.round((r - l) / 2));
                        a.barX = b;
                        a.pointWidth = r;
                        a.tooltipPos = g.inverted ? [c.len + c.pos - g.plotLeft - q, e.len + e.pos - g.plotTop - (p || 0) - z - B / 2, y] : [b + B / 2, q + c.pos - g.plotTop, y];
                        a.shapeType = d.pointClass.prototype.shapeType || "rect";
                        a.shapeArgs = d.crispCol.apply(d, a.isNull ? [b, n, B, 0] : [b, x, B, y])
                    })
                },
                getSymbol: d.noop,
                drawLegendSymbol: r.drawRectangle,
                drawGraph: function () {
                    this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
                },
                pointAttribs: function (d, g) {
                    var h = this.options, r = this.pointAttrToOptions || {};
                    var e = r.stroke || "borderColor";
                    var c = r["stroke-width"] || "borderWidth", k = d && d.color || this.color,
                        n = d && d[e] || h[e] || this.color || k, f = d && d[c] || h[c] || this[c] || 0;
                    r = d && d.options.dashStyle || h.dashStyle;
                    var a = t(d && d.opacity, h.opacity, 1);
                    if (d && this.zones.length) {
                        var l = d.getZone();
                        k = d.options.color || l && (l.color || d.nonZonedColor) || this.color;
                        l &&
                        (n = l.borderColor || n, r = l.dashStyle || r, f = l.borderWidth || f)
                    }
                    g && d && (d = y(h.states[g], d.options.states && d.options.states[g] || {}), g = d.brightness, k = d.color || "undefined" !== typeof g && I(k).brighten(d.brightness).get() || k, n = d[e] || n, f = d[c] || f, r = d.dashStyle || r, a = t(d.opacity, a));
                    e = {fill: k, stroke: n, "stroke-width": f, opacity: a};
                    r && (e.dashstyle = r);
                    return e
                },
                drawPoints: function () {
                    var d = this, g = this.chart, q = d.options, t = g.renderer, e = q.animationLimit || 250, c;
                    d.points.forEach(function (k) {
                        var h = k.graphic, f = !!h, a = h && g.pointCount <
                        e ? "animate" : "attr";
                        if (J(k.plotY) && null !== k.y) {
                            c = k.shapeArgs;
                            h && k.hasNewShapeType() && (h = h.destroy());
                            d.enabledDataSorting && (k.startXPos = d.xAxis.reversed ? -(c ? c.width : 0) : d.xAxis.width);
                            h || (k.graphic = h = t[k.shapeType](c).add(k.group || d.group)) && d.enabledDataSorting && g.hasRendered && g.pointCount < e && (h.attr({x: k.startXPos}), f = !0, a = "animate");
                            if (h && f) h[a](y(c));
                            if (q.borderRadius) h[a]({r: q.borderRadius});
                            g.styledMode || h[a](d.pointAttribs(k, k.selected && "select")).shadow(!1 !== k.allowShadow && q.shadow, null, q.stacking &&
                                !q.borderRadius);
                            h.addClass(k.getClassName(), !0)
                        } else h && (k.graphic = h.destroy())
                    })
                },
                animate: function (d) {
                    var h = this, g = this.yAxis, t = h.options, e = this.chart.inverted, c = {},
                        k = e ? "translateX" : "translateY";
                    if (d) c.scaleY = .001, d = E(g.toPixels(t.threshold), g.pos, g.pos + g.len), e ? c.translateX = d - g.len : c.translateY = d, h.clipBox && h.setClip(), h.group.attr(c); else {
                        var n = h.group.attr(k);
                        h.group.animate({scaleY: 1}, G(M(h.options.animation), {
                            step: function (e, a) {
                                h.group && (c[k] = n + a.pos * (g.pos - n), h.group.attr(c))
                            }
                        }))
                    }
                },
                remove: function () {
                    var d =
                        this, g = d.chart;
                    g.hasRendered && g.series.forEach(function (h) {
                        h.type === d.type && (h.isDirty = !0)
                    });
                    D.prototype.remove.apply(d, arguments)
                }
            });
            ""
        });
    S(r, "parts/BarSeries.js", [r["parts/Utilities.js"]], function (d) {
        d = d.seriesType;
        d("bar", "column", null, {inverted: !0});
        ""
    });
    S(r, "parts/ScatterSeries.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent;
        g = g.seriesType;
        var u = d.Series;
        g("scatter", "line", {
            lineWidth: 0, findNearestPointBy: "xy", jitter: {x: 0, y: 0}, marker: {enabled: !0}, tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && u.prototype.drawGraph.call(this)
            },
            applyJitter: function () {
                var d = this, g = this.options.jitter, r = this.points.length;
                g && this.points.forEach(function (u, E) {
                    ["x", "y"].forEach(function (A, y) {
                        var t = "plot" + A.toUpperCase();
                        if (g[A] && !u.isNull) {
                            var D = d[A + "Axis"];
                            var h = g[A] * D.transA;
                            if (D && !D.isLog) {
                                var G = Math.max(0, u[t] - h);
                                D = Math.min(D.len, u[t] + h);
                                y = 1E4 * Math.sin(E + y * r);
                                u[t] = G + (D - G) * (y - Math.floor(y));
                                "x" === A && (u.clientX = u.plotX)
                            }
                        }
                    })
                })
            }
        });
        r(u, "afterTranslate", function () {
            this.applyJitter && this.applyJitter()
        });
        ""
    });
    S(r, "mixins/centered-series.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.isNumber, u = g.pick, I = g.relativeLength, M = d.deg2rad;
        d.CenteredSeriesMixin = {
            getCenter: function () {
                var d = this.options, g = this.chart, r = 2 * (d.slicedOffset || 0), J = g.plotWidth - 2 * r,
                    y = g.plotHeight - 2 * r, t = d.center, D = Math.min(J, y), h = d.size, N = d.innerSize || 0;
                "string" === typeof h && (h = parseFloat(h));
                "string" === typeof N && (N = parseFloat(N));
                d = [u(t[0], "50%"), u(t[1], "50%"), u(h && 0 > h ? void 0 : d.size, "100%"), u(N && 0 > N ? void 0 : d.innerSize || 0, "0%")];
                g.angular && (d[3] = 0);
                for (t = 0; 4 > t; ++t) h = d[t], g = 2 > t || 2 === t && /%$/.test(h), d[t] = I(h, [J, y, D, d[2]][t]) + (g ? r : 0);
                d[3] > d[2] && (d[3] = d[2]);
                return d
            }, getStartAndEndRadians: function (d, g) {
                d = r(d) ? d : 0;
                g = r(g) && g > d && 360 > g - d ? g : d + 360;
                return {start: M * (d + -90), end: M * (g + -90)}
            }
        }
    });
    S(r, "parts/PieSeries.js", [r["parts/Globals.js"], r["mixins/legend-symbol.js"], r["parts/Point.js"], r["parts/Utilities.js"]], function (d, g, r, u) {
        var I = u.addEvent, M = u.clamp, E = u.defined, A = u.fireEvent, G = u.isNumber, J = u.merge, y = u.pick,
            t = u.relativeLength, D = u.seriesType, h = u.setAnimation;
        u = d.CenteredSeriesMixin;
        var N = u.getStartAndEndRadians, q = d.noop, P = d.Series;
        D("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0, connectorPadding: 5, connectorShape: "fixedOffset", crookDistance: "70%",
                distance: 30, enabled: !0, formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                }, softConnector: !0, x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0},
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {hover: {brightness: .1}}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: d.seriesTypes.column.prototype.pointAttribs,
            animate: function (e) {
                var c = this, d = c.points, g = c.startAngleRad;
                e || d.forEach(function (e) {
                    var a = e.graphic, f = e.shapeArgs;
                    a && f && (a.attr({
                        r: y(e.startR, c.center && c.center[3] / 2),
                        start: g,
                        end: g
                    }), a.animate({r: f.r, start: f.start, end: f.end}, c.options.animation))
                })
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            updateTotals: function () {
                var e, c = 0, d = this.points, g = d.length, f = this.options.ignoreHiddenPoint;
                for (e = 0; e < g; e++) {
                    var a = d[e];
                    c += f && !a.visible ? 0 :
                        a.isNull ? 0 : a.y
                }
                this.total = c;
                for (e = 0; e < g; e++) a = d[e], a.percentage = 0 < c && (a.visible || !f) ? a.y / c * 100 : 0, a.total = c
            },
            generatePoints: function () {
                P.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function (e, c, d) {
                var k = this.center, f = this.radii ? this.radii[d.index] : k[2] / 2;
                e = Math.asin(M((e - k[1]) / (f + d.labelDistance), -1, 1));
                return k[0] + (c ? -1 : 1) * Math.cos(e) * (f + d.labelDistance) + (0 < d.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function (e) {
                this.generatePoints();
                var c = 0, d = this.options,
                    g = d.slicedOffset, f = g + (d.borderWidth || 0), a = N(d.startAngle, d.endAngle),
                    h = this.startAngleRad = a.start;
                a = (this.endAngleRad = a.end) - h;
                var v = this.points, q = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var w, r = v.length;
                e || (this.center = e = this.getCenter());
                for (w = 0; w < r; w++) {
                    var u = v[w];
                    var D = h + c * a;
                    if (!d || u.visible) c += u.percentage / 100;
                    var H = h + c * a;
                    u.shapeType = "arc";
                    u.shapeArgs = {
                        x: e[0],
                        y: e[1],
                        r: e[2] / 2,
                        innerR: e[3] / 2,
                        start: Math.round(1E3 * D) / 1E3,
                        end: Math.round(1E3 * H) / 1E3
                    };
                    u.labelDistance = y(u.options.dataLabels && u.options.dataLabels.distance,
                        q);
                    u.labelDistance = t(u.labelDistance, u.shapeArgs.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, u.labelDistance);
                    H = (H + D) / 2;
                    H > 1.5 * Math.PI ? H -= 2 * Math.PI : H < -Math.PI / 2 && (H += 2 * Math.PI);
                    u.slicedTranslation = {
                        translateX: Math.round(Math.cos(H) * g),
                        translateY: Math.round(Math.sin(H) * g)
                    };
                    var K = Math.cos(H) * e[2] / 2;
                    var p = Math.sin(H) * e[2] / 2;
                    u.tooltipPos = [e[0] + .7 * K, e[1] + .7 * p];
                    u.half = H < -Math.PI / 2 || H > Math.PI / 2 ? 1 : 0;
                    u.angle = H;
                    D = Math.min(f, u.labelDistance / 5);
                    u.labelPosition = {
                        natural: {
                            x: e[0] + K + Math.cos(H) * u.labelDistance,
                            y: e[1] + p + Math.sin(H) * u.labelDistance
                        },
                        "final": {},
                        alignment: 0 > u.labelDistance ? "center" : u.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {x: e[0] + K + Math.cos(H) * D, y: e[1] + p + Math.sin(H) * D},
                            touchingSliceAt: {x: e[0] + K, y: e[1] + p}
                        }
                    }
                }
                A(this, "afterTranslate")
            },
            drawEmpty: function () {
                var e = this.options;
                if (0 === this.total) {
                    var c = this.center[0];
                    var d = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.circle(c, d, 0).addClass("highcharts-graph").add(this.group));
                    this.graph.animate({
                        "stroke-width": e.borderWidth,
                        cx: c, cy: d, r: this.center[2] / 2, fill: e.fillColor || "none", stroke: e.color || "#cccccc"
                    }, this.options.animation)
                } else this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function () {
                var e = this, c = e.chart, d = c.renderer, g, f, a, h, v = e.options.shadow;
                this.drawEmpty();
                !v || e.shadowGroup || c.styledMode || (e.shadowGroup = d.g("shadow").attr({zIndex: -1}).add(e.group));
                e.points.forEach(function (k) {
                    var l = {};
                    f = k.graphic;
                    if (!k.isNull && f) {
                        h = k.shapeArgs;
                        g = k.getTranslate();
                        if (!c.styledMode) {
                            var n = k.shadowGroup;
                            v && !n && (n =
                                k.shadowGroup = d.g("shadow").add(e.shadowGroup));
                            n && n.attr(g);
                            a = e.pointAttribs(k, k.selected && "select")
                        }
                        k.delayedRendering ? (f.setRadialReference(e.center).attr(h).attr(g), c.styledMode || f.attr(a).attr({"stroke-linejoin": "round"}).shadow(v, n), k.delayedRendering = !1) : (f.setRadialReference(e.center), c.styledMode || J(!0, l, a), J(!0, l, h, g), f.animate(l));
                        f.attr({visibility: k.visible ? "inherit" : "hidden"});
                        f.addClass(k.getClassName())
                    } else f && (k.graphic = f.destroy())
                })
            },
            drawPoints: function () {
                var e = this.chart.renderer;
                this.points.forEach(function (c) {
                    c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy());
                    c.graphic || (c.graphic = e[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0)
                })
            },
            searchPoint: q,
            sortByAngle: function (e, c) {
                e.sort(function (e, d) {
                    return "undefined" !== typeof e.angle && (d.angle - e.angle) * c
                })
            },
            drawLegendSymbol: g.drawRectangle,
            getCenter: u.getCenter,
            getSymbol: q,
            drawGraph: null
        }, {
            init: function () {
                r.prototype.init.apply(this, arguments);
                var e = this;
                e.name = y(e.name, "Slice");
                var c = function (c) {
                    e.slice("select" ===
                        c.type)
                };
                I(e, "select", c);
                I(e, "unselect", c);
                return e
            }, isValid: function () {
                return G(this.y) && 0 <= this.y
            }, setVisible: function (e, c) {
                var d = this, g = d.series, f = g.chart, a = g.options.ignoreHiddenPoint;
                c = y(c, a);
                e !== d.visible && (d.visible = d.options.visible = e = "undefined" === typeof e ? !d.visible : e, g.options.data[g.data.indexOf(d)] = d.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) {
                    if (d[a]) d[a][e ? "show" : "hide"](!0)
                }), d.legendItem && f.legend.colorizeItem(d, e), e || "hover" !== d.state || d.setState(""),
                a && (g.isDirty = !0), c && f.redraw())
            }, slice: function (e, c, d) {
                var g = this.series;
                h(d, g.chart);
                y(c, !0);
                this.sliced = this.options.sliced = E(e) ? e : !this.sliced;
                g.options.data[g.data.indexOf(this)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            }, getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
            }, haloPath: function (e) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x,
                    c.y, c.r + e, c.r + e, {innerR: c.r - 1, start: c.start, end: c.end})
            }, connectorShapes: {
                fixedOffset: function (e, c, d) {
                    var g = c.breakAt;
                    c = c.touchingSliceAt;
                    return ["M", e.x, e.y].concat(d.softConnector ? ["C", e.x + ("left" === e.alignment ? -5 : 5), e.y, 2 * g.x - c.x, 2 * g.y - c.y, g.x, g.y] : ["L", g.x, g.y]).concat(["L", c.x, c.y])
                }, straight: function (e, c) {
                    c = c.touchingSliceAt;
                    return ["M", e.x, e.y, "L", c.x, c.y]
                }, crookedLine: function (e, c, d) {
                    c = c.touchingSliceAt;
                    var g = this.series, f = g.center[0], a = g.chart.plotWidth, k = g.chart.plotLeft;
                    g = e.alignment;
                    var h =
                        this.shapeArgs.r;
                    d = t(d.crookDistance, 1);
                    d = "left" === g ? f + h + (a + k - f - h) * (1 - d) : k + (f - h) * d;
                    f = ["L", d, e.y];
                    if ("left" === g ? d > e.x || d < c.x : d < e.x || d > c.x) f = [];
                    return ["M", e.x, e.y].concat(f).concat(["L", c.x, c.y])
                }
            }, getConnectorPath: function () {
                var e = this.labelPosition, c = this.series.options.dataLabels, d = c.connectorShape,
                    g = this.connectorShapes;
                g[d] && (d = g[d]);
                return d.call(this, {x: e.final.x, y: e.final.y, alignment: e.alignment}, e.connectorPosition, c)
            }
        });
        ""
    });
    S(r, "parts/DataLabels.js", [r["parts/Globals.js"], r["parts/Utilities.js"]],
        function (d, g) {
            var r = g.animObject, u = g.arrayMax, I = g.clamp, M = g.defined, E = g.extend, A = g.format, G = g.isArray,
                J = g.merge, y = g.objectEach, t = g.pick, D = g.relativeLength, h = g.splat, N = g.stableSort;
            g = d.noop;
            var q = d.Series, P = d.seriesTypes;
            d.distribute = function (e, c, g) {
                function h(a, c) {
                    return a.target - c.target
                }

                var f, a = !0, k = e, v = [];
                var q = 0;
                var w = k.reducedLen || c;
                for (f = e.length; f--;) q += e[f].size;
                if (q > w) {
                    N(e, function (a, c) {
                        return (c.rank || 0) - (a.rank || 0)
                    });
                    for (q = f = 0; q <= w;) q += e[f].size, f++;
                    v = e.splice(f - 1, e.length)
                }
                N(e, h);
                for (e =
                         e.map(function (a) {
                             return {size: a.size, targets: [a.target], align: t(a.align, .5)}
                         }); a;) {
                    for (f = e.length; f--;) a = e[f], q = (Math.min.apply(0, a.targets) + Math.max.apply(0, a.targets)) / 2, a.pos = I(q - a.size * a.align, 0, c - a.size);
                    f = e.length;
                    for (a = !1; f--;) 0 < f && e[f - 1].pos + e[f - 1].size > e[f].pos && (e[f - 1].size += e[f].size, e[f - 1].targets = e[f - 1].targets.concat(e[f].targets), e[f - 1].align = .5, e[f - 1].pos + e[f - 1].size > c && (e[f - 1].pos = c - e[f - 1].size), e.splice(f, 1), a = !0)
                }
                k.push.apply(k, v);
                f = 0;
                e.some(function (a) {
                    var e = 0;
                    if (a.targets.some(function () {
                        k[f].pos =
                            a.pos + e;
                        if ("undefined" !== typeof g && Math.abs(k[f].pos - k[f].target) > g) return k.slice(0, f + 1).forEach(function (a) {
                            delete a.pos
                        }), k.reducedLen = (k.reducedLen || c) - .1 * c, k.reducedLen > .1 * c && d.distribute(k, c, g), !0;
                        e += k[f].size;
                        f++
                    })) return !0
                });
                N(k, h)
            };
            q.prototype.drawDataLabels = function () {
                function e(a, c) {
                    var b = c.filter;
                    return b ? (c = b.operator, a = a[b.property], b = b.value, ">" === c && a > b || "<" === c && a < b || ">=" === c && a >= b || "<=" === c && a <= b || "==" === c && a == b || "===" === c && a === b ? !0 : !1) : !0
                }

                function c(a, c) {
                    var b = [], e;
                    if (G(a) && !G(c)) b =
                        a.map(function (a) {
                            return J(a, c)
                        }); else if (G(c) && !G(a)) b = c.map(function (b) {
                        return J(a, b)
                    }); else if (G(a) || G(c)) for (e = Math.max(a.length, c.length); e--;) b[e] = J(a[e], c[e]); else b = J(a, c);
                    return b
                }

                var g = this, n = g.chart, f = g.options, a = f.dataLabels, l = g.points, v, q = g.hasRendered || 0,
                    w = r(f.animation).duration, u = Math.min(w, 200), L = !n.renderer.forExport && t(a.defer, 0 < u),
                    D = n.renderer;
                a = c(c(n.options.plotOptions && n.options.plotOptions.series && n.options.plotOptions.series.dataLabels, n.options.plotOptions && n.options.plotOptions[g.type] &&
                    n.options.plotOptions[g.type].dataLabels), a);
                d.fireEvent(this, "drawDataLabels");
                if (G(a) || a.enabled || g._hasPointLabels) {
                    var H = g.plotGroup("dataLabelsGroup", "data-labels", L && !q ? "hidden" : "inherit", a.zIndex || 6);
                    L && (H.attr({opacity: +q}), q || setTimeout(function () {
                        var a = g.dataLabelsGroup;
                        a && (g.visible && H.show(!0), a[f.animation ? "animate" : "attr"]({opacity: 1}, {duration: u}))
                    }, w - u));
                    l.forEach(function (d) {
                        v = h(c(a, d.dlOptions || d.options && d.options.dataLabels));
                        v.forEach(function (a, b) {
                            var c = a.enabled && (!d.isNull ||
                                d.dataLabelOnNull) && e(d, a), h = d.dataLabels ? d.dataLabels[b] : d.dataLabel,
                                k = d.connectors ? d.connectors[b] : d.connector, l = t(a.distance, d.labelDistance),
                                p = !h;
                            if (c) {
                                var v = d.getLabelConfig();
                                var m = t(a[d.formatPrefix + "Format"], a.format);
                                v = M(m) ? A(m, v, n) : (a[d.formatPrefix + "Formatter"] || a.formatter).call(v, a);
                                m = a.style;
                                var q = a.rotation;
                                n.styledMode || (m.color = t(a.color, m.color, g.color, "#000000"), "contrast" === m.color ? (d.contrastColor = D.getContrast(d.color || g.color), m.color = !M(l) && a.inside || 0 > l || f.stacking ? d.contrastColor :
                                    "#000000") : delete d.contrastColor, f.cursor && (m.cursor = f.cursor));
                                var w = {r: a.borderRadius || 0, rotation: q, padding: a.padding, zIndex: 1};
                                n.styledMode || (w.fill = a.backgroundColor, w.stroke = a.borderColor, w["stroke-width"] = a.borderWidth);
                                y(w, function (a, b) {
                                    "undefined" === typeof a && delete w[b]
                                })
                            }
                            !h || c && M(v) ? c && M(v) && (h ? w.text = v : (d.dataLabels = d.dataLabels || [], h = d.dataLabels[b] = q ? D.text(v, 0, -9999, a.useHTML).addClass("highcharts-data-label") : D.label(v, 0, -9999, a.shape, null, null, a.useHTML, null, "data-label"), b || (d.dataLabel =
                                h), h.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (a.className || "") + (a.useHTML ? " highcharts-tracker" : ""))), h.options = a, h.attr(w), n.styledMode || h.css(m).shadow(a.shadow), h.added || h.add(H), a.textPath && !a.useHTML && (h.setTextPath(d.getDataLabelPath && d.getDataLabelPath(h) || d.graphic, a.textPath), d.dataLabelPath && !a.textPath.enabled && (d.dataLabelPath = d.dataLabelPath.destroy())), g.alignDataLabel(d, h, a, null, p)) : (d.dataLabel = d.dataLabel && d.dataLabel.destroy(), d.dataLabels && (1 === d.dataLabels.length ?
                                delete d.dataLabels : delete d.dataLabels[b]), b || delete d.dataLabel, k && (d.connector = d.connector.destroy(), d.connectors && (1 === d.connectors.length ? delete d.connectors : delete d.connectors[b])))
                        })
                    })
                }
                d.fireEvent(this, "afterDrawDataLabels")
            };
            q.prototype.alignDataLabel = function (d, c, g, h, f) {
                var a = this, e = this.chart, k = this.isCartesian && e.inverted, n = this.enabledDataSorting,
                    q = t(d.dlBox && d.dlBox.centerX, d.plotX, -9999), r = t(d.plotY, -9999), u = c.getBBox(),
                    y = g.rotation, A = g.align, K = e.isInsidePlot(q, Math.round(r), k), p = "justify" ===
                    t(g.overflow, n ? "none" : "justify"),
                    b = this.visible && !1 !== d.visible && (d.series.forceDL || n && !p || K || g.inside && h && e.isInsidePlot(q, k ? h.x + 1 : h.y + h.height - 1, k));
                var C = function (b) {
                    n && a.xAxis && !p && a.setDataLabelStartPos(d, c, f, K, b)
                };
                if (b) {
                    var x = e.renderer.fontMetrics(e.styledMode ? void 0 : g.style.fontSize, c).b;
                    h = E({
                        x: k ? this.yAxis.len - r : q,
                        y: Math.round(k ? this.xAxis.len - q : r),
                        width: 0,
                        height: 0
                    }, h);
                    E(g, {width: u.width, height: u.height});
                    y ? (p = !1, q = e.renderer.rotCorr(x, y), q = {
                        x: h.x + g.x + h.width / 2 + q.x, y: h.y + g.y + {
                            top: 0, middle: .5,
                            bottom: 1
                        }[g.verticalAlign] * h.height
                    }, C(q), c[f ? "attr" : "animate"](q).attr({align: A}), C = (y + 720) % 360, C = 180 < C && 360 > C, "left" === A ? q.y -= C ? u.height : 0 : "center" === A ? (q.x -= u.width / 2, q.y -= u.height / 2) : "right" === A && (q.x -= u.width, q.y -= C ? 0 : u.height), c.placed = !0, c.alignAttr = q) : (C(h), c.align(g, null, h), q = c.alignAttr);
                    p && 0 <= h.height ? this.justifyDataLabel(c, g, q, u, h, f) : t(g.crop, !0) && (b = e.isInsidePlot(q.x, q.y) && e.isInsidePlot(q.x + u.width, q.y + u.height));
                    if (g.shape && !y) c[f ? "attr" : "animate"]({
                        anchorX: k ? e.plotWidth - d.plotY :
                            d.plotX, anchorY: k ? e.plotHeight - d.plotX : d.plotY
                    })
                }
                f && n && (c.placed = !1);
                b || n && !p || (c.hide(!0), c.placed = !1)
            };
            q.prototype.setDataLabelStartPos = function (d, c, g, h, f) {
                var a = this.chart, e = a.inverted, k = this.xAxis, n = k.reversed, q = e ? c.height / 2 : c.width / 2;
                d = (d = d.pointWidth) ? d / 2 : 0;
                k = e ? f.x : n ? -q - d : k.width - q + d;
                f = e ? n ? this.yAxis.height - q + d : -q - d : f.y;
                c.startXPos = k;
                c.startYPos = f;
                h ? "hidden" === c.visibility && (c.show(), c.attr({opacity: 0}).animate({opacity: 1})) : c.attr({opacity: 1}).animate({opacity: 0}, void 0, c.hide);
                a.hasRendered &&
                (g && c.attr({x: c.startXPos, y: c.startYPos}), c.placed = !0)
            };
            q.prototype.justifyDataLabel = function (d, c, g, h, f, a) {
                var e = this.chart, k = c.align, n = c.verticalAlign, q = d.box ? 0 : d.padding || 0;
                var r = g.x + q;
                if (0 > r) {
                    "right" === k ? (c.align = "left", c.inside = !0) : c.x = -r;
                    var t = !0
                }
                r = g.x + h.width - q;
                r > e.plotWidth && ("left" === k ? (c.align = "right", c.inside = !0) : c.x = e.plotWidth - r, t = !0);
                r = g.y + q;
                0 > r && ("bottom" === n ? (c.verticalAlign = "top", c.inside = !0) : c.y = -r, t = !0);
                r = g.y + h.height - q;
                r > e.plotHeight && ("top" === n ? (c.verticalAlign = "bottom", c.inside =
                    !0) : c.y = e.plotHeight - r, t = !0);
                t && (d.placed = !a, d.align(c, null, f));
                return t
            };
            P.pie && (P.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function (d) {
                    return d.top + d.distributeBox.pos
                }, radialDistributionX: function (d, c, g, h) {
                    return d.getX(g < c.top + 2 || g > c.bottom - 2 ? h : g, c.half, c)
                }, justify: function (d, c, g) {
                    return g[0] + (d.half ? -1 : 1) * (c + d.labelDistance)
                }, alignToPlotEdges: function (d, c, g, h) {
                    d = d.getBBox().width;
                    return c ? d + h : g - d - h
                }, alignToConnectors: function (d, c, g, h) {
                    var e = 0, a;
                    d.forEach(function (c) {
                        a = c.dataLabel.getBBox().width;
                        a > e && (e = a)
                    });
                    return c ? e + h : g - e - h
                }
            }, P.pie.prototype.drawDataLabels = function () {
                var e = this, c = e.data, g, h = e.chart, f = e.options.dataLabels || {}, a = f.connectorPadding, l,
                    v = h.plotWidth, r = h.plotHeight, w = h.plotLeft, y = Math.round(h.chartWidth / 3), A,
                    D = e.center, H = D[2] / 2, K = D[1], p, b, C, x, G = [[], []], E, N, I, m, P = [0, 0, 0, 0],
                    S = e.dataLabelPositioners, W;
                e.visible && (f.enabled || e._hasPointLabels) && (c.forEach(function (a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                        width: "auto",
                        textOverflow: "clip"
                    }),
                        a.dataLabel.shortened = !1)
                }), q.prototype.drawDataLabels.apply(e), c.forEach(function (a) {
                    a.dataLabel && (a.visible ? (G[a.half].push(a), a.dataLabel._pos = null, !M(f.style.width) && !M(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > y && (a.dataLabel.css({width: .7 * y}), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                }), G.forEach(function (c, k) {
                    var l = c.length, n = [], q;
                    if (l) {
                        e.sortByAngle(c,
                            k - .5);
                        if (0 < e.maxLabelDistance) {
                            var u = Math.max(0, K - H - e.maxLabelDistance);
                            var z = Math.min(K + H + e.maxLabelDistance, h.plotHeight);
                            c.forEach(function (a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, K - H - a.labelDistance), a.bottom = Math.min(K + H + a.labelDistance, h.plotHeight), q = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                    target: a.labelPosition.natural.y - a.top + q / 2,
                                    size: q,
                                    rank: a.y
                                }, n.push(a.distributeBox))
                            });
                            u = z + q - u;
                            d.distribute(n, u, u / 5)
                        }
                        for (m = 0; m < l; m++) {
                            g = c[m];
                            C = g.labelPosition;
                            p = g.dataLabel;
                            I = !1 ===
                            g.visible ? "hidden" : "inherit";
                            N = u = C.natural.y;
                            n && M(g.distributeBox) && ("undefined" === typeof g.distributeBox.pos ? I = "hidden" : (x = g.distributeBox.size, N = S.radialDistributionY(g)));
                            delete g.positionIndex;
                            if (f.justify) E = S.justify(g, H, D); else switch (f.alignTo) {
                                case "connectors":
                                    E = S.alignToConnectors(c, k, v, w);
                                    break;
                                case "plotEdges":
                                    E = S.alignToPlotEdges(p, k, v, w);
                                    break;
                                default:
                                    E = S.radialDistributionX(e, g, N, u)
                            }
                            p._attr = {visibility: I, align: C.alignment};
                            W = g.options.dataLabels || {};
                            p._pos = {
                                x: E + t(W.x, f.x) + ({
                                    left: a,
                                    right: -a
                                }[C.alignment] || 0), y: N + t(W.y, f.y) - 10
                            };
                            C.final.x = E;
                            C.final.y = N;
                            t(f.crop, !0) && (b = p.getBBox().width, u = null, E - b < a && 1 === k ? (u = Math.round(b - E + a), P[3] = Math.max(u, P[3])) : E + b > v - a && 0 === k && (u = Math.round(E + b - v + a), P[1] = Math.max(u, P[1])), 0 > N - x / 2 ? P[0] = Math.max(Math.round(-N + x / 2), P[0]) : N + x / 2 > r && (P[2] = Math.max(Math.round(N + x / 2 - r), P[2])), p.sideOverflow = u)
                        }
                    }
                }), 0 === u(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), this.points.forEach(function (a) {
                    W = J(f, a.options.dataLabels);
                    if (l = t(W.connectorWidth,
                        1)) {
                        var b;
                        A = a.connector;
                        if ((p = a.dataLabel) && p._pos && a.visible && 0 < a.labelDistance) {
                            I = p._attr.visibility;
                            if (b = !A) a.connector = A = h.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(e.dataLabelsGroup), h.styledMode || A.attr({
                                "stroke-width": l,
                                stroke: W.connectorColor || a.color || "#666666"
                            });
                            A[b ? "attr" : "animate"]({d: a.getConnectorPath()});
                            A.attr("visibility", I)
                        } else A && (a.connector = A.destroy())
                    }
                }))
            }, P.pie.prototype.placeDataLabels =
                function () {
                    this.points.forEach(function (d) {
                        var c = d.dataLabel, e;
                        c && d.visible && ((e = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({
                            width: c._attr.width + "px",
                            textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                        }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](e), c.moved = !0) : c && c.attr({y: -9999}));
                        delete d.distributeBox
                    }, this)
                }, P.pie.prototype.alignDataLabel = g, P.pie.prototype.verifyDataLabelOverflow = function (d) {
                var c = this.center,
                    e = this.options, g = e.center, f = e.minSize || 80, a = null !== e.size;
                if (!a) {
                    if (null !== g[0]) var h = Math.max(c[2] - Math.max(d[1], d[3]), f); else h = Math.max(c[2] - d[1] - d[3], f), c[0] += (d[3] - d[1]) / 2;
                    null !== g[1] ? h = I(h, f, c[2] - Math.max(d[0], d[2])) : (h = I(h, f, c[2] - d[0] - d[2]), c[1] += (d[0] - d[2]) / 2);
                    h < c[2] ? (c[2] = h, c[3] = Math.min(D(e.innerSize || 0, h), h), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : a = !0
                }
                return a
            });
            P.column && (P.column.prototype.alignDataLabel = function (d, c, g, h, f) {
                var a = this.chart.inverted, e = d.series,
                    k = d.dlBox || d.shapeArgs, n = t(d.below, d.plotY > t(this.translatedThreshold, e.yAxis.len)),
                    r = t(g.inside, !!this.options.stacking);
                k && (h = J(k), 0 > h.y && (h.height += h.y, h.y = 0), k = h.y + h.height - e.yAxis.len, 0 < k && k < h.height && (h.height -= k), a && (h = {
                    x: e.yAxis.len - h.y - h.height,
                    y: e.xAxis.len - h.x - h.width,
                    width: h.height,
                    height: h.width
                }), r || (a ? (h.x += n ? 0 : h.width, h.width = 0) : (h.y += n ? h.height : 0, h.height = 0)));
                g.align = t(g.align, !a || r ? "center" : n ? "right" : "left");
                g.verticalAlign = t(g.verticalAlign, a || r ? "middle" : n ? "top" : "bottom");
                q.prototype.alignDataLabel.call(this,
                    d, c, g, h, f);
                g.inside && d.contrastColor && c.css({color: d.contrastColor})
            })
        });
    S(r, "modules/overlapping-datalabels.src.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent, u = g.fireEvent, I = g.isArray, M = g.objectEach, E = g.pick;
        d = d.Chart;
        r(d, "render", function () {
            var d = [];
            (this.labelCollectors || []).forEach(function (g) {
                d = d.concat(g())
            });
            (this.yAxis || []).forEach(function (g) {
                g.options.stackLabels && !g.options.stackLabels.allowOverlap && M(g.stacks, function (g) {
                    M(g, function (g) {
                        d.push(g.label)
                    })
                })
            });
            (this.series || []).forEach(function (g) {
                var r = g.options.dataLabels;
                g.visible && (!1 !== r.enabled || g._hasPointLabels) && (g.nodes || g.points).forEach(function (g) {
                    g.visible && (I(g.dataLabels) ? g.dataLabels : g.dataLabel ? [g.dataLabel] : []).forEach(function (r) {
                        var t = r.options;
                        r.labelrank = E(t.labelrank, g.labelrank, g.shapeArgs && g.shapeArgs.height);
                        t.allowOverlap || d.push(r)
                    })
                })
            });
            this.hideOverlappingLabels(d)
        });
        d.prototype.hideOverlappingLabels = function (d) {
            var g = this, r = d.length, y = g.renderer, t, A, h, E = !1;
            var q = function (c) {
                var d =
                    c.box ? 0 : c.padding || 0;
                var e = 0;
                if (c && (!c.alignAttr || c.placed)) {
                    var f = c.alignAttr || {x: c.attr("x"), y: c.attr("y")};
                    var a = c.parentGroup;
                    c.width || (e = c.getBBox(), c.width = e.width, c.height = e.height, e = y.fontMetrics(null, c.element).h);
                    return {
                        x: f.x + (a.translateX || 0) + d,
                        y: f.y + (a.translateY || 0) + d - e,
                        width: c.width - 2 * d,
                        height: c.height - 2 * d
                    }
                }
            };
            for (A = 0; A < r; A++) if (t = d[A]) t.oldOpacity = t.opacity, t.newOpacity = 1, t.absoluteBox = q(t);
            d.sort(function (c, d) {
                return (d.labelrank || 0) - (c.labelrank || 0)
            });
            for (A = 0; A < r; A++) {
                var I = (q = d[A]) &&
                    q.absoluteBox;
                for (t = A + 1; t < r; ++t) {
                    var e = (h = d[t]) && h.absoluteBox;
                    !I || !e || q === h || 0 === q.newOpacity || 0 === h.newOpacity || e.x > I.x + I.width || e.x + e.width < I.x || e.y > I.y + I.height || e.y + e.height < I.y || ((q.labelrank < h.labelrank ? q : h).newOpacity = 0)
                }
            }
            d.forEach(function (c) {
                var d;
                if (c) {
                    var e = c.newOpacity;
                    c.oldOpacity !== e && (c.alignAttr && c.placed ? (e ? c.show(!0) : d = function () {
                        c.hide(!0);
                        c.placed = !1
                    }, E = !0, c.alignAttr.opacity = e, c[c.isOld ? "animate" : "attr"](c.alignAttr, null, d), u(g, "afterHideOverlappingLabel")) : c.attr({opacity: e}));
                    c.isOld = !0
                }
            });
            E && u(g, "afterHideAllOverlappingLabels")
        }
    });
    S(r, "parts/Interaction.js", [r["parts/Globals.js"], r["parts/Legend.js"], r["parts/Point.js"], r["parts/Utilities.js"]], function (d, g, r, u) {
        var I = u.addEvent, M = u.createElement, E = u.css, A = u.defined, G = u.extend, J = u.fireEvent, y = u.isArray,
            t = u.isFunction, D = u.isObject, h = u.merge, N = u.objectEach, q = u.pick;
        u = d.Chart;
        var P = d.defaultOptions, e = d.defaultPlotOptions, c = d.hasTouch, k = d.Series, n = d.seriesTypes, f = d.svg;
        d = d.TrackerMixin = {
            drawTrackerPoint: function () {
                var a =
                    this, d = a.chart, e = d.pointer, f = function (a) {
                    var c = e.getPointFromEvent(a);
                    "undefined" !== typeof c && (e.isDirectTouch = !0, c.onMouseOver(a))
                }, g;
                a.points.forEach(function (a) {
                    g = y(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    g.forEach(function (c) {
                        c.div ? c.div.point = a : c.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (g) {
                    if (a[g]) {
                        a[g].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                            e.onTrackerMouseOut(a)
                        });
                        if (c) a[g].on("touchstart",
                            f);
                        !d.styledMode && a.options.cursor && a[g].css(E).css({cursor: a.options.cursor})
                    }
                }), a._hasTracking = !0);
                J(this, "afterDrawTracker")
            }, drawTrackerGraph: function () {
                var a = this, d = a.options, e = d.trackByArea, g = [].concat(e ? a.areaPath : a.graphPath),
                    h = g.length, k = a.chart, n = k.pointer, q = k.renderer, r = k.options.tooltip.snap, t = a.tracker,
                    p, b = function () {
                        if (k.hoverSeries !== a) a.onMouseOver()
                    }, u = "rgba(192,192,192," + (f ? .0001 : .002) + ")";
                if (h && !e) for (p = h + 1; p--;) "M" === g[p] && g.splice(p + 1, 0, g[p + 1] - r, g[p + 2], "L"), (p && "M" === g[p] || p ===
                    h) && g.splice(p, 0, "L", g[p - 2] + r, g[p - 1]);
                t ? t.attr({d: g}) : a.graph && (a.tracker = q.path(g).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(e ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), k.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: u,
                    fill: e ? u : "none",
                    "stroke-width": a.graph.strokeWidth() + (e ? 0 : 2 * r)
                }), [a.tracker, a.markerGroup].forEach(function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", b).on("mouseout", function (a) {
                        n.onTrackerMouseOut(a)
                    });
                    d.cursor &&
                    !k.styledMode && a.css({cursor: d.cursor});
                    if (c) a.on("touchstart", b)
                }));
                J(this, "afterDrawTracker")
            }
        };
        n.column && (n.column.prototype.drawTracker = d.drawTrackerPoint);
        n.pie && (n.pie.prototype.drawTracker = d.drawTrackerPoint);
        n.scatter && (n.scatter.prototype.drawTracker = d.drawTrackerPoint);
        G(g.prototype, {
            setItemEvents: function (a, c, d) {
                var e = this, f = e.chart.renderer.boxWrapper, g = a instanceof r,
                    k = "highcharts-legend-" + (g ? "point" : "series") + "-active", l = e.chart.styledMode;
                (d ? [c, a.legendSymbol] : [a.legendGroup]).forEach(function (d) {
                    if (d) d.on("mouseover",
                        function () {
                            a.visible && e.allItems.forEach(function (c) {
                                a !== c && c.setState("inactive", !g)
                            });
                            a.setState("hover");
                            a.visible && f.addClass(k);
                            l || c.css(e.options.itemHoverStyle)
                        }).on("mouseout", function () {
                        e.chart.styledMode || c.css(h(a.visible ? e.itemStyle : e.itemHiddenStyle));
                        e.allItems.forEach(function (c) {
                            a !== c && c.setState("", !g)
                        });
                        f.removeClass(k);
                        a.setState()
                    }).on("click", function (c) {
                        var d = function () {
                            a.setVisible && a.setVisible();
                            e.allItems.forEach(function (b) {
                                a !== b && b.setState(a.visible ? "inactive" : "", !g)
                            })
                        };
                        f.removeClass(k);
                        c = {browserEvent: c};
                        a.firePointEvent ? a.firePointEvent("legendItemClick", c, d) : J(a, "legendItemClick", c, d)
                    })
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = M("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                I(a.checkbox, "click", function (c) {
                    J(a.series || a, "checkboxClick", {checked: c.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        G(u.prototype, {
            showResetZoom: function () {
                function a() {
                    c.zoomOut()
                }

                var c = this, d = P.lang, e = c.options.chart.resetZoomButton, f = e.theme, g = f.states,
                    h = "chart" === e.relativeTo || "spaceBox" === e.relativeTo ? null : "plotBox";
                J(this, "beforeShowResetZoom", null, function () {
                    c.resetZoomButton = c.renderer.button(d.resetZoom, null, null, a, f, g && g.hover).attr({
                        align: e.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(e.position, !1, h)
                });
                J(this, "afterShowResetZoom")
            }, zoomOut: function () {
                J(this, "selection", {resetSelection: !0}, this.zoom)
            }, zoom: function (a) {
                var c =
                    this, d, e = c.pointer, f = !1, g = c.inverted ? e.mouseDownX : e.mouseDownY;
                !a || a.resetSelection ? (c.axes.forEach(function (a) {
                    d = a.zoom()
                }), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var h = a.axis, k = c.inverted ? h.left : h.top, l = c.inverted ? k + h.width : k + h.height,
                        b = h.isXAxis, n = !1;
                    if (!b && g >= k && g <= l || b || !A(g)) n = !0;
                    e[b ? "zoomX" : "zoomY"] && n && (d = h.zoom(a.min, a.max), h.displayBtn && (f = !0))
                });
                var h = c.resetZoomButton;
                f && !h ? c.showResetZoom() : !f && D(h) && (c.resetZoomButton = h.destroy());
                d && c.redraw(q(c.options.chart.animation,
                    a && a.animation, 100 > c.pointCount))
            }, pan: function (a, c) {
                var d = this, e = d.hoverPoints, f = d.options.chart, g;
                c = "object" === typeof c ? c : {enabled: c, type: "x"};
                f && f.panning && (f.panning = c);
                var h = c.type;
                J(this, "pan", {originalEvent: a}, function () {
                    e && e.forEach(function (a) {
                        a.setState()
                    });
                    var c = [1];
                    "xy" === h ? c = [1, 0] : "y" === h && (c = [0]);
                    c.forEach(function (c) {
                        var e = d[c ? "xAxis" : "yAxis"][0], f = e.options, b = e.horiz, h = a[b ? "chartX" : "chartY"];
                        b = b ? "mouseDownX" : "mouseDownY";
                        var k = d[b], l = (e.pointRange || 0) / 2, n = e.reversed && !d.inverted ||
                        !e.reversed && d.inverted ? -1 : 1, q = e.getExtremes(), v = e.toValue(k - h, !0) + l * n;
                        n = e.toValue(k + e.len - h, !0) - l * n;
                        var m = n < v;
                        k = m ? n : v;
                        v = m ? v : n;
                        n = Math.min(q.dataMin, l ? q.min : e.toValue(e.toPixels(q.min) - e.minPixelPadding));
                        l = Math.max(q.dataMax, l ? q.max : e.toValue(e.toPixels(q.max) + e.minPixelPadding));
                        if (!f.ordinal) {
                            c && (f = n - k, 0 < f && (v += f, k = n), f = v - l, 0 < f && (v = l, k -= f));
                            if (e.series.length && k !== q.min && v !== q.max && c || e.panningState && k >= e.panningState.startMin && v <= e.panningState.startMax) e.setExtremes(k, v, !1, !1, {trigger: "pan"}),
                                g = !0;
                            d[b] = h
                        }
                    });
                    g && d.redraw(!1);
                    E(d.container, {cursor: "move"})
                })
            }
        });
        G(r.prototype, {
            select: function (a, c) {
                var d = this, e = d.series, f = e.chart;
                this.selectedStaging = a = q(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {accumulate: c}, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[e.data.indexOf(d)] = d.options;
                    d.setState(a && "select");
                    c || f.getSelectedPoints().forEach(function (a) {
                        var c = a.series;
                        a.selected && a !== d && (a.selected = a.options.selected = !1, c.options.data[c.data.indexOf(a)] = a.options, a.setState(f.hoverPoints &&
                        c.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            }, onMouseOver: function (a) {
                var c = this.series.chart, d = c.pointer;
                a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, c.inverted);
                d.runPointActions(a, this)
            }, onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a =
                        this, c = h(a.series.options.point, a.options).events;
                    a.events = c;
                    N(c, function (c, d) {
                        t(c) && I(a, d, c)
                    });
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, c) {
                var d = this.series, f = this.state, g = d.options.states[a || "normal"] || {},
                    h = e[d.type].marker && d.options.marker, k = h && !1 === h.enabled,
                    l = h && h.states && h.states[a || "normal"] || {}, n = !1 === l.enabled, r = d.stateMarkerGraphic,
                    p = this.marker || {}, b = d.chart, t = d.halo, u, y = h && d.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === g.enabled || a && (n || k && !1 ===
                    l.enabled) || a && p.states && p.states[a] && !1 === p.states[a].enabled)) {
                    this.state = a;
                    y && (u = d.markerAttribs(this, a));
                    if (this.graphic) {
                        f && this.graphic.removeClass("highcharts-point-" + f);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!b.styledMode) {
                            var A = d.pointAttribs(this, a);
                            var D = q(b.options.chart.animation, g.animation);
                            d.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function (a) {
                                a && a.animate({opacity: A.opacity}, D)
                            }), this.connector && this.connector.animate({opacity: A.opacity}, D));
                            this.graphic.animate(A,
                                D)
                        }
                        u && this.graphic.animate(u, q(b.options.chart.animation, l.animation, h.animation));
                        r && r.hide()
                    } else {
                        if (a && l) {
                            f = p.symbol || d.symbol;
                            r && r.currentSymbol !== f && (r = r.destroy());
                            if (u) if (r) r[c ? "animate" : "attr"]({
                                x: u.x,
                                y: u.y
                            }); else f && (d.stateMarkerGraphic = r = b.renderer.symbol(f, u.x, u.y, u.width, u.height).add(d.markerGroup), r.currentSymbol = f);
                            !b.styledMode && r && r.attr(d.pointAttribs(this, a))
                        }
                        r && (r[a && this.isInside ? "show" : "hide"](), r.element.point = this)
                    }
                    a = g.halo;
                    g = (r = this.graphic || r) && r.visibility || "inherit";
                    a &&
                    a.size && r && "hidden" !== g && !this.isCluster ? (t || (d.halo = t = b.renderer.path().add(r.parentGroup)), t.show()[c ? "animate" : "attr"]({d: this.haloPath(a.size)}), t.attr({
                        "class": "highcharts-halo highcharts-color-" + q(this.colorIndex, d.colorIndex) + (this.className ? " " + this.className : ""),
                        visibility: g,
                        zIndex: -1
                    }), t.point = this, b.styledMode || t.attr(G({
                        fill: this.color || d.color,
                        "fill-opacity": a.opacity
                    }, a.attributes))) : t && t.point && t.point.haloPath && t.animate({d: t.point.haloPath(0)}, null, t.hide);
                    J(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        G(k.prototype, {
            onMouseOver: function () {
                var a = this.chart, c = a.hoverSeries;
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && J(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, c = this.chart, d = c.tooltip, e = c.hoverPoint;
                c.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && J(this, "mouseOut");
                !d || this.stickyTracking ||
                d.shared && !this.noSharedTooltip || d.hide();
                c.series.forEach(function (a) {
                    a.setState("", !0)
                })
            }, setState: function (a, c) {
                var d = this, e = d.options, f = d.graph, g = e.inactiveOtherPoints, h = e.states, k = e.lineWidth,
                    l = e.opacity,
                    n = q(h[a || "normal"] && h[a || "normal"].animation, d.chart.options.chart.animation);
                e = 0;
                a = a || "";
                if (d.state !== a && ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (c) {
                    c && (d.state && c.removeClass("highcharts-series-" + d.state), a && c.addClass("highcharts-series-" + a))
                }), d.state = a, !d.chart.styledMode)) {
                    if (h[a] &&
                        !1 === h[a].enabled) return;
                    a && (k = h[a].lineWidth || k + (h[a].lineWidthPlus || 0), l = q(h[a].opacity, l));
                    if (f && !f.dashstyle) for (h = {"stroke-width": k}, f.animate(h, n); d["zone-graph-" + e];) d["zone-graph-" + e].attr(h), e += 1;
                    g || [d.group, d.markerGroup, d.dataLabelsGroup, d.labelBySeries].forEach(function (a) {
                        a && a.animate({opacity: l}, n)
                    })
                }
                c && g && d.points && d.setAllPointsToState(a)
            }, setAllPointsToState: function (a) {
                this.points.forEach(function (c) {
                    c.setState && c.setState(a)
                })
            }, setVisible: function (a, c) {
                var d = this, e = d.chart, f = d.legendItem,
                    g = e.options.chart.ignoreHiddenSeries, h = d.visible;
                var k = (d.visible = a = d.options.visible = d.userOptions.visible = "undefined" === typeof a ? !h : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                    if (d[a]) d[a][k]()
                });
                if (e.hoverSeries === d || (e.hoverPoint && e.hoverPoint.series) === d) d.onMouseOut();
                f && e.legend.colorizeItem(d, a);
                d.isDirty = !0;
                d.options.stacking && e.series.forEach(function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                d.linkedSeries.forEach(function (c) {
                    c.setVisible(a,
                        !1)
                });
                g && (e.isDirtyBox = !0);
                J(d, k);
                !1 !== c && e.redraw()
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                J(this, a ? "select" : "unselect")
            }, drawTracker: d.drawTrackerGraph
        })
    });
    S(r, "parts/Responsive.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.find, u = g.isArray, I = g.isObject, M = g.merge, E = g.objectEach, A = g.pick, G = g.splat,
            J = g.uniqueKey;
        d = d.Chart;
        d.prototype.setResponsive = function (d, g) {
            var t = this.options.responsive, h = [], u = this.currentResponsive;
            !g && t && t.rules && t.rules.forEach(function (d) {
                "undefined" === typeof d._id && (d._id = J());
                this.matchResponsiveRule(d, h)
            }, this);
            g = M.apply(0, h.map(function (d) {
                return r(t.rules, function (g) {
                    return g._id === d
                }).chartOptions
            }));
            g.isResponsiveOptions = !0;
            h = h.toString() || void 0;
            h !== (u && u.ruleIds) && (u && this.update(u.undoOptions, d, !0), h ? (u = this.currentOptions(g), u.isResponsiveOptions = !0, this.currentResponsive =
                {
                    ruleIds: h,
                    mergedOptions: g,
                    undoOptions: u
                }, this.update(g, d, !0)) : this.currentResponsive = void 0)
        };
        d.prototype.matchResponsiveRule = function (d, g) {
            var r = d.condition;
            (r.callback || function () {
                return this.chartWidth <= A(r.maxWidth, Number.MAX_VALUE) && this.chartHeight <= A(r.maxHeight, Number.MAX_VALUE) && this.chartWidth >= A(r.minWidth, 0) && this.chartHeight >= A(r.minHeight, 0)
            }).call(this) && g.push(d._id)
        };
        d.prototype.currentOptions = function (d) {
            function g(d, h, t, e) {
                var c;
                E(d, function (d, n) {
                    if (!e && -1 < r.collectionsWithUpdate.indexOf(n)) for (d =
                                                                                G(d), t[n] = [], c = 0; c < d.length; c++) h[n][c] && (t[n][c] = {}, g(d[c], h[n][c], t[n][c], e + 1)); else I(d) ? (t[n] = u(d) ? [] : {}, g(d, h[n] || {}, t[n], e + 1)) : t[n] = "undefined" === typeof h[n] ? null : h[n]
                })
            }

            var r = this, h = {};
            g(d, this.options, h, 0);
            return h
        }
    });
    S(r, "masters/highcharts.src.js", [r["parts/Globals.js"]], function (d) {
        return d
    });
    r["masters/highcharts.src.js"]._modules = r;
    return r["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map
