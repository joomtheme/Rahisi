/** Rahisi 0.1.0-alpha4 | (C) 2026 Rahisi Contributors | GPL-2.0-or-later */
(() => {
    'use strict';
    const root = document.documentElement;
    const options = window.Joomla?.getOptions('rahisi', {}) || {};
    const key = options.storageKey || 'rahisi:v1';
    const scales = [100, 125, 150, 175, 200];
    const defaultScale = scales.includes(options.defaultScale) ? options.defaultScale : 100;
    const defaults = () => ({ scale: defaultScale, spacing: false, contrast: false });
    const sanitize = (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults();
        return {
            scale: scales.includes(value.scale) ? value.scale : defaultScale,
            spacing: value.spacing === true,
            contrast: value.contrast === true,
        };
    };
    const read = () => {
        try { return sanitize(JSON.parse(localStorage.getItem(key))); }
        catch { return defaults(); }
    };
    let state = read();
    const panels = () => [...document.querySelectorAll('[data-rahisi-panel]')];
    const apply = () => {
        root.dataset.rahisiScale = String(state.scale);
        root.dataset.rahisiSpacing = String(state.spacing);
        root.dataset.rahisiContrast = String(state.contrast);
        panels().forEach((panel) => {
            const scale = panel.querySelector('[data-rahisi-scale]');
            const spacing = panel.querySelector('[data-rahisi-spacing]');
            const contrast = panel.querySelector('[data-rahisi-contrast]');
            const controls = panel.querySelector('[data-rahisi-controls]');
            if (scale) scale.value = String(state.scale);
            if (spacing) spacing.checked = state.spacing;
            if (contrast) contrast.checked = state.contrast;
            if (controls) controls.disabled = false;
        });
    };
    const persist = (reset) => {
        try {
            if (reset) localStorage.removeItem(key);
            else localStorage.setItem(key, JSON.stringify(state));
            return true;
        } catch { return false; }
    };
    const commit = (panel, reset = false) => {
        state = reset ? defaults() : sanitize({
            scale: Number(panel.querySelector('[data-rahisi-scale]')?.value ?? state.scale),
            spacing: panel.querySelector('[data-rahisi-spacing]')?.checked ?? state.spacing,
            contrast: panel.querySelector('[data-rahisi-contrast]')?.checked ?? state.contrast,
        });
        const saved = persist(reset);
        apply();
        // Only the active panel announces; duplicate module instances stay synchronised.
        const status = panel.querySelector('[data-rahisi-status]');
        if (status) status.textContent = status.dataset[!saved ? 'session' : reset ? 'reset' : 'saved'];
    };
    const init = () => {
        apply();
        panels().forEach((panel) => {
            panel.addEventListener('change', (event) => {
                if (event.target.matches('[data-rahisi-scale], [data-rahisi-spacing], [data-rahisi-contrast]')) commit(panel);
            });
            panel.querySelector('[data-rahisi-reset]')?.addEventListener('click', () => commit(panel, true));
        });
    };
    window.addEventListener('storage', (event) => {
        if (event.key === key || event.key === null) {
            state = read();
            apply();
        }
    });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
