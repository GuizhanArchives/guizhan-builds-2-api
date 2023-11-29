import { Ctx } from "~/types/hono";
import { fetchBuilds, fetchProjects } from "~/utils/external";
import { response, responseOk } from "~/utils/response";

export async function getBuilds(ctx: Ctx) {
	const projects = await fetchProjects()
	const branch = ctx.req.param('branch')
	const project = projects.find(project => project.repository === ctx.req.param('project') ? !branch || project.branch === branch : false);
	if (!project) {
		return ctx.json(response(404, 'Project not found!'), 404)
	}

	const buildsInfo = await fetchBuilds(`${project.author}/${project.repository}/${project.branch}`)
	return ctx.json(responseOk('Success', buildsInfo.builds))
}

export async function getBuild(ctx: Ctx) {
	const projects = await fetchProjects()
	const project = projects.find(project => project.repository === ctx.req.param('project') && project.branch === ctx.req.param('branch'));
	if (!project) {
		return ctx.json(response(404, 'Project not found!'), 404)
	}

	const buildsInfo = await fetchBuilds(`${project.author}/${project.repository}/${project.branch}`)
	const buildNum = ctx.req.param('build') !== 'latest' ? parseInt(ctx.req.param('build')) : buildsInfo.builds.length - 1
	const build = buildsInfo.builds[buildNum]
	if (!build) {
		return ctx.json(response(404, 'Build not found!'), 404)
	}

	return ctx.json(responseOk('Success', build))
}

export async function downloadBuild(ctx: Ctx) {
	const projects = await fetchProjects()
	const project = projects.find(project => project.repository === ctx.req.param('project') && project.branch === ctx.req.param('branch'));
	if (!project) {
		return ctx.json(response(404, 'Project not found!'), 404)
	}

	const buildsInfo = await fetchBuilds(`${project.author}/${project.repository}/${project.branch}`)
	const buildNum = ctx.req.param('build') !== 'latest' ? parseInt(ctx.req.param('build')) : buildsInfo.builds.length - 1
	const build = buildsInfo.builds[buildNum]
	if (!build) {
		return ctx.json(response(404, 'Build not found!'), 404)
	}

	return ctx.redirect(`https://builds-r2.gzassets.net/${project.author}/${project.repository}/${project.branch}/${build.target}`)
}
