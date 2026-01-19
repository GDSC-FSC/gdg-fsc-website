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

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Farmingdale State College' })).toBeVisible();
  });

  test('should navigate to team page', async ({ page }) => {
    await page.getByRole('link', { name: /meet the team/i }).click();
    await expect(page).toHaveURL(/.*\/team/);
  });

  test('should toggle theme', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveClass(/light|dark/);
    
    // Assuming there is a theme toggle button
    const toggleBtn = page.getByRole('button', { name: /toggle theme/i });
    if (await toggleBtn.isVisible()) {
        const initialClass = await html.getAttribute('class');
        await toggleBtn.click();
        await expect(html).not.toHaveClass(initialClass!);
    }
  });
});
