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
import { TeacherGroup, WeekSession } from '../types';

const GROUPS_COLLECTION = 'teacher_groups';
const CURRICULUM_COLLECTION = 'curriculum_weeks';

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
        // Sort by groupNumber
        loadedGroups.sort((a, b) => a.groupNumber - b.groupNumber);
        onData(loadedGroups);
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
      if (snapshot.empty) {
        console.log('Firestore curriculum empty, seeding initial curriculum...');
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

/**
 * Save or update a single curriculum week in Firestore
 */
export async function saveWeekToFirestore(week: WeekSession): Promise<void> {
  const docRef = doc(db, CURRICULUM_COLLECTION, week.id);
  try {
    await setDoc(docRef, week, { merge: true });
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
      batch.set(docRef, wk);
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, CURRICULUM_COLLECTION);
  }
}
