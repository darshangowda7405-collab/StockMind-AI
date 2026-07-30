import { motion } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  Building2,
} from "lucide-react";

interface NewsItem {
  title: string;
  publisher: string;
  url: string;
}

interface Props {
  news: NewsItem[];
}

export default function StockNews({ news }: Props) {
  const articles = news.filter(
    (item) => item.title.trim() !== ""
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-8 backdrop-blur-xl"
    >
      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-cyan-500/10 p-3">

          <Newspaper
            className="text-cyan-400"
            size={28}
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold">
            Latest News
          </h2>

          <p className="text-slate-400">
            Recent articles related to this stock
          </p>

        </div>

      </div>

      {articles.length === 0 ? (

        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">

          <Newspaper
            size={60}
            className="mx-auto mb-5 text-slate-500"
          />

          <h3 className="text-2xl font-bold">
            No Recent News
          </h3>

          <p className="mt-3 text-slate-400">
            No recent articles were found for this company.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {articles.map((article, index) => (

            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400"
            >

              <div className="flex items-start justify-between gap-6">

                <div className="flex-1">

                  <h3 className="text-xl font-semibold leading-8">
                    {article.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-3 text-slate-400">

                    <Building2 size={18} />

                    {article.publisher}

                  </div>

                </div>

                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">

                  <ExternalLink size={20} />

                </div>

              </div>

            </motion.a>

          ))}

        </div>

      )}

    </motion.div>
  );
}