"use client";

import { skills, services } from "@/content/skills";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function SkillsServices() {
  return (
    <section
      id="skills"
      className="section-pad relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="container-site relative">
        <div className="max-w-2xl">
          <p className="eyebrow">Capabilities</p>
          <h2
            id="skills-heading"
            className="display section-heading mt-3"
          >
            Skills &amp; Services
          </h2>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-muted">
            <HoverSelectText as="span">
              AI content creation, tech UGC, and brand campaign work - technical
              fluency meets on-camera storytelling so technology and fintech
              brands get content that is clear, credible, and built to perform.
            </HoverSelectText>
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Toolkit</p>
                <h3 className="subheading mt-2">
                  Skills
                </h3>
              </div>
              <span className="rounded-full border border-border bg-elevated/90 px-3 py-1 text-xs tracking-[0.08em] text-muted uppercase">
                {skills.length} strengths
              </span>
            </div>

            <ul className="space-y-4">
              {skills.map((skill, index) => (
                <li key={skill}>
                  <Reveal delay={index * 55}>
                    <TiltCard className="rounded-[1.45rem]" maxTilt={4} glare>
                      <article className="group relative overflow-hidden rounded-[1.45rem] border border-border/80 bg-[linear-gradient(165deg,#fffcf8,#f5f2ec)] px-5 py-5 shadow-[0_12px_32px_rgba(20,24,31,0.05)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_22px_44px_rgba(20,24,31,0.1)] md:px-6">
                        <div className="proof-card__shine" aria-hidden="true" />
                        <div className="relative flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft font-[family-name:var(--font-display)] text-sm tabular-nums text-accent-deep">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 pt-1.5">
                            <p className="eyebrow">Capability</p>
                            <p className="mt-1.5 text-[1.12rem] leading-snug text-ink md:text-[1.2rem]">
                              {skill}
                            </p>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Offer</p>
                <h3 className="subheading mt-2">
                  Services
                </h3>
              </div>
              <span className="rounded-full border border-accent/25 bg-accent-soft/70 px-3 py-1 text-xs tracking-[0.08em] text-accent-deep uppercase">
                {services.length} ways to work
              </span>
            </div>

            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={service}>
                  <Reveal delay={index * 55 + 40}>
                    <TiltCard className="rounded-[1.45rem]" maxTilt={4} glare>
                      <article className="group relative overflow-hidden rounded-[1.45rem] border border-accent/20 bg-[linear-gradient(145deg,rgba(31,107,102,0.12),transparent_50%),#fffcf8] px-5 py-5 shadow-[0_12px_32px_rgba(20,24,31,0.05)] transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_22px_44px_rgba(31,107,102,0.14)] md:px-6">
                        <div className="proof-card__shine" aria-hidden="true" />
                        <div className="relative flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink font-[family-name:var(--font-display)] text-sm tabular-nums text-[#f6f3ee]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 pt-1.5">
                            <p className="eyebrow">Service</p>
                            <p className="mt-1.5 text-[1.12rem] leading-snug text-ink md:text-[1.2rem]">
                              {service}
                            </p>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
