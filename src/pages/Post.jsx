import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { client } from "../Lib/createClient";
import { Layout } from "../components/Layout";

export const Post = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        client
            .getEntries({
                "fields.postSlug": slug,
                content_type: 'blogPostAula',
            })
            .then(function (entries) {
                if (entries.items.length > 0) {
                    console.log("post", entries.items[0]);
                    setPost(entries.items[0]);
                } else {
                    // Tratar caso não encontre o post
                    console.log("Post não encontrado");
                }
            });
    }, [slug]); // Adicionado slug ao array de dependências para reagir a mudanças

    return (
        <Layout>
            {post ? (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="my-3">{post.fields.postTitle}</h1>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.fields.postBody) }}></div>

                        <div className="mt-3">
                            <Link to="/" className="btn btn-primary">
                                Voltar para Home
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Carregando...</div>
            )}
        </Layout>
    );
};
