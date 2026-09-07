(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav */
  var siteHeader = document.getElementById("siteHeader");
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobileNav");
  var menuCloseBtn = mobileNav ? mobileNav.querySelector(".mobile-nav__close") : null;
  var menuBackdrop = mobileNav ? mobileNav.querySelector(".mobile-nav__backdrop") : null;
  function setMenuOpen(open) {
    if (!toggle || !mobileNav) return;
    if (open) {
      mobileNav.removeAttribute("hidden");
      requestAnimationFrame(function () {
        mobileNav.classList.add("is-open");
      });
      toggle.setAttribute("aria-label", "Close menu");
      toggle.setAttribute("aria-expanded", "true");
      if (siteHeader) siteHeader.classList.add("is-menu-open");
    } else {
      mobileNav.classList.remove("is-open");
      window.setTimeout(function () {
        mobileNav.setAttribute("hidden", "");
      }, 220);
      toggle.setAttribute("aria-label", "Open menu");
      toggle.setAttribute("aria-expanded", "false");
      if (siteHeader) siteHeader.classList.remove("is-menu-open");
    }
  }
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      setMenuOpen(mobileNav.hasAttribute("hidden"));
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
    if (menuCloseBtn) {
      menuCloseBtn.addEventListener("click", function () {
        setMenuOpen(false);
      });
    }
    if (menuBackdrop) {
      menuBackdrop.addEventListener("click", function () {
        setMenuOpen(false);
      });
    }
  }

  if (siteHeader) {
    window.addEventListener(
      "scroll",
      function () {
        siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  /* Portfolio videos: play in view, pause out (saves battery) */
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.querySelectorAll(".work-card__video").forEach(function (video) {
      var vio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              video.play().catch(function () {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.35 }
      );
      vio.observe(video);
    });
  }

  /* Scroll reveal */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* 3D tilt on pointer */
  function bindTilt(root) {
    if (reduceMotion) return;
    root.addEventListener("pointermove", function (e) {
      var r = root.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      var rx = py * -10;
      var ry = px * 14;
      root.style.transform =
        "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(0)";
    });
    root.addEventListener("pointerleave", function () {
      root.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  }

  document.querySelectorAll("[data-tilt]").forEach(bindTilt);

  /* Three.js ambient field */
  var canvas = document.getElementById("webgl");
  if (!canvas || typeof THREE === "undefined" || reduceMotion) {
    if (canvas && (reduceMotion || typeof THREE === "undefined")) {
      canvas.style.display = "none";
    }
  } else {

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 4.2;

  var count = 1800;
  var positions = new Float32Array(count * 3);
  var colors = new Float32Array(count * 3);
  var i;
  var c1 = new THREE.Color(0x6ee7ff);
  var c2 = new THREE.Color(0xa78bfa);
  var c3 = new THREE.Color(0xf472b6);
  for (i = 0; i < count; i++) {
    var t = Math.random() * Math.PI * 2;
    var u = Math.random() * 2 - 1;
    var rad = 1.8 + Math.random() * 2.2;
    var x = rad * Math.sqrt(1 - u * u) * Math.cos(t);
    var y = rad * Math.sqrt(1 - u * u) * Math.sin(t);
    var z = rad * u * 0.6 + (Math.random() - 0.5) * 0.8;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    var mix = Math.random();
    var col = mix < 0.33 ? c1.clone().lerp(c2, Math.random()) : mix < 0.66 ? c2.clone().lerp(c3, Math.random()) : c3.clone().lerp(c1, Math.random());
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  var mat = new THREE.PointsMaterial({
    size: 0.022,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  var points = new THREE.Points(geo, mat);
  scene.add(points);

  var linesGeo = new THREE.BufferGeometry();
  var maxSegments = 400;
  var linePos = new Float32Array(maxSegments * 6);
  linesGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  var lineMat = new THREE.LineBasicMaterial({
    color: 0x4fdfff,
    transparent: true,
    opacity: 0.12,
  });
  var lines = new THREE.LineSegments(linesGeo, lineMat);
  scene.add(lines);

  function rebuildLines() {
    var idx = 0;
    var stride = 8;
    for (var a = 0; a < count; a += stride) {
      if (idx + 6 > linePos.length) break;
      var b = (a + 37 + Math.floor(Math.random() * stride)) % count;
      var ax = positions[a * 3];
      var ay = positions[a * 3 + 1];
      var az = positions[a * 3 + 2];
      var bx = positions[b * 3];
      var by = positions[b * 3 + 1];
      var bz = positions[b * 3 + 2];
      var d = Math.hypot(ax - bx, ay - by, az - bz);
      if (d < 0.55) {
        linePos[idx++] = ax;
        linePos[idx++] = ay;
        linePos[idx++] = az;
        linePos[idx++] = bx;
        linePos[idx++] = by;
        linePos[idx++] = bz;
      }
    }
    linesGeo.setDrawRange(0, idx / 3);
    linesGeo.attributes.position.needsUpdate = true;
  }

  rebuildLines();

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  var t0 = performance.now();
  function frame(now) {
    var t = (now - t0) * 0.001;
    points.rotation.y = t * 0.06;
    points.rotation.x = Math.sin(t * 0.15) * 0.08;
    lines.rotation.y = points.rotation.y * 1.02;
    lines.rotation.x = points.rotation.x;
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  }

  window.addEventListener("load", function () {
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  });
})();
