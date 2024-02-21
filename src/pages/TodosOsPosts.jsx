import { useEffect, useState } from "react";
import { client } from "../Lib/createClient";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export const TodosOsPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    if (totalPosts === 0) {
      client.getEntries({
        content_type: 'blogPostAula',
        order: "-sys.createdAt",
      }).then(entries => {
        setTotalPosts(entries.total);
      });
    }

    // Posts da página atual
    client.getEntries({
      content_type: 'blogPostAula',
      order: "-sys.createdAt",
      skip: (currentPage - 1) * postsPerPage,
      limit: postsPerPage,
    }).then(entries => {
      setPosts(entries.items);
    });
  }, [currentPage, postsPerPage, totalPosts]);

  // Total de páginas
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  // navegação
  const goToPreviousPage = () => setCurrentPage(current => Math.max(1, current - 1));
  const goToNextPage = () => setCurrentPage(current => Math.min(pageCount, current + 1));

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">Todos os Posts</h1>
            {posts.length > 0 ? posts.map(post => (
              <div key={post.sys.id}>
                <h2>{post.fields.postTitle}</h2>
                <p>{post.fields.postDescription}</p>
                <Link to={`/post/${post.fields.postSlug}`} className="btn btn-primary">
                  Ler mais
                </Link>
              </div>
            )) : <div>Carregando posts...</div>}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px 10px', marginRight: '5px' }}
          >
            &lt;
          </button>
          <span style={{ margin: '0 10px' }}>
            Página {currentPage} de {pageCount}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === pageCount}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px 10px', marginLeft: '5px' }}
          >
            &gt;
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            Voltar para Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};
