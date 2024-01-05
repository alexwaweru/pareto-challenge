import { Form, useLoaderData } from "react-router-dom";
import { getPoject } from "../api/projects";

export async function loader({ params }) {
    const project = await getPoject(params.projectId);
    if (!project) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { project };
}

const Project = () => {
  const { project } = useLoaderData();

  return (
    <div id="project">
      <div>
        <h1>
          {project.title ? (
            <>
              {project.title}
            </>
          ) : (
            <i>No Name</i>
          )}
        </h1>

        {project.description && (
          <>
            <h4>Project Description</h4>
            <p>
              {project.description}
            </p>
          </>
        )}

        {project.requester && (
          <>
            <h4>Requested By:</h4>
            <p>
              {project.requester}
            </p>
          </>
        )}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Project;
