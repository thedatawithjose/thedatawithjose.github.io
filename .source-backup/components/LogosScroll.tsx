import { motion } from 'framer-motion';

const logosRow1 = [
  { src: 'https://brandlogos.net/wp-content/uploads/2021/11/git-logo-512x512.png', alt: 'Git' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg', alt: 'Jupyter' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg', alt: 'pandas' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', alt: 'AWS' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg', alt: 'Azure' },
  { src: 'https://icon.icepanel.io/Technology/svg/Apache-Airflow.svg', alt: 'Airflow' },
  { src: 'https://docs.getdbt.com/img/dbt-logo.svg', alt: 'dbt' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg', alt: 'PySpark' },
  { src: 'https://companieslogo.com/img/orig/SNOW-35164165.png', alt: 'Snowflake' },
  { src: 'https://www.postgresql.org/media/img/about/press/elephant.png', alt: 'PostgreSQL' },
];

const logosRow2 = [
  { src: 'https://www.python.org/static/community_logos/python-logo-generic.svg', alt: 'Python' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/640px-Michigan_Wolverines_logo.svg.png', alt: 'University of Michigan' },
  { src: 'https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo.png', alt: 'scikit-learn' },
  { src: 'https://docs.pytest.org/en/7.1.x/_static/pytest_logo_curves.svg', alt: 'Pytest' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg', alt: 'PySpark' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', alt: 'AWS' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg', alt: 'Azure' },
  { src: 'https://icon.icepanel.io/Technology/svg/Apache-Airflow.svg', alt: 'Airflow' },
  { src: 'https://docs.getdbt.com/img/dbt-logo.svg', alt: 'dbt' },
  { src: 'https://companieslogo.com/img/orig/SNOW-35164165.png', alt: 'Snowflake' },
  { src: 'https://www.postgresql.org/media/img/about/press/elephant.png', alt: 'PostgreSQL' },
];

export default function LogosScroll() {
  return (
    <div className="logos-scroll-container overflow-hidden py-8 bg-white">
      <div className="relative">
        {/* Primera fila */}
        <motion.div
          className="flex space-x-8 mb-8"
          animate={{ x: [0, -1600] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {logosRow1.concat(logosRow1).map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="w-24 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-2 hover:shadow-md transition-all duration-300">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-w-full max-h-full object-contain filter brightness-100" 
                />
              </div>
            </div>
          ))}
        </motion.div>
        {/* Segunda fila - dirección opuesta */}
        <motion.div
          className="flex space-x-8"
          animate={{ x: [-1600, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {logosRow2.concat(logosRow2).map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="w-24 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-2 hover:shadow-md transition-all duration-300">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-w-full max-h-full object-contain filter brightness-100" 
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}