import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './App.css';
import './styles/visual-polish.css';
import './styles/next-pass.css';

const COMMUNITY_URL = 'https://gdg.community.dev/gdg-on-campus-cambridge-institute-of-technology-bengaluru-india/';

const domains = [
  {
    id: 'aiml-robotics',
    number: '01',
    title: 'AI/ML & Robotics',
    short: 'Intelligence meets the physical world.',
    description:
      'Explore machine learning, intelligent systems, computer vision, automation and robotics by turning ideas into working prototypes.',
    tags: ['Machine learning', 'Computer vision', 'Robotics', 'IoT'],
    color: 'blue',
    icon: 'brain',
  },
  {
    id: 'webdev-devops',
    number: '02',
    title: 'Web Development & DevOps',
    short: 'From first commit to production.',
    description:
      'Design and build useful digital products, learn modern web stacks, and discover the tools that help teams ship reliable software.',
    tags: ['Frontend', 'Backend', 'Cloud', 'CI/CD'],
    color: 'green',
    icon: 'code',
  },
  {
    id: 'cybersecurity-blockchain',
    number: '03',
    title: 'Cybersecurity & Blockchain',
    short: 'Build trust into every layer.',
    description:
      'Get hands-on with secure systems, ethical security practices, cryptography, decentralized technologies and responsible innovation.',
    tags: ['Application security', 'CTFs', 'Cryptography', 'Web3'],
    color: 'red',
    icon: 'shield',
  },
  {
    id: 'marketing-curation',
    number: '04',
    title: 'Marketing & Curation',
    short: 'Make the right ideas reach people.',
    description:
      'Shape memorable experiences through event planning, partnerships, technical content curation, storytelling and community strategy.',
    tags: ['Event strategy', 'Partnerships', 'Content', 'Outreach'],
    color: 'yellow',
    icon: 'megaphone',
  },
  {
    id: 'social-ux',
    number: '05',
    title: 'Social Media & UX Design',
    short: 'Make technology feel human.',
    description:
      'Create accessible experiences and thoughtful visuals, then share the people, projects and moments that make the community special.',
    tags: ['UX research', 'UI design', 'Brand systems', 'Social content'],
    color: 'purple',
    icon: 'palette',
  },
];

const leaders = [
  {
    name: 'Kushal Gowder K',
    role: 'Organizer',
    image: '/people/kushal.webp',
    color: 'blue',
    initials: 'KG',
    instagram: 'https://www.instagram.com/cheeku_2007',
  },
  {
    name: 'Sankarshan V Sastry',
    role: 'Co-Organizer',
    image: '/people/sankarshan.webp',
    color: 'red',
    initials: 'SV',
    linkedin: 'https://www.linkedin.com/in/sankuwasfound/',
    instagram: 'https://www.instagram.com/sankuwasfound',
  },
  {
    name: 'Fawaz Hussain',
    role: 'Leads Coordinator',
    image: '/people/fawaz.webp',
    color: 'green',
    initials: 'FH',
    instagram: 'https://www.instagram.com/fawazzzzzuuuu008/',
  },
];

// One future Domain Lead slot for each domain. Names/photos/social links are intentionally not assigned yet.
const domainLeadSlots = domains.map((domain) => ({
  domainId: domain.id,
  domainTitle: domain.title,
  color: domain.color,
  number: domain.number,
}));

const ways = [
  {
    icon: 'book',
    title: 'Learn by doing',
    text: 'Practical workshops, guided sessions and shared resources make new technologies easier to explore.',
    color: 'blue',
  },
  {
    icon: 'users',
    title: 'Build together',
    text: 'Find collaborators, exchange ideas and learn from students with different skills and perspectives.',
    color: 'green',
  },
  {
    icon: 'rocket',
    title: 'Grow through projects',
    text: 'Turn curiosity into projects, sharpen your portfolio and gain experience through real teamwork.',
    color: 'red',
  },
];

function Icon({ name, size = 22, strokeWidth = 1.8 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    down: <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>,
    sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.3L22 17l-1.9.7L19 20l-.8-2.3L16 17l2.2-.7L19 14Z"/></>,
    brain: <><path d="M9 5a3 3 0 0 0-5 2.2A3.5 3.5 0 0 0 4 14a3 3 0 0 0 4 4v2h4V4H9v1Z"/><path d="M15 5a3 3 0 0 1 5 2.2 3.5 3.5 0 0 1 0 6.8 3 3 0 0 1-4 4v2h-4V4h3v1Z"/><path d="M7 9h2M15 9h2M7 14h2M15 14h2"/></>,
    code: <><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 5-4 14"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    megaphone: <><path d="m3 11 18-5v12L3 13v-2Z"/><path d="m7 14 2 6h4l-2-7"/><path d="M21 10v4"/></>,
    palette: <><circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="9" r="1"/><path d="M12 21c-1.2-1.4-.7-3 1-3.5 2.2-.7 3.7.9 5-1.5"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/><path d="M8 7h8M8 10h6"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.3-2 4.5-2 4.5s3.2-.5 4.5-2c.7-.8.7-2 0-2.6-.6-.7-1.8-.7-2.5.1Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.5A12.5 12.5 0 0 1 22 2c0 2.8-.8 7-6.5 11A22 22 0 0 1 12 15Z"/><path d="M9 12H5s.5-3 4-4M12 15v4s3-.5 4-4"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    external: <><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-7h4v7M12 13a3 3 0 0 1 6 0"/></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.2 4.8 4.8 0 0 0 18.9 2S17.7 1.6 15 3.3a13.5 13.5 0 0 0-7 0C5.3 1.6 4.1 2 4.1 2A4.8 4.8 0 0 0 4 5.2a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></>,
  };
  return <svg {...shared}>{paths[name] || paths.sparkles}</svg>;
}

function SectionIntro({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header({ isDomainPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['About', '#about'],
    ['Teams', '#teams'],
    ['Leadership', '#leadership'],
    ['Advisors', '#advisors'],
    ['Events', '#events'],
    ['Partners', '#sponsors'],
    ['Contact', '#contact'],
  ].map(([label, href]) => [label, isDomainPage ? `/${href}` : href]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href={isDomainPage ? '/#home' : '#home'} aria-label="GDG on Campus CITech home">
          <img className="brand-wordmark" src="/gdg-cit-wordmark.png" alt="Google Developer Groups — Cambridge Institute of Technology" />
        </a>
        <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation">
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-join" href={COMMUNITY_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Join the community <Icon name="arrow" size={16} /></a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <motion.div className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="google-dot google-dot--blue" />
          <span className="google-dot google-dot--red" />
          <span className="google-dot google-dot--yellow" />
          <span className="google-dot google-dot--green" />
          <span>GDG ON CAMPUS · CIT BENGALURU</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
          Curiosity builds<br /><span className="hero-highlight">what comes next.</span>
        </motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.17 }}>
          A campus community for people who love technology, enjoy figuring things out, and want to build something meaningful together.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}>
          <a className="button button--primary" href="#teams">Explore our teams <Icon name="arrow" size={18} /></a>
          <a className="button button--secondary" href="#about">Get to know us</a>
        </motion.div>
        <motion.div className="hero-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }}>
          <span className="hero-note-icon"><Icon name="map" size={17} /></span>
          <span>Cambridge Institute of Technology · Bengaluru, India</span>
        </motion.div>
      </div>
      <motion.div className="hero-art hero-art--canvas" initial={{ opacity: 0, y: 10, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, delay: 0.14 }} aria-label="A visual representation of the GDG on Campus community" role="img">
        <div className="canvas-confetti canvas-confetti--top" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="canvas-backdrop-shape canvas-backdrop-shape--blue" aria-hidden="true" />
        <div className="canvas-backdrop-shape canvas-backdrop-shape--green" aria-hidden="true" />

        <div className="community-canvas">
          <div className="community-canvas-top">
            <div className="canvas-window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span className="canvas-wordmark">GDG <b>/</b> CITech</span>
            <span className="canvas-live"><i /> COMMUNITY</span>
          </div>

          <div className="community-canvas-main">
            <div className="community-canvas-copy">
              <span className="canvas-eyebrow">A SPACE TO EXPERIMENT</span>
              <h2>Think it.<br /><span>Build it.</span></h2>
              <p>Different interests.<br />One community.</p>
              <div className="canvas-mini-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>

            <div className="canvas-visual" aria-hidden="true">
              <div className="canvas-tile canvas-tile--blue"><span>AI</span><Icon name="brain" size={24} /></div>
              <div className="canvas-tile canvas-tile--green"><Icon name="code" size={25} /><span>&lt;/&gt;</span></div>
              <div className="canvas-tile canvas-tile--yellow"><Icon name="sparkles" size={21} /></div>
              <div className="canvas-tile canvas-tile--red"><Icon name="users" size={22} /></div>
              <div className="canvas-logo-stamp"><img src="/gdg-cit-logo.png" alt="" /><span>Build together.</span></div>
              <span className="canvas-orb canvas-orb--small" />
              <span className="canvas-orb canvas-orb--large" />
            </div>
          </div>

          <div className="community-canvas-bottom">
            <span>FIVE TEAMS</span>
            <div className="canvas-domain-marks" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <span className="canvas-bottom-caption">ONE CAMPUS COMMUNITY</span>
          </div>
        </div>

        <div className="canvas-note canvas-note--top"><span className="canvas-note-number">01</span><span><b>Explore</b><small>Stay curious</small></span></div>
        <div className="canvas-note canvas-note--bottom"><span className="canvas-note-number canvas-note-number--green">02</span><span><b>Create together</b><small>Make ideas real</small></span></div>
        <div className="canvas-corner-mark" aria-hidden="true"><i /><i /><i /><i /></div>
      </motion.div>
      <a className="hero-scroll" href="#about"><span className="scroll-line" /> Discover the community <Icon name="down" size={16} /></a>
    </section>
  );
}

function CommunityRibbon() {
  const highlights = [
    { label: 'Learn together', detail: 'Explore new technologies', color: 'blue', icon: 'book' },
    { label: 'Build things', detail: 'Turn ideas into projects', color: 'green', icon: 'code' },
    { label: 'Share knowledge', detail: 'Grow through community', color: 'red', icon: 'users' },
  ];

  return (
    <div className="community-ribbon-band" aria-label="How our community grows">
      <div className="community-ribbon section-wrap">
        <div className="community-ribbon-intro">
          <span className="community-ribbon-dots" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Curiosity, in good company.</span>
        </div>
        <div className="community-ribbon-items">
          {highlights.map((item) => (
            <div className="community-ribbon-item" key={item.label}>
              <span className={`community-ribbon-icon community-ribbon-icon--${item.color}`}><Icon name={item.icon} size={18} /></span>
              <span><strong>{item.label}</strong><small>{item.detail}</small></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-wrap">
        <SectionIntro eyebrow="A little about us" title={<>A place to learn.<br /><span className="text-muted">A community to grow.</span></>} description="GDG on Campus at Cambridge Institute of Technology brings students together to explore developer technologies, exchange knowledge and turn ideas into practical work." />
        <div className="ways-grid">
          {ways.map((item, index) => (
            <motion.article className="way-card" key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.09 }}>
              <span className={`way-icon tone-${item.color}`}><Icon name={item.icon} size={23} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Domains() {
  return (
    <section id="teams" className="section section-wrap domains-section">
      <SectionIntro eyebrow="Find your corner" title={<>Five teams.<br /><span className="text-muted">One curious community.</span></>} description="Whether you love building systems, designing experiences or bringing people together, there is a place to start and room to grow." />
      <div className="domains-grid">
        {domains.map((domain, index) => (
          <motion.a href={`/teams/${domain.id}`} className={`domain-card domain-card--${domain.color} domain-card-link`} key={domain.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.48, delay: (index % 3) * 0.06 }}>
            <div className="domain-card-top"><span className="domain-number">{domain.number} / TEAM</span><span className="domain-icon"><Icon name={domain.icon} size={24} /></span></div>
            <h3>{domain.title}</h3>
            <p className="domain-short">{domain.short}</p>
            <span className="text-action">Meet the team <span><Icon name="arrow" size={17} /></span></span>
          </motion.a>
        ))}
      </div>
      <div className="domains-footnote"><span className="footnote-dot" />Every team welcomes learners who are ready to contribute, experiment and grow.</div>
    </section>
  );
}

const teamSocials = [
  { label: 'LinkedIn', icon: 'linkedin', field: 'linkedin' },
  { label: 'GitHub', icon: 'github', field: 'github' },
  { label: 'Instagram', icon: 'instagram', field: 'instagram' },
];

function DomainTeamPage({ domain, onBack }) {
  const team = [
    { role: 'Team Lead', number: '01' },
    { role: 'Team Member', number: '02' },
    { role: 'Team Member', number: '03' },
    { role: 'Team Member', number: '04' },
  ];

  return (
    <main className="domain-page" id="main-content">
      <section className="domain-page-hero section-wrap">
        <button className="back-link" onClick={onBack}><Icon name="arrow" size={17} /> Back to all teams</button>
        <div className={`domain-page-icon domain-page-icon--${domain.color}`}><Icon name={domain.icon} size={30} /></div>
        <span className="eyebrow"><span className="eyebrow-dot" />TEAM {domain.number}</span>
        <h1>{domain.title}</h1>
        <p className="domain-page-short">{domain.short}</p>
        <p className="domain-page-description">{domain.description}</p>
        <div className="tag-row domain-page-tags">{domain.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </section>
      <section className="domain-team-section">
        <div className="section-wrap">
          <SectionIntro eyebrow="Meet the people" title={<>The team behind<br /><span className="text-muted">the work.</span></>} description="Four people, one shared curiosity. Team profiles and social links will be added here soon." />
          <div className="domain-team-grid">
            {team.map((member, index) => (
              <motion.article className={`domain-member-card domain-member-card--${domain.color}`} key={member.number} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: index * .07 }}>
                <div className="domain-member-photo">
                  <div className="member-photo-placeholder"><Icon name="users" size={36} /><span>Photo coming soon</span></div>
                  <span className="leader-index">{member.number}</span>
                </div>
                <div className="domain-member-info">
                  <span className="leader-role"><span />{member.role}</span>
                  <h3>Name to be added</h3>
                  <p className="member-bio-placeholder">Profile details will be added later.</p>
                  <div className="member-socials" aria-label="Social profile links to be added">
                    {teamSocials.map(social => (
                      <span className="member-social-placeholder" key={social.field} title={`${social.label} link to be added`} aria-label={`${social.label} link to be added`}><Icon name={social.icon} size={17} /></span>
                    ))}
                  </div>
                  <span className="socials-note">Social links to be added</span>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="domain-team-footer"><span className="footnote-dot" />This page is ready for the lead and three team members. Names, photos and profile links can be filled in later.</div>
        </div>
      </section>
    </main>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="section leadership-section">
      <div className="section-wrap">
        <div className="leadership-content">
      <div className="leadership-heading">
        <SectionIntro eyebrow="The people behind the community" title={<>Led by students.<br /><span className="text-muted">Built for students.</span></>} description="Meet the core team helping ideas move from conversations to community experiences." />
        <span className="team-count"><strong>03</strong><span>Core<br />positions</span></span>
      </div>
      <div className="leaders-grid">
        {leaders.map((person, index) => (
          <motion.article className={`leader-card leader-card--${person.color}`} key={person.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.45, delay: index * 0.07 }}>
            <div className="leader-photo-wrap">
              <img src={person.image} alt={person.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'grid'; }} />
              <div className="leader-fallback" aria-hidden="true">{person.initials}</div>
              <span className="leader-index">0{index + 1}</span>
            </div>
            <div className="leader-info">
              <span className="leader-role"><span />{person.role}</span>
              <h3>{person.name}</h3>
              <div className="leader-socials" aria-label={`${person.name} social profile links`}>
                {[
                  { label: 'LinkedIn', icon: 'linkedin', href: person.linkedin },
                  { label: 'Instagram', icon: 'instagram', href: person.instagram },
                ].filter((social) => social.href).map((social) => (
                  <a className="leader-social-link" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`${person.name} on ${social.label}`} title={social.label}>
                    <Icon name={social.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="domain-leads-divider" aria-hidden="true">
        <span className="google-dot google-dot--blue" />
        <span className="google-dot google-dot--red" />
        <span className="google-dot google-dot--yellow" />
        <span className="google-dot google-dot--green" />
      </div>
      <div className="domain-leads-grid" aria-label="Team lead profile placeholders">
        {domainLeadSlots.map((slot, index) => (
          <motion.article className={`domain-lead-slot domain-lead-slot--${slot.color}`} key={slot.domainId} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.35, delay: index * 0.045 }}>
            <div className="domain-lead-photo">
              <div className="domain-lead-photo-placeholder"><Icon name="users" size={31} /><span>Photo to be added</span></div>
              <span className="leader-index">{slot.number}</span>
            </div>
            <div className="domain-lead-info">
              <span className="domain-lead-role"><span />TEAM LEAD</span>
              <h3>{slot.domainTitle}</h3>
              <p>Name to be added</p>
            </div>
          </motion.article>
        ))}
      </div>
        </div>
      </div>
    </section>
  );
}


const advisors = [
  {
    role: 'Faculty Advisor',
    name: 'To be confirmed',
    image: '',
    color: 'purple',
    initials: 'FA',
    pending: true,
    linkedin: '',
  },
  {
    role: 'Student Counselor',
    name: 'Shreya Upadhyay',
    image: '/people/shreya.webp',
    color: 'yellow',
    initials: 'SU',
    pending: false,
    linkedin: 'https://www.linkedin.com/in/shreya-upadhyay-055367320/',
    instagram: 'https://www.instagram.com/rudrashankar_0406/',
  },
];

function AdvisorsSection() {
  return (
    <section id="advisors" className="section advisors-section">
      <div className="section-wrap">
        <div className="advisors-content">
      <SectionIntro eyebrow="Guidance & support" title="Advisors" description="The people who help guide and support the GDG on Campus CITech community." />
      <div className="advisors-grid">
        {advisors.map((person, index) => (
          <motion.article className={`advisor-card advisor-card--${person.color}`} key={person.role} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.4, delay: index * 0.08 }}>
            <div className={`advisor-photo-wrap${person.pending ? ' advisor-photo-wrap--pending' : ''}`}>
              {person.image ? (
                <img src={person.image} alt={person.name} loading="lazy" />
              ) : (
                <div className="advisor-photo-placeholder"><Icon name="users" size={34} /><span>Photo to be added</span></div>
              )}
              <span className="leader-index">0{index + 1}</span>
            </div>
            <div className="advisor-info">
              <span className="leader-role"><span />{person.role}</span>
              <h3>{person.name}</h3>
              {person.pending && <p>Details will be added once confirmed.</p>}
              <div className="leader-socials advisor-socials" aria-label={`${person.role} social profile links`}>
                {[
                  { label: 'LinkedIn', icon: 'linkedin', href: person.linkedin, showPending: person.pending },
                  { label: 'Instagram', icon: 'instagram', href: person.instagram, showPending: false },
                ].filter((social) => social.href || social.showPending).map((social) => social.href ? (
                  <a className="leader-social-link" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`${person.name} on ${social.label}`} title={social.label}>
                    <Icon name={social.icon} size={16} />
                  </a>
                ) : (
                  <span className="leader-social-link leader-social-link--pending" key={social.label} aria-label={`${social.label} URL to be added`} title={`${social.label} URL to be added`}>
                    <Icon name={social.icon} size={16} />
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
        </div>
      </div>
    </section>
  );
}

const zynexSponsors = [
  {
    name: 'B-Learn Academy',
    logo: '/sponsors/blearn-academy.png',
    url: 'https://blearnacademy.com/',
  },
  {
    name: 'Infoavana Technologies',
    logo: '/sponsors/infoavana-technologies.png',
    url: 'https://infoavana.com/',
  },
  {
    name: 'BG THUB',
    logo: '/sponsors/bg-thub.png',
    url: 'https://www.bgthub.com/',
  },
  {
    name: 'SmagJ',
    logo: '/sponsors/smagj.png',
    url: 'https://smagj.in/',
  },
  {
    name: 'IEEE Computer Society',
    logo: '/sponsors/ieee-computer-society.png',
    url: 'https://ieeecsbangalore.org/',
  },
];

const eventItems = [
  {
    id: 'zynex',
    title: 'ZYNEX',
    type: 'Hackathon',
    date: '22–23 May 2026',
    time: '24–30 hour offline finale',
    venue: 'Cambridge Institute of Technology, Bengaluru',
    participation: 'Top 50 shortlisted teams for the finale',
    tagline: 'Velocity with Vision',
    color: 'red',
    cover: '/events/zynex/img-1.jpg',
    images: [
      '/events/zynex/img-2.jpg',
      '/events/zynex/img-3.jpg',
      '/events/zynex/img-4.jpg',
      '/events/zynex/img-5.jpg',
      '/events/zynex/img-6.jpg',
    ],
    sponsors: zynexSponsors,
    description: 'A flagship hackathon focused on solving real-world challenges through technology.',
    fullDescription: 'ZYNEX 2026 is a hackathon organized by GDG on Campus at Cambridge Institute of Technology, bringing student innovators together to solve real-world challenges through technology.\n\nFocused on software and hardware innovation, the event gives participants a platform to transform ideas into practical solutions through collaboration, creativity and rapid development. The published format begins with an online ideation round and concludes with an offline grand finale at Cambridge Institute of Technology.',
    highlights: [
      { title: 'Round 1 — Best Deployed Project', text: 'The original event brief invited teams to submit a built and deployed project with a GitHub repository, deployment link, setup steps and project documentation.' },
      { title: 'Round 2 — Offline Grand Finale', text: 'Shortlisted teams were planned to progress to an offline finale at CIT Bengaluru, with problem statements shared ahead of the event.' },
      { title: 'Software tracks', text: 'Artificial Intelligence and Machine Learning, Web Development, Application Development, Cybersecurity, Blockchain and Operating Systems.' },
      { title: 'Hardware tracks', text: 'Embedded Systems, Robotics, IoT, Smart Automation and Electronics Innovation.' },
      { title: 'Prize pool', text: 'The previous site listed a prize pool of ₹60,000+ alongside recognition and certificates.' },
    ],
    topics: ['AI/ML', 'Web Development', 'Cybersecurity', 'Blockchain', 'Embedded Systems', 'Robotics', 'IoT'],
    prerequisites: ['Open to undergraduate students across India', 'Teams should consist of students from the same institution', 'Interdisciplinary collaboration was encouraged'],
  },
  {
    id: 'cloud-study-jam',
    title: 'Cloud Study Jam',
    type: 'Workshop',
    date: '22 March 2026',
    time: '10:00 AM – 4:00 PM',
    venue: 'CITech Seminar Hall, 2nd Floor',
    participation: '120 seats listed on the previous site',
    tagline: 'Master the cloud. Build without limits.',
    color: 'blue',
    cover: '/event-covers/cloud-study-jam.svg',
    description: 'A hands-on introduction to Google Cloud Platform, BigQuery and serverless architecture.',
    fullDescription: 'Cloud Study Jam is a hands-on learning experience centered on Google Cloud, with guided labs and practical examples. Topics move from cloud architecture, identity and access management, and compute services to data analytics and serverless deployments.\n\nParticipants can explore how BigQuery is used to analyse datasets and how Cloud Functions and Cloud Run support serverless applications.',
    highlights: [
      { title: 'Google Cloud basics', text: 'Explore the console, Cloud Shell and the fundamentals of cloud infrastructure.' },
      { title: 'BigQuery', text: 'Learn the role of BigQuery in querying and analysing large datasets.' },
      { title: 'Serverless applications', text: 'Introduction to Cloud Functions and Cloud Run.' },
      { title: 'Identity and monitoring', text: 'Understand IAM fundamentals and the role of monitoring and logging.' },
    ],
    topics: ['Google Cloud', 'BigQuery', 'Cloud Functions', 'Cloud Run', 'Cloud Storage', 'IAM'],
    prerequisites: ['A Google account for cloud access', 'A laptop with a modern browser', 'The previous brief says no prior cloud experience was needed'],
  },
  {
    id: 'flutter-forward',
    title: 'Flutter Forward',
    type: 'Workshop',
    date: '5 April 2026',
    time: '10:00 AM – 5:00 PM',
    venue: 'CITech Computer Lab 3, Block B',
    participation: '80 seats listed on the previous site',
    tagline: 'One codebase. Every platform.',
    color: 'green',
    cover: '/event-covers/flutter-forward.svg',
    description: 'A cross-platform app development workshop covering Flutter and Dart, from widgets to animations.',
    fullDescription: 'Flutter Forward is a practical introduction to cross-platform app development. The learning path covers Dart fundamentals, Flutter’s widget tree, app layouts, state management, custom animations and Firebase integration.\n\nThe workshop explores how a single Flutter codebase can target both Android and iOS, while giving participants a foundation for building polished mobile experiences.',
    highlights: [
      { title: 'Dart and Flutter foundations', text: 'Learn the language basics, widget composition and responsive layouts.' },
      { title: 'State management', text: 'Explore application state patterns using Riverpod.' },
      { title: 'Polished interactions', text: 'Discover custom animations and transitions for mobile interfaces.' },
      { title: 'Firebase and deployment', text: 'Introduction to authentication, Firestore and preparing apps for devices.' },
    ],
    topics: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Material 3', 'Android Studio'],
    prerequisites: ['Basic programming knowledge in any language', 'Android Studio or VS Code', 'Flutter SDK setup guide was to be shared', 'USB device testing was optional'],
  },
  {
    id: 'kubernetes-kubeace',
    title: 'Kubernetes Workshop by KubeAce',
    type: 'Workshop',
    date: '7 April 2026',
    time: '1:00 PM onwards',
    venue: 'Auditorium, 5th Floor, SMV Block',
    participation: 'Open to all',
    tagline: 'From local builds to cloud-native deployment.',
    color: 'blue',
    cover: '/events/kubernetes/workshop-classroom.svg',
    images: [
      '/events/kubernetes/workshop-classroom.svg',
      '/events/kubernetes/speaker-session.svg',
      '/events/kubernetes/certificate-presentation.svg',
      '/events/kubernetes/team-photo.svg',
      '/events/kubernetes/participant-experience.svg',
    ],
    description: 'A workshop on Kubernetes, DevOps and cloud deployment, including deploying an AI-based application.',
    fullDescription: 'This hands-on workshop introduces cloud-native technology and modern software deployment. It explores how container orchestration helps move applications from local development to more resilient, scalable environments.\n\nLed by Harish Rajendran, the session covers a deployment workflow and an introduction to containerizing an AI-based application. Bringing a laptop was recommended for a better experience.',
    featuredPerson: {
      name: 'Harish Rajendran',
      role: 'Co-Founder & CTO of KubeAce; described in the original event content as a certified Kubernetes administrator with experience in Kubernetes, DevOps and cloud architecture.',
      image: '/events/kubernetes/harish-rajendran.jpeg',
    },
    highlights: [
      { title: 'DevOps ecosystem', text: 'Understand how development and operations fit together in cloud-native workflows.' },
      { title: 'Core Kubernetes concepts', text: 'An introduction to Pods, Services, Deployments and scaling.' },
      { title: 'AI application deployment', text: 'Explore the considerations involved in containerizing an AI-based application.' },
      { title: 'Deployment workflows', text: 'See how CI/CD can take an application from source code to a deployed environment.' },
    ],
    topics: ['Kubernetes', 'Docker', 'Cloud Architecture', 'DevOps', 'AI Deployment'],
    prerequisites: ['Bringing a laptop was recommended', 'Basic programming knowledge was helpful'],
  },
  {
    id: 'pulsex',
    title: 'PulseX — Leveraging the Power of AI',
    type: 'Hackathon',
    date: '22 December 2025 – 16 January 2026',
    time: 'Three-stage innovation challenge',
    venue: 'CHOSS Space, CIT Bengaluru',
    participation: '31 teams · 100+ participants listed on the previous site',
    tagline: 'Innovate with intelligence. Build for impact.',
    color: 'purple',
    cover: '/events/pulsex/img-2.jpg',
    description: 'An open-innovation hackathon focused on solving real-world and social challenges using AI and Google technologies.',
    fullDescription: 'PulseX is an open-innovation hackathon that encouraged students to solve real-world and social challenges using modern technology and Google tools. The emphasis was on practical implementation, feasibility and meaningful impact—not only technical complexity.\n\nThe challenge followed three stages, moving from idea pitching to a partial prototype and then a full working prototype. Each stage gave teams an opportunity to refine their ideas, strengthen technical execution and incorporate evaluation feedback.',
    images: [
      '/events/pulsex/img-1.jpg',
      '/events/pulsex/img-2.jpg',
      '/events/pulsex/img-3.jpg',
      '/events/pulsex/img-4.jpg',
      '/events/pulsex/img-5.jpg',
    ],
    highlights: [
      { title: 'Phase 1 — Idea Pitching', text: '22 December 2025. Teams presented ideas, with evaluation focused on relevance, innovation, technical design and long-term impact. The previous site notes that 10 teams advanced.' },
      { title: 'Phase 2 — Partial Prototype', text: '8 January 2026. Teams presented partially functional prototypes, system architecture and core features. The previous site notes that six teams qualified for the final round.' },
      { title: 'Phase 3 — Full Working Prototype', text: '16 January 2026. Finalists demonstrated end-to-end solutions, judged on scalability, usability, interface design, integration quality and real-world applicability.' },
      { title: 'Impact-driven development', text: 'Teams were encouraged to build practical solutions to meaningful problems and improve their prototypes throughout the challenge.' },
    ],
    impact: 'The original recap describes PulseX as a space where ideas were developed into working solutions and participants strengthened their problem-solving, prototyping and collaborative development skills.',
    topics: ['Google AI', 'Gemini API', 'TensorFlow', 'Google Cloud', 'Firebase', 'Flutter', 'Python'],
    prerequisites: ['Open to students', 'Interest in AI/ML and innovation', 'Basic programming and problem-solving skills', 'A laptop with a development environment'],
  },
  {
    id: 'embedded-systems',
    title: 'GDG Workshop on Embedded Systems',
    type: 'Workshop',
    date: '27 December 2025',
    time: '10:00 AM – 4:00 PM',
    venue: 'CITech Campus, Collaboration Hall',
    participation: '80+ participants listed on the previous site',
    tagline: 'Build intelligent systems. Power real-world innovation.',
    color: 'green',
    cover: '/events/embedded-systems/img-3.jpg',
    description: 'A hands-on introduction to robotics and embedded systems, organized jointly by GDG on Campus and Ad Astra.',
    fullDescription: 'This workshop introduced participants to embedded technology and its real-world applications through core concepts and practical demonstrations. Topics included embedded-system architecture, circuit design principles, hardware–software integration and system design.\n\nParticipants also explored Arduino-based robotic vehicles, sensor integration and circuit-design tools in a collaborative, hands-on setting.',
    images: [
      '/events/embedded-systems/img-1.jpg',
      '/events/embedded-systems/img-2.jpg',
      '/events/embedded-systems/img-3.jpg',
      '/events/embedded-systems/img-4.jpg',
    ],
    highlights: [
      { title: 'Strong conceptual foundation', text: 'Connect embedded-system fundamentals with real implementations.' },
      { title: 'Interactive learning', text: 'Explore core ideas with guidance from club leaders and embedded-systems enthusiasts.' },
      { title: 'Hands-on practical exposure', text: 'Use simulation tools and demonstrations to understand system behavior.' },
      { title: 'Hardware–software integration', text: 'Discover how sensors, controllers and software work together in robotic systems.' },
    ],
    impact: 'The original recap describes a collaborative session that strengthened participants’ understanding of embedded systems and encouraged them to explore more advanced hardware projects.',
    topics: ['Arduino', 'Microcontrollers', 'Circuit Design', 'Robotics', 'Embedded C', 'Sensors & Actuators'],
    prerequisites: ['Basic programming knowledge was recommended', 'Interest in electronics or embedded technology', 'Laptop with development tools installed'],
  },
];

function EventsSection({ onSelect }) {
  return (
    <section id="events" className="section events-section">
      <div className="section-wrap">
        <SectionIntro eyebrow="Made together, remembered together" title={<>Events & workshops.<br /><span className="text-muted">Ideas in action.</span></>} description="Explore hackathons, hands-on sessions and developer workshops from the GDG on Campus CITech community. Open an event to read its details and browse the photos available." />
        <div className="events-grid">
          {eventItems.map((event, index) => (
            <motion.button
              type="button"
              className={`event-tile event-tile--${event.color}`}
              key={event.id}
              onClick={() => onSelect(event)}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.42, delay: (index % 3) * 0.07 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.99 }}
              aria-label={`View details for ${event.title}`}
            >
              <div className="event-tile-image">
                <img src={event.cover} alt={`${event.title} event cover`} loading="lazy" />
                <span className="event-type-pill">{event.type}</span>
                <span className="event-tile-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="event-tile-content">
                <span className="event-date-line"><Icon name="calendar" size={15} />{event.date}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <span className="event-tile-action">View event details <Icon name="arrow" size={17} /></span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventDetailsModal({ event, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (keyEvent) => {
      if (keyEvent.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="event-modal-backdrop" onMouseDown={(eventClick) => { if (eventClick.target === eventClick.currentTarget) onClose(); }}>
      <motion.section
        className="event-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${event.title} event details`}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.22 }}
      >
        <button type="button" className="event-modal-close" onClick={onClose} aria-label="Close event details"><Icon name="close" size={21} /></button>
        <div className="event-modal-hero">
          <img src={event.cover} alt="" />
          <div className="event-modal-hero-copy">
            <span className={`event-modal-type event-modal-type--${event.color}`}>{event.type}</span>
            <p className="event-modal-date">{event.date}</p>
            <h2>{event.title}</h2>
            <p>{event.tagline}</p>
          </div>
        </div>
        <div className="event-modal-content">
          <div className="event-modal-main">
            <section className="event-modal-section">
              <span className="event-section-label">01 / THE EVENT</span>
              <h3>About this event</h3>
              <p className="event-modal-long-description">{event.fullDescription}</p>
            </section>

            {event.images?.length > 0 && (
              <section className="event-modal-section">
                <span className="event-section-label">02 / MOMENTS</span>
                <h3>Event gallery</h3>
                <div className="event-gallery">
                  {event.images.map((src, imageIndex) => (
                    <figure className="event-gallery-item" key={src}>
                      <img src={src} alt={`${event.title} — event photo ${imageIndex + 1}`} loading="lazy" />
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {event.featuredPerson && (
              <section className="event-modal-section">
                <span className="event-section-label">{event.images?.length > 0 ? '03' : '02'} / SESSION SPOTLIGHT</span>
                <h3>Featured speaker</h3>
                <div className="event-speaker-card">
                  <img src={event.featuredPerson.image} alt={event.featuredPerson.name} loading="lazy" />
                  <div><h4>{event.featuredPerson.name}</h4><p>{event.featuredPerson.role}</p></div>
                </div>
              </section>
            )}

            {event.highlights?.length > 0 && (
              <section className="event-modal-section">
                <span className="event-section-label">{event.images?.length > 0 ? (event.featuredPerson ? '04' : '03') : (event.featuredPerson ? '03' : '02')} / KEY DETAILS</span>
                <h3>Highlights</h3>
                <div className="event-highlights-grid">
                  {event.highlights.map((item, itemIndex) => (
                    <article className="event-highlight-card" key={item.title}>
                      <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {event.impact && (
              <section className="event-modal-section">
                <span className="event-section-label">RECAP</span>
                <h3>What it meant</h3>
                <p className="event-modal-long-description">{event.impact}</p>
              </section>
            )}

            {event.sponsors?.length > 0 && (
              <section className="event-modal-section event-sponsors-section">
                <span className="event-section-label">WITH THANKS</span>
                <h3>Our partners</h3>
                <p className="event-sponsors-intro">Thank you to the organizations that supported ZYNEX.</p>
                <div className="event-sponsors-grid">
                  {event.sponsors.map((sponsor) => (
                    <a className="event-sponsor-card" key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${sponsor.name} website`}>
                      <span className="event-sponsor-logo"><img src={sponsor.logo} alt={sponsor.name} loading="lazy" /></span>
                      <span className="event-sponsor-name">{sponsor.name}<Icon name="external" size={13} /></span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="event-modal-sidebar">
            <div className="event-info-card">
              <span className="event-info-icon"><Icon name="calendar" size={19} /></span>
              <div><small>Date</small><p>{event.date}</p></div>
            </div>
            {event.time && <div className="event-info-card"><span className="event-info-icon"><Icon name="users" size={19} /></span><div><small>Time / format</small><p>{event.time}</p></div></div>}
            {event.venue && <div className="event-info-card"><span className="event-info-icon"><Icon name="map" size={19} /></span><div><small>Venue</small><p>{event.venue}</p></div></div>}
            {event.participation && <div className="event-info-card"><span className="event-info-icon"><Icon name="users" size={19} /></span><div><small>Participation</small><p>{event.participation}</p></div></div>}
            {event.topics?.length > 0 && <div className="event-info-card event-topics-card"><h4>Topics & technologies</h4><div className="event-topic-tags">{event.topics.map(topic => <span key={topic}>{topic}</span>)}</div></div>}
            {event.prerequisites?.length > 0 && <div className="event-info-card event-prereqs-card"><h4>Requirements / notes</h4><ul>{event.prerequisites.map(item => <li key={item}>{item}</li>)}</ul></div>}
          </aside>
        </div>
        <div className="event-modal-footer"><span className="google-dot google-dot--blue" /><span className="google-dot google-dot--red" /><span className="google-dot google-dot--yellow" /><span className="google-dot google-dot--green" /><p>GDG on Campus · Cambridge Institute of Technology</p></div>
      </motion.section>
    </div>
  );
}

function SponsorsSection() {
  return (
    <section className="section sponsors-section" id="sponsors">
      <div className="section-wrap">
        <SectionIntro
          eyebrow="ZYNEX · With thanks"
          title={<>Built together with<br /><span className="text-muted">our partners.</span></>}
          description="We appreciate the organizations that supported ZYNEX and helped create opportunities for student builders."
        />
        <div className="sponsors-grid">
          {zynexSponsors.map((sponsor, index) => (
            <motion.a
              className="sponsor-card"
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.name} website`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <span className="sponsor-logo-frame"><img src={sponsor.logo} alt={sponsor.name} loading="lazy" /></span>
              <span className="sponsor-card-footer"><strong>{sponsor.name}</strong><Icon name="external" size={14} /></span>
            </motion.a>
          ))}
        </div>
        <p className="sponsors-note">Select a logo to visit the organization's website. Logos are presented without sponsor-tier labels.</p>
      </div>
    </section>
  );
}

function buildGmailComposeUrl({ subject = 'GDG on Campus CITech — General enquiry', body = '' } = {}) {
  // Use Gmail's web composer instead of mailto:, which does nothing on devices
  // that do not have a default email application configured.
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: 'gdsc@cambridge.edu.in',
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function openGmailCompose(url) {
  // Called directly from a user click/submit so popup blockers are less likely
  // to interfere. Fall back to same-tab navigation if a new tab is blocked.
  const composeWindow = window.open(url, '_blank');
  if (composeWindow) {
    composeWindow.opener = null;
  } else {
    window.location.assign(url);
  }
}

function ContactSection() {
  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const form = submitEvent.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const enquiryType = String(values.get('enquiryType') || 'General enquiry');
    const subject = `GDG on Campus CITech — ${enquiryType}`;
    const body = [
      `Name: ${values.get('name') || ''}`,
      `Email: ${values.get('email') || ''}`,
      `Organization: ${values.get('organization') || 'Not provided'}`,
      `Enquiry type: ${enquiryType}`,
      '',
      'Message:',
      String(values.get('message') || ''),
    ].join('\n');
    openGmailCompose(buildGmailComposeUrl({ subject, body }));
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-wrap">
        <SectionIntro
          eyebrow="Let's start a conversation"
          title={<>Have an idea?<br /><span className="text-muted">Let's talk.</span></>}
          description="For sponsorships, industry collaborations, event partnerships, workshops or community questions, we'd love to hear from you."
        />
        <div className="contact-layout">
          <div className="contact-aside">
            <article className="contact-pitch-card">
              <span className="contact-icon-chip"><Icon name="message" size={22} /></span>
              <h3>Partner with our community</h3>
              <p>Have a speaker, workshop, challenge, mentorship opportunity or sponsorship idea? Tell us what you're thinking and we'll get back to you.</p>
            </article>
            <a
              className="contact-detail-card contact-detail-card--link"
              href={buildGmailComposeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Gmail to email GDG on Campus CITech at gdsc@cambridge.edu.in"
              title="Open a Gmail compose window to contact GDG CITech"
            >
              <span className="contact-icon-chip contact-icon-chip--blue"><Icon name="message" size={20} /></span>
              <span><small>General enquiries</small><strong>gdsc@cambridge.edu.in</strong></span>
              <Icon name="external" size={15} />
            </a>
            <div className="contact-detail-card contact-detail-card--static">
              <span className="contact-icon-chip contact-icon-chip--green"><Icon name="map" size={20} /></span>
              <span><small>Based at</small><strong>Cambridge Institute of Technology</strong><em>Bengaluru, Karnataka, India</em></span>
            </div>
            <p className="contact-response-note">Your message stays in your email draft until you review and send it. This website does not send or store enquiry messages.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading"><span className="eyebrow"><span className="eyebrow-dot" />CONTACT THE TEAM</span><h3>Send us a message</h3><p>Fields marked with * are required.</p></div>
            <div className="contact-form-row">
              <label><span>Your name *</span><input name="name" type="text" autoComplete="name" placeholder="Enter your name" required /></label>
              <label><span>Email address *</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
            </div>
            <label><span>Organization / company</span><input name="organization" type="text" autoComplete="organization" placeholder="Your organization (optional)" /></label>
            <label><span>What would you like to discuss? *</span><select name="enquiryType" defaultValue="Sponsorship & partnerships" required><option>Sponsorship & partnerships</option><option>Event collaboration</option><option>Speaker or workshop proposal</option><option>Community enquiry</option><option>Other</option></select></label>
            <label><span>Your message *</span><textarea name="message" rows={5} minLength={10} placeholder="Tell us a little about your idea or enquiry..." required /></label>
            <button
              className="button button--primary contact-submit"
              type="submit"
              aria-label="Prepare an email with your enquiry details"
              title="Open Gmail with this enquiry filled in"
            >Prepare email <Icon name="arrow" size={18} /></button>
            <p className="contact-form-note">Gmail will open in a new tab with your details filled in. Review and send the email there; if a new tab is blocked, the page will open in this tab.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function JoinCommunity() {
  return (
    <section className="join-section section-wrap">
      <div className="join-decoration join-decoration--one" /><div className="join-decoration join-decoration--two" />
      <div className="join-content">
        <span className="eyebrow eyebrow--light"><span className="eyebrow-dot" />YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>Bring your curiosity.<br /><span>Leave with something built.</span></h2>
        <p>Meet people who love learning, share what you are working on and find your next idea with GDG on Campus CIT.</p>
        <a className="button button--white" href={COMMUNITY_URL} target="_blank" rel="noreferrer">Explore the GDG community <Icon name="external" size={17} /></a>
      </div>
      <div className="join-mark" aria-hidden="true"><span className="join-mark-dot join-mark-dot--blue" /><span className="join-mark-dot join-mark-dot--red" /><span className="join-mark-dot join-mark-dot--yellow" /><span className="join-mark-dot join-mark-dot--green" /><span className="join-mark-core"><Icon name="sparkles" size={36} /></span></div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/gdg.cit/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gdgcit', icon: 'linkedin' },
    { label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029Vb6ObkrEawduwzGJ5Z2D', icon: 'message' },
    { label: 'GitHub', href: 'https://github.com/GDGSC-CITECH', icon: 'github' },
  ];
  return (
    <footer className="site-footer">
      <div className="footer-main section-wrap">
        <a className="footer-brand" href="#home" aria-label="GDG on Campus CITech home">
          <img className="brand-mark" src="/gdg-cit-logo.png" alt="" />
          <span className="brand-copy">
            <strong>GDG on Campus</strong>
            <small>Cambridge Institute of Technology</small>
          </span>
        </a>
        <p>A campus community for curious minds, thoughtful builders and future-ready developers.</p>
        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map(link => <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer"><Icon name={link.icon} size={18} /></a>)}
        </div>
      </div>
      <div className="footer-bottom section-wrap">
        <span>© {new Date().getFullYear()} GDG on Campus · Cambridge Institute of Technology</span>
        <div className="footer-bottom-links"><a href="#contact">Contact us</a><a href={COMMUNITY_URL} target="_blank" rel="noreferrer">GDG Community <Icon name="external" size={14} /></a></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeEvent, setActiveEvent] = useState(null);
  const closeEventModal = useCallback(() => setActiveEvent(null), []);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path === window.location.pathname) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const domainMatch = currentPath.match(/^\/(?:teams|domains)\/([^/]+)\/?$/);
  const activeDomain = domainMatch ? domains.find((domain) => domain.id === domainMatch[1]) : null;

  // Intercept internal domain links so navigation works without a routing dependency.
  const handleDomainNavigation = (event) => {
    const link = event.target.closest('a[href^="/teams/"], a[href^="/domains/"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(link.getAttribute('href'));
  };

  return (
    <div className="app-shell" onClick={handleDomainNavigation}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header isDomainPage={Boolean(activeDomain)} />
      {activeDomain ? (
        <DomainTeamPage domain={activeDomain} onBack={() => navigate('/')} />
      ) : (
        <>
          <main id="main-content">
            <Hero />
            <CommunityRibbon />
            <About />
            <Domains />
            <Leadership />
            <AdvisorsSection />
            <EventsSection onSelect={setActiveEvent} />
            <SponsorsSection />
            <ContactSection />
            <JoinCommunity />
          </main>
          <Footer />
        </>
      )}
      {activeEvent && createPortal(<EventDetailsModal event={activeEvent} onClose={closeEventModal} />, document.body)}
    </div>
  );
}
