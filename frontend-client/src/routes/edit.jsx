import {
    Form,
    useLoaderData,
    redirect,
    useNavigate,
  } from "react-router-dom";
import { updateProject } from "../api/projects";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateProject(params.projectId, updates);
    return redirect(`/projects/${params.projectId}`);
  }

export default function EditProject() {
  const { project } = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
    <h3 
      style={{
        paddingBottom: '20px',
        width: '100%',
        margin: 'auto',
      }}
    >
      Edit Project
    </h3>
    <Form method="post" id="project-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Project title"
          type="text"
          name="title"
          defaultValue={project.title}
        />
      </p>
      <label>
        <span>Description</span>
        <textarea
          type="text"
          name="description"
          rows={6}
          placeholder="Project Description"
          defaultValue={project.description}
        />
      </label>
      <label>
        <span>Rewuester Name</span>
        <input
          type="text"
          name="requester"
          defaultValue={project.requester}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
    </>
  );
}