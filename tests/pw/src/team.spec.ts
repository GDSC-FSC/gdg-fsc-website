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

test.describe('Team Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/team');
  });

  test('should render team header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /leadership team/i })).toBeVisible();
  });

  test('should render team members', async ({ page }) => {
    // Assuming there are team members rendered
    // We can check for a specific member or just that the grid exists
    await expect(page.locator('.grid > div').first()).toBeVisible(); // Check if at least one member card is visible
    await expect(page.getByRole('button', { name: /get involved/i })).toBeVisible();
  });
});
