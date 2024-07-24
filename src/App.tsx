import Router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.module.scss';

import useKeywordStore from './stores/keywordStore';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
