/* ZKNOX shared navigation — single source of truth for every page.
 *
 * Usage on any page (including the tool repos served from this origin):
 *     <nav data-zknox-nav></nav>
 *     <script src="/nav.js" defer></script>
 *
 * All hrefs are root-relative so they resolve identically from the site root
 * (/index.html) and from a subdirectory (/zknox-blue/official-apps.html).
 * This means pages must be served over HTTP, not opened as file://.
 *
 * This file also injects the mobile nav CSS, so the phone behaviour is defined
 * once here rather than duplicated into each repo's stylesheet.
 */
(function () {
    'use strict';

    var MOBILE = '(max-width: 900px)';

    var LINKS = [
        { label: 'Home', href: '/' },
        {
            label: 'Technologies', href: '/technologies.html', items: [
                { label: 'Elliptic Curves', href: '/tech-ecc.html' },
                { label: 'Hardware Wallets', href: '/tech-hw.html' },
                { label: 'MPC', href: '/tech-mpc.html' },
                { label: 'Post-Quantum Cryptography', href: '/tech-pqc.html' },
                { label: 'Zero Knowledge', href: '/tech-zk.html' }
            ]
        },
        {
            label: 'Products', href: '/products.html', items: [
                { label: 'Cryptographic Libraries', href: '/products.html#libraries' },
                { label: 'Hardware Integration', href: '/products.html#hardware' },
                { label: 'Smart Contracts', href: '/products.html#contracts' },
                { label: 'ZK Circuits', href: '/products.html#zk' }
            ]
        },
        {
            label: 'Tools', href: '/tools.html', items: [
                { label: 'ZKNOX Blue', href: '/zknox-blue/official-apps.html' },
                { label: 'ZKNOX Orange', href: '/zknox-orange/sideloader.html' },
                { label: 'PQBIP39', href: '/demo-pqbip39.html' },
                { label: 'ZK-Hardware', href: '/demo-zk-hardware.html' },
                { label: 'Faucet', href: '/faucet.html' }
            ]
        },
        {
            label: 'Research', href: '/research.html', items: [
                { label: 'Blog', href: '/blog.html' },
                { label: 'EIPs', href: '/eips.html' },
                { label: 'Hackathons', href: '/hackathons.html' },
                { label: 'Papers', href: '/papers.html' },
                { label: 'Talks', href: '/talks.html' }
            ]
        },
        {
            label: 'Services', href: '/services.html', items: [
                { label: 'Audits', href: '/services.html#audits' },
                { label: 'Design', href: '/services.html#design' },
                { label: 'Hardware Integration', href: '/services.html#hardware' },
                { label: 'Implementation', href: '/services.html#implementation' }
            ]
        },
        /* prefix: also mark active on sub-pages, e.g. /team-simon.html */
        { label: 'Team', href: '/team.html', prefix: '/team' }
    ];

    var X_PATH = 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';
    var GH_PATH = 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

    /* Mobile nav CSS. Injected at the end of <head> so it lands after each
       page's own stylesheet and wins on equal specificity — this is what lets
       the website and both tool repos share one mobile behaviour. */
    var CSS = [
        /* The per-section "Overview" link only exists on mobile, where tapping
           the section header expands it instead of navigating. */
        '.dropdown-overview { display: none; }',
        /* Page must not scroll behind an open menu, or the swipe goes to the
           page instead of the menu. */
        'body.nav-open { overflow: hidden; }',
        '@media ' + MOBILE + ' {',
        '  .nav-links {',
        '    display: none;',
        '    position: fixed;',
        '    top: 70px; left: 0; right: 0;',
        '    max-height: calc(100vh - 70px);',
        '    max-height: calc(100dvh - 70px);',
        '    overflow-y: auto;',
        '    overscroll-behavior: contain;',
        '    -webkit-overflow-scrolling: touch;',
        '    background: #0a0a0f;',
        '    flex-direction: column;',
        '    align-items: stretch;',
        '    gap: 0;',
        '    padding: 0.5rem 0 1.5rem;',
        '    border-bottom: 1px solid rgba(255, 255, 255, 0.1);',
        '  }',
        '  .nav-links.active { display: flex; }',
        '  .nav-link { width: 100%; padding: 0.85rem 1.25rem; }',
        /* Collapsed by default; only an .open section reveals its children. */
        '  .dropdown-menu {',
        '    display: none;',
        '    position: static;',
        '    opacity: 1; visibility: visible; transform: none;',
        '    background: transparent; border: none; box-shadow: none;',
        '    min-width: 0; padding: 0 0 0.5rem;',
        '  }',
        '  .nav-dropdown.open > .dropdown-menu { display: block; }',
        '  .nav-dropdown > .nav-link::after { margin-left: auto; }',
        '  .nav-dropdown.open > .nav-link::after { transform: rotate(180deg); }',
        '  .dropdown-item { padding: 0.6rem 1.25rem 0.6rem 2.25rem; }',
        '  .dropdown-overview { display: block; }',
        '  .mobile-menu-btn { display: flex; }',
        '  .github-btn { display: none; }',
        '}'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('zknox-nav-css')) return;
        var el = document.createElement('style');
        el.id = 'zknox-nav-css';
        el.textContent = CSS;
        document.head.appendChild(el);
    }

    /* Current page as a root-relative path, with /index.html normalised to /. */
    function currentPath() {
        var p = window.location.pathname;
        return p === '' || p === '/index.html' ? '/' : p;
    }

    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function iconLink(path, cls, href, title, text) {
        return '<a href="' + href + '" class="' + cls + '" target="_blank" rel="noopener"' +
            (title ? ' title="' + esc(title) + '"' : '') + '>' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="' + path + '"/></svg>' +
            (text || '') + '</a>';
    }

    function render() {
        var here = currentPath();
        var html = '<div class="nav-container">' +
            '<a href="/" class="logo"><img src="/zknox-logo.png" alt="ZKNOX"></a>' +
            '<div class="nav-links">';

        LINKS.forEach(function (link) {
            /* A top-level entry is "active" when it is the current page, or when
               one of its dropdown children is. */
            var active = link.href === here ||
                (link.prefix && here.indexOf(link.prefix) === 0) ||
                (link.items || []).some(function (i) { return i.href.split('#')[0] === here; });
            var cls = 'nav-link' + (active ? ' active' : '');

            if (!link.items) {
                html += '<a href="' + link.href + '" class="' + cls + '">' + esc(link.label) + '</a>';
                return;
            }
            html += '<div class="nav-dropdown">' +
                '<a href="' + link.href + '" class="' + cls + '">' + esc(link.label) + '</a>' +
                '<div class="dropdown-menu">' +
                /* Mobile-only: the section header toggles, so its own page needs
                   a reachable link of its own. Hidden on desktop. */
                '<a href="' + link.href + '" class="dropdown-item dropdown-overview">Overview</a>';
            link.items.forEach(function (item) {
                html += '<a href="' + item.href + '" class="dropdown-item">' + esc(item.label) + '</a>';
            });
            html += '</div></div>';
        });

        html += iconLink(X_PATH, 'nav-link nav-icon', 'https://x.com/zknoxHQ', 'X/Twitter') +
            '</div>' +
            iconLink(GH_PATH, 'github-btn', 'https://github.com/ZKNoxHQ', null, 'GitHub') +
            '<button class="mobile-menu-btn" aria-label="Menu" aria-expanded="false">' +
            '<span></span><span></span><span></span></button>' +
            '</div>';
        return html;
    }

    function mount() {
        injectCss();

        Array.prototype.forEach.call(document.querySelectorAll('nav[data-zknox-nav]'), function (host) {
            host.innerHTML = render();

            var btn = host.querySelector('.mobile-menu-btn');
            var links = host.querySelector('.nav-links');
            var isMobile = function () { return window.matchMedia(MOBILE).matches; };

            function setOpen(open) {
                links.classList.toggle('active', open);
                btn.setAttribute('aria-expanded', open ? 'true' : 'false');
                document.body.classList.toggle('nav-open', open);
                if (!open) collapseAll();
            }

            function collapseAll(except) {
                Array.prototype.forEach.call(host.querySelectorAll('.nav-dropdown'), function (d) {
                    if (d !== except) d.classList.remove('open');
                });
            }

            btn.addEventListener('click', function () {
                setOpen(!links.classList.contains('active'));
            });

            links.addEventListener('click', function (e) {
                var a = e.target.closest('a');
                if (!a) return;

                /* On mobile a section header expands its subsection rather than
                   navigating; "Overview" inside it goes to the section page. */
                var parent = a.parentElement;
                if (isMobile() && parent && parent.classList.contains('nav-dropdown') &&
                    a.classList.contains('nav-link')) {
                    e.preventDefault();
                    var willOpen = !parent.classList.contains('open');
                    collapseAll(parent);
                    parent.classList.toggle('open', willOpen);
                    return;
                }
                /* Any real navigation closes the menu, so #anchor targets are
                   not left hidden behind it. */
                setOpen(false);
            });

            /* Leaving mobile width must not strand the body in a locked state. */
            window.matchMedia(MOBILE).addEventListener('change', function (e) {
                if (!e.matches) setOpen(false);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
