export const ui = {
  en: {
    hero: {
      heading: "We build software for geotechnical data.",
      subhead:
        "Bedrock.engineer is a small software studio. We make your geotechnical data more useful: CPT and borehole data in web apps, ground models in 3D in the browser, and data ready for the BIM tools you already use.",
      ctaPrimary: "Schedule Discovery Call",
      ctaSecondary: "View Demos",
    },
    workedWith: {
      heading: "We have worked with",
    },
    demos: {
      exploreAll: "Explore all interactive demos",
    },
    voxels: {
      imageAlt: "GeoTOP geological voxel model in the browser",
      heading: "3D Voxel Models in the Browser",
      body: "Explore geological models, groundwater grids, and mining block models interactively. No downloads, no specialist software.",
      badge: "Featured by Cesium",
      link: "See 3D Tiles Voxels",
    },
    whatWeDo: {
      heading: "What We Build",
      intro:
        "We build tools and workflows that connect your ground investigation data, geological and geotechnical models, and analysis results to the platforms your project already runs on.",
      subheading: "For example:",
      items: [
        "Convert bespoke formats (AGS, GEF/CPT, gINT) into geospatial formats like GeoPackage or PostGIS databases",
        "Build web applications for CPT data, engineering model visualization (Plaxis, Deltares D-Series), and interactive 3D maps",
        "Integrate ground investigation data into digital twin platforms",
        "Automate workflows connecting geotechnical data to QGIS, BIM tools, and databases",
      ],
      link: "Our services",
    },
    values: {
      heading: "Our Values",
      purposeBuilt: {
        title: "Purpose-built for geotechnical data",
        body: 'Not generic software that "almost" fits. We\'ve built reusable components for ground investigation data, geotechnical models, and underground assets, and adapt them to your workflows. Tailored tools without full custom-build costs.',
      },
      standardFormats: {
        title: "Standard formats, any tool",
        body: "Your geotechnical data converted to standard geospatial formats. Use it in QGIS, ArcGIS, Python, web maps, geospatial databases. Whoever needs the data can open it in tools they already have.",
      },
      openEcosystems: {
        title: "Open ecosystems",
        // Prose split around two inline library links (see LandingPage.astro)
        bodyBefore:
          "We believe in open-source software and open standards to drive innovation in geotechnical engineering. We publish parts of our work as open-source libraries, such as ",
        middle: " for CPT data in notebooks and ",
        bodyAfter: " for unit-aware engineering calculations.",
      },
      link: "Our mission",
    },
    team: {
      heading: "The Team",
      jules: {
        name: "Jules Blom",
        bio: "Experienced in building data-rich geospatial applications. Specializes in making complex subsurface data clear through visualization and intuitive apps. Background in Petroleum Engineering (Reservoir Geology) at TU Delft.",
      },
      joost: {
        name: "Joost Gevaert",
        bio: "Geotechnical engineer and computational designer. Worked at Arup bridging gaps between geotechnical and structural engineering workflows. Background in Geotechnical Engineering and Applied Geophysics.",
      },
      link: "More about the team",
    },
    demoTabs: {
      interactive: {
        label: "Interactive Visualization",
        title: "We build web viewers for ground investigation data",
        p1: "Your project team and clients open boreholes, test results, and ground models straight in the browser, with nothing to install.",
        p2: "We build viewers like this around your data and workflows.",
        iframeTitle:
          "Demo of ground investigation data in Hong Kong in a 3D map",
        caption: "GI data in Kai Tak, Hong Kong.",
        exploreLink: "Explore for yourself.",
      },
      geospatial: {
        label: "Geospatial Data Integration",
        title: "We get your geotechnical data into the geospatial ecosystem",
        p1: "We convert ground investigation data to standard geospatial formats, so your team can use it in QGIS, ArcGIS, Python, and web maps.",
        p2: "Analysis, visualization, and automation happen in the tools your GIS colleagues and data scientists already know.",
        imgAlt: "Geotechnical data visualized in ArcGIS",
        caption: "Kai Tak, Hong Kong 3D GI data visualization in ArcGIS.",
      },
      cadBim: {
        label: "CAD & BIM Integration",
        title: "We connect geotechnical data with structural and building models",
        p1: "We bring geotechnical and structural models together in design software like Rhino3D and Civil3D, connect them through AEC platforms like Speckle, and feed ground data into digital twin platforms.",
        imgAlt: "Interactive 3D visualization of geotechnical data in Speckle",
        caption: "Kai Tak, Hong Kong 3D GI data visualization in",
        speckleLink: "Speckle.",
        exploreLink: "Explore for yourself.",
      },
    },
  },
  nl: {
    hero: {
      // DRAFT — needs a native marketing eye
      heading: "Wij bouwen software voor geotechnische data.",
      subhead:
        "Bedrock.engineer is een softwarestudio. Wij maken je geotechnische data bruikbaarder: sonderingen en boringen in webapps, grondmodellen in 3D in de browser, en data klaar voor QGIS en BIM-tools.",
      ctaPrimary: "Plan een kennismakingsgesprek",
      ctaSecondary: "Bekijk demo's",
    },
    workedWith: {
      heading: "We hebben gewerkt met",
    },
    demos: {
      exploreAll: "Ontdek alle interactieve demo's",
    },
    voxels: {
      imageAlt: "GeoTOP geologisch voxelmodel in de browser",
      heading: "3D-voxelmodellen in de browser",
      body: "Verken geologische & geotechnische of geohydrologische blogmodellen. Zonder downloads en specialistische software.",
      badge: "Uitgelicht door Cesium",
      link: "Bekijk 3D Tiles-voxels",
    },
    whatWeDo: {
      heading: "Wat we bouwen",
      intro:
        "We bouwen tools en workflows die je grondonderzoeksdata, geologische en geotechnische modellen en analyseresultaten verbinden met de platforms waarop je project al draait.",
      subheading: "Bijvoorbeeld:",
      items: [
        "Verouderde formaten (GEF, gINT) omzetten naar geospatiale formaten zoals GeoPackage of PostGIS-databases",
        "Webapplicaties bouwen voor CPT-data, visualisatie van engineeringmodellen (Plaxis, Deltares D-Series) en interactieve 3D-kaarten",
        "Grondonderzoeksdata integreren in digital twin-platforms",
        "Workflows automatiseren die geotechnische data koppelen aan QGIS, BIM-tools en databases",
      ],
      link: "Onze diensten",
    },
    values: {
      heading: "Onze waarden",
      purposeBuilt: {
        title: "Speciaal gebouwd voor geotechnische data",
        body: 'Geen generieke software die "bijna" past. We hebben herbruikbare componenten gebouwd voor grondonderzoeksdata, geotechnische modellen en ondergrondse assets, en passen die aan op jouw workflows. Maatwerk zonder de kosten van volledig custom-werk.',
      },
      standardFormats: {
        title: "Standaardformaten, elke tool",
        body: "Je geotechnische data omgezet naar standaard geospatiale formaten. Gebruik het in QGIS, ArcGIS, Python, webkaarten en geospatiale databases. Iedereen die de data nodig heeft, kan die openen in tools die ze al hebben.",
      },
      openEcosystems: {
        title: "Open ecosystemen",
        bodyBefore:
          "We geloven in open-source software en open standaarden om innovatie in de geotechniek te stimuleren. Delen van ons werk publiceren we als open-source libraries, zoals ",
        middle: " voor CPT-data in notebooks en ",
        bodyAfter: " voor engineeringberekeningen met eenheden.",
      },
      link: "Onze missie",
    },
    team: {
      heading: "Het team",
      jules: {
        name: "Jules Blom",
        bio: "Ervaren in het bouwen van data-rijke geospatiale applicaties. Gespecialiseerd in het helder maken van complexe ondergrondse data via visualisatie en intuïtieve apps. Achtergrond in Petroleum Engineering (Reservoir Geologie) aan de TU Delft.",
      },
      joost: {
        name: "Joost Gevaert",
        bio: "Geotechnisch ingenieur en computational designer. Werkte bij Arup aan het overbruggen van de kloof tussen geotechnische en constructieve engineering-workflows. Achtergrond in geotechniek en toegepaste geofysica.",
      },
      link: "Meer over het team",
    },
    demoTabs: {
      interactive: {
        label: "Interactieve visualisatie",
        title: "Wij bouwen webviewers voor grondonderzoeksdata",
        p1: "Je projectteam en opdrachtgevers bekijken boringen, testresultaten en grondmodellen direct in de browser, zonder iets te installeren.",
        p2: "Zulke viewers bouwen we rond jouw data en workflows.",
        iframeTitle:
          "Demo van grondonderzoeksdata in Hongkong op een 3D-kaart",
        caption: "GI-data in Kai Tak, Hongkong.",
        exploreLink: "Bekijk het zelf.",
      },
      geospatial: {
        label: "Integratie van geospatiale data",
        title: "Wij brengen je geotechnische data naar het geospatiale ecosysteem",
        p1: "We zetten grondonderzoeksdata om naar standaard geospatiale formaten, zodat je team ermee kan werken in QGIS, ArcGIS, Python en webkaarten.",
        p2: "Analyseren, visualiseren en automatiseren gebeurt in tools die je GIS-collega's en data scientists al kennen.",
        imgAlt: "Geotechnische data gevisualiseerd in ArcGIS",
        caption: "3D GI-datavisualisatie van Kai Tak, Hongkong in ArcGIS.",
      },
      cadBim: {
        label: "CAD- & BIM-integratie",
        title: "Wij verbinden geotechnische data met constructie- en gebouwmodellen",
        p1: "We brengen geotechnische en constructieve modellen samen in ontwerpsoftware zoals Rhino3D en Civil3D, koppelen ze via AEC-platforms zoals Speckle, en voeden digital twin-platforms met je gronddata.",
        imgAlt: "Interactieve 3D-visualisatie van geotechnische data in Speckle",
        caption: "3D GI-datavisualisatie van Kai Tak, Hongkong in",
        speckleLink: "Speckle.",
        exploreLink: "Bekijk het zelf.",
      },
    },
  },
} as const;
