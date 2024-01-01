$("#my_nanogallery2").nanogallery2({
    // ### gallery settings ###
    thumbnailHeight:  '350',
    thumbnailWidth:   '350',
    galleryTheme: {
        thumbnail : { borderColor: 'none' }
    },
    viewerTheme : { barColor: '#red' },
    thumbnailDisplayTransition: 'slideDown',
    thumbnailDisplayTransitionDuration: 500,
    thumbnailDisplayInterval: 30,
  
    galleryDisplayMode: 'pagination',
    galleryMaxRows: 1,

    // Miniaturas (Thumbnails) //

    thumbnailGutterWidth: 0,
    thumbnailGutterHeight: 0,
    thumbnailBorderHorizontal: 0,
    thumbnailBorderVertical: 0,
    thumbnailLabel: { displayDescription: false, valign: "bottom", position: 'overImage', descriptionMultiLine: true, titleFontSize: '1.7em', descriptionFontSize: '.9em'},
    thumbnailHoverEffect2: 'imageGrayOn|imageScaleIn80',
    
    
    /* visor */
    viewerTools:    {
        topLeft:    'label',
        topRight:   'playPauseButton, zoomButton, fullscreenButton, closeButton'
    } ,
    
    /* iconos */

    icons: {
        navigationPaginationPrevious: '<button class="btnFrom btn btn-primary" ><img class="icon-nav" src="./icons/prev.svg" alt=""></button>',
        navigationPaginationNext: '<button class="btnFrom btn btn-primary" ><img class="icon-nav" src="./icons/next.svg" alt=""></button>'
      },
      
     
    // ### gallery content ###
    items: [
        { src: './gallery/km_cicloinfra.jpg', srct: './gallery/km_cicloinfra_min.jpg', title: 'Km de cicloinfraestructura', description: 'Describe la tipología de la cicloinfraestructura mapeada, así como su porcentaje respecto al total.'},
        { src: './gallery/km_comuna.jpg', srct: './gallery/km_comuna_min.jpg', title: 'Cicloinfraestructura por comuna', description: 'Describe la tipología de la cicloinfraestructura que se encuentra en cada una de las comunas de Medellín'},
        { src: './gallery/c_genero.jpg', srct: './gallery/c_genero_min.jpg', title: 'Ciclistas por género', description: 'Presenta la proporción de ciclistas encuestados de acuerdo con su género'},
        { src: './gallery/c_edad.jpg', srct: './gallery/c_edad_min.jpg', title: 'Ciclistas por edad', description: 'Presenta la proporción de ciclistas encuestados de acuerdo con su rango de edad'},
        { src: './gallery/c_rango_edad.jpg', srct: './gallery/c_rango_edad_min.jpg', title: 'Rangos de edad por género', description: 'Presenta la variabilidad dentro del rango de edad de acuerdo con el género'},
        { src: './gallery/c_educacion.jpg', srct: './gallery/c_educacion_min.jpg', title: 'Nivel educativo', description: 'Resume la distribución de los ciclistas encuestados de acuerdo con su nivel educativo'},
        { src: './gallery/c_edu_genero.jpg', srct: './gallery/c_edu_genero_min.jpg', title: 'Nivel educativo por género', description: 'Resume la distribución de los ciclistas encuestados de acuerdo con su género y nivel educativo'},
        { src: './gallery/c_km_edu.jpg', srct: './gallery/c_km_edu_min.jpg', title: 'Km recorridos por nivel educativo', description: 'Muestra la distribución de longitudes de rutas de los encuestados de acuerdo con su nivel educativo'},
        { src: './gallery/c_km_genero.jpg', srct: './gallery/c_km_genero_min.jpg', title: 'Km recorridos por género', description: 'Muestra la distribución de longitudes de rutas de los encuestados de acuerdo con su género'},
        { src: './gallery/c_domicilio.jpg', srct: './gallery/c_domicilio_min.jpg', title: 'Municipio de residencia', description: 'Presenta la distribución porcentual de los ciclistas encuestados entre los diferentes municipios del Valle de Aburrá'},
        { src: './gallery/c_sector_lab.jpg', srct: './gallery/c_sector_lab_min.jpg', title: 'Sector laboral de los ciclistas', description: 'Resume la categorización del sector laboral del ciclista. N/A corresponde con Estudiantes o Jubilados'},
        { src: './gallery/km_ruta_lab.jpg', srct: './gallery/km_ruta_lab_min.jpg', title: 'Longitud de rutas por ocupación', description: 'Presenta la longitud promedio de las rutas marcadas, categorizadas según la ocupación del encuestado'},
        { src: './gallery/modos.jpg', srct: './gallery/modos_min.jpg', title: 'Uso combinado de bicicleta y tipología', description: 'Muestra la proporción de ciclistas que combinan o no la bicicleta con otros modos, asi como el tipo de bicicleta'},
        { src: './gallery/comb_modo.jpg', srct: './gallery/comb_modo_min.jpg', title: 'Combinación con otros modos', description: 'Presenta las proporciones y modos de transporte con los que se combinan los desplazamientos en bicicleta'},
        { src: './gallery/tipo_bici.jpg', srct: './gallery/tipo_bici_min.jpg', title: 'Tipo de bicicleta utilizada', description: 'Resume las categorías de bicicleta utilizada por los encuestados para sus desplazamientos'},
        { src: './gallery/km_tipo_bici.jpg', srct: './gallery/km_tipo_bici_min.jpg', title: 'Km recorridos por tipo de bici', description: 'Muestra el recuento de rutas y la longitud media de recorrido en función del tipo de bicicleta'},
        { src: './gallery/nivel_exp.jpg', srct: './gallery/nivel_exp_min.jpg', title: 'Niveles de experiencia de los ciclistas', description: 'Presenta la proporción de encuestados de acuerdo con su autopercepción del nivel de experiencia poseído'},
        { src: './gallery/nivel_exp_genero.jpg', srct: './gallery/nivel_exp_genero_min.jpg', title: 'Nivel de experiencia por género', description: 'Presenta la autopercepción del nivel de experiencia del encuestado, contrastado con el género'},
        { src: './gallery/nivel_exp_tiempo.jpg', srct: './gallery/nivel_exp_tiempo_min.jpg', title: 'Tiempo de uso de la bicicleta', description: 'Presenta la autopercepción del nivel de experiencia del encuestado, contrastado con el tiempo como ciclista'},
        { src: './gallery/tiempo_genero.jpg', srct: './gallery/tiempo_genero_min.jpg', title: 'Tiempo de uso por género', description: 'Muestra la proporción de personas por género para cada uno de los rangos de tiempo como ciclista'},
        { src: './gallery/km_tiempo_uso.jpg', srct: './gallery/km_tiempo_uso_min.jpg', title: 'Longitud de ruta por tiempo de uso', description: 'Indica la comparación de la longitud media de las rutas en función del tiempo como ciclista'},
        { src: './gallery/horarios_ruta.jpg', srct: './gallery/horarios_ruta_min.jpg', title: 'Horarios de rutas', description: 'Muestra la distribución temporal de las rutas, indicando las horas de mayor afluencia por género'},
        { src: './gallery/optima_movilidad.jpg', srct: './gallery/optima_movilidad_min.jpg', title: 'Necesidades para una óptima movilidad', description: 'Resume los comentarios frente a la pregunta de cuáles eran las principales necesidades para moverse en bicicleta'},
        { src: './gallery/dificultades_movilidad.jpg', srct: './gallery/dificultades_movilidad_min.jpg', title: 'Dificultades para moverse en bicicleta', description: 'Resume los comentarios frente a la pregunta de cuáles eran las principales dificultades para moverse en bicicleta'},
        { src: './gallery/selec_ruta_exp.jpg', srct: './gallery/selec_ruta_exp_min.jpg', title: 'Motivos de selección de ruta', description: 'Muestra las preferencias de ruta de los ciclistas en función de su nivel de experiencia'},
        { src: './gallery/selec_ruta_gen.jpg', srct: './gallery/selec_ruta_gen_min.jpg', title: 'Selección de ruta por género', description: 'Muestra las preferencias de ruta de los ciclistas en función del género'},
        { src: './gallery/od.jpg', srct: './gallery/od_min.jpg', title: 'Principales origenes y destinos', description: 'Indica los principales lugares de origen y destino de los viajes en bicicleta'},

        { src: './gallery/maps/rutas.png', srct: './gallery/maps/rutas_min.jpg', title: 'Rutas SIGenBici', description: 'Presenta la concentración de rutas resultado de la encuesta'},
        { src: './gallery/maps/rutas_gen.png', srct: './gallery/maps/rutas_gen_min.jpg', title: 'Rutas SIGenBici por género', description: 'Presenta la concentración de rutas clasificadas de acuerdo con el género'},
        { src: './gallery/maps/seguridad.png', srct: './gallery/maps/seguridad_min.jpg', title: 'Perpepción de seguridad', description: 'Muestra la concentración de reportes de los lugares en los cuales los ciclistas se sienten seguros'},
        { src: './gallery/maps/agradable.png', srct: './gallery/maps/agradable_min.jpg', title: 'Zonas con percepción agradable', description: 'Muestra la concentración de reportes de los lugares agradables para los ciclistas'},
        { src: './gallery/maps/prob_infra.png', srct: './gallery/maps/prob_infra_min.jpg', title: 'Lugares con problemas de infraestructura', description: 'Muestra la concentración de reportes de los lugares en donde los ciclistas perciben problemas en la infraestructura'},
        { src: './gallery/maps/incidentalidad.png', srct: './gallery/maps/incidentalidad_min.jpg', title: 'Riesgo de incidentalidad', description: 'Muestra los lugares en donde los ciclistas perciben alto riesgo de incidentalidad, combinado con los incidentes reportados'},
        { src: './gallery/maps/robo.png', srct: './gallery/maps/robo_min.jpg', title: 'Riesgo de robo', description: 'Muestra los lugares en donde los ciclistas perciben riesgo de ser víctimas de robo, combinado con los robos reportados'},
    ]
  });