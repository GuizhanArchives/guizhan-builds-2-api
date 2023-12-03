import type { UnstableDevWorker } from 'wrangler'
import { describe, test, expect, beforeAll } from 'vitest'
import { setupWorker } from './utils/testutils'
import { ApiResponseTyped } from '~/types/api'
import { ProjectResponse } from '~/types/builds'

describe('Test projects', () => {
  let worker: UnstableDevWorker

  beforeAll(async () => {
    worker = await setupWorker()
  })

  test('Test /projects', async () => {
    const response = await worker.fetch('/projects')
    expect(response.status).toBe(200)

    const respJson = await response.json()
    expect(respJson).toHaveProperty('data')
    const resp = respJson as ApiResponseTyped<ProjectResponse[]>

    // TODO: replace with expectTypeOf
    // for some reason, expectTypeOf(resp.data).toBeArray() is not working
    // https://github.com/vitest-dev/vitest/issues/4273
    expect(Array.isArray(resp.data)).toBeTruthy()

    const data = resp.data[0]
    expect(data).toHaveProperty('author')
    expect(data).toHaveProperty('repository')
    expect(data).toHaveProperty('branch')
  })

  test('Test /project/:project', async () => {
    const response = await worker.fetch('/project/Slimefun4')
    expect(response.status).toBe(200)

    const response2 = await worker.fetch('/project/kjspafwwin')
    expect(response2.status).toBe(404)

    const respJson = await response.json()
    expect(respJson).toHaveProperty('data')
    const resp = respJson as ApiResponseTyped<ProjectResponse>

    expect(Array.isArray(resp.data)).toBeFalsy()

    const data = resp.data
    // TODO: replace with expectTypeOf
    expect(data).toHaveProperty('author')
    expect(data).toHaveProperty('repository')
    expect(data).toHaveProperty('branch')
  })

})
