import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout/Layout';
import { ScrollToTop } from '@/components/layout/ScrollToTop/ScrollToTop';
import { Home } from '@/pages/Home/Home';
import { Setup } from '@/pages/Setup/Setup';
import { Quiz } from '@/pages/Quiz/Quiz';
import { Results } from '@/pages/Results/Results';
import { History } from '@/pages/History/History';
import { About } from '@/pages/About/About';
import { NotFound } from '@/pages/NotFound/NotFound';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="setup" element={<Setup />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="results" element={<Results />} />
          <Route path="history" element={<History />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
