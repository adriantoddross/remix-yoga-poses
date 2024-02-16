// TODO: Replace Fake DB and its methods with GraphQL queries and mutations
// For poses, reference poses & categories in "Yoga to the Rescue!" book.

export type PoseMutation = {
  description: string;
  favorite?: boolean;
  id?: string;
  name: string;
  sequence?: Array<Sequence["id"]>;
};

export type PoseRecord = PoseMutation & {
  createdAt: string;
  id: string;
};

type Sequence = {
  description?: string;
  id?: string;
  name?: string;
  poses: Array<PoseMutation["id"]>;
};

export async function getPoses() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const poses = await fakePoses.getAll();
  return poses;
}

const fakePoses = {
  records: {} as Record<string, PoseRecord>,

  async create(pose: PoseMutation): Promise<PoseRecord> {
    const createdAt = new Date().toISOString();
    const id = pose.id || Math.random().toString(36).substring(2, 9);
    const newPose = { id, createdAt, ...pose };
    fakePoses.records[id] = newPose;
    return newPose;
  },

  async getAll(): Promise<PoseRecord[]> {
    return Object.keys(fakePoses.records).map((key) => fakePoses.records[key]);
  },
};

[
  {
    name: "Mountain Pose (Tadasana)",
    description:
      "Stand tall with feet together, arms by your sides, and shoulders relaxed. Engage core muscles, lengthen the spine, and reach arms overhead with palms facing each other.",
  },
  {
    name: "Downward-Facing Dog (Adho Mukha Svanasana)",
    description:
      "Start on hands and knees, lift hips toward the ceiling, straighten legs, and press heels towards the floor. Keep the spine straight and head between the arms.",
  },
  {
    name: "Warrior I (Virabhadrasana I)",
    description:
      "Step one foot back, bend the front knee, and extend arms overhead. Square hips to the front, engage the core, and reach energy through fingertips.",
  },
  {
    name: "Tree Pose (Vrikshasana)",
    description:
      "Stand on one leg, bring the sole of the other foot to the inner thigh or calf, and balance. Keep hands in prayer position at the chest or reach them overhead.",
  },
  {
    name: "Child's Pose (Balasana)",
    description:
      "Kneel on the mat, sit back on heels, and reach arms forward with forehead resting on the ground. Relax and breathe deeply to stretch the back and shoulders.",
  },
  {
    name: "Cobra Pose (Bhujangasana)",
    description:
      "Lie on the stomach, place hands under shoulders, and lift the chest while keeping the pelvis on the mat. Elongate the neck and gaze forward for a gentle backbend.",
  },
  {
    name: "Bridge Pose (Setu Bandhasana)",
    description:
      "Lie on your back, bend knees, and place feet hip-width apart. Press through feet to lift hips toward the ceiling. Clasp hands under the back for support.",
  },
  {
    name: "Seated Forward Bend (Paschimottanasana)",
    description:
      "Sit with legs extended, hinge at the hips, and reach forward to grasp the feet or shins. Keep the spine straight and lengthen through the crown of the head.",
  },
  {
    name: "Corpse Pose (Savasana)",
    description:
      "Lie on your back with legs extended and arms by your sides. Close your eyes, relax the entire body, and focus on deep, rhythmic breathing. A pose for total relaxation.",
  },
  {
    name: "Cat-Cow Pose (Marjaryasana-Bitilasana)",
    description:
      "Begin on hands and knees. Inhale, arch the back, and lift the head for Cow Pose. Exhale, round the spine, and tuck the chin for Cat Pose. Flow between the two for a gentle spinal stretch.",
  },
].forEach((pose) => fakePoses.create(pose));
