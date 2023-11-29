import { requestJson } from "~/utils/request"
import { BuildsInfo, Projects, useParseProjects } from "guizhan-builds-2-data";

export async function fetchProjects() {
	const rawProjects = await requestJson<Projects>(`https://raw.githubusercontent.com/ybw0014/guizhan-builds-2/master/public/repos.json`)
	return useParseProjects(rawProjects)
}

export async function fetchBuilds(path: string) {
	return await requestJson<BuildsInfo>(`https://builds-r2.gzassets.net/${path}/builds.json`)
}
