(function () {
  function C() {
    if (!D && document.body) {
      D = !0;
      var a = document.body,
        b = document.documentElement,
        d = window.innerHeight,
        c = a.scrollHeight;
      l = 0 <= document.compatMode.indexOf("CSS") ? b : a;
      m = a;
      f.keyboardSupport && window.addEventListener("keydown", M, !1);
      if (top != self) v = !0;
      else if (ca && c > d && (a.offsetHeight <= d || b.offsetHeight <= d)) {
        var e = document.createElement("div");
        e.style.cssText =
          "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
          l.scrollHeight +
          "px";
        document.body.appendChild(e);
        var g;
        w = function () {
          g ||
            (g = setTimeout(function () {
              e.style.height = "0";
              e.style.height = l.scrollHeight + "px";
              g = null;
            }, 500));
        };
        setTimeout(w, 10);
        window.addEventListener("resize", w, !1);
        z = new da(w);
        z.observe(a, { attributes: !0, childList: !0, characterData: !1 });
        l.offsetHeight <= d &&
          ((d = document.createElement("div")),
          (d.style.clear = "both"),
          a.appendChild(d));
      }
      f.fixedBackground ||
        ((a.style.backgroundAttachment = "scroll"),
        (b.style.backgroundAttachment = "scroll"));
    }
  }
  function N(a, b, d) {
    ea(b, d);
    if (1 != f.accelerationMax) {
      var c = Date.now() - E;
      c < f.accelerationDelta &&
        ((c = (1 + 50 / c) / 2),
        1 < c && ((c = Math.min(c, f.accelerationMax)), (b *= c), (d *= c)));
      E = Date.now();
    }
    t.push({
      x: b,
      y: d,
      lastX: 0 > b ? 0.99 : -0.99,
      lastY: 0 > d ? 0.99 : -0.99,
      start: Date.now(),
    });
    if (!F) {
      c = O();
      var e = a === c || a === document.body;
      null == a.$scrollBehavior &&
        fa(a) &&
        ((a.$scrollBehavior = a.style.scrollBehavior),
        (a.style.scrollBehavior = "auto"));
      var g = function (c) {
        c = Date.now();
        for (var k = 0, l = 0, h = 0; h < t.length; h++) {
          var n = t[h],
            p = c - n.start,
            m = p >= f.animationTime,
            q = m ? 1 : p / f.animationTime;
          f.pulseAlgorithm &&
            ((p = q),
            1 <= p
              ? (q = 1)
              : 0 >= p
                ? (q = 0)
                : (1 == f.pulseNormalize && (f.pulseNormalize /= P(1)),
                  (q = P(p))));
          p = (n.x * q - n.lastX) >> 0;
          q = (n.y * q - n.lastY) >> 0;
          k += p;
          l += q;
          n.lastX += p;
          n.lastY += q;
          m && (t.splice(h, 1), h--);
        }
        e
          ? window.scrollBy(k, l)
          : (k && (a.scrollLeft += k), l && (a.scrollTop += l));
        b || d || (t = []);
        t.length
          ? Q(g, a, 1e3 / f.frameRate + 1)
          : ((F = !1),
            null != a.$scrollBehavior &&
              ((a.style.scrollBehavior = a.$scrollBehavior),
              (a.$scrollBehavior = null)));
      };
      Q(g, a, 0);
      F = !0;
    }
  }
  function R(a) {
    D || C();
    var b = a.target;
    if (
      a.defaultPrevented ||
      a.ctrlKey ||
      r(m, "embed") ||
      (r(b, "embed") && /\.pdf/i.test(b.src)) ||
      r(m, "object") ||
      b.shadowRoot
    )
      return !0;
    var d = -a.wheelDeltaX || a.deltaX || 0,
      c = -a.wheelDeltaY || a.deltaY || 0;
    ha &&
      (a.wheelDeltaX &&
        x(a.wheelDeltaX, 120) &&
        (d = (a.wheelDeltaX / Math.abs(a.wheelDeltaX)) * -120),
      a.wheelDeltaY &&
        x(a.wheelDeltaY, 120) &&
        (c = (a.wheelDeltaY / Math.abs(a.wheelDeltaY)) * -120));
    d || c || (c = -a.wheelDelta || 0);
    1 === a.deltaMode && ((d *= 40), (c *= 40));
    b = S(b);
    if (!b)
      return v && G
        ? (Object.defineProperty(a, "target", { value: window.frameElement }),
          parent.wheel(a))
        : !0;
    if (ia(c)) return !0;
    1.2 < Math.abs(d) && (d *= f.stepSize / 120);
    1.2 < Math.abs(c) && (c *= f.stepSize / 120);
    N(b, d, c);
    a.preventDefault();
    T();
  }
  function M(a) {
    var b = a.target,
      d =
        a.ctrlKey ||
        a.altKey ||
        a.metaKey ||
        (a.shiftKey && a.keyCode !== g.spacebar);
    document.body.contains(m) || (m = document.activeElement);
    var c = /^(textarea|select|embed|object)$/i,
      e = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (
      !(c =
        a.defaultPrevented ||
        c.test(b.nodeName) ||
        (r(b, "input") && !e.test(b.type)) ||
        r(m, "video"))
    ) {
      c = a.target;
      var h = !1;
      if (-1 != document.URL.indexOf("www.youtube.com/watch")) {
        do
          if ((h = c.classList && c.classList.contains("html5-video-controls")))
            break;
        while ((c = c.parentNode));
      }
      c = h;
    }
    if (
      c ||
      b.isContentEditable ||
      d ||
      ((r(b, "button") || (r(b, "input") && e.test(b.type))) &&
        a.keyCode === g.spacebar) ||
      (r(b, "input") && "radio" == b.type && ja[a.keyCode])
    )
      return !0;
    c = b = 0;
    d = S(m);
    if (!d) return v && G ? parent.keydown(a) : !0;
    e = d.clientHeight;
    d == document.body && (e = window.innerHeight);
    switch (a.keyCode) {
      case g.up:
        c = -f.arrowScroll;
        break;
      case g.down:
        c = f.arrowScroll;
        break;
      case g.spacebar:
        c = a.shiftKey ? 1 : -1;
        c = -c * e * 0.9;
        break;
      case g.pageup:
        c = 0.9 * -e;
        break;
      case g.pagedown:
        c = 0.9 * e;
        break;
      case g.home:
        d == document.body &&
          document.scrollingElement &&
          (d = document.scrollingElement);
        c = -d.scrollTop;
        break;
      case g.end:
        e = d.scrollHeight - d.scrollTop - e;
        c = 0 < e ? e + 10 : 0;
        break;
      case g.left:
        b = -f.arrowScroll;
        break;
      case g.right:
        b = f.arrowScroll;
        break;
      default:
        return !0;
    }
    N(d, b, c);
    a.preventDefault();
    T();
  }
  function U(a) {
    m = a.target;
  }
  function T() {
    clearTimeout(V);
    V = setInterval(function () {
      W = H = A = {};
    }, 1e3);
  }
  function I(a, b, d) {
    d = d ? W : H;
    for (var c = a.length; c--; ) d[J(a[c])] = b;
    return b;
  }
  function S(a) {
    var b = [],
      d = document.body,
      c = l.scrollHeight;
    do {
      var e = H[J(a)];
      if (e) return I(b, e);
      b.push(a);
      if (c === a.scrollHeight) {
        if (
          ((e = (X(l) && X(d)) || Y(l)),
          (v && l.clientHeight + 10 < l.scrollHeight) || (!v && e))
        )
          return I(b, O());
      } else if (a.clientHeight + 10 < a.scrollHeight && Y(a)) return I(b, a);
    } while ((a = a.parentElement));
  }
  function X(a) {
    return "hidden" !== getComputedStyle(a, "").getPropertyValue("overflow-y");
  }
  function Y(a) {
    a = getComputedStyle(a, "").getPropertyValue("overflow-y");
    return "scroll" === a || "auto" === a;
  }
  function fa(a) {
    var b = J(a);
    null == A[b] &&
      ((a = getComputedStyle(a, "")["scroll-behavior"]),
      (A[b] = "smooth" == a));
    return A[b];
  }
  function r(a, b) {
    return a && (a.nodeName || "").toLowerCase() === b.toLowerCase();
  }
  function ea(a, b) {
    a = 0 < a ? 1 : -1;
    b = 0 < b ? 1 : -1;
    if (B.x !== a || B.y !== b) ((B.x = a), (B.y = b), (t = []), (E = 0));
  }
  function ia(a) {
    if (a) {
      h.length || (h = [a, a, a]);
      a = Math.abs(a);
      h.push(a);
      h.shift();
      clearTimeout(Z);
      Z = setTimeout(function () {
        try {
          localStorage.SS_deltaBuffer = h.join(",");
        } catch (d) {}
      }, 1e3);
      var b = 120 < a && K(a);
      b = !K(120) && !K(100) && !b;
      return 50 > a ? !0 : b;
    }
  }
  function x(a, b) {
    return Math.floor(a / b) == a / b;
  }
  function K(a) {
    return x(h[0], a) && x(h[1], a) && x(h[2], a);
  }
  function P(a) {
    a *= f.pulseScale;
    if (1 > a) var b = a - (1 - Math.exp(-a));
    else ((b = Math.exp(-1)), (a = 1 - Math.exp(-(a - 1))), (b += a * (1 - b)));
    return b * f.pulseNormalize;
  }
  function y(a) {
    for (var b in a) aa.hasOwnProperty(b) && (f[b] = a[b]);
  }
  var aa = {
      frameRate: 150,
      animationTime: 400,
      stepSize: 100,
      pulseAlgorithm: !0,
      pulseScale: 4,
      pulseNormalize: 1,
      accelerationDelta: 50,
      accelerationMax: 3,
      keyboardSupport: !0,
      arrowScroll: 50,
      fixedBackground: !0,
      excluded: "",
    },
    f = aa,
    v = !1,
    B = { x: 0, y: 0 },
    D = !1,
    l = document.documentElement,
    m,
    z,
    w,
    h = [],
    Z,
    ha = /^Mac/.test(navigator.platform),
    g = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
    },
    ja = { 37: 1, 38: 1, 39: 1, 40: 1 },
    t = [],
    F = !1,
    E = Date.now(),
    J = (function () {
      var a = 0;
      return function (b) {
        return b.uniqueID || (b.uniqueID = a++);
      };
    })(),
    W = {},
    H = {},
    V,
    A = {};
  if (window.localStorage && localStorage.SS_deltaBuffer)
    try {
      h = localStorage.SS_deltaBuffer.split(",");
    } catch (a) {}
  var Q = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (a, b, d) {
          window.setTimeout(a, d || 1e3 / 60);
        }
      );
    })(),
    da =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver,
    O = (function () {
      var a = document.scrollingElement;
      return function () {
        if (!a) {
          var b = document.createElement("div");
          b.style.cssText = "height:10000px;width:1px;";
          document.body.appendChild(b);
          var d = document.body.scrollTop;
          window.scrollBy(0, 3);
          a =
            document.body.scrollTop != d
              ? document.body
              : document.documentElement;
          window.scrollBy(0, -3);
          document.body.removeChild(b);
        }
        return a;
      };
    })(),
    k = window.navigator.userAgent,
    u = /Edge/.test(k),
    G = /chrome/i.test(k) && !u;
  u = /safari/i.test(k) && !u;
  var ka = /mobile/i.test(k),
    la = /Windows NT 6.1/i.test(k) && /rv:11/i.test(k),
    ca = u && (/Version\/8/i.test(k) || /Version\/9/i.test(k));
  k = (G || u || la) && !ka;
  var ba = !1;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          ba = !0;
        },
      }),
    );
  } catch (a) {}
  u = ba ? { passive: !1 } : !1;
  var L = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
  L &&
    k &&
    (window.addEventListener(L, R, u || !1),
    window.addEventListener("mousedown", U, !1),
    window.addEventListener("load", C, !1));
  y.destroy = function () {
    z && z.disconnect();
    window.removeEventListener(L, R, !1);
    window.removeEventListener("mousedown", U, !1);
    window.removeEventListener("keydown", M, !1);
    window.removeEventListener("resize", w, !1);
    window.removeEventListener("load", C, !1);
  };
  window.SmoothScrollOptions && y(window.SmoothScrollOptions);
  "function" === typeof define && define.amd
    ? define(function () {
        return y;
      })
    : "object" == typeof exports
      ? (module.exports = y)
      : (window.SmoothScroll = y);
})();
