import type { LibraryDoc } from '../content/library'

// A book opens as a self-contained page, so a cadet can read it full screen,
// print it to PDF or keep the file for offline study. Nothing here needs a
// server, a login or a network connection.

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!,
  )

export function bookHtml(doc: LibraryDoc): string {
  const sections = doc.sections
    .map(
      (section, index) => `
      <section>
        <h2><span>${String(index + 1).padStart(2, '0')}</span>${escape(section.heading)}</h2>
        <p>${escape(section.body)}</p>
        ${
          section.bullets
            ? `<ul>${section.bullets.map((bullet) => `<li>${escape(bullet)}</li>`).join('')}</ul>`
            : ''
        }
      </section>`,
    )
    .join('')

  const sources = (doc.resources ?? [])
    .map(
      (resource) =>
        `<li><a href="${escape(resource.url)}" target="_blank" rel="noreferrer noopener">${escape(resource.label)}</a>${resource.note ? ` — ${escape(resource.note)}` : ''}</li>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(doc.title)} · CadetPath 360</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f3f1e7; color: #23261c;
    font: 16px/1.65 Georgia, 'Times New Roman', serif; }
  .sheet { max-width: 760px; margin: 0 auto; background: #fbfaf4;
    padding: 56px 56px 64px; border-left: 1px solid #ddd8c4;
    border-right: 1px solid #ddd8c4; }
  header { border-bottom: 2px solid #4a5136; padding-bottom: 18px;
    margin-bottom: 26px; }
  .kicker { font: 600 11px/1.4 ui-monospace, Menlo, monospace;
    letter-spacing: .14em; text-transform: uppercase; color: #6b6f56;
    margin: 0 0 10px; }
  h1 { font-size: 32px; line-height: 1.2; margin: 0 0 6px; }
  .pub { margin: 0; color: #5c604c; font-style: italic; }
  .meta { font: 12px/1.6 ui-monospace, Menlo, monospace; color: #6b6f56;
    margin: 14px 0 0; }
  h2 { font-size: 19px; margin: 30px 0 8px; }
  h2 span { font: 600 11px ui-monospace, Menlo, monospace; color: #8a6d2f;
    margin-right: 10px; vertical-align: 3px; }
  p { margin: 0 0 10px; }
  ul { margin: 0 0 12px; padding-left: 20px; }
  li { margin: 4px 0; }
  .box { margin-top: 34px; padding: 16px 18px; background: #f1efe2;
    border-left: 3px solid #8a6d2f; font-size: 14px; }
  .box strong { display: block; font: 600 11px ui-monospace, Menlo, monospace;
    letter-spacing: .12em; text-transform: uppercase; color: #6b6f56;
    margin-bottom: 6px; }
  footer { margin-top: 40px; padding-top: 14px; border-top: 1px solid #ddd8c4;
    font-size: 12px; color: #6b6f56; }
  .tools { position: sticky; top: 0; background: #f3f1e7;
    border-bottom: 1px solid #ddd8c4; padding: 10px 16px; text-align: right; }
  .tools button, .tools a { font: 600 12px ui-monospace, Menlo, monospace;
    letter-spacing: .06em; text-transform: uppercase; background: #2f3527;
    color: #f6f4e8; border: 1px solid #2f3527; border-radius: 4px;
    padding: 8px 12px; margin-left: 8px; cursor: pointer;
    text-decoration: none; display: inline-block; }
  .tools a { background: transparent; color: #2f3527; }
  @media print { .tools { display: none; } body { background: #fff; }
    .sheet { border: 0; padding: 0; max-width: none; } }
  @media (max-width: 640px) { .sheet { padding: 32px 20px 44px; }
    h1 { font-size: 26px; } }
</style>
</head>
<body>
<div class="tools">
  <button onclick="window.print()">Print / Save as PDF</button>
  <button onclick="window.close()">Close</button>
</div>
<main class="sheet">
  <header>
    <p class="kicker">CadetPath 360 · Reference library</p>
    <h1>${escape(doc.title)}</h1>
    <p class="pub">${escape(doc.publisher)}</p>
    <p class="meta">${escape(doc.kind)} · ${escape(doc.scope)} · ${doc.minutes} min read</p>
  </header>
  <p><strong>${escape(doc.summary)}</strong></p>
  ${sections}
  <div class="box">
    <strong>Use it for</strong>
    <ul>${doc.useFor.map((use) => `<li>${escape(use)}</li>`).join('')}</ul>
  </div>
  ${
    sources
      ? `<div class="box"><strong>Official publication</strong><ul>${sources}</ul></div>`
      : ''
  }
  <footer>
    ${escape(doc.edition)}. Study digest written for CadetPath 360 from the
    published material — read the official copy for the signed text. Your ANO
    holds the copy that applies to your unit.
  </footer>
</main>
</body>
</html>`
}

/** Master all-in-one book compilation combining all 21 reference books */
export function masterBookHtml(docs: LibraryDoc[]): string {
  const toc = docs
    .map(
      (doc, i) =>
        `<li><a href="#doc-${doc.id}"><strong>${String(i + 1).padStart(2, '0')}.</strong> ${escape(doc.title)} <span class="toc-meta">(${escape(doc.kind)} · ${escape(doc.scope)})</span></a></li>`,
    )
    .join('')

  const chapters = docs
    .map((doc, idx) => {
      const sections = doc.sections
        .map(
          (section, sIdx) => `
        <div class="section">
          <h3><span>${String(sIdx + 1).padStart(2, '0')}</span>${escape(section.heading)}</h3>
          <p>${escape(section.body)}</p>
          ${
            section.bullets
              ? `<ul>${section.bullets.map((b) => `<li>${escape(b)}</li>`).join('')}</ul>`
              : ''
          }
        </div>`,
        )
        .join('')

      return `
      <article class="chapter" id="doc-${doc.id}">
        <div class="chapter-num">BOOK ${String(idx + 1).padStart(2, '0')} · ${escape(doc.kind).toUpperCase()}</div>
        <h2>${escape(doc.title)}</h2>
        <p class="pub">${escape(doc.publisher)} · ${escape(doc.scope)}</p>
        <p class="summary"><strong>Summary:</strong> ${escape(doc.summary)}</p>
        <div class="chapter-content">${sections}</div>
        <div class="box">
          <strong>Exam Application</strong>
          <ul>${doc.useFor.map((u) => `<li>${escape(u)}</li>`).join('')}</ul>
        </div>
      </article>`
    })
    .join('<hr class="chapter-divider" />')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CadetPath 360 — Complete NCC Master Exam Handbook (All 21 Books)</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f3f1e7; color: #23261c; font: 16px/1.65 Georgia, 'Times New Roman', serif; }
  .sheet { max-width: 840px; margin: 0 auto; background: #fbfaf4; padding: 60px 56px 80px; border-left: 1px solid #ddd8c4; border-right: 1px solid #ddd8c4; }
  .tools { position: sticky; top: 0; z-index: 100; background: #f3f1e7; border-bottom: 1px solid #ddd8c4; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; }
  .tools button { font: 600 12px ui-monospace, Menlo, monospace; letter-spacing: .08em; text-transform: uppercase; background: #2f3527; color: #f6f4e8; border: 1px solid #2f3527; border-radius: 4px; padding: 8px 14px; cursor: pointer; }
  .cover { text-align: center; border-bottom: 3px double #4a5136; padding: 40px 0 50px; margin-bottom: 40px; }
  .kicker { font: 600 12px/1.4 ui-monospace, Menlo, monospace; letter-spacing: .18em; text-transform: uppercase; color: #585d43; margin-bottom: 14px; }
  h1 { font-size: 38px; line-height: 1.15; margin: 0 0 12px; color: #1c2117; }
  .subtitle { font-size: 18px; color: #5c604c; font-style: italic; margin-bottom: 24px; }
  .badge { display: inline-block; padding: 6px 14px; background: #e3ebd6; border: 1px solid #7d8c65; font: 600 11px ui-monospace, Menlo, monospace; border-radius: 4px; color: #2f3c1f; }
  .toc { background: #f3efe0; border: 1px solid #ddd8c4; border-radius: 6px; padding: 26px 30px; margin: 36px 0 50px; }
  .toc h2 { font-size: 22px; margin: 0 0 16px; border-bottom: 1px solid #c9c3ab; padding-bottom: 8px; }
  .toc ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
  .toc a { text-decoration: none; color: #272e21; font-size: 14.5px; display: block; }
  .toc a:hover { text-decoration: underline; color: #526b34; }
  .toc-meta { font-size: 12px; color: #737861; font-family: ui-monospace, monospace; margin-left: 6px; }
  .chapter { margin: 40px 0; page-break-after: always; }
  .chapter-num { font: 700 12px ui-monospace, monospace; letter-spacing: .15em; color: #8a6d2f; margin-bottom: 8px; }
  .chapter h2 { font-size: 28px; line-height: 1.25; margin: 0 0 6px; }
  .pub { font-style: italic; color: #5c604c; margin: 0 0 14px; }
  .summary { background: #f6f4ea; border-left: 3px solid #4a5136; padding: 12px 16px; margin: 16px 0 24px; font-size: 15px; }
  .section { margin: 24px 0; }
  .section h3 { font-size: 18px; margin: 0 0 6px; }
  .section h3 span { font: 600 11px ui-monospace, monospace; color: #8a6d2f; margin-right: 8px; }
  .box { margin-top: 26px; padding: 14px 18px; background: #f1efe2; border-left: 3px solid #8a6d2f; font-size: 14px; }
  .box strong { display: block; font: 600 11px ui-monospace, monospace; text-transform: uppercase; color: #5c604c; margin-bottom: 4px; }
  .chapter-divider { border: 0; border-top: 2px dashed #cfc9b6; margin: 50px 0; }
  @media print {
    .tools { display: none; }
    body { background: #fff; }
    .sheet { border: 0; padding: 0; max-width: none; }
    .chapter { page-break-after: always; }
  }
</style>
</head>
<body>
<div class="tools">
  <span style="font: 600 13px ui-monospace, monospace; color: #424933;">CadetPath 360 · All 21 Reference Books</span>
  <div>
    <button onclick="window.print()">Print / Save All 21 Books as PDF</button>
  </div>
</div>
<main class="sheet">
  <div class="cover">
    <p class="kicker">National Cadet Corps · Study Kit</p>
    <h1>The Complete NCC Master Exam Handbook</h1>
    <p class="subtitle">Official Syllabus, Training Regulations, Technical Manuals, and Question Banks</p>
    <span class="badge">ALL 21 REFERENCE BOOKS · COMPLETE OFFLINE EDITION</span>
  </div>

  <nav class="toc">
    <h2>Table of Contents (अनुक्रमणिका)</h2>
    <ul>${toc}</ul>
  </nav>

  ${chapters}
</main>
</body>
</html>`
}

const fileName = (doc: LibraryDoc) =>
  `${doc.id}-${doc.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)}.html`

export function downloadBook(doc: LibraryDoc) {
  const blob = new Blob([bookHtml(doc)], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName(doc)
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

/** Downloads single Master Handbook containing all 21 books */
export function downloadMasterBook(docs: LibraryDoc[]) {
  const blob = new Blob([masterBookHtml(docs)], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'CadetPath-360-Complete-Master-NCC-Handbook-21-Books.html'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

/** Batch downloads all 21 individual book files */
export function downloadAllBooksIndividually(docs: LibraryDoc[]) {
  docs.forEach((doc, idx) => {
    window.setTimeout(() => {
      downloadBook(doc)
    }, idx * 250) // small delay so browser doesn't block multi-download
  })
}
