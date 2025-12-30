import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styles from "./index.module.css";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>

      <div className="container">
        <div className={styles.grid}>
          {/* LEFT CONTENT */}
          <div className={styles.content}>
            <span className={styles.badge}>🚀 PHYSICAL AI • HUMANOIDS • VLMs</span>

            <Heading as="h1" className={styles.title}>
              Build the Future of
              <br />
              <span>Humanoid Robotics</span>
            </Heading>

            <p className={styles.subtitle}>
              Learn embodied intelligence, locomotion control, robot learning,
              simulation pipelines, and multimodal AI through hands-on labs
              and real-world projects.
            </p>

            <div className={styles.ctaGroup}>
              <Link className={styles.primaryBtn} to="/docs/book/course-overview">
                Start Free Course
              </Link>

              <Link className={styles.secondaryBtn} to="/docs/book/course-overview">
                View Curriculum
              </Link>

              
            </div>

            <div className={styles.meta}>
              Graduate-Level • Project-Based • Simulation-Driven
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className={styles.visual}>
            <div className={styles.glassCard}>
              <img src="/img/rob.png" alt="Humanoid robot" className={styles.robotImg} />
              <div className={styles.circleGlow}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Advanced textbook on Physical AI, humanoid robotics, simulation, and embodied intelligence."
    >
      <HeroSection />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}


// import type { ReactNode } from "react";
// import Layout from "@theme/Layout";
// import Heading from "@theme/Heading";
// import Link from "@docusaurus/Link";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";
// import styles from "./index.module.css";

// function HeroSection() {
//   return (
//     <section className={styles.hero}>
//       <div className="container">
//         <div className={styles.grid}>
//           {/* LEFT CONTENT */}
//           <div className={styles.content}>
//             <span className={styles.badge}>TEXTBOOK • RESEARCH • LAB</span>

//             <Heading as="h1" className={styles.title}>
//               Physical AI <br />
//               <span>Humanoid Robotics</span>
//             </Heading>

//             <p className={styles.subtitle}>
//               A rigorous exploration of embodied intelligence, humanoid systems,
//               simulation pipelines, visual-language models, and ethical AI.
//             </p>

//             <div className={styles.ctaGroup}>
//               <Link
//                 className={styles.primaryBtn}
//                 to="/docs/book/course-overview"
//               >
//                 Start Learning
//               </Link>

//               <Link
//                 className={styles.secondaryBtn}
//                 to="/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Basics/intro"
//               >
//                 Curriculum
//               </Link>

//               {/* ✅ SAME LOGIN BUTTON AS NAVBAR */}
//               <Link
//                 to="/docs/book/course-overview"
//                 className={`navbar__item navbar__link custom-auth-btn`}
//               >
//                 Login
//               </Link>
//             </div>

//             <div className={styles.meta}>
//               Graduate-level • Hands-on • Simulation-driven
//             </div>
//           </div>

//           {/* RIGHT VISUAL */}
//           <div className={styles.visual}>
//             <div className={styles.imageFrame}>
//               <img
//                 src="/img/robot.png"
//                 alt="Humanoid Robotics and Physical AI"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function Home(): ReactNode {
//   return (
//     <Layout
//       title="Physical AI & Humanoid Robotics"
//       description="Advanced textbook on Physical AI, humanoid robotics, simulation, and embodied intelligence."
//     >
//       <HeroSection />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }



