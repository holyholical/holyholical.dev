"use client";

import RepoTable from "@/components/RepoTable";
import RetroWindow from "@/components/RetroWindow";
import { useShrine } from "@/lib/shrine-context";

export default function ProjectsPage() {
  const { t } = useShrine();
  return (
    <RetroWindow title={t("my projects")} icon="💾" headingId="projects-title">
      <p className="lead">{t("Every public repository on my GitHub, newest push first. Nothing here is typed by hand.")}</p>
      <RepoTable />
    </RetroWindow>
  );
}
