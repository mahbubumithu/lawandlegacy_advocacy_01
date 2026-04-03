
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(section, key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site content is viewable by everyone"
ON public.site_content FOR SELECT TO public
USING (true);

CREATE POLICY "Anyone can update site content"
ON public.site_content FOR UPDATE TO public
USING (true);

CREATE POLICY "Anyone can insert site content"
ON public.site_content FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Anyone can delete site content"
ON public.site_content FOR DELETE TO public
USING (true);

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed hero content
INSERT INTO public.site_content (section, key, value) VALUES
('hero', 'title', '"Law & Legacy"'),
('hero', 'subtitle', '"Premier Advocacy Firm in Bangladesh"'),
('hero', 'description', '"A new-generation law firm providing comprehensive legal solutions from documentation to litigation, serving individuals, corporations, and government entities with excellence and integrity."'),
('hero', 'button_text', '"Get Legal Consultation"');

-- Seed about content
INSERT INTO public.site_content (section, key, value) VALUES
('about', 'title', '"About Law & Legacy"'),
('about', 'paragraph1', '"Law & Legacy is a pre-eminent law firm providing specialist advice and a full range of legal services. As one of the most promising, growing, and multidimensional law firms in Bangladesh, we offer comprehensive legal services meeting virtually every need of our clients."'),
('about', 'paragraph2', '"Our practice is predominantly litigation-based, providing comprehensive advice to clients ranging from individuals and small businesses to large privately held national and international corporations, banks, and governmental entities."'),
('about', 'highlights', '["Top-tier legal professionals from leading law schools","Comprehensive one-stop legal service centre","Enlisted with numerous companies and banks","Proven track record with government ministries"]'),
('about', 'quote', '"We depend on our legal mind and prudence rather than traditional understanding. Our audacity of honesty and sincerity has instituted us as a successful growing law firm."');

-- Seed practice areas
INSERT INTO public.site_content (section, key, value) VALUES
('practice_areas', 'title', '"Areas of Practice"'),
('practice_areas', 'subtitle', '"Comprehensive legal services across diverse practice areas, meeting virtually every need of our clients"'),
('practice_areas', 'areas', '[{"icon":"Gavel","title":"Civil & Criminal Litigation","description":"Representing clients before all courts of Bangladesh from Judges Court to Appellate Division with meticulous case preparation."},{"icon":"Building2","title":"Banking & Finance","description":"Expert scrutiny of documents, property title determination, and drafting security documents for banks and NBFIs."},{"icon":"Briefcase","title":"Company & Corporate Law","description":"Comprehensive services from incorporation to mergers and acquisitions, serving as retainer lawyers for major corporations."},{"icon":"FileText","title":"Documentation & Registration","description":"Meticulous scrutiny of title deeds, verification with government authorities, and expert assistance in document registration."},{"icon":"Users","title":"Labour & Employment","description":"Cost-effective representation in labour courts and tribunals, with thousands of BLA cases successfully litigated."},{"icon":"Award","title":"Intellectual Property","description":"Full range of IP services including copyright, trademark, patent, and industrial design protection."},{"icon":"Home","title":"Family Law","description":"Professional and confidential handling of divorce, maintenance, custody, and other family matters under various laws."},{"icon":"Shield","title":"Constitutional & Administrative","description":"Expert representation in constitutional matters and administrative law before High Court and Appellate Division."},{"icon":"Globe","title":"International Trade","description":"Comprehensive support for foreign investment, joint ventures, and international business transactions."},{"icon":"Scale","title":"Alternative Dispute Resolution","description":"Skilled in domestic and international arbitration, mediation, conciliation, and negotiation processes."},{"icon":"TrendingUp","title":"Capital Market","description":"Securities law, stock exchange regulation, and comprehensive capital market advisory services."},{"icon":"Landmark","title":"Land & Property Law","description":"Expert handling of land disputes, property transactions, leases, and licensing matters."}]');

-- Seed team
INSERT INTO public.site_content (section, key, value) VALUES
('team', 'title', '"Our Legal Team"'),
('team', 'subtitle', '"Experienced legal professionals committed to providing the highest standards of advocacy and advice"'),
('team', 'members', '[{"name":"Porob Naser Siddique","role":"Head of Chamber","credentials":"Advocate, Supreme Court of Bangladesh","education":"LLM & LLB, University of Dhaka","specialization":"Corporate Law, Banking, International Trade, Mergers & Acquisitions"},{"name":"George Chowdhury","role":"Managing Partner","credentials":"Advocate, Supreme Court of Bangladesh","experience":"17+ years in litigation and corporate advisory","specialization":"Civil, Criminal, Constitutional, High-Stakes Litigation"},{"name":"Neshatul Islam","role":"Associate","credentials":"Advocate","education":"LL.B (Hons) & LL.M, Dhaka International University","specialization":"Corporate Law, Securities, Company Formation, Intellectual Property"},{"name":"Nazibul Islam","role":"Associate","credentials":"Advocate, Supreme Court of Bangladesh","education":"LL.M. & LL.B. (Hons), Jagannath University","specialization":"Civil & Criminal Law, Constitutional Matters, Labour Law"},{"name":"Samir Chakrabarty","role":"Associate","credentials":"Advocate, Sessions Court Dhaka","specialization":"Land Law, Contract Disputes, Family Law, Criminal Defense"},{"name":"Aktaruzzaman Aktar","role":"Associate","education":"LL.B & LL.M, East West University","experience":"5+ years with national and multinational corporations","specialization":"Corporate Law, Regulatory Compliance, Consumer Rights"},{"name":"Pampa Mukherjee","role":"Junior Associate","credentials":"Advocate, District & Sessions Court Dhaka","education":"LL.B. (Hons) & LL.M., Northern University Bangladesh","specialization":"Property Disputes, Family Law, General Litigation"},{"name":"Md. Rayhanul Islam","role":"Junior Associate","credentials":"Advocate, District & Sessions Court Dhaka","education":"LL.B. (Hons) & LL.M., Eastern University","specialization":"Property Law, Family Disputes, General Litigation"}]');

-- Seed clients
INSERT INTO public.site_content (section, key, value) VALUES
('clients', 'title', '"Our Clients"'),
('clients', 'subtitle', '"Trusted by government ministries, multinational corporations, banks, and leading businesses across Bangladesh"'),
('clients', 'categories', '[{"icon":"Landmark","title":"Government Entities","clients":["Bangladesh Hi-Tech Park Authority","Ministry of Commerce","Ministry of Expatriates Welfare & Overseas Employment","Bangladesh Fisheries Development Corporation","Export Promotion Bureau (EPB)","Directorate of Government Accommodation"]},{"icon":"Building2","title":"Corporate Clients","clients":["Ashiyan Group","Arizona Holding Ltd.","Alif Group","Planet Group","Studio Dhaka Limited","ESSDEE Infrastructure Ltd."]},{"icon":"Shield","title":"Financial Institutions","clients":["Leading Banks of Bangladesh","Non-Banking Financial Institutions","Capital Market Participants","Insurance Companies"]},{"icon":"Briefcase","title":"Industry Partners","clients":["Fakir Fashions Ltd","Transport Partner Ltd.","Banglalink Employees Union","BA3 Limited"]}]');

-- Seed contact
INSERT INTO public.site_content (section, key, value) VALUES
('contact', 'title', '"Get In Touch"'),
('contact', 'subtitle', '"Reach out to us for legal consultation and advice. We are here to help you navigate your legal challenges."'),
('contact', 'phone', '"+880 1716 32 8898"'),
('contact', 'email', '"info@lawandlegacy.com.bd"'),
('contact', 'office_hours', '"Saturday - Thursday, 9:00 AM - 6:00 PM"'),
('contact', 'offices', '[{"name":"Supreme Court Office","address":"Room No. 9049 (8th Floor), Huseyn Shaheed Suhrawardy Building, Supreme Court Bar Association","city":"Dhaka-1000"},{"name":"Evening Office","address":"House No. 1/1 (B), (3rd Floor) Block-C, Lalmatia","city":"Dhaka-1207"},{"name":"Judge Court Office","address":"Room No. 746 (6th Floor), Dhaka Bar Association Building, 6-7, Court House Street, Kotwali","city":"Dhaka"}]');

-- Seed footer
INSERT INTO public.site_content (section, key, value) VALUES
('footer', 'description', '"A pre-eminent law firm providing comprehensive legal services across Bangladesh. We pride ourselves on our commitment to personal service and delivering the very best results for our clients."');
