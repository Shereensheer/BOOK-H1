
import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import {
  FaCogs,
  FaWalking,
  FaLaptopCode,
  FaProjectDiagram,
  FaGavel,
  FaHandsHelping,
} from "react-icons/fa";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Embodied Intelligence",
    Icon: FaCogs,
    description:
      "Foundations of Physical AI enabling robots to perceive, reason, and interact with real environments.",
  },
  {
    title: "Humanoid Robotics",
    Icon: FaWalking,
    description:
      "Structural design, locomotion control, manipulation, and human–robot interaction.",
  },
  {
    title: "Simulation & Development",
    Icon: FaLaptopCode,
    description:
      "Simulation-driven development using ROS2, Gazebo, Unity, and NVIDIA Isaac Sim.",
  },
  {
    title: "Visual Language Models",
    Icon: FaProjectDiagram,
    description:
      "Vision-language reasoning systems for multimodal robotic intelligence.",
  },
  {
    title: "Ethics & Society",
    Icon: FaGavel,
    description:
      "Safety, alignment, governance, and ethical considerations of humanoid AI.",
  },
  {
    title: "Hands-on Learning",
    Icon: FaHandsHelping,
    description:
      "Research-oriented projects, labs, and real-world robotic experiments.",
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={styles.featureCard}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
          <div className={styles.iconGlow}></div>
        </div>

        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>

        <p className={styles.cardDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.overlayGradient} />
      <div className="container">
        <div className="row">
          {FeatureList.map((item, idx) => (
            <Feature key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}



