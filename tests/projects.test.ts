import type { UnstableDevWorker } from "wrangler";
import { describe, test, expect, beforeAll, expectTypeOf } from 'vitest';
import { setupWorker } from "./utils/testutils";
import { ApiResponseTyped } from "~/types/api";
import { ProjectResponse } from "~/types/builds";

describe("Test projects", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await setupWorker();
	});

	test("Test /projects", async () => {
		const response = await worker.fetch("/project/FastMachines");
		expect(response.status).toBe(200);

		const respJson = await response.json();
		expect(respJson).toHaveProperty('data');
		const resp = respJson as ApiResponseTyped<ProjectResponse>;
		expectTypeOf(resp.data).toBeArray.result
	});

});
