/**
 * Copyright 2025 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { beforeAll, describe, expect, it, suite } from 'vitest';
import { elysia_api } from '../../../src/providers';

beforeAll(async () => {
  const response = await Bun.$`curl -0 http://localhost:3000/api/v1`.text();
  const status = JSON.parse(response).status;
  expect(status).toBe(200);
});

suite('Elysia Server E2E Tests', () => {
  describe('GET /api/v1/health', () => {
    it('should return 200 OK with health status', async () => {
      const res = (
        await elysia_api('/api/v1/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;

      expect(res).toEqual({
        message: 'ok',
        status: 200,
      });
    });
  });

  describe('GET /api/v1', () => {
    it('should return welcome message', async () => {
      const res = (
        await elysia_api('/api/v1', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
      expect(res).toEqual({
        message: "Welcome to the GDG on Campus FSC API. Don't be naughty >:(",
        status: 200,
      });
    });
  });

  describe('GET /api/v1/status', () => {
    it('should return application status', async () => {
      const res = (
        await elysia_api('/api/v1/status', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
      expect(res).toMatchObject({
        message: 'Application status',
        status: 200,
        data: expect.objectContaining({
          uptime: expect.stringMatching(/seconds$/),
          memory: expect.objectContaining({
            rss: expect.stringMatching(/MB$/),
            heapTotal: expect.stringMatching(/MB$/),
            heapUsed: expect.stringMatching(/MB$/),
            external: expect.stringMatching(/MB$/),
          }),
          version: expect.anything(),
          environment: expect.any(String),
        }),
      });
    });
  });

  describe('GET /api/v1/version', () => {
    it('should return version info', async () => {
      const res = (
        await elysia_api('/api/v1/version', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
      expect(res).toMatchObject({
        version: expect.anything(),
        status: 200,
      });
    });
  });

  describe('GET /api/v1/info', () => {
    it('should return API info', async () => {
      const res = (
        await elysia_api('/api/v1/info', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
      expect(res).toEqual({
        message: 'Information about the GDG on Campus FSC API',
        status: 200,
        data: {
          contact: '',
          documentationUrl: 'https://docs.your-api.com',
        },
      });
    });
  });

  describe('HEAD and OPTIONS utility routes', () => {
    it('HEAD /api/v1 should return 200', async () => {
      const res = await elysia_api('/api/v1', { method: 'HEAD' });
      expect(res.status).toBe(200);
    });
    it('OPTIONS /api/v1 should return 204', async () => {
      const res = (await elysia_api('/api/v1', { method: 'OPTIONS' })).data;
      expect(res).toMatchObject({
        message: 'CORS preflight response',
        status: 204,
        allow: expect.any(String),
      });
    });
    it('HEAD /api/v1/status should return 200', async () => {
      const res = await elysia_api('/api/v1/status', { method: 'HEAD' });
      expect(res.status).toBe(200);
    });
    it('OPTIONS /api/v1/status should return 204', async () => {
      const res = (await elysia_api('/api/v1/status', { method: 'OPTIONS' })).data;
      expect(res).toMatchObject({
        message: 'CORS preflight response',
        status: 204,
        allow: expect.any(String),
      });
    });
    it('HEAD /api/v1/version should return 200', async () => {
      const res = await elysia_api('/api/v1/version', { method: 'HEAD' });
      expect(res.status).toBe(200);
    });
    it('OPTIONS /api/v1/version should return 204', async () => {
      const res = (await elysia_api('/api/v1/version', { method: 'OPTIONS' })).data;
      expect(res).toMatchObject({
        message: 'CORS preflight response',
        status: 204,
        allow: expect.any(String),
      });
    });
    it('HEAD /api/v1/info should return 200', async () => {
      const res = await elysia_api('/api/v1/info', { method: 'HEAD' });
      expect(res.status).toBe(200);
    });
    it('OPTIONS /api/v1/info should return 204', async () => {
      const res = (await elysia_api('/api/v1/info', { method: 'OPTIONS' })).data;
      expect(res).toMatchObject({
        message: 'CORS preflight response',
        status: 204,
        allow: expect.any(String),
      });
    });
    it('HEAD /api/v1/health should return 200', async () => {
      const res = await elysia_api('/api/v1/health', { method: 'HEAD' });
      expect(res.status).toBe(200);
    });
    it('OPTIONS /api/v1/health should return 204', async () => {
      const res = (await elysia_api('/api/v1/health', { method: 'OPTIONS' })).data;
      expect(res).toMatchObject({
        message: 'CORS preflight response',
        status: 204,
        allow: expect.any(String),
      });
    });
  });
});
