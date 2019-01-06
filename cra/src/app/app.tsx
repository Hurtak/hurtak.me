import React, { Suspense, lazy } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "./components/layout";
import Index from "./pages/index";
import NotFound from "./pages/not-found";
import { getAllVisibleArticles } from "../articles/articles";

const App = () => (
  <Layout>
    <Router
      primary={false}
      // To prevent page scrolling router content into viewport
      // We handle scrolling manually in ScrollToTop component
    >
      <RouterPage path="/" pageComponent={() => <Index />} />
      <RouterPage
        path="/:articleUrl"
        pageComponent={(routerProps: IArticleLoader) => (
          <ArticleLoader articleUrl={routerProps.articleUrl} />
        )}
      />
      <RouterPage default pageComponent={() => <NotFound />} />
    </Router>
  </Layout>
);
export default App;

const RouterPage = ({
  pageComponent,
  ...routerProps
}: {
  pageComponent: (routerProps: RouteComponentProps) => JSX.Element;
} & RouteComponentProps) => {
  return (
    <>
      <ScrollToTop {...routerProps} />
      {pageComponent(routerProps)}
    </>
  );
};

interface IArticleLoader extends RouteComponentProps<{ articleUrl: string }> {}
const ArticleLoader = (props: IArticleLoader) => {
  const articles = getAllVisibleArticles();
  const article = articles.find(article => article.url === props.articleUrl);
  if (!article) return null;

  const Article = lazy(article.articleImportPromise);

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <h2>Dashboard</h2>
      <Article />
    </Suspense>
  );
};

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends React.Component<RouteComponentProps, {}> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location && prevProps.location) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return null;
  }
}