/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */ /*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
function supportsSVG() {
    return !!document.createElementNS && !! document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
}
window.matchMedia = window.matchMedia || function(e) {
    "use strict";
    var t, n = e.documentElement,
        r = n.firstElementChild || n.firstChild,
        i = e.createElement("body"),
        s = e.createElement("div");
    return s.id = "mq-test-1", s.style.cssText = "position:absolute;top:-100em", i.style.background = "none", i.appendChild(s),
    function(e) {
        return s.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', n.insertBefore(i, r), t = 42 === s.offsetWidth, n.removeChild(i), {
            matches: t,
            media: e
        }
    }
}(document);
(function(e) {
    "use strict";

    function t() {
        E(!0)
    }
    var n = {};
    if (e.respond = n, n.update = function() {}, n.mediaQueriesSupported = e.matchMedia && e.matchMedia("only all").matches, !n.mediaQueriesSupported) {
        var r, i, s, o = e.document,
            u = o.documentElement,
            a = [],
            f = [],
            l = [],
            c = {}, h = 30,
            p = o.getElementsByTagName("head")[0] || u,
            d = o.getElementsByTagName("base")[0],
            v = p.getElementsByTagName("link"),
            m = [],
            g = function() {
                for (var t = 0; v.length > t; t++) {
                    var n = v[t],
                        r = n.href,
                        i = n.media,
                        s = n.rel && "stylesheet" === n.rel.toLowerCase();
                    r && s && !c[r] && (n.styleSheet && n.styleSheet.rawCssText ? (b(n.styleSheet.rawCssText, r, i), c[r] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(r) && !d || r.replace(RegExp.$1, "").split("/")[0] === e.location.host) && m.push({
                        href: r,
                        media: i
                    }))
                }
                y()
            }, y = function() {
                if (m.length) {
                    var t = m.shift();
                    S(t.href, function(n) {
                        b(n, t.href, t.media), c[t.href] = !0, e.setTimeout(function() {
                            y()
                        }, 0)
                    })
                }
            }, b = function(e, t, n) {
                var r = e.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                    i = r && r.length || 0;
                t = t.substring(0, t.lastIndexOf("/"));
                var s = function(e) {
                    return e.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + t + "$2$3")
                }, o = !i && n;
                t.length && (t += "/"), o && (i = 1);
                for (var u = 0; i > u; u++) {
                    var l, c, h, p;
                    o ? (l = n, f.push(s(e))) : (l = r[u].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1, f.push(RegExp.$2 && s(RegExp.$2))), h = l.split(","), p = h.length;
                    for (var d = 0; p > d; d++) c = h[d], a.push({
                        media: c.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                        rules: f.length - 1,
                        hasquery: c.indexOf("(") > -1,
                        minw: c.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: c.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
                }
                E()
            }, w = function() {
                var e, t = o.createElement("div"),
                    n = o.body,
                    r = !1;
                return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = r = o.createElement("body"), n.style.background = "none"), n.appendChild(t), u.insertBefore(n, u.firstChild), e = t.offsetWidth, r ? u.removeChild(n) : n.removeChild(t), e = s = parseFloat(e)
            }, E = function(t) {
                var n = "clientWidth",
                    c = u[n],
                    d = "CSS1Compat" === o.compatMode && c || o.body[n] || c,
                    m = {}, g = v[v.length - 1],
                    y = (new Date).getTime();
                if (t && r && h > y - r) return e.clearTimeout(i), i = e.setTimeout(E, h), void 0;
                r = y;
                for (var b in a)
                    if (a.hasOwnProperty(b)) {
                        var S = a[b],
                            x = S.minw,
                            T = S.maxw,
                            N = null === x,
                            C = null === T,
                            k = "em";
                        x && (x = parseFloat(x) * (x.indexOf(k) > -1 ? s || w() : 1)), T && (T = parseFloat(T) * (T.indexOf(k) > -1 ? s || w() : 1)), S.hasquery && (N && C || !(N || d >= x) || !(C || T >= d)) || (m[S.media] || (m[S.media] = []), m[S.media].push(f[S.rules]))
                    }
                for (var L in l) l.hasOwnProperty(L) && l[L] && l[L].parentNode === p && p.removeChild(l[L]);
                for (var A in m)
                    if (m.hasOwnProperty(A)) {
                        var O = o.createElement("style"),
                            M = m[A].join("\n");
                        O.type = "text/css", O.media = A, p.insertBefore(O, g.nextSibling), O.styleSheet ? O.styleSheet.cssText = M : O.appendChild(o.createTextNode(M)), l.push(O)
                    }
            }, S = function(e, t) {
                var n = x();
                n && (n.open("GET", e, !0), n.onreadystatechange = function() {
                    4 !== n.readyState || 200 !== n.status && 304 !== n.status || t(n.responseText)
                }, 4 !== n.readyState && n.send(null))
            }, x = function() {
                var t = !1;
                try {
                    t = new e.XMLHttpRequest
                } catch (n) {
                    t = new e.ActiveXObject("Microsoft.XMLHTTP")
                }
                return function() {
                    return t
                }
            }();
        g(), n.update = g, e.addEventListener ? e.addEventListener("resize", t, !1) : e.attachEvent && e.attachEvent("onresize", t)
    }
})(this);
(function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var n = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.createElement("div"),
                i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
            r.className = "fit-vids-style";
            r.id = "fit-vids-style";
            r.style.display = "none";
            r.innerHTML = "&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>";
            i.parentNode.insertBefore(r, i)
        }
        t && e.extend(n, t);
        return this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            n.customSelector && t.push(n.customSelector);
            var r = e(this).find(t.join(","));
            r = r.not("object object");
            r.each(function() {
                var t = e(this);
                if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length) return;
                var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                    r = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
                    i = n / r;
                if (!t.attr("id")) {
                    var s = "fitvid" + Math.floor(Math.random() * 999999);
                    t.attr("id", s)
                }
                t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%");
                t.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
(function() {
    var e = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent),
        t = window.soundcloud = {
            version: "0.1",
            debug: !1,
            _listeners: [],
            _redispatch: function(e, t, n) {
                var r, i = this._listeners[e] || [],
                    s = "soundcloud:" + e;
                try {
                    r = this.getPlayer(t)
                } catch (o) {
                    this.debug && window.console && console.error("unable to dispatch widget event " + e + " for the widget id " + t, n, o);
                    return
                }
                window.jQuery ? jQuery(r).trigger(s, [n]) : window.Prototype && $(r).fire(s, n);
                for (var u = 0, a = i.length; u < a; u += 1) i[u].apply(r, [r, n]);
                this.debug && window.console && console.log(s, e, t, n)
            },
            addEventListener: function(e, t) {
                this._listeners[e] || (this._listeners[e] = []);
                this._listeners[e].push(t)
            },
            removeEventListener: function(e, t) {
                var n = this._listeners[e] || [];
                for (var r = 0, i = n.length; r < i; r += 1) n[r] === t && n.splice(r, 1)
            },
            getPlayer: function(t) {
                var n;
                try {
                    if (!t) throw "The SoundCloud Widget DOM object needs an id atribute, please refer to SoundCloud Widget API documentation.";
                    n = e ? window[t] : document[t];
                    if (n) {
                        if (n.api_getFlashId) return n;
                        throw "The SoundCloud Widget External Interface is not accessible. Check that allowscriptaccess is set to 'always' in embed code"
                    }
                    throw "The SoundCloud Widget with an id " + t + " couldn't be found"
                } catch (r) {
                    console && console.error && console.error(r);
                    throw r
                }
            },
            onPlayerReady: function(e, t) {
                this._redispatch("onPlayerReady", e, t)
            },
            onMediaStart: function(e, t) {
                this._redispatch("onMediaStart", e, t)
            },
            onMediaEnd: function(e, t) {
                this._redispatch("onMediaEnd", e, t)
            },
            onMediaPlay: function(e, t) {
                this._redispatch("onMediaPlay", e, t)
            },
            onMediaPause: function(e, t) {
                this._redispatch("onMediaPause", e, t)
            },
            onMediaBuffering: function(e, t) {
                this._redispatch("onMediaBuffering", e, t)
            },
            onMediaSeek: function(e, t) {
                this._redispatch("onMediaSeek", e, t)
            },
            onMediaDoneBuffering: function(e, t) {
                this._redispatch("onMediaDoneBuffering", e, t)
            },
            onPlayerError: function(e, t) {
                this._redispatch("onPlayerError", e, t)
            }
        }
})();
(function(e) {
    var t = function(e) {
        var t = function(e) {
            return {
                h: Math.floor(e / 36e5),
                m: Math.floor(e / 6e4 % 60),
                s: Math.floor(e / 1e3 % 60)
            }
        }(e),
            n = [];
        t.h > 0 && n.push(t.h);
        n.push(t.m < 10 && t.h > 0 ? "0" + t.m : t.m);
        n.push(t.s < 10 ? "0" + t.s : t.s);
        return n.join(".")
    }, n = function(e) {
            e.sort(function() {
                return 1 - Math.floor(Math.random() * 3)
            });
            return e
        }, r = !0,
        i = !1,
        s = e(document),
        o = function(e) {
            try {
                r && window.console && window.console.log && window.console.log.apply(window.console, arguments)
            } catch (t) {}
        }, u = i ? "sandbox-soundcloud.com" : "soundcloud.com",
        a = document.location.protocol === "https:",
        f = function(e, t) {
            var n = (a || /^https/i.test(e) ? "https" : "http") + "://api." + u + "/resolve?url=",
                r = "format=json&consumer_key=" + t + "&callback=?";
            a && (e = e.replace(/^http:/, "https:"));
            return /api\./.test(e) ? e + "?" + r : n + e + "&" + r
        }, l = function() {
            var t = function() {
                var e = !1;
                try {
                    var t = new Audio;
                    e = t.canPlayType && /maybe|probably/.test(t.canPlayType("audio/mpeg"))
                } catch (n) {}
                return e
            }(),
                n = {
                    onReady: function() {
                        s.trigger("scPlayer:onAudioReady")
                    },
                    onPlay: function() {
                        s.trigger("scPlayer:onMediaPlay")
                    },
                    onPause: function() {
                        s.trigger("scPlayer:onMediaPause")
                    },
                    onEnd: function() {
                        s.trigger("scPlayer:onMediaEnd")
                    },
                    onBuffer: function(e) {
                        s.trigger({
                            type: "scPlayer:onMediaBuffering",
                            percent: e
                        })
                    }
                }, r = function() {
                    var t = new Audio,
                        r = function(e) {
                            var t = e.target,
                                r = (t.buffered.length && t.buffered.end(0)) / t.duration * 100;
                            n.onBuffer(r);
                            t.currentTime === t.duration && n.onEnd()
                        }, i = function(e) {
                            var t = e.target,
                                r = (t.buffered.length && t.buffered.end(0)) / t.duration * 100;
                            n.onBuffer(r)
                        };
                    e('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(t);
                    t.addEventListener("play", n.onPlay, !1);
                    t.addEventListener("pause", n.onPause, !1);
                    t.addEventListener("timeupdate", r, !1);
                    t.addEventListener("progress", i, !1);
                    return {
                        load: function(e, n) {
                            t.pause();
                            t.src = e.stream_url + (/\?/.test(e.stream_url) ? "&" : "?") + "consumer_key=" + n;
                            t.load();
                            t.play()
                        },
                        play: function() {
                            t.play()
                        },
                        pause: function() {
                            t.pause()
                        },
                        stop: function() {
                            if (t.currentTime) {
                                t.currentTime = 0;
                                t.pause()
                            }
                        },
                        seek: function(e) {
                            t.currentTime = t.duration * e;
                            t.play()
                        },
                        getDuration: function() {
                            return t.duration * 1e3
                        },
                        getPosition: function() {
                            return t.currentTime * 1e3
                        },
                        setVolume: function(e) {
                            t.volume = e / 100
                        }
                    }
                }, i = function() {
                    var t = "scPlayerEngine",
                        r, i = function(n) {
                            var r = (a ? "https" : "http") + "://player." + u + "/player.swf?url=" + n + "&amp;enable_api=true&amp;player_type=engine&amp;object_id=" + t;
                            return e.browser.msie ? '<object height="100%" width="100%" id="' + t + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + r + '">' + '<param name="movie" value="' + r + '" />' + '<param name="allowscriptaccess" value="always" />' + "</object>" : '<object height="100%" width="100%" id="' + t + '">' + '<embed allowscriptaccess="always" height="100%" width="100%" src="' + r + '" type="application/x-shockwave-flash" name="' + t + '" />' + "</object>"
                        };
                    soundcloud.addEventListener("onPlayerReady", function(e, i) {
                        r = soundcloud.getPlayer(t);
                        n.onReady()
                    });
                    soundcloud.addEventListener("onMediaEnd", n.onEnd);
                    soundcloud.addEventListener("onMediaBuffering", function(e, t) {
                        n.onBuffer(t.percent)
                    });
                    soundcloud.addEventListener("onMediaPlay", n.onPlay);
                    soundcloud.addEventListener("onMediaPause", n.onPause);
                    return {
                        load: function(t) {
                            var n = t.uri;
                            r ? r.api_load(n) : e('<div class="sc-player-engine-container"></div>').appendTo(document.body).html(i(n))
                        },
                        play: function() {
                            r && r.api_play()
                        },
                        pause: function() {
                            r && r.api_pause()
                        },
                        stop: function() {
                            r && r.api_stop()
                        },
                        seek: function(e) {
                            r && r.api_seekTo(r.api_getTrackDuration() * e)
                        },
                        getDuration: function() {
                            return r && r.api_getTrackDuration && r.api_getTrackDuration() * 1e3
                        },
                        getPosition: function() {
                            return r && r.api_getTrackPosition && r.api_getTrackPosition() * 1e3
                        },
                        setVolume: function(e) {
                            r && r.api_setVolume && r.api_setVolume(e)
                        }
                    }
                };
            return t ? r() : i()
        }(),
        c, h = !1,
        p = [],
        d = {}, v, m = function(t, n, r) {
            var i = 0,
                s = {
                    node: t,
                    tracks: []
                }, o = function(t) {
                    var r = f(t.url, c);
                    e.getJSON(r, function(u) {
                        i += 1;
                        if (u.tracks) s.tracks = s.tracks.concat(u.tracks);
                        else if (u.duration) {
                            u.permalink_url = t.url;
                            s.tracks.push(u)
                        } else u.creator ? n.push({
                            url: u.uri + "/tracks"
                        }) : u.username ? /favorites/.test(t.url) ? n.push({
                            url: u.uri + "/favorites"
                        }) : n.push({
                            url: u.uri + "/tracks"
                        }) : e.isArray(u) && (s.tracks = s.tracks.concat(u));
                        n[i] ? o(n[i]) : s.node.trigger({
                            type: "onTrackDataLoaded",
                            playerObj: s,
                            url: r
                        })
                    })
                };
            c = r;
            p.push(s);
            o(n[i])
        }, g = function(e, t) {
            return t ? '<div class="sc-loading-artwork">Loading Artwork</div>' : e.artwork_url ? '<img src="' + e.artwork_url.replace("-large", "-t300x300") + '"/>' : '<div class="sc-no-artwork">No Artwork</div>'
        }, y = function(n, r) {
            e(".sc-info", n).each(function(t) {
                e("h3", this).html('<a href="' + r.permalink_url + '">' + r.title + "</a>");
                e("h4", this).html('by <a href="' + r.user.permalink_url + '">' + r.user.username + "</a>");
                e("p", this).html(r.description || "no Description")
            });
            e(".sc-artwork-list li", n).each(function(t) {
                var n = e(this),
                    i = n.data("sc-track");
                i === r ? n.addClass("active").find(".sc-loading-artwork").each(function(t) {
                    e(this).removeClass("sc-loading-artwork").html(g(r, !1))
                }) : n.removeClass("active")
            });
            e(".sc-duration", n).html(t(r.duration));
            e(".sc-waveform-container", n).html('<img src="' + r.waveform_url + '" />');
            n.trigger("onPlayerTrackSwitch.scPlayer", [r])
        }, b = function(e) {
            var t = e.permalink_url;
            if (v === t) l.play();
            else {
                v = t;
                l.load(e, c)
            }
        }, w = function(t) {
            return p[e(t).data("sc-player").id]
        }, E = function(t, n) {
            n && e("div.sc-player.playing").removeClass("playing");
            e(t).toggleClass("playing", n).trigger(n ? "onPlayerPlay" : "onPlayerPause")
        }, S = function(t, n) {
            var r = w(t).tracks[n || 0];
            y(t, r);
            d = {
                $buffer: e(".sc-buffer", t),
                $played: e(".sc-played", t),
                position: e(".sc-position", t)[0]
            };
            E(t, !0);
            b(r)
        }, x = function(e) {
            E(e, !1);
            l.pause()
        }, T = function() {
            var e = d.$played.closest(".sc-player"),
                n;
            d.$played.css("width", "0%");
            d.position.innerHTML = t(0);
            E(e, !1);
            l.stop();
            e.trigger("onPlayerTrackFinish")
        }, N = function(t, n) {
            l.seek(n);
            e(t).trigger("onPlayerSeek")
        }, C = function(t) {
            var n = e(t);
            o("track finished get the next one");
            $nextItem = e(".sc-trackslist li.active", n).next("li");
            $nextItem.length || ($nextItem = n.nextAll("div.sc-player:first").find(".sc-trackslist li.active"));
            $nextItem.click()
        }, k = function() {
            var e = 80,
                t = document.cookie.split(";"),
                n = new RegExp("scPlayer_volume=(\\d+)");
            for (var r in t)
                if (n.test(t[r])) {
                    e = parseInt(t[r].match(n)[1], 10);
                    break
                }
            return e
        }(),
        L = function(e) {
            var t = Math.floor(e),
                n = new Date;
            n.setTime(n.getTime() + 31536e6);
            k = t;
            document.cookie = ["scPlayer_volume=", t, "; expires=", n.toUTCString(), '; path="/"'].join("");
            l.setVolume(k)
        }, A;
    s.bind("scPlayer:onAudioReady", function(e) {
        o("onPlayerReady: audio engine is ready");
        l.play();
        L(k)
    }).bind("scPlayer:onMediaPlay", function(e) {
        clearInterval(A);
        A = setInterval(function() {
            var e = l.getDuration(),
                n = l.getPosition(),
                r = n / e;
            d.$played.css("width", 100 * r + "%");
            d.position.innerHTML = t(n);
            s.trigger({
                type: "onMediaTimeUpdate.scPlayer",
                duration: e,
                position: n,
                relative: r
            })
        }, 500)
    }).bind("scPlayer:onMediaPause", function(e) {
        clearInterval(A);
        A = null
    }).bind("scPlayer:onVolumeChange", function(e) {
        L(e.volume)
    }).bind("scPlayer:onMediaEnd", function(e) {
        T()
    }).bind("scPlayer:onMediaBuffering", function(e) {
        d.$buffer.css("width", e.percent + "%")
    });
    e.scPlayer = function(r, i) {
        var s = e.extend({}, e.scPlayer.defaults, r),
            o = p.length,
            u = i && e(i),
            a = u[0].className.replace("sc-player", ""),
            f = s.links || e.map(e("a", u).add(u.filter("a")), function(e) {
                return {
                    url: e.href,
                    title: e.innerHTML
                }
            }),
            l = e('<div class="sc-player loading"></div>').data("sc-player", {
                id: o
            }),
            c = e('<ol class="sc-artwork-list"></ol>').appendTo(l),
            d = e('<div class="sc-info"><h3></h3><h4></h4><p></p><a href="#" class="sc-info-close">X</a></div>').appendTo(l),
            v = e('<div class="sc-controls"></div>').appendTo(l);
        (a || s.customClass) && l.addClass(a).addClass(s.customClass);
        l.find(".sc-controls").append('<a href="#play" class="sc-play">Play</a> <a href="#pause" class="sc-pause hidden">Pause</a>').end().append('<a href="#info" class="sc-info-toggle">Info</a>').append('<div class="sc-scrubber"></div>').find(".sc-scrubber").append('<div class="sc-volume-slider"><span class="sc-volume-status" style="width:' + k + '%"></span></div>').append('<div class="sc-time-span"><div class="sc-waveform-container"></div><div class="sc-buffer"></div><div class="sc-played"></div></div>').append('<div class="sc-time-indicators"><span class="sc-position"></span> | <span class="sc-duration"></span></div>');
        $list = e('<ol class="sc-trackslist"></ol>').appendTo(l);
        m(l, f, s.apiKey);
        l.bind("onTrackDataLoaded.scPlayer", function(r) {
            var i = r.playerObj.tracks;
            s.randomize && (i = n(i));
            e.each(i, function(n, r) {
                var i = n === 0;
                e('<li><a href="' + r.permalink_url + '">' + r.title + '</a><span class="sc-track-duration">' + t(r.duration) + "</span></li>").data("sc-track", {
                    id: n
                }).toggleClass("active", i).appendTo($list);
                e("<li></li>").append(g(r, n >= s.loadArtworks)).appendTo(c).toggleClass("active", i).data("sc-track", r)
            });
            l.each(function() {
                e.isFunction(s.beforeRender) && s.beforeRender.call(this, i)
            });
            e(".sc-duration", l)[0].innerHTML = t(i[0].duration);
            e(".sc-position", l)[0].innerHTML = t(0);
            y(l, i[0]);
            s.continuePlayback && l.bind("onPlayerTrackFinish", function(e) {
                C(l)
            });
            l.removeClass("loading").trigger("onPlayerInit");
            if (s.autoPlay && !h) {
                S(l);
                h = !0
            }
        });
        u.each(function(t) {
            e(this).replaceWith(l)
        });
        return l
    };
    e.scPlayer.stopAll = function() {
        e(".sc-player.playing a.sc-pause").click()
    };
    e.scPlayer.destroy = function() {
        e(".sc-player, .sc-player-engine-container").remove()
    };
    e.fn.scPlayer = function(t) {
        h = !1;
        this.each(function() {
            e.scPlayer(t, this)
        });
        return this
    };
    e.scPlayer.defaults = e.fn.scPlayer.defaults = {
        customClass: null,
        beforeRender: function(t) {
            var n = e(this)
        },
        onDomReady: function() {
            e("a.sc-player, div.sc-player").scPlayer()
        },
        autoPlay: !1,
        continuePlayback: !0,
        randomize: !1,
        loadArtworks: 5,
        apiKey: "htuiRd1JP11Ww0X72T1C3g"
    };
    e(document).on("click", "a.sc-play, a.sc-pause", function(t) {
        var n = e(this).closest(".sc-player").find("ol.sc-trackslist");
        n.find("li.active").click();
        return !1
    });
    e(document).on("click", "a.sc-info-toggle, a.sc-info-close", function(t) {
        var n = e(this);
        n.closest(".sc-player").find(".sc-info").toggleClass("active").end().find("a.sc-info-toggle").toggleClass("active");
        return !1
    });
    e(document).on("click", ".sc-trackslist li", function(t) {
        var n = e(this),
            r = n.closest(".sc-player"),
            i = n.data("sc-track").id,
            s = r.is(":not(.playing)") || n.is(":not(.active)");
        s ? S(r, i) : x(r);
        n.addClass("active").siblings("li").removeClass("active");
        e(".artworks li", r).each(function(t) {
            e(this).toggleClass("active", t === i)
        });
        return !1
    });
    var O = function(t, n) {
        var r = e(t).closest(".sc-time-span"),
            i = r.find(".sc-buffer"),
            s = r.find(".sc-waveform-container img"),
            o = r.closest(".sc-player"),
            u = Math.min(i.width(), n - s.offset().left) / s.width();
        N(o, u)
    }, M = function(e) {
            if (e.targetTouches.length === 1) {
                O(e.target, e.targetTouches && e.targetTouches.length && e.targetTouches[0].clientX);
                e.preventDefault()
            }
        };
    e(document).on("click", ".sc-time-span", function(e) {
        O(this, e.pageX);
        return !1
    }).on("touchstart", ".sc-time-span", function(e) {
        this.addEventListener("touchmove", M, !1);
        e.originalEvent.preventDefault()
    }).on("touchend", ".sc-time-span", function(e) {
        this.removeEventListener("touchmove", M, !1);
        e.originalEvent.preventDefault()
    });
    var _ = function(t, n) {
        var r = e(t),
            i = r.offset().left,
            o = r.width(),
            u = function(e) {
                return Math.floor((e - i) / o * 100)
            }, a = function(e) {
                s.trigger({
                    type: "scPlayer:onVolumeChange",
                    volume: u(e.pageX)
                })
            };
        r.bind("mousemove.sc-player", a);
        a(n)
    }, D = function(t, n) {
            e(t).unbind("mousemove.sc-player")
        };
    e(document).on("mousedown", ".sc-volume-slider", function(e) {
        _(this, e)
    }).on("mouseup", ".sc-volume-slider", function(e) {
        D(this, e)
    });
    s.bind("scPlayer:onVolumeChange", function(t) {
        e("span.sc-volume-status").css({
            width: t.volume + "%"
        })
    });
    e(function() {
        e.isFunction(e.scPlayer.defaults.onDomReady) && e.scPlayer.defaults.onDomReady()
    })
})(jQuery);
(function(e, t, n, r) {
    function d(t, n) {
        this.element = t;
        this.options = e.extend({}, s, n);
        this._defaults = s;
        this._name = i;
        this.init()
    }
    var i = "stellar",
        s = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: !1,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            hideElement: function(e) {
                e.hide()
            },
            showElement: function(e) {
                e.show()
            }
        }, o = {
            scroll: {
                getLeft: function(e) {
                    return e.scrollLeft()
                },
                setLeft: function(e, t) {
                    e.scrollLeft(t)
                },
                getTop: function(e) {
                    return e.scrollTop()
                },
                setTop: function(e, t) {
                    e.scrollTop(t)
                }
            },
            position: {
                getLeft: function(e) {
                    return parseInt(e.css("left"), 10) * -1
                },
                getTop: function(e) {
                    return parseInt(e.css("top"), 10) * -1
                }
            },
            margin: {
                getLeft: function(e) {
                    return parseInt(e.css("margin-left"), 10) * -1
                },
                getTop: function(e) {
                    return parseInt(e.css("margin-top"), 10) * -1
                }
            },
            transform: {
                getLeft: function(e) {
                    var t = getComputedStyle(e[0])[f];
                    return t !== "none" ? parseInt(t.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0
                },
                getTop: function(e) {
                    var t = getComputedStyle(e[0])[f];
                    return t !== "none" ? parseInt(t.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0
                }
            }
        }, u = {
            position: {
                setLeft: function(e, t) {
                    e.css("left", t)
                },
                setTop: function(e, t) {
                    e.css("top", t)
                }
            },
            transform: {
                setPosition: function(e, t, n, r, i) {
                    e[0].style[f] = "translate3d(" + (t - n) + "px, " + (r - i) + "px, 0)"
                }
            }
        }, a = function() {
            var t = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                n = e("script")[0].style,
                r = "",
                i;
            for (i in n)
                if (t.test(i)) {
                    r = i.match(t)[0];
                    break
                }
                "WebkitOpacity" in n && (r = "Webkit");
            "KhtmlOpacity" in n && (r = "Khtml");
            return function(e) {
                return r + (r.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e)
            }
        }(),
        f = a("transform"),
        l = e("<div />", {
            style: "background:#fff"
        }).css("background-position-x") !== r,
        c = l ? function(e, t, n) {
            e.css({
                "background-position-x": t,
                "background-position-y": n
            })
        } : function(e, t, n) {
            e.css("background-position", t + " " + n)
        }, h = l ? function(e) {
            return [e.css("background-position-x"), e.css("background-position-y")]
        } : function(e) {
            return e.css("background-position").split(" ")
        }, p = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
            setTimeout(e, 1e3 / 60)
        };
    d.prototype = {
        init: function() {
            this.options.name = i + "_" + Math.floor(Math.random() * 1e9);
            this._defineElements();
            this._defineGetters();
            this._defineSetters();
            this._handleWindowLoadAndResize();
            this._detectViewport();
            this.refresh({
                firstLoad: !0
            });
            this.options.scrollProperty === "scroll" ? this._handleScrollEvent() : this._startAnimationLoop()
        },
        _defineElements: function() {
            this.element === n.body && (this.element = t);
            this.$scrollElement = e(this.element);
            this.$element = this.element === t ? e("body") : this.$scrollElement;
            this.$viewportElement = this.options.viewportElement !== r ? e(this.options.viewportElement) : this.$scrollElement[0] === t || this.options.scrollProperty === "scroll" ? this.$scrollElement : this.$scrollElement.parent()
        },
        _defineGetters: function() {
            var e = this,
                t = o[e.options.scrollProperty];
            this._getScrollLeft = function() {
                return t.getLeft(e.$scrollElement)
            };
            this._getScrollTop = function() {
                return t.getTop(e.$scrollElement)
            }
        },
        _defineSetters: function() {
            var t = this,
                n = o[t.options.scrollProperty],
                r = u[t.options.positionProperty],
                i = n.setLeft,
                s = n.setTop;
            this._setScrollLeft = typeof i == "function" ? function(e) {
                i(t.$scrollElement, e)
            } : e.noop;
            this._setScrollTop = typeof s == "function" ? function(e) {
                s(t.$scrollElement, e)
            } : e.noop;
            this._setPosition = r.setPosition || function(e, n, i, s, o) {
                t.options.horizontalScrolling && r.setLeft(e, n, i);
                t.options.verticalScrolling && r.setTop(e, s, o)
            }
        },
        _handleWindowLoadAndResize: function() {
            var n = this,
                r = e(t);
            n.options.responsive && r.bind("load." + this.name, function() {
                n.refresh()
            });
            r.bind("resize." + this.name, function() {
                n._detectViewport();
                n.options.responsive && n.refresh()
            })
        },
        refresh: function(n) {
            var r = this,
                i = r._getScrollLeft(),
                s = r._getScrollTop();
            (!n || !n.firstLoad) && this._reset();
            this._setScrollLeft(0);
            this._setScrollTop(0);
            this._setOffsets();
            this._findParticles();
            this._findBackgrounds();
            n && n.firstLoad && /WebKit/.test(navigator.userAgent) && e(t).load(function() {
                var e = r._getScrollLeft(),
                    t = r._getScrollTop();
                r._setScrollLeft(e + 1);
                r._setScrollTop(t + 1);
                r._setScrollLeft(e);
                r._setScrollTop(t)
            });
            this._setScrollLeft(i);
            this._setScrollTop(s)
        },
        _detectViewport: function() {
            var e = this.$viewportElement.offset(),
                t = e !== null && e !== r;
            this.viewportWidth = this.$viewportElement.width();
            this.viewportHeight = this.$viewportElement.height();
            this.viewportOffsetTop = t ? e.top : 0;
            this.viewportOffsetLeft = t ? e.left : 0
        },
        _findParticles: function() {
            var t = this,
                n = this._getScrollLeft(),
                i = this._getScrollTop();
            if (this.particles !== r)
                for (var s = this.particles.length - 1; s >= 0; s--) this.particles[s].$element.data("stellar-elementIsActive", r);
            this.particles = [];
            if (!this.options.parallaxElements) return;
            this.$element.find("[data-stellar-ratio]").each(function(n) {
                var i = e(this),
                    s, o, u, a, f, l, c, h, p, d = 0,
                    v = 0,
                    m = 0,
                    g = 0;
                if (!i.data("stellar-elementIsActive")) i.data("stellar-elementIsActive", this);
                else if (i.data("stellar-elementIsActive") !== this) return;
                t.options.showElement(i);
                if (!i.data("stellar-startingLeft")) {
                    i.data("stellar-startingLeft", i.css("left"));
                    i.data("stellar-startingTop", i.css("top"))
                } else {
                    i.css("left", i.data("stellar-startingLeft"));
                    i.css("top", i.data("stellar-startingTop"))
                }
                u = i.position().left;
                a = i.position().top;
                f = i.css("margin-left") === "auto" ? 0 : parseInt(i.css("margin-left"), 10);
                l = i.css("margin-top") === "auto" ? 0 : parseInt(i.css("margin-top"), 10);
                h = i.offset().left - f;
                p = i.offset().top - l;
                i.parents().each(function() {
                    var t = e(this);
                    if (t.data("stellar-offset-parent") === !0) {
                        d = m;
                        v = g;
                        c = t;
                        return !1
                    }
                    m += t.position().left;
                    g += t.position().top
                });
                s = i.data("stellar-horizontal-offset") !== r ? i.data("stellar-horizontal-offset") : c !== r && c.data("stellar-horizontal-offset") !== r ? c.data("stellar-horizontal-offset") : t.horizontalOffset;
                o = i.data("stellar-vertical-offset") !== r ? i.data("stellar-vertical-offset") : c !== r && c.data("stellar-vertical-offset") !== r ? c.data("stellar-vertical-offset") : t.verticalOffset;
                t.particles.push({
                    $element: i,
                    $offsetParent: c,
                    isFixed: i.css("position") === "fixed",
                    horizontalOffset: s,
                    verticalOffset: o,
                    startingPositionLeft: u,
                    startingPositionTop: a,
                    startingOffsetLeft: h,
                    startingOffsetTop: p,
                    parentOffsetLeft: d,
                    parentOffsetTop: v,
                    stellarRatio: i.data("stellar-ratio") !== r ? i.data("stellar-ratio") : 1,
                    width: i.outerWidth(!0),
                    height: i.outerHeight(!0),
                    isHidden: !1
                })
            })
        },
        _findBackgrounds: function() {
            var t = this,
                n = this._getScrollLeft(),
                i = this._getScrollTop(),
                s;
            this.backgrounds = [];
            if (!this.options.parallaxBackgrounds) return;
            s = this.$element.find("[data-stellar-background-ratio]");
            this.$element.data("stellar-background-ratio") && (s = s.add(this.$element));
            s.each(function() {
                var s = e(this),
                    o = h(s),
                    u, a, f, l, p, d, v, m, g, y = 0,
                    b = 0,
                    w = 0,
                    E = 0;
                if (!s.data("stellar-backgroundIsActive")) s.data("stellar-backgroundIsActive", this);
                else if (s.data("stellar-backgroundIsActive") !== this) return;
                if (!s.data("stellar-backgroundStartingLeft")) {
                    s.data("stellar-backgroundStartingLeft", o[0]);
                    s.data("stellar-backgroundStartingTop", o[1])
                } else c(s, s.data("stellar-backgroundStartingLeft"), s.data("stellar-backgroundStartingTop"));
                p = s.css("margin-left") === "auto" ? 0 : parseInt(s.css("margin-left"), 10);
                d = s.css("margin-top") === "auto" ? 0 : parseInt(s.css("margin-top"), 10);
                v = s.offset().left - p - n;
                m = s.offset().top - d - i;
                s.parents().each(function() {
                    var t = e(this);
                    if (t.data("stellar-offset-parent") === !0) {
                        y = w;
                        b = E;
                        g = t;
                        return !1
                    }
                    w += t.position().left;
                    E += t.position().top
                });
                u = s.data("stellar-horizontal-offset") !== r ? s.data("stellar-horizontal-offset") : g !== r && g.data("stellar-horizontal-offset") !== r ? g.data("stellar-horizontal-offset") : t.horizontalOffset;
                a = s.data("stellar-vertical-offset") !== r ? s.data("stellar-vertical-offset") : g !== r && g.data("stellar-vertical-offset") !== r ? g.data("stellar-vertical-offset") : t.verticalOffset;
                t.backgrounds.push({
                    $element: s,
                    $offsetParent: g,
                    isFixed: s.css("background-attachment") === "fixed",
                    horizontalOffset: u,
                    verticalOffset: a,
                    startingValueLeft: o[0],
                    startingValueTop: o[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(o[0], 10)) ? 0 : parseInt(o[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(o[1], 10)) ? 0 : parseInt(o[1], 10),
                    startingPositionLeft: s.position().left,
                    startingPositionTop: s.position().top,
                    startingOffsetLeft: v,
                    startingOffsetTop: m,
                    parentOffsetLeft: y,
                    parentOffsetTop: b,
                    stellarRatio: s.data("stellar-background-ratio") === r ? 1 : s.data("stellar-background-ratio")
                })
            })
        },
        _reset: function() {
            var e, t, n, r, i;
            for (i = this.particles.length - 1; i >= 0; i--) {
                e = this.particles[i];
                t = e.$element.data("stellar-startingLeft");
                n = e.$element.data("stellar-startingTop");
                this._setPosition(e.$element, t, t, n, n);
                this.options.showElement(e.$element);
                e.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null)
            }
            for (i = this.backgrounds.length - 1; i >= 0; i--) {
                r = this.backgrounds[i];
                r.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null);
                c(r.$element, r.startingValueLeft, r.startingValueTop)
            }
        },
        destroy: function() {
            this._reset();
            this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name);
            this._animationLoop = e.noop;
            e(t).unbind("load." + this.name).unbind("resize." + this.name)
        },
        _setOffsets: function() {
            var n = this,
                r = e(t);
            r.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name);
            if (typeof this.options.horizontalOffset == "function") {
                this.horizontalOffset = this.options.horizontalOffset();
                r.bind("resize.horizontal-" + this.name, function() {
                    n.horizontalOffset = n.options.horizontalOffset()
                })
            } else this.horizontalOffset = this.options.horizontalOffset; if (typeof this.options.verticalOffset == "function") {
                this.verticalOffset = this.options.verticalOffset();
                r.bind("resize.vertical-" + this.name, function() {
                    n.verticalOffset = n.options.verticalOffset()
                })
            } else this.verticalOffset = this.options.verticalOffset
        },
        _repositionElements: function() {
            var e = this._getScrollLeft(),
                t = this._getScrollTop(),
                n, r, i, s, o, u, a, f = !0,
                l = !0,
                h, p, d, v, m;
            if (this.currentScrollLeft === e && this.currentScrollTop === t && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) return;
            this.currentScrollLeft = e;
            this.currentScrollTop = t;
            this.currentWidth = this.viewportWidth;
            this.currentHeight = this.viewportHeight;
            for (m = this.particles.length - 1; m >= 0; m--) {
                i = this.particles[m];
                s = i.isFixed ? 1 : 0;
                if (this.options.horizontalScrolling) {
                    h = (e + i.horizontalOffset + this.viewportOffsetLeft + i.startingPositionLeft - i.startingOffsetLeft + i.parentOffsetLeft) * -(i.stellarRatio + s - 1) + i.startingPositionLeft;
                    d = h - i.startingPositionLeft + i.startingOffsetLeft
                } else {
                    h = i.startingPositionLeft;
                    d = i.startingOffsetLeft
                } if (this.options.verticalScrolling) {
                    p = (t + i.verticalOffset + this.viewportOffsetTop + i.startingPositionTop - i.startingOffsetTop + i.parentOffsetTop) * -(i.stellarRatio + s - 1) + i.startingPositionTop;
                    v = p - i.startingPositionTop + i.startingOffsetTop
                } else {
                    p = i.startingPositionTop;
                    v = i.startingOffsetTop
                } if (this.options.hideDistantElements) {
                    l = !this.options.horizontalScrolling || d + i.width > (i.isFixed ? 0 : e) && d < (i.isFixed ? 0 : e) + this.viewportWidth + this.viewportOffsetLeft;
                    f = !this.options.verticalScrolling || v + i.height > (i.isFixed ? 0 : t) && v < (i.isFixed ? 0 : t) + this.viewportHeight + this.viewportOffsetTop
                }
                if (l && f) {
                    if (i.isHidden) {
                        this.options.showElement(i.$element);
                        i.isHidden = !1
                    }
                    this._setPosition(i.$element, h, i.startingPositionLeft, p, i.startingPositionTop)
                } else if (!i.isHidden) {
                    this.options.hideElement(i.$element);
                    i.isHidden = !0
                }
            }
            for (m = this.backgrounds.length - 1; m >= 0; m--) {
                o = this.backgrounds[m];
                s = o.isFixed ? 0 : 1;
                u = this.options.horizontalScrolling ? (e + o.horizontalOffset - this.viewportOffsetLeft - o.startingOffsetLeft + o.parentOffsetLeft - o.startingBackgroundPositionLeft) * (s - o.stellarRatio) + "px" : o.startingValueLeft;
                a = this.options.verticalScrolling ? (t + o.verticalOffset - this.viewportOffsetTop - o.startingOffsetTop + o.parentOffsetTop - o.startingBackgroundPositionTop) * (s - o.stellarRatio) + "px" : o.startingValueTop;
                c(o.$element, u, a)
            }
        },
        _handleScrollEvent: function() {
            var e = this,
                t = !1,
                n = function() {
                    e._repositionElements();
                    t = !1
                }, r = function() {
                    if (!t) {
                        p(n);
                        t = !0
                    }
                };
            this.$scrollElement.bind("scroll." + this.name, r);
            r()
        },
        _startAnimationLoop: function() {
            var e = this;
            this._animationLoop = function() {
                p(e._animationLoop);
                e._repositionElements()
            };
            this._animationLoop()
        }
    };
    e.fn[i] = function(t) {
        var n = arguments;
        if (t === r || typeof t == "object") return this.each(function() {
            e.data(this, "plugin_" + i) || e.data(this, "plugin_" + i, new d(this, t))
        });
        if (typeof t == "string" && t[0] !== "_" && t !== "init") return this.each(function() {
            var r = e.data(this, "plugin_" + i);
            r instanceof d && typeof r[t] == "function" && r[t].apply(r, Array.prototype.slice.call(n, 1));
            t === "destroy" && e.data(this, "plugin_" + i, null)
        })
    };
    e[i] = function(n) {
        var r = e(t);
        return r.stellar.apply(r, Array.prototype.slice.call(arguments, 0))
    };
    e[i].scrollProperty = o;
    e[i].positionProperty = u;
    t.Stellar = d
})(jQuery, this, document);
$(window).load(function() {
    $("#hero").flexslider({
        animation: "slide",
        slideshowSpeed: 7e3,
        animationSpeed: 1500
    })
});
$(document).ready(function() {
    $(".bio a").click(function() {
        $("#bio").addClass("active")
    });
    $("#bio .close").click(function() {
        $("#bio").removeClass("active")
    })
});
$(document).ready(function() {
    function e() {
        $(".selection-button.dropdown-open").removeClass("dropdown-open")
    }
    $(".selection-button > a").click(function(t) {
        t.preventDefault();
        t.stopPropagation();
        var n = $(this).parent(),
            r = n.hasClass("dropdown-open");
        e();
        if (!r) {
            n.addClass("dropdown-open");
            $open_menu_item = n
        }
    });
    $(".selection-content").on("click", function(e) {
        e.stopPropagation()
    })
});
if (supportsSVG()) document.documentElement.className += " svg";
else {
    document.documentElement.className += " no-svg";
    var imgs = document.getElementsByTagName("img"),
        dotSVG = /.*\.svg$/;
    for (var i = 0; i != imgs.length; ++i) imgs[i].src
        .match(dotSVG) && (imgs[i].src = imgs[i].src.slice(0, -3) + "png")
}
$(document).ready(function() {
    /*var e = $(".section1").height(),
        t = $(window).height();
    t > e && $(".section1").height(t);
    $(window).scroll(function() {
        var e = $(this).scrollTop();
        $(".section0").css("background-position", "center -" + parseInt(e / 5) + "px");
        $(".section0").css("background-position", "center -" + parseInt(e / 50) + "px")
    })*/
});
$(document).ready(function() {
    var e = $(window);
    $(".1parallax").each(function() {
        var t = $(this);
        $(window).scroll(function() {
            var n = -(e.scrollTop() / t.data("speed")),
                r = "50% " + n + "px";
            t.css({
                backgroundPosition: r
            })
        })
    })
});
(function() {
    var e = navigator.userAgent,
        t = /WebKit/.test(e) && /Mobile/.test(e);
    t && $("html").addClass("mobile");
    $(function() {
        var e;
        t || $.stellar({
            horizontalScrolling: !1,
            verticalOffset: 0,
            responsive: !0
        })
    })
})();
jQuery(document).ready(function(e) {
    function s(t) {
        e("html,body").animate({
            scrollTop: e(t).offset().top - i + "px"
        }, "slow")
    }
    if (matchMedia("(min-width: 53em)").matches) var t, n, r, i = 45;
    else var t, n, r, i = 39;
    e("header a,.section1 a").click(function(i) {
        t = e(this).attr("href");
        n = t.indexOf("#");
        r = t.substring(n);
        if (n !== -1 && r.length > 1 && e(r).length > 0) {
            i.preventDefault();
            s(r)
        }
    });
    "" != location.hash && e("a[href=" + location.hash + "]").first().click()
});
$(document).ready(function() {
    $("#video").fitVids()
});
