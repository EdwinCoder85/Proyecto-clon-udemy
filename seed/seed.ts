import bcrypt from "bcrypt";

interface SeedUser {
  username: string;
  email: string;
  emailVerified?: boolean | null;
  role: string;
  password?: string | null;
  image: string;
}

interface SeedCategory {
  name: string;
  description: string;
}

interface SeedCourse {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice?: number | null;
  vote: number;
  bestSeller?: boolean | null;
  userEmail: string;
  categoryName: string;
}

interface SeedChapter {
  title: string;
  content: string;
  courseName: string;
  classes: number;
}

interface SeedAttachment {
  name: string;
  url: string;
  courseName: string;
  chapterName: string;
  duration: string;
}

interface SeedReview {
  rating: number;
  commentary: string;
  image: string;
  courseName: string;
  userEmail: string;
}

interface SeedCourseCategory {
  courseName: string;
  categoryName: string;
  popularTheme: string;
}

interface SeedData {
  users: SeedUser[];
  categories: SeedCategory[];
  courses: SeedCourse[];
  chapters: SeedChapter[];
  attachments: SeedAttachment[];
  courseCategories: SeedCourseCategory[];
  reviews: SeedReview[];
}

export const initialData: SeedData = {
  users: [
    {
      username: "Denis Amaranto",
      email: "user01@gmail.com",
      emailVerified: false,
      role: "admin",
      password: bcrypt.hashSync("user01", 10),
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715559331/qdywnmepeyfdix9vpzlw.png",
    },
    {
      username: "Nelida Villegas",
      email: "user02@gmail.com",
      emailVerified: false,
      role: "admin",
      password: bcrypt.hashSync("user02", 10),
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715567242/fyecbtthvjn9wihxtt5a.png",
    },
    {
      username: "Edwin Amaranto",
      email: "edwinagemiler17@gmail.com",
      emailVerified: false,
      role: "admin",
      password: null,
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocIfgQMpwa1qqrQCeAzlLM_KYhn884Ooa6-aCOvtYP-A5WDWY0Mb=s96-c",
    },
    {
      username: "Edwin Amaranto",
      email: "user03@gmail.com",
      emailVerified: false,
      role: "user",
      password: bcrypt.hashSync("user03", 10),
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716010620/wqyah7xqvidytiv4bnkk.png",
    },
    {
      username: "Elkin Amaranto",
      email: "user04@gmail.com",
      emailVerified: false,
      role: "user",
      password: bcrypt.hashSync("user04", 10),
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716010673/vvb10tstpx8a3ul6mwd4.png",
    },
  ],
  categories: [
    {
      name: "Desarrollo web",
      description: "Desarrollo web",
    },
    {
      name: "Ciencia de la información",
      description: "Ciencia de la información",
    },
    {
      name: "Desarrollo móvil",
      description: "Desarrollo móvil",
    },
    {
      name: "Lenguajes de programación",
      description: "Lenguajes de programación",
    },
    {
      name: "Desarrollo de videojuegos",
      description: "Desarrollo de videojuegos",
    },
    {
      name: "Diseño y desarrollo de base de datos",
      description: "Diseño y desarrollo de base de datos",
    },
    {
      name: "Testeo de software",
      description: "Testeo de software",
    },
    {
      name: "Ingeniería de software",
      description: "Ingeniería de software",
    },
    {
      name: "Herramientas de desarrollo de software",
      description: "Herramientas de desarrollo de software",
    },
    {
      name: "Desarrollo sin código",
      description: "Desarrollo sin código",
    },
    {
      name: "Emprendimiento",
      description: "Emprendimiento",
    },
    {
      name: "Diseño web",
      description: "Diseño web",
    },
    {
      name: "Diseño gráfico e ilustración",
      description: "Diseño gráfico e ilustración",
    },
    {
      name: "Herramientas de diseño",
      description: "Herramientas de diseño",
    },
    {
      name: "Diseño de experiencia de usuario",
      description: "Diseño de experiencia de usuario",
    },
    {
      name: "Diseño de juegos",
      description: "Diseño de juegos",
    },
    {
      name: "3D y animación",
      description: "3D y animación",
    },
    {
      name: "Diseño de moda",
      description: "Diseño de moda",
    },
    {
      name: "Diseño arquitectónico",
      description: "Diseño arquitectónico",
    },
    {
      name: "Diseño de interiores",
      description: "Diseño de interiores",
    },
    {
      name: "Diseño, otros",
      description: "Diseño, otros",
    },
    {
      name: "Artes y manualidades",
      description: "Artes y manualidades",
    },
    {
      name: "Analítica e inteligencia empresarial",
      description: "Analítica e inteligencia empresarial",
    },
    {
      name: "Certificaciones de informática",
      description: "Certificaciones de informática",
    },
    {
      name: "Informática y software, otros",
      description: "Informática y software, otros",
    },
    {
      name: "Microsoft",
      description: "Microsoft",
    },
    {
      name: "Redes y seguridad",
      description: "Redes y seguridad",
    },
  ],
  courses: [
    {
      title: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      description:
        "Programación Orientada a Objetos, Funciones Flecha, Callback, Promesas, Async, Await, DOM y mucho más!.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715561687/xmqgvlac28e1nm5d8tox.png",
      price: 229.9,
      oldPrice: 0,
      vote: 5,
      bestSeller: false,
      userEmail: "user03@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "JavaScript Moderno Guía Definitiva Construye +20 Proyectos.",
      description:
        "Aprende el Lenguaje de Programación Web más popular paso a paso con +20 Proyectos - Incluye Proyecto MERN Full Stack.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715565467/nc17gxlardaiq7qxceaz.png",
      price: 249.9,
      oldPrice: 0,
      vote: 5,
      bestSeller: false,
      userEmail: "user02@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "Iniciacion a la programacion con JavaScript.",
      description:
        "Adquiere los conocimientos para empezar en la programacion web.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715565607/nsvd2jgmkpjbjiexvzid.png",
      price: 64.9,
      oldPrice: 0,
      vote: 4,
      bestSeller: false,
      userEmail: "user02@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "JavaScript: Desde cero con NodeJS.",
      description:
        "Aprende los fundamentos y crea un proyecto REST API con Node JS.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715565607/nsvd2jgmkpjbjiexvzid.png",
      price: 64.9,
      oldPrice: 0,
      vote: 4,
      bestSeller: false,
      userEmail: "user01@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "Curso Javascript 2021.",
      description: "Aprende el lenguaje de la web.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715566198/k4nbzqsyqu183sm4xjpe.png",
      price: 69.9,
      oldPrice: 0,
      vote: 4,
      bestSeller: false,
      userEmail: "user01@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "Escuela de JavaScript 2024 - De cero a Master en JavaScript.",
      description:
        "Domina el desarrollo FullSatck con JavaScript desde cero con HTML, CSS, JavaScript, Webpack, NodeJS , Express, etc.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715566814/uo05moo6assy37poskym.png",
      price: 69.9,
      oldPrice: 0,
      vote: 5,
      bestSeller: false,
      userEmail: "user01@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQL.",
      description:
        "Aprende Desarrollo Web con este curso 100% práctico, paso a paso y sin conocimientos previo INCLUYE 4 PROYECTOS FINALES.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716010410/p4oyrem0qde84ker7xol.png",
      price: 34.9,
      oldPrice: 229.9,
      vote: 5,
      bestSeller: true,
      userEmail: "user02@gmail.com",
      categoryName: "Desarrollo web",
    },
    {
      title: "Aprende Dibujo Artístico fácilmente. Arte y creatividad.",
      description:
        "Aprende los secretos y prácticas del arte del dibujo. Clases en vídeo, tutoría online y un libro de regalo.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716693551/f5h5bv5hlovddmjedrbg.png",
      price: 179.9,
      oldPrice: 0,
      vote: 5,
      bestSeller: true,
      userEmail: "user01@gmail.com",
      categoryName: "Artes y manualidades",
    },
    {
      title: "Curso de dibujo cartoon.",
      description:
        "Aprende los secretos para dibujar personajes estilo cartoon de manera sencilla y ágil.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715567813/ftecwvfzmrbzr4vrutd3.png",
      price: 64.9,
      oldPrice: 0,
      vote: 5,
      bestSeller: true,
      userEmail: "user01@gmail.com",
      categoryName: "Artes y manualidades",
    },
    {
      title: "¡Aprenda a dibujar desde cero!.",
      description:
        "¡Aprenda las bases del dibujo académico para poder dibujar o bocetar lo que desee!.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715567868/eyp8cnqneucrcjcyxkh0.png",
      price: 64.9,
      oldPrice: 0,
      vote: 5,
      bestSeller: true,
      userEmail: "user03@gmail.com",
      categoryName: "Artes y manualidades",
    },
    {
      title: "Python para no matemáticos: De 0 hasta reconocimiento facial.",
      description: "Reconocimiento facial.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716017259/hb6ptby03nxos3f225h7.png",
      price: 34.9,
      oldPrice: 199.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user03@gmail.com",
      categoryName: "Redes y seguridad",
    },
    {
      title: "Python Practicando. Desde 0 hasta Desarrollador en Python.",
      description:
        "Aprende Python, donde iniciamos desde 0, sin conocimientos previos hasta desarrollar aplicaciones con mucha practica!.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716017134/xvum5wiboa0khqgkqfb3.png",
      price: 34.9,
      oldPrice: 199.9,
      vote: 4,
      bestSeller: false,
      userEmail: "user03@gmail.com",
      categoryName: "Lenguajes de programación",
    },
    {
      title: "Universidad Python - De Cero a Experto Más Completo +71 hrs.",
      description:
        "Aprende Python: Tkinter, PySide, POO, Web con Django, Flask, Jinja, SQL Alchemy, Postgresql, PyCharm y mucho más!.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716017177/evslrqob5oamfoa7n2op.png",
      price: 34.9,
      oldPrice: 229.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user03@gmail.com",
      categoryName: "Lenguajes de programación",
    },
    {
      title: "Curso Python - Desde cero para principiantes.",
      description:
        "Jorge, con experiencia en programación, te guiará en el aprendizaje de Python desde cero.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716017842/znrgkig8zg5nvd1rokeq.png",
      price: 39.9,
      oldPrice: 179.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user01@gmail.com",
      categoryName: "Lenguajes de programación",
    },
    {
      title: "Universidad Excel - Básico, Intermedio y Avanzado!.",
      description:
        "Master en Excel más completo. Incluye Funciones, Tablas Dinámicas, Gráficos, Power Query , Macros y más a profundidad!.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716012962/ddvkdnmwiw1clrb8bst0.png",
      price: 34.9,
      oldPrice: 229.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user01@gmail.com",
      categoryName: "Microsoft",
    },
    {
      title: "Excel Completo - Desde Principiante Hasta Avanzado.",
      description:
        "Conviértete en un Experto en Excel Desde Cero. Excel 2010, 2013, 2016 2019 and Microsoft/Office 365.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716014990/nceg25jad9l8uv142yhj.png",
      price: 34.9,
      oldPrice: 249.9,
      vote: 5,
      bestSeller: true,
      userEmail: "user02@gmail.com",
      categoryName: "Microsoft",
    },
    {
      title: "Curso Excel y Power BI – Análisis y Visualización de Datos.",
      description:
        "Curso Power BI y Excel - Ejercicios Tablas dinámicas y gráficos en Excel - Reportes y dashboards en Microsoft Power BI.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716049318/o9zze0n1rxnot7uetu7w.png",
      price: 39.9,
      oldPrice: 299.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user02@gmail.com",
      categoryName: "Microsoft",
    },
    {
      title: "EXCEL para principiantes enfocado a los negocios.",
      description:
        "Curso Excel pensando en principiantes para productividad en los negocios y empresas actualizado a la ultima versión.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716050748/juh5dgrtdp8ywqb0imxw.png",
      price: 39.9,
      oldPrice: 79.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user02@gmail.com",
      categoryName: "Microsoft",
    },
    {
      title: "[Español] AWS Certified Cloud Practitioner (CLF-C02) - 2024.",
      description:
        "Aprende Cloud Computing | Prepárate para el examen de AWS Certified Cloud Practitioner | ¡Examen de simulación incluido!.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716005610/sds5iro7yjuznaaqemep.png",
      price: 34.9,
      oldPrice: 249.9,
      vote: 5,
      bestSeller: true,
      userEmail: "user01@gmail.com",
      categoryName: "Certificaciones de informática",
    },
    {
      title: "Amazon AWS. Curso básico de Amazon AWS. Aprende desde cero.",
      description:
        "Aprende Amazon AWS, la plataforma de computación en la nube líder del mercado. Curso de AWS muy práctico. AWS desde cero.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716005689/ogyzqiriwyf9rtuw1vne.png",
      price: 34.9,
      oldPrice: 199.9,
      vote: 4,
      bestSeller: false,
      userEmail: "user01@gmail.com",
      categoryName: "Informática y software, otros",
    },
    {
      title: "Amazon AWS Desarrollo. Curso de AWS programador certificado.",
      description:
        "Aprende a programar en la nube de Amazon AWS y consigue tu certificación en Amazon AWS Developer Associate.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716007475/nhwvljojvsxd6a2cg8tr.png",
      price: 49.9,
      oldPrice: 249.9,
      vote: 4,
      bestSeller: false,
      userEmail: "user04@gmail.com",
      categoryName: "Certificaciones de informática",
    },
    {
      title: "Amazon AWS desde cero.",
      description:
        "Aprende sobre AWS desde cero. Curso basico. Aprende sobre AWS de forma practica.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716009262/gdtkuhwvyq2o2jx9ljpv.png",
      price: 34.9,
      oldPrice: 170.9,
      vote: 5,
      bestSeller: false,
      userEmail: "user04@gmail.com",
      categoryName: "Informática y software, otros",
    },
    {
      title: "Curso Introducción a Amazon Web Services (AWS) desde cero.",
      description:
        "Aprenda a usar los servicios de Cloud Computing que ofrece Amazon (AWS) y consiga escalar su infraestructura IT.",
      imageUrl:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1716011519/xmt1sl7cuzgdla0j2s88.png",
      price: 39.9,
      oldPrice: 199.9,
      vote: 4,
      bestSeller: false,
      userEmail: "user04@gmail.com",
      categoryName: "Desarrollo web",
    },
  ],
  reviews: [
    {
      rating: 5,
      commentary: "Excelente curso...muy recomendado!!",
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715559331/qdywnmepeyfdix9vpzlw.png",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      userEmail: "user01@gmail.com",
    },
    {
      rating: 5,
      commentary: "Que curso mas bravo....",
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715567242/fyecbtthvjn9wihxtt5a.png",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      userEmail: "user02@gmail.com",
    },
    {
      rating: 5,
      commentary: "Excelente el aporte para todos.",
      image:
        "https://res.cloudinary.com/dsytnzksz/image/upload/v1715559331/qdywnmepeyfdix9vpzlw.png",
      courseName:
        "Universidad Python - De Cero a Experto Más Completo +71 hrs.",
      userEmail: "user02@gmail.com",
    },
  ],
  chapters: [
    {
      title: "Clase introductoria",
      content: "Clase introductoria",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 3,
    },
    {
      title: "Capítulo 1 | Generalidades del programa Excel",
      content: "Capítulo 1 | Generalidades del programa Excel",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title:
        "Capítulo 2 | Ingresos de datos, formatos y estructura de las funciones",
      content:
        "Capítulo 2 | Ingresos de datos, formatos y estructura de las funciones",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Capítulo 3 | Ordenar y filtrar los datos de excel",
      content: "Capítulo 3 | Ordenar y filtrar los datos de excel",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Capítulo 4 | Profundizando en el manejo de funciones",
      content: "Capítulo 4 | Profundizando en el manejo de funciones",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Capítulo 5 | Gráficos en Excel",
      content: "Capítulo 5 | Gráficos en Excel",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Capítulo 6 | Buenas prácticas de impresión",
      content: "Capítulo 6 | Buenas prácticas de impresión",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title:
        "Capítulo 7 | Tratamiento de fecha, horas y datos de textos y plantillas",
      content:
        "Capítulo 7 | Tratamiento de fecha, horas y datos de textos y plantillas",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Capítulo Bono (El poder los MACROS)",
      content: "Capítulo Bono (El poder los MACROS)",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Despedida",
      content: "Despedida",
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      classes: 0,
    },
    {
      title: "Bienvenidos a la Universidad Javascript",
      content: "Bienvenidos a la Universidad Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 1,
    },
    {
      title: "Introducción Javascript",
      content: "Introducción Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 7,
    },
    {
      title: "Variables Javascript",
      content: "Variables Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Operadores Javascript",
      content: "Operadores Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 11,
    },
    {
      title: "Sentencias de Decisión en Javascript",
      content: "Sentencias de Decisión en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 8,
    },
    {
      title: "Ciclos en Javascript",
      content: "Ciclos en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 8,
    },
    {
      title: "Arreglos en Javascript",
      content: "Arreglos en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 4,
    },
    {
      title: "Funciones Incorporadas en Javascript",
      content: "Funciones Incorporadas en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 7,
    },
    {
      title: "Objetos  en Javascript",
      content: "Objetos  en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Palabra Static en Javascript",
      content: "Palabra Static en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Sistema de Ventas con Javascript",
      content: "Sistema de Ventas con Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Proyecto Mundo PC con Javascript",
      content: "Proyecto Mundo PC con Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Modo Strict en Javascript",
      content: "Modo Strict en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Programación Orientada a Objetos (POO) en Javascript",
      content: "Programación Orientada a Objetos (POO) en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
    {
      title: "Manejo de Errores en Javascript",
      content: "Manejo de Errores en Javascript",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      classes: 0,
    },
  ],
  attachments: [
    {
      name: "Bienvenidos a la Universidad de Javascript",
      url: "https://www.youtube.com/watch?v=2SetvwBV-SU&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Bienvenidos a la Universidad Javascript",
      duration: "15:16",
    },
    {
      name: "Introducción al lenguaje de Javascript",
      url: "https://www.youtube.com/watch?v=BS5RX27VaAQ&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "14:10",
    },
    {
      name: "Lenguajes Compilados VS Interpretados",
      url: "https://www.youtube.com/watch?v=C5FXZ2ki13k&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&index=3",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "21:42",
    },
    {
      name: "Instalación de Visual Studio Code (VSC)",
      url: "https://www.youtube.com/watch?v=tmRa0_EvMoc&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&index=4",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "22:44",
    },
    {
      name: "Extensiones de Visual Studio Code (SVC) para JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "04:06",
    },
    {
      name: "Instalación de Node.js para JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "03:19",
    },
    {
      name: "HolaMundo con JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "06:03",
    },
    {
      name: "Nota: Problemas con la extensión de Quokka",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Introducción Javascript",
      duration: "00:43",
    },
    {
      name: "Variables en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "02:04",
    },
    {
      name: "Ejemplo de Variables en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "03:50",
    },
    {
      name: "Reglas para Definir una Variable en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "05:19",
    },
    {
      name: "Ejemplo de Reglas de Variables en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "04:10",
    },
    {
      name: "Tipos de Datos en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "02:37",
    },
    {
      name: "Ejemplo de Tipos de Datos en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "06:02",
    },
    {
      name: "typeof en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "03:37",
    },
    {
      name: "Hoisting en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "05:28",
    },
    {
      name: "Constantes en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=1",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Variables Javascript",
      duration: "04:22",
    },
    {
      name: "Operadores en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "02:18",
    },
    {
      name: "Ejemplo de Operadores Aritméticos en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "06:16",
    },
    {
      name: "Ejemplo de Incremento y Decremento en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "07:04",
    },
    {
      name: "Operadores de Asignación en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "06:56",
    },
    {
      name: "Operadores de Comparación en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "01:52",
    },
    {
      name: "Ejemplo de Operadores de Comparación",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "07:09",
    },
    {
      name: "Ejemplo de Operadores de Comparación - parte 2",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "05:48",
    },
    {
      name: "Operadores Lógicos en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "05:28",
    },
    {
      name: "Ejemplo Operadores Lógicos en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "06:34",
    },
    {
      name: "Ejemplo Valor dentro de Rango",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "04:28",
    },
    {
      name: "Ejemplo Precedencia de Operadores",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Operadores Javascript",
      duration: "05:39",
    },
    {
      name: "Sentencia if en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "03:51",
    },
    {
      name: "Sentencia if else en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "04:53",
    },
    {
      name: "Sentencia if - else if - else en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "04:50",
    },
    {
      name: "Operador Ternario en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "04:38",
    },
    {
      name: "Ejemplo Mayor de Edad",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "03:21",
    },
    {
      name: "Ejemplo Día de la Semana con if else",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "04:13",
    },
    {
      name: "Sentencia Switch en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "04:45",
    },
    {
      name: "Ejercicio Sentencia Switch en JavaScript",
      url: "https://www.youtube.com/watch?v=x5YUu0eUc8s&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=2",
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      chapterName: "Sentencias de Decisión en Javascript",
      duration: "05:46",
    },
  ],
  courseCategories: [
    {
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      categoryName: "Desarrollo web",
      popularTheme: "Javascript",
    },
    {
      courseName: "JavaScript Moderno Guía Definitiva Construye +20 Proyectos.",
      categoryName: "Desarrollo web",
      popularTheme: "Javascript",
    },
    {
      courseName: "Iniciacion a la programacion con JavaScript.",
      categoryName: "Desarrollo web",
      popularTheme: "Javascript",
    },
    {
      courseName: "JavaScript: Desde cero con NodeJS.",
      categoryName: "Desarrollo web",
      popularTheme: "Javascript",
    },
    {
      courseName: "Curso Javascript 2021.",
      categoryName: "Desarrollo web",
      popularTheme: "Javascript",
    },
    {
      courseName:
        "Escuela de JavaScript 2024 - De cero a Master en JavaScript.",
      categoryName: "Desarrollo web",
      popularTheme: "Javascript",
    },
    {
      courseName: "Aprende Dibujo Artístico fácilmente. Arte y creatividad.",
      categoryName: "Artes y manualidades",
      popularTheme: "Dibujo",
    },
    {
      courseName: "Curso de dibujo cartoon.",
      categoryName: "Artes y manualidades",
      popularTheme: "Dibujo",
    },
    {
      courseName: "¡Aprenda a dibujar desde cero!.",
      categoryName: "Artes y manualidades",
      popularTheme: "Dibujo",
    },
    {
      courseName:
        "Python para no matemáticos: De 0 hasta reconocimiento facial.",
      categoryName: "Redes y seguridad",
      popularTheme: "Python",
    },
    {
      courseName: "Python Practicando. Desde 0 hasta Desarrollador en Python.",
      categoryName: "Lenguajes de programación",
      popularTheme: "Python",
    },
    {
      courseName:
        "Universidad Python - De Cero a Experto Más Completo +71 hrs.",
      categoryName: "Lenguajes de programación",
      popularTheme: "Python",
    },
    {
      courseName: "Curso Python - Desde cero para principiantes.",
      categoryName: "Lenguajes de programación",
      popularTheme: "Python",
    },
    {
      courseName: "Universidad JavaScript - De Cero a Experto JavaScript!.",
      categoryName: "Desarrollo web",
      popularTheme: "Desarrollo web",
    },
    {
      courseName:
        "Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQL.",
      categoryName: "Desarrollo web",
      popularTheme: "Desarrollo web",
    },
    {
      courseName: "Universidad Excel - Básico, Intermedio y Avanzado!.",
      categoryName: "Microsoft",
      popularTheme: "Excel",
    },
    {
      courseName: "Excel Completo - Desde Principiante Hasta Avanzado.",
      categoryName: "Microsoft",
      popularTheme: "Excel",
    },
    {
      courseName: "Curso Excel y Power BI – Análisis y Visualización de Datos.",
      categoryName: "Microsoft",
      popularTheme: "Excel",
    },
    {
      courseName: "EXCEL para principiantes enfocado a los negocios.",
      categoryName: "Microsoft",
      popularTheme: "Excel",
    },
    {
      courseName:
        "[Español] AWS Certified Cloud Practitioner (CLF-C02) - 2024.",
      categoryName: "Certificaciones de informática",
      popularTheme: "Amazon AWS",
    },
    {
      courseName: "Amazon AWS. Curso básico de Amazon AWS. Aprende desde cero.",
      categoryName: "Informática y software, otros",
      popularTheme: "Amazon AWS",
    },
    {
      courseName:
        "Amazon AWS Desarrollo. Curso de AWS programador certificado.",
      categoryName: "Certificaciones de informática",
      popularTheme: "Amazon AWS",
    },
    {
      courseName: "Amazon AWS desde cero.",
      categoryName: "Informática y software, otros",
      popularTheme: "Amazon AWS",
    },
    {
      courseName: "Curso Introducción a Amazon Web Services (AWS) desde cero.",
      categoryName: "Desarrollo web",
      popularTheme: "Amazon AWS",
    },
  ],
};
