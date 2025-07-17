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

// Augment the Window interface for custom properties we might have in our application
interface Window {
  // Add any custom window properties here that our app might use
  // For example:
  ramhacksData?: {
    name: string;
    date: string;
    location: string;
    participants: number;
    sections: string[];
    contacts: {
      sponsor: string;
      registration: string;
    };
  };

  // For analytics or other global objects
  dataLayer?: any[];
  ga?: Function;
}
