import {
    Form,
    redirect,
    useNavigate,
  } from "react-router-dom";
import { createProject } from "../api/projects";

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const project = await createProject(data);
    return redirect(`/projects/${project.pk}`);
  }

export default function CreateProject() {
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
        New Project
      </h3>
    <Form method="post" id="project-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Project title"
          type="text"
          name="title"
        />
      </p>
      <label>
        <span>Description</span>
        <textarea
          type="text"
          name="description"
          rows={6}
          placeholder="Project Description"
        />
      </label>
      <label>
        <span>Rewuester Name</span>
        <input
          type="text"
          name="requester"
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