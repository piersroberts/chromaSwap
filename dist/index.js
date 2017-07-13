(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function(require, module, exports) {
        "use strict";
        var _slicedToArray = (function() {
          function a(a, b) {
            var c = [],
              d = !0,
              e = !1,
              f = void 0;
            try {
              for (
                var g, h = a[Symbol.iterator]();
                !(d = (g = h.next()).done) &&
                (c.push(g.value), !(b && c.length === b));
                d = !0
              );
            } catch (a) {
              (e = !0), (f = a);
            } finally {
              try {
                !d && h["return"] && h["return"]();
              } finally {
                if (e) throw f;
              }
            }
            return c;
          }
          return function(b, c) {
            if (Array.isArray(b)) return b;
            if (Symbol.iterator in Object(b)) return a(b, c);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          };
        })();
        Object.defineProperty(exports, "__esModule", { value: !0 });
        function hexToRgb(a) {
          var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            c = a.replace(b, function(a, c, d, e) {
              return c + c + d + d + e + e;
            }),
            d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
          return d
            ? {
                r: parseInt(d[1], 16),
                g: parseInt(d[2], 16),
                b: parseInt(d[3], 16)
              }
            : null;
        }
        function rgbToHsl(a, c, e) {
          var f,
            h,
            i = a / 255,
            j = c / 255,
            g = e / 255,
            b = Math.max(i, j, g),
            k = Math.min(i, j, g),
            m = (b + k) / 2;
          if (b === k) (f = 0), (h = 0);
          else {
            var l = b - k;
            switch (((h = 0.5 < m ? l / (2 - b - k) : l / (b + k)), b)) {
              case i:
                f = (j - g) / l + (j < g ? 6 : 0);
                break;
              case j:
                f = (g - i) / l + 2;
                break;
              case g:
                f = (i - j) / l + 4;
                break;
              default:
            }
            f /= 6;
          }
          return [f, h, m];
        }
        function chromaSwap(a) {
          var b = a,
            c = b.getContext("2d"),
            d = new Image();
          (d.onload = function() {
            (b.width = d.width), (b.height = d.height), c.drawImage(d, 0, 0);
            for (
              var j = c.getImageData(0, 0, c.canvas.width, c.canvas.height),
                k = hexToRgb(b.dataset.key),
                l = parseFloat(b.dataset.tolerance),
                m = rgbToHsl(k.r, k.g, k.b),
                o = _slicedToArray(m, 3),
                p = o[0],
                q = o[1],
                r = o[2],
                s = 0,
                i = j.data.length;
              s < i;
              s += 4
            ) {
              var a = rgbToHsl(j.data[s], j.data[s + 1], j.data[s + 2]),
                e = _slicedToArray(a, 3),
                f = e[0],
                g = e[1],
                h = e[2];
              f > p - l &&
                f < p + l &&
                0.1 < g &&
                (
                  (j.data[s + 3] =
                    255 - j.data[s + 1] + j.data[s] + j.data[s + 2]),
                  (j.data[s] = 255 * h),
                  (j.data[s + 1] = 255 * h),
                  (j.data[s + 2] = 255 * h)
                );
            }
            c.putImageData(imageData, 0, 0);
          }), (d.src = b.dataset.src);
        }
        exports.chromaSwap = chromaSwap;
      },
      {}
    ]
  },
  {},
  [1]
);
