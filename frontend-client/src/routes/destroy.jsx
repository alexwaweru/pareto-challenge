import { redirect } from "react-router-dom";
import { deleteProject } from "../api/projects";

export async function action({ params }) {
  await deleteProject(params.projectId);
  return redirect("/");
}
