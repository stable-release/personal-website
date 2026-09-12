import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Plus, Minus, Sun, Moon } from '@phosphor-icons/react';
import '@fontsource/geist/latin-400.css';
import '@fontsource/geist/latin-500.css';
import '@fontsource/geist/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './styles.css';

const email = 'kevin@kevinlinllc.com';
const services = [
  { title: 'Custom software', text: 'Web applications, internal tools, and customer portals. Built for the workflow you need, including the parts a standard product doesn’t cover.', example: 'A customer portal where people can submit requests and track their progress.' },
  { title: 'Workflow automation', text: 'Software for recurring reports, data processing, and manual handoffs. Keep the decisions with your team and automate the repeatable steps.', example: 'A recurring report that collects data, checks it, and prepares the result for review.' },
  { title: 'Systems & integrations', text: 'Connect applications through their APIs, move data between systems, and reduce duplicate entry across the tools you already use.', example: 'An integration that keeps customer records in sync between two applications.' },
];

function App() {
  const [openService, setOpenService] = useState(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  function toggleTheme() {
    const isDark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }
  function validateField(field) {
    let error = '';
    if (field.validity.valueMissing || !field.value.trim()) error = field.name === 'message' ? 'Describe the project you have in mind.' : field.name === 'name' ? 'Add your name.' : 'Add your email address.';
    else if (field.validity.typeMismatch) error = 'Use an email address such as name@company.com.';
    setErrors(previous => ({ ...previous, [field.name]: error }));
    return error;
  }
  function prepareEmail(event) {
    event.preventDefault();
    const fields = [...event.currentTarget.elements].filter(field => field.required);
    const invalid = fields.filter(field => validateField(field));
    if (invalid.length) { invalid[0].focus(); return; }
    const data = new FormData(event.currentTarget);
    const subject = `Project inquiry: ${data.get('service')}`;
    const body = `Hi Kevin,\n\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nInterested in: ${data.get('service')}\n`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Review and send the draft in your email app. If a draft doesn’t open, email Kevin at the address above.');
  }
  function fieldProps(name) {
    return { name, required: true, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': `${name}-error`, onBlur: event => validateField(event.target), onChange: event => { if (errors[name]) validateField(event.target); if (status) setStatus(''); } };
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header shell">
      <a className="wordmark" href="#">kevin lin<span>LLC</span></a>
      <a className="header-contact" href="#contact">Start a project <ArrowUpRight size={18} aria-hidden="true"/></a>
    </header>
    <main id="main" className="shell">
      <section className="intro" aria-labelledby="intro-title">
        <h1 id="intro-title">Software development.<br/><span>Independent projects.</span></h1>
        <p>I’m Kevin Lin. I build custom software and work on projects of my own. Here’s what I’m building and how we can work together.</p>
        <nav aria-label="Main navigation" className="contents"><a href="#projects">Projects <ArrowRight size={16}/></a><a href="#services">Services <ArrowRight size={16}/></a><a href="#approach">Approach <ArrowRight size={16}/></a><a href="#about">About <ArrowRight size={16}/></a></nav>
      </section>
      <section id="projects" className="projects" aria-labelledby="projects-title">
        <h2 id="projects-title">What I’m building</h2>
        <article className="featured-project">
          <div className="project-name"><h3>Suffice</h3></div>
          <div className="project-info"><p>A protocol design for unfamiliar participants to discover requirements, agree on conditions, and exchange data or perform operations under those terms.</p><button className="project-link" aria-expanded={projectOpen} aria-controls="project-overview" onClick={() => setProjectOpen(!projectOpen)}>{projectOpen ? 'Close project overview' : 'Read project overview'}{projectOpen ? <Minus size={18}/> : <Plus size={18}/>}</button></div>
          <div className="project-overview" id="project-overview" hidden={!projectOpen}>
            <h4>Communicate without a prior relationship.</h4>
            <p>Suffice is being designed for people, devices, applications, services, and software agents that do not already share membership, authorities, or policies. Participants can begin discovery without enrolling in a common network, while retaining control over the evidence, disclosures, and operations they accept.</p>
            <h4>Carry the agreement into the exchange.</h4>
            <dl className="proof-decisions"><div><dt>Discover requirements</dt><dd>Find the conditions and capabilities relevant to an interaction. Discovery alone grants no trust or access.</dd></div><div><dt>Establish an agreement</dt><dd>Resolve requirements with evidence or dependent interactions. Bind permissions to the operation, data scope, and actual participants.</dd></div><div><dt>Maintain the exchange</dt><dd>Apply agreed protections during delivery and processing. Revise or end the interaction when its conditions change.</dd></div></dl>
            <p>The shared model covers individual requests, data objects, continuous streams, computation, and relaying. Permission to forward data does not itself grant permission to read it. Existing results can support later interactions only within their scope and reuse conditions.</p>
            <p>Authority models, proof systems, data formats, and transports remain replaceable. Participants can refuse requirements or offer a less revealing result; privacy depends on the selected profile and its protections.</p>
            <p className="project-caveat">The constitution defines the design’s boundaries, not an interoperable implementation. Discovery, data-path bindings, ongoing agreements, and resumption still need operational specifications.</p>
            <a className="project-link" href={`mailto:${email}?subject=Suffice`}>Discuss the project <ArrowUpRight size={18}/></a>
          </div>
        </article>
      </section>
      <section id="services" className="services" aria-labelledby="services-title">
        <h2 id="services-title">What can I build for you?</h2>
        <div className="service-list">{services.map((service, index) => <article className="service" key={service.title}>
          <h3>{service.title}</h3><div className="service-copy"><p>{service.text}</p><button className="example-toggle" aria-expanded={openService === index} aria-controls={`service-${index}`} onClick={() => setOpenService(openService === index ? null : index)}>{openService === index ? 'Hide example' : 'See an example'}{openService === index ? <Minus size={16}/> : <Plus size={16}/>}</button><p className="service-example" id={`service-${index}`} hidden={openService !== index}>{service.example}</p></div>
        </article>)}</div>
      </section>
      <section id="approach" className="approach" aria-labelledby="approach-title">
        <h2 id="approach-title">How does a project start?</h2>
        <p className="section-lede">Show me what you’re trying to do, what you use today, and where you get stuck. We’ll work out what’s worth building.</p>
        <ol className="process-list"><li><h3>Agree on a scope.</h3><p>Define the requirements and what belongs in the first release.</p></li><li><h3>Review working software.</h3><p>Try the implementation and give feedback while it’s being built.</p></li><li><h3>Test and hand it over.</h3><p>Check the important workflows and document how to run the software.</p></li></ol>
      </section>
      <section id="about" className="about" aria-labelledby="about-title"><h2 id="about-title">Who will you work with?</h2><p>Me. Kevin Lin LLC is my software company. You’ll speak directly with the person building your project, from the initial discussion through delivery.</p></section>
      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact-heading"><h2 id="contact-title">Have a project in mind?</h2><p>Tell me what you want to build.</p><a className="email-link" href={`mailto:${email}`}>{email}<ArrowUpRight size={20}/></a></div>
        <form noValidate onSubmit={prepareEmail}>
          <div className="form-row"><label>Your name<input {...fieldProps('name')} autoComplete="name" maxLength={120}/><span className="field-error" id="name-error">{errors.name}</span></label><label>Email address<input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254}/><span className="field-error" id="email-error">{errors.email}</span></label></div>
          <label>What can I help with?<select name="service" defaultValue="Custom software"><option>Custom software</option><option>Workflow automation</option><option>Systems & integrations</option><option>Suffice</option><option>I'm not sure yet</option></select></label>
          <label>A little about your project<textarea {...fieldProps('message')} rows={3} maxLength={3000}/><span className="field-error" id="message-error">{errors.message}</span></label>
          <div className="form-submit"><button className="button" type="submit">Prepare email <ArrowRight size={18}/></button><p>Opens your email app.<br/>You review and send the draft.</p></div>
          <p className="form-status" role="status">{status}</p>
        </form>
      </section>
    </main>
    <footer className="shell"><a className="wordmark" href="#">kevin lin<span>LLC</span></a><div className="footer-bottom"><p>© {new Date().getFullYear()} Kevin Lin LLC</p><div><button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light or dark appearance"><Sun className="sun-icon" size={16}/><Moon className="moon-icon" size={16}/>Appearance</button><a href="#main">Back to top <ArrowUpRight size={16}/></a></div></div></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);


