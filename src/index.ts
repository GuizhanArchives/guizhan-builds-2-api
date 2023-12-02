import { Hono } from 'hono';
import { response } from '~/utils/response';
import { getProjects, getProject } from '~/controllers/projects';
import { getBuilds, getBuild, downloadBuild } from '~/controllers/builds';
import { getMcVersions } from '~/controllers/mcVersion';

const app = new Hono();

app.notFound((ctx) => ctx.json(response(404, 'Route not found!'), 404));
app.onError((err, ctx) => {
  console.error(`${err}`);
  return ctx.json(response(500, 'Internal server error!'), 500);
});

app.get('/', (ctx) => ctx.json(response(0, 'Guizhan Builds 2 API')));

app.get('/projects', getProjects);
app.get('/project/:project/:branch?', getProject);
app.get('/builds/:project/:branch?', getBuilds);
app.get('/build/:project/:branch/:build', getBuild);
app.get('/download/:project/:branch/:build', downloadBuild);
app.get('/mc-versions', getMcVersions);

export default app;
