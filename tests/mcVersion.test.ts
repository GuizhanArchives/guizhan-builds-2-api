import type { UnstableDevWorker } from "wrangler";
import { describe, test, expect, beforeAll, expectTypeOf } from 'vitest';
import { setupWorker } from "./utils/testutils";
import { ApiResponseTyped } from "~/types/api";
import { ProjectResponse } from "~/types/builds";

describe("Test mcVersion", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await setupWorker();
	});

	test("Test /mc-versions", async () => {
		const response = await worker.fetch("/mc-versions");
		expect(response.status).toBe(200);

		const respJson = await response.json();
		expect(respJson).toHaveProperty('data');
		const resp = respJson as ApiResponseTyped<string[]>;

		// TODO: replace with expectTypeOf
		// for some reason, expectTypeOf(resp.data).toBeArray() is not working
		// https://github.com/vitest-dev/vitest/issues/4273
		expect(Array.isArray(resp.data)).toBeTruthy()
	});
});
