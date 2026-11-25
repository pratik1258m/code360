import { awards, benefits, cadetRanks, camps, certificates, glossary, officerRanks, scholarships } from '../../content/ncc'
import { Icon, SectionHead, Tag } from '../ui'

export default function Camps() {
  return (
    <div className="stack-lg" style={{ marginTop: 26 }}>
      <section>
        <SectionHead
          eyebrow={`${camps.length} camps and courses`}
          title="Camps"
          lede="Which camp counts for which certificate, how long it runs and what actually happens there."
        />
        <div className="grid grid-2">
          {camps.map((camp) => (
            <article className="card" key={camp.name}>
              <div className="doc-meta">
                <Tag tone="brass">{camp.short}</Tag>
                <span className="mono">{camp.duration}</span>
              </div>
              <h3 className="doc-title">{camp.name}</h3>
              <p className="doc-summary">{camp.what}</p>
              <p className="camp-who">
                <Icon name="pin" size={14} />
                {camp.who}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="After the certificate"
          title="What the certificates open"
          lede="Reserved vacancies and bonus marks, as published. Selection still needs the SSB, medicals and the eligibility of the entry."
        />
        <div className="grid grid-2">
          {benefits.map((benefit) => (
            <div className="card card-flat" key={benefit.title}>
              <h3 style={{ fontSize: '1rem' }}>{benefit.title}</h3>
              <p className="doc-summary">{benefit.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead eyebrow="On the record" title="Certificates at a glance" />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Certificate</th>
                <th>Unit</th>
                <th>Timing</th>
                <th>Grading</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td style={{ fontWeight: 560 }}>{certificate.name}</td>
                  <td>{certificate.unit}</td>
                  <td>{certificate.years}</td>
                  <td>
                    A 80%+ · B 65–80% · C 50–65% · pass 45% per paper
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Recognition & Scholarships" title="Awards, CWS & scholarships" />
        <div className="rowlist">
          {[...awards, ...scholarships].map((award) => (
            <div className="row" key={award.name}>
              <span className="row-main">
                <strong>{award.name}</strong>
                <span>{award.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Uniform & Viva Essential"
          title="Equivalent Cadet Ranks (Army · Navy · Air Force)"
          lede="Tested in Certificate A, B, and C interviews. JD/JW school cadets normally cap at Sergeant / Petty Officer / CWO equivalents."
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Army Wing</th>
                <th>Naval Wing</th>
                <th>Air Wing</th>
                <th>Insignia</th>
              </tr>
            </thead>
            <tbody>
              {cadetRanks.map((row) => (
                <tr key={row.level}>
                  <td className="mono">{row.level}</td>
                  <td style={{ fontWeight: 560 }}>{row.army}</td>
                  <td>{row.navy}</td>
                  <td>{row.air}</td>
                  <td style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>{row.insignia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Armed Forces Structure"
          title="Equivalent Commissioned Officer Ranks"
          lede="Know who commands your Group HQ (Brigadier/Commodore/Air Cdre), Battalion (Colonel), and DGNCC (Lieutenant General)."
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Army</th>
                <th>Navy</th>
                <th>Air Force</th>
                <th>NCC Role / Note</th>
              </tr>
            </thead>
            <tbody>
              {officerRanks.map((row) => (
                <tr key={row.army}>
                  <td style={{ fontWeight: 560 }}>{row.army}</td>
                  <td>{row.navy}</td>
                  <td>{row.air}</td>
                  <td style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>{row.insignia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Speak the language"
          title="Glossary"
          lede="The abbreviations that appear in every camp instruction and exam paper."
        />
        <div className="rowlist">
          {glossary.map((item) => (
            <div className="row" key={item.term}>
              <span
                className="mono"
                style={{ width: 120, flex: 'none', color: 'var(--brass)' }}
              >
                {item.term}
              </span>
              <span className="row-main">
                <span style={{ whiteSpace: 'normal', color: 'var(--ink-2)' }}>
                  {item.detail}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
