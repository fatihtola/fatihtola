import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc,
  onSnapshot, 
  getDocs, 
  writeBatch
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  TeacherGroup, 
  WeekSession,
  LanguageModelItem,
  AIToolItem,
  ResourceItem,
  PromptTemplate
} from '../types';

const GROUPS_COLLECTION = 'teacher_groups';
const CURRICULUM_COLLECTION = 'curriculum_weeks';
const MODELS_COLLECTION = 'language_models';
const TOOLS_COLLECTION = 'ai_tools';
const RESOURCES_COLLECTION = 'additional_resources';
const PROMPTS_COLLECTION = 'prompt_templates';

/**
 * Real-time listener for Teacher Groups.
 * If Firestore collection is empty, it automatically seeds it with initial local data so no user data is lost.
 */
export function subscribeToGroups(
  onData: (groups: TeacherGroup[]) => void,
  initialFallback: TeacherGroup[]
): () => void {
  const collRef = collection(db, GROUPS_COLLECTION);

  const unsubscribe = onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.log('Firestore groups empty, seeding initial groups...');
        await seedGroups(initialFallback);
        onData(initialFallback);
      } else {
        const loadedGroups = snapshot.docs.map((d) => d.data() as TeacherGroup);
        // Ensure all groups have location "Maker Atölyesi" as requested
        let needsLocationUpdate = false;
        const normalizedGroups = loadedGroups.map((g) => {
          if (g.location !== 'Maker Atölyesi') {
            needsLocationUpdate = true;
            return { ...g, location: 'Maker Atölyesi' };
          }
          return g;
        });
        // Sort by groupNumber
        normalizedGroups.sort((a, b) => a.groupNumber - b.groupNumber);
        onData(normalizedGroups);

        if (needsLocationUpdate) {
          seedGroups(normalizedGroups).catch((err) => {
            console.error('Failed to update group locations to Maker Atölyesi in Firestore:', err);
          });
        }
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, GROUPS_COLLECTION);
      // Fallback to local
      onData(initialFallback);
    }
  );

  return unsubscribe;
}

/**
 * Save or update a single teacher group in Firestore
 */
export async function saveGroupToFirestore(group: TeacherGroup): Promise<void> {
  const docRef = doc(db, GROUPS_COLLECTION, group.id);
  try {
    // Ensure plain serializable object without undefined
    const cleanGroup: TeacherGroup = {
      ...group,
      weekDates: group.weekDates || [],
      notes: group.notes || '',
    };
    await setDoc(docRef, cleanGroup, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${GROUPS_COLLECTION}/${group.id}`);
    throw error;
  }
}

/**
 * Seed all groups in batch
 */
export async function seedGroups(groups: TeacherGroup[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    groups.forEach((grp) => {
      const docRef = doc(db, GROUPS_COLLECTION, grp.id);
      batch.set(docRef, {
        ...grp,
        weekDates: grp.weekDates || [],
        notes: grp.notes || '',
      });
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, GROUPS_COLLECTION);
  }
}

/**
 * Real-time listener for Curriculum Weeks.
 * If Firestore collection is empty, it automatically seeds it with initial data.
 */
export function subscribeToCurriculum(
  onData: (weeks: WeekSession[]) => void,
  initialFallback: WeekSession[]
): () => void {
  const collRef = collection(db, CURRICULUM_COLLECTION);

  const unsubscribe = onSnapshot(
    collRef,
    async (snapshot) => {
      const hasWeek16 = snapshot.docs.some((d) => d.id === 'hafta-16');
      const hasWeek1Brisk = snapshot.docs.some((d) => d.id === 'hafta-1' && (d.data() as any)?.title?.includes('Brisk Teaching'));
      const hasWeek2Magic = snapshot.docs.some((d) => d.id === 'hafta-2' && (d.data() as any)?.title?.includes('MagicSchool'));
      const hasWeek3Consensus = snapshot.docs.some((d) => d.id === 'hafta-3' && (d.data() as any)?.title?.includes('Consensus'));
      const hasTopic = snapshot.docs.some((d) => Boolean((d.data() as any)?.topic));
      const hasAppChain = snapshot.docs.some((d) => Boolean((d.data() as any)?.appChain));
      if (snapshot.empty || snapshot.docs.length < 16 || !hasWeek16 || !hasWeek1Brisk || !hasWeek2Magic || !hasWeek3Consensus || !hasTopic || !hasAppChain) {
        console.log('Firestore curriculum outdated or not matching 16-week PDF, reseeding 16-week PDF curriculum...');
        await seedCurriculum(initialFallback);
        onData(initialFallback);
      } else {
        const loadedWeeks = snapshot.docs.map((d) => d.data() as WeekSession);
        // Sort by weekNumber
        loadedWeeks.sort((a, b) => a.weekNumber - b.weekNumber);
        onData(loadedWeeks);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, CURRICULUM_COLLECTION);
      onData(initialFallback);
    }
  );

  return unsubscribe;
}

function sanitizeWeekData(week: WeekSession): Record<string, any> {
  const result: Record<string, any> = {
    id: week.id,
    weekNumber: week.weekNumber,
    title: week.title,
    duration: week.duration || '',
    category: week.category || 'temel',
    summary: week.summary || '',
    topic: week.topic || '',
    appChain: week.appChain || '',
    learningOutcomes: week.learningOutcomes || [],
    sessionFlow: (week.sessionFlow || []).map((sf) => ({
      minuteRange: sf.minuteRange || '',
      activity: sf.activity || '',
      description: sf.description || '',
    })),
    keyTools: (week.keyTools || []).map((kt) => ({
      name: kt.name || '',
      url: kt.url || '',
      purpose: kt.purpose || '',
    })),
    practicalExercise: week.practicalExercise || '',
    samplePrompt: week.samplePrompt || '',
    materials: (week.materials || []).map((m) => ({
      title: m.title || '',
      type: m.type || 'belge',
      url: m.url || '',
    })),
    notes: week.notes || '',
    customAdded: Boolean(week.customAdded),
    unitName: week.unitName || '',
    targetOutput: week.targetOutput || '',
    isWorkshop: Boolean(week.isWorkshop),
    appCardId: week.appCardId || '',
  };

  if (week.newToolOfTheWeek) {
    result.newToolOfTheWeek = {
      name: week.newToolOfTheWeek.name || '',
      url: week.newToolOfTheWeek.url || '',
      tagline: week.newToolOfTheWeek.tagline || ''
    };
  }

  return result;
}

/**
 * Save or update a single curriculum week in Firestore
 */
export async function saveWeekToFirestore(week: WeekSession): Promise<void> {
  const docRef = doc(db, CURRICULUM_COLLECTION, week.id);
  try {
    const cleanWeek = sanitizeWeekData(week);
    await setDoc(docRef, cleanWeek, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${CURRICULUM_COLLECTION}/${week.id}`);
    throw error;
  }
}

/**
 * Delete a curriculum week from Firestore
 */
export async function deleteWeekFromFirestore(weekId: string): Promise<void> {
  const docRef = doc(db, CURRICULUM_COLLECTION, weekId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${CURRICULUM_COLLECTION}/${weekId}`);
    throw error;
  }
}

/**
 * Seed all curriculum weeks in batch
 */
export async function seedCurriculum(weeks: WeekSession[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    weeks.forEach((wk) => {
      const docRef = doc(db, CURRICULUM_COLLECTION, wk.id);
      batch.set(docRef, sanitizeWeekData(wk));
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, CURRICULUM_COLLECTION);
  }
}

// ----------------------------------------------------
// LANGUAGE MODELS (Dil Modelleri)
// ----------------------------------------------------

function sanitizeModelData(model: LanguageModelItem): LanguageModelItem {
  return {
    id: model.id,
    name: model.name || '',
    developer: model.developer || '',
    contextWindow: model.contextWindow || '',
    strengths: Array.isArray(model.strengths) ? model.strengths : [],
    educationFit: model.educationFit || '',
    freeTierStatus: model.freeTierStatus || '',
    url: model.url || '',
    bestFor: model.bestFor || '',
    badge: model.badge || '',
  };
}

export function subscribeToModels(
  onData: (models: LanguageModelItem[]) => void,
  initialFallback: LanguageModelItem[]
): () => void {
  const collRef = collection(db, MODELS_COLLECTION);

  const unsubscribe = onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.log('Firestore language_models empty, seeding initial models...');
        await seedModels(initialFallback);
        onData(initialFallback);
      } else {
        const loaded = snapshot.docs.map((d) => d.data() as LanguageModelItem);
        onData(loaded);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, MODELS_COLLECTION);
      onData(initialFallback);
    }
  );

  return unsubscribe;
}

export async function saveModelToFirestore(model: LanguageModelItem): Promise<void> {
  const docRef = doc(db, MODELS_COLLECTION, model.id);
  try {
    const cleanModel = sanitizeModelData(model);
    await setDoc(docRef, cleanModel, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${MODELS_COLLECTION}/${model.id}`);
    throw error;
  }
}

export async function deleteModelFromFirestore(modelId: string): Promise<void> {
  const docRef = doc(db, MODELS_COLLECTION, modelId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${MODELS_COLLECTION}/${modelId}`);
    throw error;
  }
}

export async function seedModels(models: LanguageModelItem[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    models.forEach((m) => {
      const docRef = doc(db, MODELS_COLLECTION, m.id);
      batch.set(docRef, sanitizeModelData(m));
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, MODELS_COLLECTION);
  }
}

// ----------------------------------------------------
// AI TOOLS (Öne Çıkan Araçlar)
// ----------------------------------------------------

function sanitizeToolData(tool: AIToolItem): AIToolItem {
  return {
    id: tool.id,
    name: tool.name || '',
    category: tool.category || 'Asistan & Sohbet',
    description: tool.description || '',
    educationUseCase: tool.educationUseCase || '',
    pricing: tool.pricing || 'Ücretsiz',
    url: tool.url || '',
    featured: Boolean(tool.featured),
    tags: Array.isArray(tool.tags) ? tool.tags : [],
  };
}

export function subscribeToTools(
  onData: (tools: AIToolItem[]) => void,
  initialFallback: AIToolItem[]
): () => void {
  const collRef = collection(db, TOOLS_COLLECTION);

  const unsubscribe = onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.log('Firestore ai_tools empty, seeding initial tools...');
        await seedTools(initialFallback);
        onData(initialFallback);
      } else {
        const loaded = snapshot.docs.map((d) => d.data() as AIToolItem);
        onData(loaded);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, TOOLS_COLLECTION);
      onData(initialFallback);
    }
  );

  return unsubscribe;
}

export async function saveToolToFirestore(tool: AIToolItem): Promise<void> {
  const docRef = doc(db, TOOLS_COLLECTION, tool.id);
  try {
    const cleanTool = sanitizeToolData(tool);
    await setDoc(docRef, cleanTool, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${TOOLS_COLLECTION}/${tool.id}`);
    throw error;
  }
}

export async function deleteToolFromFirestore(toolId: string): Promise<void> {
  const docRef = doc(db, TOOLS_COLLECTION, toolId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${TOOLS_COLLECTION}/${toolId}`);
    throw error;
  }
}

export async function seedTools(tools: AIToolItem[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    tools.forEach((t) => {
      const docRef = doc(db, TOOLS_COLLECTION, t.id);
      batch.set(docRef, sanitizeToolData(t));
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, TOOLS_COLLECTION);
  }
}

// ----------------------------------------------------
// ADDITIONAL RESOURCES (Ek Kaynaklar)
// ----------------------------------------------------

function sanitizeResourceData(res: ResourceItem): ResourceItem {
  return {
    id: res.id,
    title: res.title || '',
    organization: res.organization || '',
    category: res.category || 'Resmi Mevzuat',
    description: res.description || '',
    linkText: res.linkText || 'Dokümanı İncele',
    url: res.url || '',
    fileType: res.fileType || 'PDF',
  };
}

export function subscribeToResources(
  onData: (resources: ResourceItem[]) => void,
  initialFallback: ResourceItem[]
): () => void {
  const collRef = collection(db, RESOURCES_COLLECTION);

  const unsubscribe = onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.log('Firestore additional_resources empty, seeding initial resources...');
        await seedResources(initialFallback);
        onData(initialFallback);
      } else {
        const loaded = snapshot.docs.map((d) => d.data() as ResourceItem);
        onData(loaded);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, RESOURCES_COLLECTION);
      onData(initialFallback);
    }
  );

  return unsubscribe;
}

export async function saveResourceToFirestore(res: ResourceItem): Promise<void> {
  const docRef = doc(db, RESOURCES_COLLECTION, res.id);
  try {
    const cleanRes = sanitizeResourceData(res);
    await setDoc(docRef, cleanRes, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${RESOURCES_COLLECTION}/${res.id}`);
    throw error;
  }
}

export async function deleteResourceFromFirestore(resourceId: string): Promise<void> {
  const docRef = doc(db, RESOURCES_COLLECTION, resourceId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${RESOURCES_COLLECTION}/${resourceId}`);
    throw error;
  }
}

export async function seedResources(resources: ResourceItem[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    resources.forEach((r) => {
      const docRef = doc(db, RESOURCES_COLLECTION, r.id);
      batch.set(docRef, sanitizeResourceData(r));
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, RESOURCES_COLLECTION);
  }
}

// ----------------------------------------------------
// PROMPT TEMPLATES (Prompt Şablonları & Kütüphanesi)
// ----------------------------------------------------

function sanitizePromptData(prompt: PromptTemplate): PromptTemplate {
  return {
    id: prompt.id,
    title: prompt.title || '',
    branch: prompt.branch || 'Tüm Branşlar',
    gradeLevel: prompt.gradeLevel || 'Tüm Seviyeler',
    goal: prompt.goal || '',
    promptText: prompt.promptText || '',
    recommendedModel: prompt.recommendedModel || 'ChatGPT veya Claude',
  };
}

export function subscribeToPrompts(
  onData: (prompts: PromptTemplate[]) => void,
  initialFallback: PromptTemplate[]
): () => void {
  const collRef = collection(db, PROMPTS_COLLECTION);

  const unsubscribe = onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.log('Firestore prompt_templates empty, seeding initial prompts...');
        await seedPrompts(initialFallback);
        onData(initialFallback);
      } else {
        const loaded = snapshot.docs.map((d) => d.data() as PromptTemplate);
        onData(loaded);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, PROMPTS_COLLECTION);
      onData(initialFallback);
    }
  );

  return unsubscribe;
}

export async function savePromptToFirestore(prompt: PromptTemplate): Promise<void> {
  const docRef = doc(db, PROMPTS_COLLECTION, prompt.id);
  try {
    const cleanPrompt = sanitizePromptData(prompt);
    await setDoc(docRef, cleanPrompt, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${PROMPTS_COLLECTION}/${prompt.id}`);
    throw error;
  }
}

export async function deletePromptFromFirestore(promptId: string): Promise<void> {
  const docRef = doc(db, PROMPTS_COLLECTION, promptId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PROMPTS_COLLECTION}/${promptId}`);
    throw error;
  }
}

export async function seedPrompts(prompts: PromptTemplate[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    prompts.forEach((p) => {
      const docRef = doc(db, PROMPTS_COLLECTION, p.id);
      batch.set(docRef, sanitizePromptData(p));
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PROMPTS_COLLECTION);
  }
}

