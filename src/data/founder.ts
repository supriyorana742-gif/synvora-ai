/**
 * Founder & Leadership content for Synvora AI.
 * Set `photo` to a file in /public (for example "/founder.jpg") once you have one.
 */
export interface Leader {
  name: string;
  role: string;
  photo: string | null;
  bio: string[];
  linkedin: string;
}

export const founders: Leader[] = [
  {
    name: "Supriyo Rana",
    role: "Founder & AI Engineer, Synvora AI",
    photo: null,
    bio: [
      "I'm a technology enthusiast and AI engineer passionate about building intelligent solutions that solve real-world business challenges. My work focuses on Artificial Intelligence, machine learning, AI agents, and business process automation.",
      "I founded Synvora AI with a clear vision: to help businesses embrace intelligent automation, eliminate repetitive manual work, and unlock new opportunities through AI-driven technology.",
      "I believe technology should do more than just automate tasks — it should create meaningful business impact. At Synvora AI, I'm focused on turning innovative ideas into practical solutions that help businesses operate smarter, move faster, and scale confidently.",
    ],
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Co-Founder Name",
    role: "Co-Founder, Synvora AI",
    photo: null,
    bio: [
      "Technology and operations leader focused on driving strategic growth, product implementation, and scalable business workflows.",
      "Partnering closely with clients to architect intelligent AI systems that eliminate operational overhead and deliver real, measurable business impact.",
    ],
    linkedin: "https://www.linkedin.com/",
  },
];

// For single-reference backwards compatibility
export const founder = founders[0];
export const coFounder = founders[1];
