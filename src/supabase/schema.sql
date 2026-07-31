-- =============================================================================
-- Aurora Dev Portfolio — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
--
-- After running this file, create your admin login:
--   Supabase Dashboard → Authentication → Users → Add user
--   (set an email + password, and check "Auto Confirm User")
-- That email/password is what you sign in with at /admin/login.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. HERO  (single row: site owner + contact info)
-- ---------------------------------------------------------------------------
create table if not exists hero (
  id             bigint primary key default 1,
  name           text not null default '',
  title          text not null default '',
  subtitle       text not null default '',
  resume         text,
  profile_image  text,
  email          text,
  github         text,
  linkedin       text,
  twitter        text,
  location       text,
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. ABOUT  (single row)
-- ---------------------------------------------------------------------------
create table if not exists about (
  id           bigint primary key default 1,
  description  text not null default '',
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. SKILLS
-- ---------------------------------------------------------------------------
create table if not exists skills (
  id            bigserial primary key,
  name          text not null,
  category      text not null default 'General',
  icon          text default 'FiCode',       -- react-icons component name, e.g. "SiReact"
  proficiency   int not null default 70 check (proficiency between 0 and 100),
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 4. PROJECTS
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id            bigserial primary key,
  title         text not null,
  description   text not null default '',
  tech_stack    text[] not null default '{}',
  github_link   text,
  live_demo     text,
  image         text,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Keep updated_at fresh on hero/about
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_hero_updated_at on hero;
create trigger trg_hero_updated_at before update on hero
for each row execute function set_updated_at();

drop trigger if exists trg_about_updated_at on about;
create trigger trg_about_updated_at before update on about
for each row execute function set_updated_at();

-- =============================================================================
-- Row Level Security
-- Public (anon) can READ everything, so the live site works with no login.
-- Writes (insert/update/delete) require a signed-in Supabase Auth user, which
-- is what powers the /admin login screen — the anon key alone can no longer
-- write to any table.
-- =============================================================================

alter table hero enable row level security;
alter table about enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;

create policy "public read hero"     on hero     for select using (true);
create policy "public read about"    on about    for select using (true);
create policy "public read skills"   on skills   for select using (true);
create policy "public read projects" on projects for select using (true);

create policy "authenticated write hero"   on hero   for insert to authenticated with check (true);
create policy "authenticated update hero"  on hero   for update to authenticated using (true) with check (true);

create policy "authenticated write about"  on about  for insert to authenticated with check (true);
create policy "authenticated update about" on about  for update to authenticated using (true) with check (true);

create policy "authenticated write skills"  on skills for insert to authenticated with check (true);
create policy "authenticated update skills" on skills for update to authenticated using (true) with check (true);
create policy "authenticated delete skills" on skills for delete to authenticated using (true);

create policy "authenticated write projects"  on projects for insert to authenticated with check (true);
create policy "authenticated update projects" on projects for update to authenticated using (true) with check (true);
create policy "authenticated delete projects" on projects for delete to authenticated using (true);

-- =============================================================================
-- Realtime — required for the public site to update live when /admin saves
-- =============================================================================
alter publication supabase_realtime add table hero;
alter publication supabase_realtime add table about;
alter publication supabase_realtime add table skills;
alter publication supabase_realtime add table projects;

-- =============================================================================
-- Sample seed data
-- =============================================================================

insert into hero (id, name, title, subtitle, resume, profile_image, email, github, linkedin, twitter, location)
values (
  1,
  'Safa Nasir',
  'BS Artificial Intelligence Student',
  'Second-semester AI student learning to turn ideas into code — currently exploring Python, data structures, and the fundamentals of machine learning. Building small projects along the way to learn by doing.',
  'https://example.com/resume.pdf',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  'safanasir319@gmail.com',
  'https://github.com/safanasir',
  'https://linkedin.com/in/safanasir',
  null,
  'Islamabad, Pakistan'
)
on conflict (id) do update set
  name = excluded.name, title = excluded.title, subtitle = excluded.subtitle,
  resume = excluded.resume, profile_image = excluded.profile_image,
  email = excluded.email, github = excluded.github, linkedin = excluded.linkedin,
  twitter = excluded.twitter, location = excluded.location;

insert into about (id, description)
values (
  1,
  'I''m a second-semester BS Artificial Intelligence student with a growing interest in how machines learn and make decisions. Right now I''m building a foundation in programming, mathematics, and problem-solving through coursework and small personal projects. I enjoy the process of learning a new concept and then building something — however small — to prove I actually understand it. Long term, I''m aiming toward machine learning and data science, and I''m using this portfolio to track my progress along the way.'
)
on conflict (id) do update set description = excluded.description;

insert into skills (name, category, icon, proficiency) values
  ('Python',           'Language', 'SiPython',      65),
  ('C++',              'Language', 'SiCplusplus',   55),
  ('NumPy',            'AI/ML',    'SiNumpy',       40),
  ('Data Structures',  'CS Fundamentals', 'FiLayers', 50),
  ('HTML & CSS',       'Frontend', 'SiHtml5',       60),
  ('Git & GitHub',     'Tools',    'FiGitBranch',   45),
  ('MS Office',        'Tools',    'FiFileText',    75),
  ('Problem Solving',  'CS Fundamentals', 'FiCpu',   60)
on conflict do nothing;

insert into projects (title, description, tech_stack, github_link, live_demo, image) values
  (
    'Student Grade Calculator',
    'A Python command-line tool that calculates GPA and letter grades from a list of course scores, built to practice conditionals, loops, and functions.',
    array['Python'],
    'https://github.com/safanasir/grade-calculator',
    null,
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
  ),
  (
    'Iris Flower Classifier',
    'A beginner machine learning project using the classic Iris dataset to classify flower species with a simple scikit-learn model, built while learning ML fundamentals.',
    array['Python','NumPy','scikit-learn'],
    'https://github.com/safanasir/iris-classifier',
    null,
    'https://images.unsplash.com/photo-1470137237906-d8a4f71e1966?w=800&q=80'
  ),
  (
    'Personal Portfolio Website',
    'This portfolio itself — a serverless CMS built with React and Supabase, made as a semester project to learn full-stack fundamentals beyond the classroom.',
    array['React','Supabase','Tailwind CSS'],
    'https://github.com/safanasir/aurora-portfolio',
    null,
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  )
on conflict do nothing;
