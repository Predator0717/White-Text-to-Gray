// ==UserScript==
// @name         White Text to Gray
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Convert harsh white text on pages to softer gray
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';
    // Check if color is white or near-white
    const isWhite = (r, g, b) => r > 250 && g > 250 && b > 250;
    
    // Process individual element
    const processEl = (el) => {
        if (el.nodeType !== 1) return;
        const style = getComputedStyle(el);
        const color = style.color;
        
        // Parse rgb/rgba color values
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            const [, r, g, b] = match.map(Number);
            if (isWhite(r, g, b)) {
                el.style.color = '#dddddd';
            }
        }
    };
    
    // Batch process all page elements
    const processPage = () => {
        document.querySelectorAll('*').forEach(processEl);
    };
    
    // Monitor DOM changes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    processEl(node);
                    node.querySelectorAll?.('*').forEach(processEl);
                }
            });
        });
    });
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processPage);
    } else {
        processPage();
    }
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });
})();
