import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Building2, 
  MessageSquare, 
  Upload, 
  Eye, 
  EyeOff,
  Phone, 
  Mail, 
  Calendar,
  Layers,
  MapPin,
  DollarSign,
  Loader2,
  ExternalLink,
  Users,
  Star,
  Settings,
  ShieldCheck,
  Quote
} from 'lucide-react';
import { 
  Project, 
  TeamMember, 
  Testimonial, 
  CompanyContactSettings,
  DEFAULT_COMPANY_SETTINGS
} from '../data/initialData';
import { 
  saveProjectToFirestore, 
  deleteProjectFromFirestore, 
  subscribeToInquiries, 
  updateInquiryStatus,
  saveTeamMemberToFirestore,
  deleteTeamMemberFromFirestore,
  saveTestimonialToFirestore,
  deleteTestimonialFromFirestore,
  saveCompanySettingsToFirestore
} from '../firebase/service';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects?: Project[];
  team?: TeamMember[];
  testimonials?: Testimonial[];
  settings?: CompanyContactSettings;
}

const PRESET_IMAGES = [
  { label: 'Commercial High-Rise', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Modern Skyscraper', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Corporate Tower', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Luxury Villa Cantt', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Hospital Building', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Industrial Factory', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80' }
];

const PRESET_AVATARS = [
  { label: 'Executive Male 1', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { label: 'Executive Male 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { label: 'Engineer 1', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { label: 'Engineer 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { label: 'Director Female', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' }
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ 
  isOpen, 
  onClose, 
  projects = [],
  team = [],
  testimonials = [],
  settings = DEFAULT_COMPANY_SETTINGS
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bn_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'team' | 'testimonials' | 'settings' | 'inquiries'>('projects');

  // Loading & notification state
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Safe lists
  const currentProjects = projects || [];
  const currentTeam = team || [];
  const currentTestimonials = testimonials || [];

  // ================= PROJECT FORM STATE =================
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'Commercial' | 'Residential' | 'Healthcare' | 'Industrial' | 'Institutional' | 'Infrastructure'>('Commercial');
  const [projLocation, setProjLocation] = useState('');
  const [projFloors, setProjFloors] = useState('');
  const [projDuration, setProjDuration] = useState('');
  const [projWorkAmount, setProjWorkAmount] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const [projImageUrl, setProjImageUrl] = useState('');
  const [projStatus, setProjStatus] = useState<'Completed' | 'Under Construction' | 'Ongoing' | 'Upcoming'>('Ongoing');
  const [projFeatured, setProjFeatured] = useState(false);
  const [projHighlights, setProjHighlights] = useState('');

  // ================= TEAM FORM STATE =================
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamBio, setTeamBio] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState('');

  // ================= TESTIMONIAL FORM STATE =================
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testClientName, setTestClientName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testCompany, setTestCompany] = useState('');
  const [testFeedback, setTestFeedback] = useState('');
  const [testRating, setTestRating] = useState<number>(5);
  const [testRatingText, setTestRatingText] = useState('5.0 ★ Exceptional');
  const [testProjectRef, setTestProjectRef] = useState('');
  const [testAvatarUrl, setTestAvatarUrl] = useState('');

  // ================= SETTINGS FORM STATE =================
  const [headOfficeAddress, setHeadOfficeAddress] = useState(settings?.headOfficeAddress || DEFAULT_COMPANY_SETTINGS.headOfficeAddress);
  const [branchOfficeAddress, setBranchOfficeAddress] = useState(settings?.branchOfficeAddress || DEFAULT_COMPANY_SETTINGS.branchOfficeAddress);
  const [phone1, setPhone1] = useState(settings?.phone1 || DEFAULT_COMPANY_SETTINGS.phone1);
  const [phone2, setPhone2] = useState(settings?.phone2 || DEFAULT_COMPANY_SETTINGS.phone2);
  const [phone3, setPhone3] = useState(settings?.phone3 || DEFAULT_COMPANY_SETTINGS.phone3);
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || DEFAULT_COMPANY_SETTINGS.whatsapp);
  const [email1, setEmail1] = useState(settings?.email1 || DEFAULT_COMPANY_SETTINGS.email1);
  const [email2, setEmail2] = useState(settings?.email2 || DEFAULT_COMPANY_SETTINGS.email2);
  const [hours, setHours] = useState(settings?.hours || DEFAULT_COMPANY_SETTINGS.hours);
  const [ceoName, setCeoName] = useState(settings?.ceoName || DEFAULT_COMPANY_SETTINGS.ceoName);
  const [ceoRole, setCeoRole] = useState(settings?.ceoRole || DEFAULT_COMPANY_SETTINGS.ceoRole);
  const [ceoMessage, setCeoMessage] = useState(settings?.ceoMessage || DEFAULT_COMPANY_SETTINGS.ceoMessage);
  const [founderName, setFounderName] = useState(settings?.founderName || DEFAULT_COMPANY_SETTINGS.founderName);
  const [founderRole, setFounderRole] = useState(settings?.founderRole || DEFAULT_COMPANY_SETTINGS.founderRole);

  // Sync settings when props change
  useEffect(() => {
    if (settings) {
      setHeadOfficeAddress(settings.headOfficeAddress || DEFAULT_COMPANY_SETTINGS.headOfficeAddress);
      setBranchOfficeAddress(settings.branchOfficeAddress || DEFAULT_COMPANY_SETTINGS.branchOfficeAddress);
      setPhone1(settings.phone1 || DEFAULT_COMPANY_SETTINGS.phone1);
      setPhone2(settings.phone2 || DEFAULT_COMPANY_SETTINGS.phone2);
      setPhone3(settings.phone3 || DEFAULT_COMPANY_SETTINGS.phone3);
      setWhatsapp(settings.whatsapp || DEFAULT_COMPANY_SETTINGS.whatsapp);
      setEmail1(settings.email1 || DEFAULT_COMPANY_SETTINGS.email1);
      setEmail2(settings.email2 || DEFAULT_COMPANY_SETTINGS.email2);
      setHours(settings.hours || DEFAULT_COMPANY_SETTINGS.hours);
      setCeoName(settings.ceoName || DEFAULT_COMPANY_SETTINGS.ceoName);
      setCeoRole(settings.ceoRole || DEFAULT_COMPANY_SETTINGS.ceoRole);
      setCeoMessage(settings.ceoMessage || DEFAULT_COMPANY_SETTINGS.ceoMessage);
      setFounderName(settings.founderName || DEFAULT_COMPANY_SETTINGS.founderName);
      setFounderRole(settings.founderRole || DEFAULT_COMPANY_SETTINGS.founderRole);
    }
  }, [settings]);

  // Real-time inquiries
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const unsub = subscribeToInquiries((items) => {
        setInquiries(items);
      });
      return () => unsub();
    }
  }, [isAuthenticated]);

  if (!isOpen) return null;

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'binnasir2026' || passcode === '03004687544') {
      setIsAuthenticated(true);
      sessionStorage.setItem('bn_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please check your credentials and try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bn_admin_auth');
  };

  // ================= PROJECT HANDLERS =================
  const handleResetProjectForm = () => {
    setIsEditingProject(false);
    setEditingProjectId(null);
    setProjTitle('');
    setProjCategory('Commercial');
    setProjLocation('');
    setProjFloors('');
    setProjDuration('');
    setProjWorkAmount('');
    setProjDescription('');
    setProjImageUrl('');
    setProjStatus('Ongoing');
    setProjFeatured(false);
    setProjHighlights('');
    setSaveStatus(null);
  };

  const handleStartEditProject = (proj: Project) => {
    setIsEditingProject(true);
    setEditingProjectId(proj.id);
    setProjTitle(proj.title);
    setProjCategory(proj.category);
    setProjLocation(proj.location);
    setProjFloors(proj.floors);
    setProjDuration(proj.duration);
    setProjWorkAmount(proj.workAmount);
    setProjDescription(proj.description);
    setProjImageUrl(proj.imageUrl);
    setProjStatus(proj.status);
    setProjFeatured(proj.featured || false);
    setProjHighlights(proj.highlights?.join('\n') || '');
    setSaveStatus(null);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projLocation.trim() || !projFloors.trim()) {
      alert('Please fill out Project Title, Location, and Floors.');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    const projectId = editingProjectId || `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const highlights = projHighlights
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    const projectData: Project = {
      id: projectId,
      title: projTitle.trim(),
      category: projCategory,
      location: projLocation.trim(),
      floors: projFloors.trim(),
      duration: projDuration.trim() || '2024 to 2026',
      workAmount: projWorkAmount.trim() || 'PKR To be announced',
      description: projDescription.trim() || 'Modern civil engineering and architecture executed by Bin Nasir Real Estate & Builder.',
      imageUrl: projImageUrl.trim() || PRESET_IMAGES[0].url,
      status: projStatus,
      featured: projFeatured,
      highlights: highlights.length > 0 ? highlights : ['Seismic RCC structure', 'ISO 9001 quality audit', 'Turnkey delivery']
    };

    try {
      await saveProjectToFirestore(projectData);
      setSaveStatus('Project saved successfully to Firebase Firestore!');
      setTimeout(() => handleResetProjectForm(), 1000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error saving project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (projId: string) => {
    if (confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await deleteProjectFromFirestore(projId);
      } catch (err) {
        alert('Could not delete project from database.');
      }
    }
  };

  // ================= TEAM HANDLERS =================
  const handleResetTeamForm = () => {
    setIsEditingTeam(false);
    setEditingTeamId(null);
    setTeamName('');
    setTeamRole('');
    setTeamBio('');
    setTeamImageUrl('');
    setSaveStatus(null);
  };

  const handleStartEditTeam = (member: TeamMember) => {
    setIsEditingTeam(true);
    setEditingTeamId(member.id);
    setTeamName(member.name);
    setTeamRole(member.role);
    setTeamBio(member.bio);
    setTeamImageUrl(member.imageUrl || '');
    setSaveStatus(null);
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !teamRole.trim()) {
      alert('Please fill out Member Name and Designation.');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    const memberId = editingTeamId || `team-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const memberData: TeamMember = {
      id: memberId,
      name: teamName.trim(),
      role: teamRole.trim(),
      bio: teamBio.trim() || 'Certified engineering and operations professional at Bin Nasir Real Estate & Builder.',
      imageUrl: teamImageUrl.trim() || PRESET_AVATARS[0].url
    };

    try {
      await saveTeamMemberToFirestore(memberData);
      setSaveStatus('Team member saved successfully to Firebase Firestore!');
      setTimeout(() => handleResetTeamForm(), 1000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error saving team member.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTeam = async (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      try {
        await deleteTeamMemberFromFirestore(memberId);
      } catch (err) {
        alert('Could not remove team member.');
      }
    }
  };

  // ================= TESTIMONIAL HANDLERS =================
  const handleResetTestimonialForm = () => {
    setIsEditingTestimonial(false);
    setEditingTestimonialId(null);
    setTestClientName('');
    setTestRole('');
    setTestCompany('');
    setTestFeedback('');
    setTestRating(5);
    setTestRatingText('5.0 ★ Exceptional');
    setTestProjectRef('');
    setTestAvatarUrl('');
    setSaveStatus(null);
  };

  const handleStartEditTestimonial = (item: Testimonial) => {
    setIsEditingTestimonial(true);
    setEditingTestimonialId(item.id);
    setTestClientName(item.name);
    setTestRole(item.role);
    setTestCompany(item.company);
    setTestFeedback(item.feedback);
    setTestRating(item.rating);
    setTestRatingText(item.ratingText || `${item.rating}.0 Verified Rating`);
    setTestProjectRef(item.projectRef);
    setTestAvatarUrl(item.avatarUrl || '');
    setSaveStatus(null);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testClientName.trim() || !testFeedback.trim()) {
      alert('Please fill out Client Name and Feedback text.');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    const testId = editingTestimonialId || `test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const testimonialData: Testimonial = {
      id: testId,
      name: testClientName.trim(),
      role: testRole.trim() || 'Client / Resident',
      company: testCompany.trim() || 'Lahore',
      feedback: testFeedback.trim(),
      rating: Number(testRating) || 5,
      ratingText: testRatingText.trim() || `${testRating}.0 Verified Rating`,
      projectRef: testProjectRef.trim() || 'High-Rise / Villa Project',
      date: new Date().getFullYear().toString(),
      avatarUrl: testAvatarUrl.trim() || undefined
    };

    try {
      await saveTestimonialToFirestore(testimonialData);
      setSaveStatus('Testimonial saved successfully to Firebase Firestore!');
      setTimeout(() => handleResetTestimonialForm(), 1000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error saving testimonial.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTestimonial = async (testId: string) => {
    if (confirm('Are you sure you want to remove this client review?')) {
      try {
        await deleteTestimonialFromFirestore(testId);
      } catch (err) {
        alert('Could not delete testimonial.');
      }
    }
  };

  // ================= SETTINGS HANDLERS =================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    const newSettings: CompanyContactSettings = {
      id: 'company',
      headOfficeAddress: headOfficeAddress.trim(),
      branchOfficeAddress: branchOfficeAddress.trim(),
      phone1: phone1.trim(),
      phone2: phone2.trim(),
      phone3: phone3.trim(),
      whatsapp: whatsapp.trim(),
      email1: email1.trim(),
      email2: email2.trim(),
      hours: hours.trim(),
      ceoName: ceoName.trim(),
      ceoRole: ceoRole.trim(),
      ceoMessage: ceoMessage.trim(),
      founderName: founderName.trim(),
      founderRole: founderRole.trim()
    };

    try {
      await saveCompanySettingsToFirestore(newSettings);
      setSaveStatus('Company contact details and leadership information updated successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error saving company settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // File upload helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetSetter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      targetSetter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Owner Administrative Control Center
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Bin Nasir Real Estate & Builder
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage projects, team members, client reviews, contact addresses, phone numbers & inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Owner Authentication Required
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your administrative passcode to manage website content and read client inquiries.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter owner password..."
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white text-center font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 tracking-wider"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition-all active:scale-95"
              >
                Access Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Sub-Navbar Navigation Tabs */}
            <div className="px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => { setActiveTab('projects'); handleResetProjectForm(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Projects ({currentProjects.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('team'); handleResetTeamForm(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'team'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                  title="Edit The Engineering & Management Team"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>The Engineering & Management Team ({currentTeam.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('testimonials'); handleResetTestimonialForm(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'testimonials'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                  title="Edit Trusted by Pakistan's Foremost Developers"
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>Trusted by Pakistan's Foremost Developers ({currentTestimonials.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('settings'); setSaveStatus(null); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'settings'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                  title="Connect with Our Chief Civil Engineers & Planners"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Connect with Our Chief Civil Engineers & Planners</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'inquiries'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquiries ({inquiries.length})</span>
                </button>
              </div>

              {/* Action buttons per tab */}
              {activeTab === 'projects' && !isEditingProject && (
                <button
                  onClick={() => { handleResetProjectForm(); setIsEditingProject(true); }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              )}

              {activeTab === 'team' && !isEditingTeam && (
                <button
                  onClick={() => { handleResetTeamForm(); setIsEditingTeam(true); }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              )}

              {activeTab === 'testimonials' && !isEditingTestimonial && (
                <button
                  onClick={() => { handleResetTestimonialForm(); setIsEditingTestimonial(true); }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* ================= TAB 1: PROJECTS ================= */}
              {activeTab === 'projects' && (
                <div>
                  {isEditingProject ? (
                    <form onSubmit={handleSaveProject} className="space-y-5 max-w-3xl mx-auto bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                          {editingProjectId ? 'Edit Project Details' : 'Add New Portfolio Project'}
                        </h3>
                        <button type="button" onClick={handleResetProjectForm} className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white">
                          Cancel
                        </button>
                      </div>

                      {saveStatus && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                          {saveStatus}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Title *</label>
                          <input
                            type="text"
                            required
                            value={projTitle}
                            onChange={(e) => setProjTitle(e.target.value)}
                            placeholder="e.g. Al-Nasir Corporate Tower"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category *</label>
                          <select
                            value={projCategory}
                            onChange={(e) => setProjCategory(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          >
                            <option value="Commercial">Commercial & High-Rise</option>
                            <option value="Residential">Residential Villas</option>
                            <option value="Healthcare">Healthcare & Hospital</option>
                            <option value="Industrial">Industrial Plant / Warehousing</option>
                            <option value="Institutional">Institutional & Campus</option>
                            <option value="Infrastructure">Civil Infrastructure & Road</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Location *</label>
                          <input
                            type="text"
                            required
                            value={projLocation}
                            onChange={(e) => setProjLocation(e.target.value)}
                            placeholder="e.g. Gulberg 3, Lahore"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Floors & Basements *</label>
                          <input
                            type="text"
                            required
                            value={projFloors}
                            onChange={(e) => setProjFloors(e.target.value)}
                            placeholder="e.g. 3 Basement + 18 Floor"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Amount / Budget</label>
                          <input
                            type="text"
                            value={projWorkAmount}
                            onChange={(e) => setProjWorkAmount(e.target.value)}
                            placeholder="e.g. PKR 320.50 Million"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Duration</label>
                          <input
                            type="text"
                            value={projDuration}
                            onChange={(e) => setProjDuration(e.target.value)}
                            placeholder="e.g. 2024 to 2026"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Status</label>
                          <select
                            value={projStatus}
                            onChange={(e) => setProjStatus(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          >
                            <option value="Completed">Completed</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Upcoming">Upcoming</option>
                          </select>
                        </div>
                      </div>

                      {/* Image Upload / Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Picture / Photo</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={projImageUrl}
                            onChange={(e) => setProjImageUrl(e.target.value)}
                            placeholder="Paste image URL (https://...)"
                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-xs font-semibold flex items-center gap-1.5 text-slate-800 dark:text-white whitespace-nowrap">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setProjImageUrl)} className="hidden" />
                          </label>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                          <span className="text-slate-400">Presets:</span>
                          {PRESET_IMAGES.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setProjImageUrl(preset.url)}
                              className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-500 whitespace-nowrap"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>

                        {projImageUrl && (
                          <div className="relative aspect-video max-h-44 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 mt-1">
                            <img src={projImageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description & Scope</label>
                        <textarea
                          rows={3}
                          value={projDescription}
                          onChange={(e) => setProjDescription(e.target.value)}
                          placeholder="Comprehensive details of structural execution..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Technical Highlights (1 per line)</label>
                        <textarea
                          rows={2}
                          value={projHighlights}
                          onChange={(e) => setProjHighlights(e.target.value)}
                          placeholder="4 Deep Basements Shoring&#10;Seismic Moment Frame Concrete"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="projFeaturedToggle"
                          checked={projFeatured}
                          onChange={(e) => setProjFeatured(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-500"
                        />
                        <label htmlFor="projFeaturedToggle" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                          Highlight as Landmark Project on Homepage
                        </label>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <button type="button" onClick={handleResetProjectForm} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 shadow-md disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          <span>{editingProjectId ? 'Update Project' : 'Publish Project'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                          Current Projects in Database ({projects.length})
                        </h3>
                        <span className="text-xs text-slate-500">
                          Click "Edit" to modify pictures, text, floors, or budget.
                        </span>
                      </div>

                      <div className="grid gap-3">
                        {projects.map((proj) => (
                          <div
                            key={proj.id}
                            className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3.5">
                              <img src={proj.imageUrl} alt={proj.title} className="w-16 h-12 object-cover rounded-xl bg-slate-950 flex-shrink-0" />
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{proj.title}</h4>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                    {proj.category}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
                                  <span>{proj.location}</span>
                                  <span>•</span>
                                  <span>{proj.floors}</span>
                                  <span>•</span>
                                  <span className="font-bold text-amber-600 dark:text-amber-400">{proj.workAmount}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-700">
                              <button onClick={() => handleStartEditProject(proj)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 flex items-center gap-1">
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button onClick={() => handleDeleteProject(proj.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 flex items-center gap-1">
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 2: TEAM MEMBERS ================= */}
              {activeTab === 'team' && (
                <div>
                  {isEditingTeam ? (
                    <form onSubmit={handleSaveTeam} className="space-y-5 max-w-2xl mx-auto bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                          {editingTeamId ? 'Edit Team Member: The Engineering & Management Team' : 'Add New Team Member: The Engineering & Management Team'}
                        </h3>
                        <button type="button" onClick={handleResetTeamForm} className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white">
                          Cancel
                        </button>
                      </div>

                      {saveStatus && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                          {saveStatus}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Member Naam (Full Name) *</label>
                          <input
                            type="text"
                            required
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="e.g. Engr. Asim Raza"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Dasination / Designation (Role) *</label>
                          <input
                            type="text"
                            required
                            value={teamRole}
                            onChange={(e) => setTeamRole(e.target.value)}
                            placeholder="e.g. Chief Structural Engineer"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description / Bio *</label>
                        <textarea
                          rows={3}
                          required
                          value={teamBio}
                          onChange={(e) => setTeamBio(e.target.value)}
                          placeholder="Oversees mega projects, civil safety compliance, and site planning..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Profile Image (Photo URL, Upload, or Choose Avatar) *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={teamImageUrl}
                            onChange={(e) => setTeamImageUrl(e.target.value)}
                            placeholder="Paste image URL (https://...)"
                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-xs font-semibold flex items-center gap-1.5 text-slate-800 dark:text-white whitespace-nowrap">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setTeamImageUrl)} className="hidden" />
                          </label>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                          <span className="text-slate-400">Presets:</span>
                          {PRESET_AVATARS.map((av, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setTeamImageUrl(av.url)}
                              className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-500 whitespace-nowrap"
                            >
                              {av.label}
                            </button>
                          ))}
                        </div>

                        {teamImageUrl && (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 mt-1">
                            <img src={teamImageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <button type="button" onClick={handleResetTeamForm} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 shadow-md disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          <span>{editingTeamId ? 'Update Member' : 'Save Member'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                            The Engineering & Management Team ({currentTeam.length})
                          </h3>
                          <p className="text-xs text-slate-500">Edit leadership names, dasination (designations), description, profile images & remove or add members.</p>
                        </div>
                        <button
                          onClick={() => { handleResetTeamForm(); setIsEditingTeam(true); }}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Team Member</span>
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentTeam.map((member) => (
                          <div
                            key={member.id}
                            className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3"
                          >
                            <div className="flex items-start gap-3">
                              {member.imageUrl ? (
                                <img src={member.imageUrl} alt={member.name} className="w-12 h-12 object-cover rounded-xl bg-slate-950 flex-shrink-0" />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center flex-shrink-0">
                                  {member.name[0]}
                                </div>
                              )}
                              <div className="space-y-0.5">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</h4>
                                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">{member.role}</div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{member.bio}</p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                              <button 
                                onClick={() => handleStartEditTeam(member)} 
                                className="p-1.5 rounded-lg text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                                title="Edit Member"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTeam(member.id)} 
                                className="p-1.5 rounded-lg text-xs bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                                title="Remove Member"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 3: TESTIMONIALS ================= */}
              {activeTab === 'testimonials' && (
                <div>
                  {isEditingTestimonial ? (
                    <form onSubmit={handleSaveTestimonial} className="space-y-5 max-w-2xl mx-auto bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                          {editingTestimonialId ? 'Edit Review: Trusted by Pakistan\'s Foremost Developers' : 'Add New Review: Trusted by Pakistan\'s Foremost Developers'}
                        </h3>
                        <button type="button" onClick={handleResetTestimonialForm} className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white">
                          Cancel
                        </button>
                      </div>

                      {saveStatus && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                          {saveStatus}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Client Naam (Client Name) *</label>
                          <input
                            type="text"
                            required
                            value={testClientName}
                            onChange={(e) => setTestClientName(e.target.value)}
                            placeholder="e.g. Engr. Tariq Mahmood"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Client Dasination / Role & Company</label>
                          <input
                            type="text"
                            value={testRole}
                            onChange={(e) => setTestRole(e.target.value)}
                            placeholder="e.g. Project Director / High-Q Tower"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company / City</label>
                          <input
                            type="text"
                            value={testCompany}
                            onChange={(e) => setTestCompany(e.target.value)}
                            placeholder="e.g. High - Q Tower Gulberg, Lahore"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Related Project Name</label>
                          <input
                            type="text"
                            value={testProjectRef}
                            onChange={(e) => setTestProjectRef(e.target.value)}
                            placeholder="e.g. High - Q Tower (UICP)"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Star Rating (1 - 5) *</label>
                          <select
                            value={testRating}
                            onChange={(e) => setTestRating(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                            <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                            <option value={3}>⭐⭐⭐ (3 Stars)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Rating Text (Badging)</label>
                          <input
                            type="text"
                            value={testRatingText}
                            onChange={(e) => setTestRatingText(e.target.value)}
                            placeholder="e.g. 5.0 ★ Exceptional Execution"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Client Image / Profile Photo</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={testAvatarUrl}
                            onChange={(e) => setTestAvatarUrl(e.target.value)}
                            placeholder="Image URL (https://...)"
                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                          <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setTestAvatarUrl)} className="hidden" />
                          </label>
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                          <span className="text-slate-400">Presets:</span>
                          {PRESET_AVATARS.map((av, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setTestAvatarUrl(av.url)}
                              className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-500 whitespace-nowrap"
                            >
                              {av.label}
                            </button>
                          ))}
                        </div>
                        {testAvatarUrl && (
                          <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 mt-1">
                            <img src={testAvatarUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Feedback / Review Text *</label>
                        <textarea
                          rows={4}
                          required
                          value={testFeedback}
                          onChange={(e) => setTestFeedback(e.target.value)}
                          placeholder="Bin Nasir Real Estate & Builder demonstrated masterclass civil engineering..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <button type="button" onClick={handleResetTestimonialForm} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 shadow-md disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          <span>{editingTestimonialId ? 'Update Review' : 'Save Review'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                            Trusted by Pakistan's Foremost Developers & Institutions ({currentTestimonials.length})
                          </h3>
                          <p className="text-xs text-slate-500">Edit ratings, rating text, client naam, client images & remove or add client reviews.</p>
                        </div>
                        <button
                          onClick={() => { handleResetTestimonialForm(); setIsEditingTestimonial(true); }}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Client Review</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {currentTestimonials.map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-4"
                          >
                            <div className="flex items-start gap-3 flex-1">
                              {item.avatarUrl ? (
                                <img src={item.avatarUrl} alt={item.name} className="w-11 h-11 rounded-full object-cover border border-amber-500/20 flex-shrink-0" />
                              ) : (
                                <div className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                  {item.name[0]}
                                </div>
                              )}
                              <div className="space-y-1 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</span>
                                  <span className="text-xs text-slate-400">({item.role}, {item.company})</span>
                                  <div className="flex items-center text-amber-400 text-xs ml-1">
                                    {[...Array(item.rating)].map((_, rIdx) => (
                                      <Star key={rIdx} className="w-3.5 h-3.5 fill-current" />
                                    ))}
                                  </div>
                                  {item.ratingText && (
                                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                      {item.ratingText}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                                  "{item.feedback}"
                                </p>
                                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                                  Project: {item.projectRef}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button 
                                onClick={() => handleStartEditTestimonial(item)} 
                                className="p-1.5 rounded-lg text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                                title="Edit Review"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTestimonial(item.id)} 
                                className="p-1.5 rounded-lg text-xs bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                                title="Remove Review"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB 4: CONTACT & COMPANY SETTINGS ================= */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl mx-auto bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700/80">
                  <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                      Connect with Our Chief Civil Engineers & Planners
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Update addresses, phone numbers, WhatsApp, emails, and leadership details across the web app.
                    </p>
                  </div>

                  {saveStatus && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                      {saveStatus}
                    </div>
                  )}

                  {/* Addresses */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Office Addresses</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Head Office Address *</label>
                        <input
                          type="text"
                          required
                          value={headOfficeAddress}
                          onChange={(e) => setHeadOfficeAddress(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Branch Office Address</label>
                        <input
                          type="text"
                          value={branchOfficeAddress}
                          onChange={(e) => setBranchOfficeAddress(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Phones & WhatsApp</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Phone 1 *</label>
                        <input
                          type="text"
                          required
                          value={phone1}
                          onChange={(e) => setPhone1(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone 2</label>
                        <input
                          type="text"
                          value={phone2}
                          onChange={(e) => setPhone2(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">WhatsApp Number *</label>
                        <input
                          type="text"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="e.g. 03004687544"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emails & Hours */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Emails & Working Hours</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Email *</label>
                        <input
                          type="email"
                          required
                          value={email1}
                          onChange={(e) => setEmail1(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Secondary Email</label>
                        <input
                          type="email"
                          value={email2}
                          onChange={(e) => setEmail2(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Working Hours</label>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Executive Leadership Details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Executive Leadership</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CEO Full Name</label>
                        <input
                          type="text"
                          value={ceoName}
                          onChange={(e) => setCeoName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Founder Name</label>
                        <input
                          type="text"
                          value={founderName}
                          onChange={(e) => setFounderName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CEO Message</label>
                      <textarea
                        rows={3}
                        value={ceoMessage}
                        onChange={(e) => setCeoMessage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 shadow-md disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save Company Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ================= TAB 5: INCOMING INQUIRIES ================= */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                        Client Consultation Requests ({inquiries.length})
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Customer inquiries from website consultation forms synced in real time with Firestore.
                      </p>
                    </div>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">No client consultation inquiries received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700/60 pb-2">
                            <div>
                              <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                <span>{inq.name}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  inq.status === 'New' 
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}>
                                  {inq.status || 'New'}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>Ref: {inq.id}</span>
                                <span>•</span>
                                <span>{inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}</span>
                              </div>
                            </div>

                            {/* Direct WhatsApp Response Button */}
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20${encodeURIComponent(ceoName)}%20from%20Bin%20Nasir%20Real%20Estate%20%26%20Builder.%20Regarding%20your%20inquiry%20for%20${encodeURIComponent(inq.projectType || 'construction')}:`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm"
                              >
                                <span>WhatsApp Client</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>

                              <select
                                value={inq.status || 'New'}
                                onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number:</span>
                              <a href={`tel:${inq.phone}`} className="font-semibold hover:text-amber-500">
                                {inq.phone}
                              </a>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Scope / Project Type:</span>
                              <span className="font-semibold text-amber-600 dark:text-amber-400">{inq.projectType || 'General Consultation'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Budget Indicator:</span>
                              <span className="font-semibold">{inq.budgetRange || 'Not specified'}</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                            <span className="font-bold block text-slate-400 text-[10px] uppercase mb-0.5">Message / Requirements:</span>
                            {inq.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
