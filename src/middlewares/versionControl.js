const SUPPORTED_VERSIONS = {
  v1: {
    active: true,
    deprecated: false,
    sunset: null // Fecha en que la versión será descontinuada
  }
};

/**
 * Extrae la versión de la URL
 * @param {string} url - URL de la petición
 * @returns {string|null} - Versión extraída o null si no se encuentra
 */
const extractVersionFromUrl = (url) => {
  const matches = url.match(/\/api\/(v[0-9]+)\//);
  return matches ? matches[1] : null;
};

/**
 * Middleware de control de versiones
 */
const versionControl = (req, res, next) => {
  const version = extractVersionFromUrl(req.originalUrl);

  // Si no se encuentra la versión en la URL
  if (!version) {
    return res.status(400).json({
      status: 'error',
      message: 'Versión de API no especificada'
    });
  }

  // Si la versión no está soportada
  if (!SUPPORTED_VERSIONS[version]) {
    return res.status(400).json({
      status: 'error',
      message: 'Versión de API no soportada'
    });
  }

  const versionInfo = SUPPORTED_VERSIONS[version];

  // Si la versión no está activa
  if (!versionInfo.active) {
    return res.status(400).json({
      status: 'error',
      message: 'Esta versión de la API aún no está activa'
    });
  }

  // Si la versión está deprecada, enviar header de advertencia
  if (versionInfo.deprecated) {
    res.set({
      'Warning': `299 - "Esta versión de la API está deprecada y será descontinuada en ${versionInfo.sunset}"`,
      'Sunset': versionInfo.sunset
    });
  }

  // Agregar información de versión al objeto request
  req.apiVersion = {
    version,
    ...versionInfo
  };

  next();
};

/**
 * Middleware para forzar una versión específica
 * @param {string} version - Versión requerida
 */
const requireVersion = (version) => {
  return (req, res, next) => {
    if (req.apiVersion.version !== version) {
      return res.status(400).json({
        status: 'error',
        message: `Esta ruta requiere la versión ${version} de la API`
      });
    }
    next();
  };
};

/**
 * Utilidad para marcar una versión como deprecada
 * @param {string} version - Versión a deprecar
 * @param {Date} sunsetDate - Fecha en que la versión será descontinuada
 */
const deprecateVersion = (version, sunsetDate) => {
  if (SUPPORTED_VERSIONS[version]) {
    SUPPORTED_VERSIONS[version].deprecated = true;
    SUPPORTED_VERSIONS[version].sunset = sunsetDate.toISOString();
  }
};

export {
  versionControl,
  requireVersion,
  deprecateVersion,
  SUPPORTED_VERSIONS
};