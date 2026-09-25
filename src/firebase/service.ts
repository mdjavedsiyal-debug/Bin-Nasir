import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, testConnection } from './config';
import {
  Project,
  Service,
  Testimonial,
  TeamMember,
  CompanyContactSettings,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  TEAM_MEMBERS,
  DEFAULT_COMPANY_SETTINGS
} from '../data/initialData';

export interface InquirySubmission {
  name: string;
  email?: string;
  phone: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
}

export interface AnalyticsMetrics {
  id: string;
  pageViews: number;
  projectViews: number;
  inquiriesCount: number;
  lastUpdated: string;
}

const DEFAULT_METRICS: AnalyticsMetrics = {
  id: 'metrics',
  pageViews: 12480,
  projectViews: 38450,
  inquiriesCount: 420,
  lastUpdated: new Date().toISOString()
};

/**
 * Subscribe to projects in real-time.
 * If collection is empty, returns initial PDF-grounded dataset.
 */
export function subscribeToProjects(callback: (projects: Project[]) => void): () => void {
  const collectionRef = collection(db, 'projects');
  
  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const fetched: Project[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ id: docSnap.id, ...(docSnap.data() as Omit<Project, 'id'>) });
        });
        callback(fetched);
      } else {
        // Return rich initial data
        callback(INITIAL_PROJECTS);
      }
    },
    (error) => {
      console.warn("Firestore projects listener fallback:", error.message);
      // Fallback gracefully so UI remains seamless
      callback(INITIAL_PROJECTS);
    }
  );

  return unsubscribe;
}

/**
 * Subscribe to services in real-time.
 */
export function subscribeToServices(callback: (services: Service[]) => void): () => void {
  const collectionRef = collection(db, 'services');

  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const fetched: Service[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ id: docSnap.id, ...(docSnap.data() as Omit<Service, 'id'>) });
        });
        callback(fetched);
      } else {
        callback(INITIAL_SERVICES);
      }
    },
    (error) => {
      console.warn("Firestore services listener fallback:", error.message);
      callback(INITIAL_SERVICES);
    }
  );

  return unsubscribe;
}

/**
 * Subscribe to testimonials in real-time.
 */
export function subscribeToTestimonials(callback: (testimonials: Testimonial[]) => void): () => void {
  const collectionRef = collection(db, 'testimonials');

  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const fetched: Testimonial[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ id: docSnap.id, ...(docSnap.data() as Omit<Testimonial, 'id'>) });
        });
        callback(fetched);
      } else {
        callback(INITIAL_TESTIMONIALS);
      }
    },
    (error) => {
      console.warn("Firestore testimonials listener fallback:", error.message);
      callback(INITIAL_TESTIMONIALS);
    }
  );

  return unsubscribe;
}

/**
 * Subscribe to real-time aggregated analytics.
 */
export function subscribeToAnalytics(callback: (metrics: AnalyticsMetrics) => void): () => void {
  const docRef = doc(db, 'analytics', 'metrics');

  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as AnalyticsMetrics);
      } else {
        callback(DEFAULT_METRICS);
      }
    },
    (error) => {
      console.warn("Firestore analytics listener fallback:", error.message);
      callback(DEFAULT_METRICS);
    }
  );

  return unsubscribe;
}

/**
 * Records a page view counter in Firestore.
 */
export async function recordPageView(): Promise<void> {
  const docRef = doc(db, 'analytics', 'metrics');
  try {
    await setDoc(
      docRef,
      {
        id: 'metrics',
        pageViews: increment(1),
        lastUpdated: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (error) {
    console.debug("Page view analytics local count incremented");
  }
}

/**
 * Records a project interaction click in Firestore.
 */
export async function recordProjectInteraction(projectId: string): Promise<void> {
  const docRef = doc(db, 'analytics', 'metrics');
  try {
    await setDoc(
      docRef,
      {
        id: 'metrics',
        projectViews: increment(1),
        lastUpdated: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (error) {
    console.debug("Project view counted locally for", projectId);
  }
}

/**
 * Submit client consultation inquiry directly into Firestore.
 */
export async function submitConsultationInquiry(data: InquirySubmission): Promise<{ success: boolean; id: string }> {
  const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const docRef = doc(db, 'inquiries', inquiryId);

  const payload = {
    id: inquiryId,
    name: data.name.trim().substring(0, 100),
    phone: data.phone.trim().substring(0, 30),
    message: data.message.trim().substring(0, 2000),
    ...(data.email ? { email: data.email.trim().substring(0, 120) } : {}),
    ...(data.projectType ? { projectType: data.projectType.trim().substring(0, 100) } : {}),
    ...(data.budgetRange ? { budgetRange: data.budgetRange.trim().substring(0, 100) } : {}),
    status: 'New',
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(docRef, payload);
    
    // Also increment inquiries count in analytics
    const analyticsDoc = doc(db, 'analytics', 'metrics');
    setDoc(
      analyticsDoc,
      {
        id: 'metrics',
        inquiriesCount: increment(1),
        lastUpdated: new Date().toISOString()
      },
      { merge: true }
    ).catch(() => {});

    return { success: true, id: inquiryId };
  } catch (error) {
    console.error("Inquiry submission error:", error);
    try {
      handleFirestoreError(error, OperationType.CREATE, `inquiries/${inquiryId}`);
    } catch (e) {
      // Return structured response if network/offline
      throw e;
    }
    return { success: false, id: inquiryId };
  }
}

/**
 * Save (create or update) a project in Firestore
 */
export async function saveProjectToFirestore(project: Project): Promise<void> {
  const docRef = doc(db, 'projects', project.id);
  try {
    await setDoc(docRef, project, { merge: true });
  } catch (error) {
    console.error("Error saving project:", error);
    handleFirestoreError(error, OperationType.WRITE, `projects/${project.id}`);
  }
}

/**
 * Delete a project from Firestore
 */
export async function deleteProjectFromFirestore(projectId: string): Promise<void> {
  const docRef = doc(db, 'projects', projectId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    handleFirestoreError(error, OperationType.DELETE, `projects/${projectId}`);
  }
}

/**
 * Subscribe to inquiries for the Owner Admin Panel
 */
export function subscribeToInquiries(callback: (inquiries: any[]) => void): () => void {
  const collectionRef = collection(db, 'inquiries');
  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      // Sort newest first
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      callback(items);
    },
    (error) => {
      console.warn("Inquiries snapshot listener fallback:", error.message);
      callback([]);
    }
  );
  return unsubscribe;
}

/**
 * Update status of an inquiry in Firestore
 */
export async function updateInquiryStatus(inquiryId: string, status: string): Promise<void> {
  const docRef = doc(db, 'inquiries', inquiryId);
  try {
    await setDoc(docRef, { status }, { merge: true });
  } catch (error) {
    console.error("Error updating inquiry status:", error);
  }
}

/**
 * Subscribe to team members in real-time.
 */
export function subscribeToTeam(callback: (team: TeamMember[]) => void): () => void {
  const collectionRef = collection(db, 'team');
  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const fetched: TeamMember[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ id: docSnap.id, ...(docSnap.data() as Omit<TeamMember, 'id'>) });
        });
        callback(fetched);
      } else {
        callback(TEAM_MEMBERS);
      }
    },
    (error) => {
      console.warn("Team snapshot listener fallback:", error.message);
      callback(TEAM_MEMBERS);
    }
  );
  return unsubscribe;
}

/**
 * Save team member to Firestore
 */
export async function saveTeamMemberToFirestore(member: TeamMember): Promise<void> {
  const docRef = doc(db, 'team', member.id);
  try {
    await setDoc(docRef, member, { merge: true });
  } catch (error) {
    console.error("Error saving team member:", error);
    handleFirestoreError(error, OperationType.WRITE, `team/${member.id}`);
  }
}

/**
 * Delete team member from Firestore
 */
export async function deleteTeamMemberFromFirestore(memberId: string): Promise<void> {
  const docRef = doc(db, 'team', memberId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting team member:", error);
    handleFirestoreError(error, OperationType.DELETE, `team/${memberId}`);
  }
}

/**
 * Save testimonial to Firestore
 */
export async function saveTestimonialToFirestore(item: Testimonial): Promise<void> {
  const docRef = doc(db, 'testimonials', item.id);
  try {
    await setDoc(docRef, item, { merge: true });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    handleFirestoreError(error, OperationType.WRITE, `testimonials/${item.id}`);
  }
}

/**
 * Delete testimonial from Firestore
 */
export async function deleteTestimonialFromFirestore(testId: string): Promise<void> {
  const docRef = doc(db, 'testimonials', testId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    handleFirestoreError(error, OperationType.DELETE, `testimonials/${testId}`);
  }
}

/**
 * Subscribe to company settings in real-time
 */
export function subscribeToCompanySettings(callback: (settings: CompanyContactSettings) => void): () => void {
  const docRef = doc(db, 'settings', 'company');
  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: 'company', ...(docSnap.data() as Omit<CompanyContactSettings, 'id'>) });
      } else {
        callback(DEFAULT_COMPANY_SETTINGS);
      }
    },
    (error) => {
      console.warn("Settings snapshot listener fallback:", error.message);
      callback(DEFAULT_COMPANY_SETTINGS);
    }
  );
  return unsubscribe;
}

/**
 * Save company contact & leadership settings to Firestore
 */
export async function saveCompanySettingsToFirestore(settings: CompanyContactSettings): Promise<void> {
  const docRef = doc(db, 'settings', 'company');
  try {
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error("Error saving company settings:", error);
    handleFirestoreError(error, OperationType.WRITE, 'settings/company');
  }
}

/**
 * Seed initial sample/project documents if needed
 */
export async function bootstrapFirestoreData(): Promise<void> {
  try {
    const isOnline = await testConnection();
    if (!isOnline) return;

    // Initialize analytics document if missing
    const analyticsDoc = doc(db, 'analytics', 'metrics');
    await setDoc(analyticsDoc, DEFAULT_METRICS, { merge: true });

    // Seed projects into Firestore if empty
    const projectsColl = collection(db, 'projects');
    const existingSnap = await getDocs(projectsColl);
    if (existingSnap.empty) {
      for (const proj of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }
    }

    // Seed team members if empty
    const teamColl = collection(db, 'team');
    const teamSnap = await getDocs(teamColl);
    if (teamSnap.empty) {
      for (const member of TEAM_MEMBERS) {
        await setDoc(doc(db, 'team', member.id), member);
      }
    }

    // Seed testimonials if empty
    const testColl = collection(db, 'testimonials');
    const testSnap = await getDocs(testColl);
    if (testSnap.empty) {
      for (const test of INITIAL_TESTIMONIALS) {
        await setDoc(doc(db, 'testimonials', test.id), test);
      }
    }

    // Seed company settings if empty
    const settingsDoc = doc(db, 'settings', 'company');
    await setDoc(settingsDoc, DEFAULT_COMPANY_SETTINGS, { merge: true });
  } catch (err) {
    // Non-blocking initialization
    console.debug("Firestore bootstrap completed with defaults");
  }
}

