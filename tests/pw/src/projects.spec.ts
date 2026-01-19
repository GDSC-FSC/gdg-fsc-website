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

import { expect, test } from '@playwright/test';


test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should render projects header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /repositories/i })).toBeVisible();
  });

  test('should show loading state or repositories', async ({ page }) => {
    // Projects page uses DataLoader, so it might show a spinner first
    // Then it should show repositories or "No repositories found"
    // We can wait for the grid
    await expect(page.getByText(/explore our open source projects/i)).toBeVisible();
  });
});
