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

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from 'sonner';
import { LoadingScreen, ViewTransitionHandler } from './components';
import { About, Events, Home, NotFound, Projects, Team } from './pages';
import { Scripts } from './scripts';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => setIsLoading(false);

  if (isLoading) return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;

  return (
    <>
      <Sonner />
      <Scripts />
      <BrowserRouter>
        <ViewTransitionHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
