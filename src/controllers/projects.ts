import { response, responseOk } from "~/utils/response";
import { fetchProjects } from "~/utils/external";
import { Ctx } from "~/types/hono";

export async function getProjects(ctx: Ctx) {
	const projects = await fetchProjects()

	const result = []
	for (const project of projects) {
		result.push({
			author: project.author,
			repository: project.repository,
			branch: project.branch
		})
	}

	return ctx.json(responseOk('Success', result))
}

export async function getProject(ctx: Ctx) {
	const projects = await fetchProjects()
	const branch = ctx.req.param('branch')
	const project = projects.find(project => project.repository === ctx.req.param('project') ? !branch || project.branch === branch : false);
	if (!project) {
		return ctx.json(response(404, 'Project not found!'), 404)
	}
	return ctx.json(responseOk('Success', project))
}
