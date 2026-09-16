/* Dependency-free tests of the shipped JS using a small DOM/storage double.
 * Not a browser, CSS, screen-reader, PHP or Joomla integration test.
 * (C) 2026 Rahisi Contributors | GPL-2.0-or-later
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '../src/plg_system_rahisi/media/js/preferences.js'), 'utf8');
let checks = 0;
function verify(value, expected) { assert.deepEqual(value, expected); checks++; }
function boot(initial = null, blocked = false, loading = false, config = {}) {
  const storage = new Map(initial === null ? [] : [['rahisi:v1:test', initial]]);
  storage.set('unrelated', 'preserve me');
  const listeners = {};
  const documentListeners = {};
  const panels = Array.from({length:config.noPanels ? 0 : 2}, (_, index) => {
    const elements = {
      '[data-rahisi-scale]': {value:'100'},
      '[data-rahisi-spacing]': {checked:false},
      '[data-rahisi-contrast]': {checked:false},
      '[data-rahisi-controls]': {disabled:true},
      '[data-rahisi-status]': {textContent:'', dataset:{saved:'saved',session:'session',reset:'reset'}},
      '[data-rahisi-reset]': {addEventListener(type, callback) {this.click=callback;}},
    };
    for (const field of (config.hidden?.[index] || [])) delete elements[`[data-rahisi-${field}]`];
    return {elements, querySelector: selector => elements[selector], addEventListener(type, callback) {this.change=callback;}};
  });
  const root = {dataset:{}};
  const context = {
    document: {documentElement:root, readyState:loading?'loading':'complete', querySelectorAll:()=>panels,
      addEventListener:(name, fn)=>{documentListeners[name]=fn;}},
    window: {Joomla:{getOptions:()=>({storageKey:'rahisi:v1:test',defaultScale:config.defaultScale})}, addEventListener:(name,fn)=>{listeners[name]=fn;}},
    localStorage: {
      getItem(key) {if(blocked) throw Error('blocked'); return storage.get(key)??null;},
      setItem(key,value) {if(blocked) throw Error('blocked'); storage.set(key,value);},
      removeItem(key) {if(blocked) throw Error('blocked'); storage.delete(key);},
    },
  };
  vm.runInNewContext(source, context);
  return {panels,root,storage,listeners,documentListeners};
}
let ui = boot();
verify(ui.root.dataset.rahisiScale, '100');
verify(ui.panels[0].elements['[data-rahisi-controls]'].disabled, false);
for (const scale of [100,125,150,175,200]) {
  ui.panels[0].elements['[data-rahisi-scale]'].value=String(scale);
  ui.panels[0].change({target:{matches:()=>true}});
  verify(ui.root.dataset.rahisiScale, String(scale));
  verify(ui.panels[1].elements['[data-rahisi-scale]'].value, String(scale));
}
ui.panels[0].elements['[data-rahisi-spacing]'].checked = true;
ui.panels[0].elements['[data-rahisi-contrast]'].checked = true;
ui.panels[0].change({target:{matches:()=>true}});
verify(ui.root.dataset.rahisiSpacing,'true');
verify(ui.root.dataset.rahisiContrast,'true');
verify(ui.panels[0].elements['[data-rahisi-status]'].textContent,'saved');
verify(ui.panels[1].elements['[data-rahisi-status]'].textContent,'');
const restored=boot(ui.storage.get('rahisi:v1:test'));
verify(restored.root.dataset.rahisiScale,'200');
verify(restored.root.dataset.rahisiSpacing,'true');
ui.panels[0].elements['[data-rahisi-reset]'].click();
verify(ui.root.dataset.rahisiScale,'100');
verify(ui.root.dataset.rahisiSpacing,'false');
verify(ui.storage.has('rahisi:v1:test'),false);
verify(ui.storage.get('unrelated'),'preserve me');
for (const input of ['{broken','null','[]','42','{"scale":999,"spacing":"true","contrast":1}']) {
  const bad=boot(input);
  verify(bad.root.dataset.rahisiScale,'100');
  verify(bad.root.dataset.rahisiSpacing,'false');
}
ui=boot(null,true);
ui.panels[0].elements['[data-rahisi-scale]'].value='150';
ui.panels[0].change({target:{matches:()=>true}});
verify(ui.root.dataset.rahisiScale,'150');
verify(ui.panels[0].elements['[data-rahisi-status]'].textContent,'session');
ui=boot();
ui.storage.set('rahisi:v1:test','{"scale":175,"spacing":true}');
ui.listeners.storage({key:'rahisi:v1:test'});
verify(ui.root.dataset.rahisiScale,'175');
ui.storage.delete('rahisi:v1:test');
ui.listeners.storage({key:null});
verify(ui.root.dataset.rahisiScale,'100');
ui=boot(null,false,true);
verify(ui.panels[0].elements['[data-rahisi-controls]'].disabled,true);
ui.documentListeners.DOMContentLoaded();
verify(ui.panels[0].elements['[data-rahisi-controls]'].disabled,false);
// Hidden controls must neither throw nor erase other saved preferences.
const savedState = JSON.stringify({scale:175,spacing:true,contrast:true});
for (let mask=0; mask<8; mask++) {
  const fields=['scale','spacing','contrast'];
  const hidden=fields.filter((_,i)=>mask & (1<<i));
  ui=boot(savedState,false,false,{hidden:[hidden,[]]});
  ui.panels[0].change({target:{matches:()=>true}});
  verify(ui.root.dataset.rahisiScale,'175');
  verify(ui.root.dataset.rahisiSpacing,'true');
  verify(ui.root.dataset.rahisiContrast,'true');
  ui.panels[0].elements['[data-rahisi-reset]'].click();
  verify(ui.root.dataset.rahisiScale,'100');
  verify(ui.root.dataset.rahisiSpacing,'false');
  verify(ui.root.dataset.rahisiContrast,'false');
}
ui=boot(null,false,false,{defaultScale:150});
verify(ui.root.dataset.rahisiScale,'150');
ui=boot(savedState,false,false,{defaultScale:150});
verify(ui.root.dataset.rahisiScale,'175');
ui.panels[0].elements['[data-rahisi-reset]'].click();
verify(ui.root.dataset.rahisiScale,'150');
verify(ui.storage.has('rahisi:v1:test'),false);
verify(boot(null,false,false,{defaultScale:999}).root.dataset.rahisiScale,'100');
verify(boot('{broken',false,false,{defaultScale:125}).root.dataset.rahisiScale,'125');
verify(boot(savedState,false,false,{noPanels:true}).root.dataset.rahisiScale,'175');
ui=boot(savedState);
ui.panels[0].change({target:{matches:()=>false}});
verify(ui.storage.get('rahisi:v1:test'),savedState);
console.log(`PASS: ${checks} preference logic assertions (Node VM, DOM/storage double).`);
