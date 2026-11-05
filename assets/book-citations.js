/* Exact, entry-scoped bindings only. A nearby article number never identifies a law. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BookCitations = factory();
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const label = ref => ref.document + ', ' + ref.provision;
  function matches(text, entryId, field, registry) {
    const out = [];
    for (const ref of registry?.references || []) for (const binding of ref.bindings || []) {
      if (binding.entryId !== entryId || binding.field !== field) continue;
      let index = text.indexOf(binding.text);
      if (index < 0) continue;
      // Ambiguous repeated wording must be resolved by the editor, never guessed.
      if (text.indexOf(binding.text,index + binding.text.length) >= 0) continue;
      out.push({index,end:index + binding.text.length,text:binding.text,ref});
    }
    return out.sort((a,b) => a.index-b.index);
  }
  return {label,matches};
});
